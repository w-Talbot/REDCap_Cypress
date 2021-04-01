const pid = 21

const admin = 'test_admin'
const standard = 'test_user'

describe('Export Data', () => {

    before(() => {
        
        // Prepare project
        cy.set_user_type('admin')
        cy.mysql_db('projects/pristine')
        cy.create_cdisc_project_rad('Export Test', '0', 'cdisc_files/core/export_data.xml', pid)
        cy.add_users_to_project([standard], pid)
        cy.visit_version({page: 'UserRights/index.php', params: `pid=${pid}`}).then(() => {
            cy.get(`a.userLinkInTable[userid="${standard}"]`).should('be.visible').click().then(() =>{
                cy.get('div#tooltipBtnSetCustom').should('be.visible').find('button').click()
                cy.get('input[name="design"]').check()
                cy.get('input[name="user_rights"]').check()
                cy.get('input[name="data_export_tool"][value="1"]').check()

                //added full user priveleges 
                cy.get('[style="padding-top:2px;"] > :nth-child(4)').click()


                cy.get('.ui-button').contains(/add user|save changes/i).click()
            })
        })
            
        // Mark records' forms as survey complete
        cy.visit_version({page: 'DataEntry/record_home.php', params: `pid=${pid}&arm=1&id=1`})
        cy.get('div#repeating_forms_table_parent').find('td.data').first().find('a').click()
      
        cy.get('#submit-btn-saverecord').click({force: true}) 

        cy.visit_version({page: 'DataEntry/record_home.php', params: `pid=${pid}&arm=1&id=2`})
        cy.get('div#repeating_forms_table_parent').find('td.data').first().find('a').click()
        cy.get('#submit-btn-saverecord').click({force: true}) 

    })

    after(() => {
        cy.set_user_type('admin')
        cy.delete_records(pid)
        cy.remove_users_from_project([standard, admin], pid)
        cy.delete_project(pid)
        cy.mysql_db('projects/pristine')
    })

    describe('Basic Functionality', () => {

        before(() => {
            cy.set_user_type('standard')
        })

        it('Should have the ability to mark fields as identifiers', () => {
            cy.visit_version({page: 'Design/online_designer.php', params: `pid=${pid}&page=export`})
            cy.get('table#design-lname').find('a').first().click()
            cy.get('input#field_phi1').click()
            cy.get('button').contains('Save').click()
            cy.get('table#design-fname').find('a').first().click()
            cy.get('input#field_phi1').click()
            cy.get('button').contains('Save').click()
        
            cy.set_user_type('admin')
            cy.visit_version({page: 'ProjectSetup/index.php', params: `pid=${pid}`})
            cy.get('button').contains('Move project to production').click()
            cy.get('input#keep_data').click()
            cy.get('button').contains('YES, Move to Production Status').click()
            cy.get('div#actionMsg').should('be.visible')
            cy.set_user_type('standard')
        })

        it('Should have the ability to export all fields within a project', () => {


            cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
            cy.get('tr#reprow_ALL').find('button.data_export_btn').contains('Export Data').click()
            cy.get('input[value="csvlabels"]').click()

                cy.export_csv_report().should((csv) => {
                expect(csv[0].length).to.equal(11)                                                              
                expect(csv[0][0]).to.equal('Record ID')                                                         
                expect(csv[1][csv[0].indexOf('Event Name')]).to.equal('Event 1')                                
                expect([...new Set(csv.map((row) => row[0]).slice(1))].length).to.equal(8)                     
     
            })

        })

        it('Should allow the ability to export specific forms', () => {
            
            cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
            
            cy.get('tr#reprow_SELECTED').find('button').contains('Make custom selections').click()
            cy.get('#export_selected_instruments').select('survey')
            cy.wait(500)
            cy.get('#export_selected_events').select('Event 2')
            cy.wait(500)
            cy.get('tr#reprow_SELECTED').find('button.data_export_btn').contains('Export Data').click()
            cy.get('.ui-dialog-buttonset > :nth-child(1)').click()

            cy.get('#center').should(($temp) => {
                expect($temp).to.contain('Select one or more instruments/events below for all records')                                                            

            })
  
        })
    })

    describe('Data Export Formats', () => {

        before(() => {
            cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
            cy.get('tr#reprow_ALL').find('button.data_export_btn').contains('Export Data').click()
        })

        it('Should have the ability to export to CSV format', () => {
            cy.verify_export_deidentification_options('input[name="export_format"][value="csvraw"]')
            cy.verify_export_deidentification_options('input[name="export_format"][value="csvlabels"]')
        })

        it('Should have the ability to export to SPSS format', () => {
            cy.verify_export_deidentification_options('input[name="export_format"][value="spss"]')
        })

        it('Should have the ability to export to SAS format', () => {
            cy.verify_export_deidentification_options('input[name="export_format"][value="sas"]')
        })

        it('Should have the ability to export to R format', () => {
            cy.verify_export_deidentification_options('input[name="export_format"][value="r"]')
        })

        it('Should have the ability to export to STATA format', () => {
            cy.verify_export_deidentification_options('input[name="export_format"][value="stata"]')
        })

        it('Should have the ability to export to CDISC ODM (XML) format', () => {
            cy.verify_export_deidentification_options('input[name="export_format"][value="odm"]')
        })
    })

    describe('De-Identification Options', () => {

        beforeEach(() => {
            cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
            cy.get('tr#reprow_ALL').find('button.data_export_btn').contains('Export Data').click()
        })

        describe('Known Identifiers', () => {

            it('Should have the ability to remove all known identifier fields', () => {
                cy.get('input[value="csvraw"]').click()
                cy.get('#deid-remove-identifiers').check()
                cy.export_csv_report().should((csv) => {
                    expect(csv[0]).to.have.lengthOf(9)                                                            
                    expect(csv[0]).to.not.include.members(['lname','fname','redcap_survey_identifier'])
                    expect([...new Set(csv.map((row) => row[0]).slice(1))]).to.have.lengthOf(8)                   
                    expect(csv.length - 1).to.equal(19)                                                             
                })
            })

            it('Should have the ability to hash the Record ID', () => {
                cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
                cy.get('tr#reprow_ALL').find('button.data_export_btn').contains('Export Data').click()
                cy.get('input[value="csvraw"]').click()
                cy.get('#deid-hashid').check()
                cy.export_csv_report().should((csv) => {
                    expect([...new Set(csv.map((row) => row[0]).slice(1))]).to.have.lengthOf(8)                    
                    expect(csv[1][csv[0].indexOf('record_id')].length).to.equal(32)                                
                })
            })

        })

        describe('Free Form Text', () => {

            it('Should have the ability to remove unvalidated text fields', () => {
                cy.get('input[value="csvraw"]').click()
                cy.get('#deid-remove-text').check()
                cy.export_csv_report().should((csv) => {
                    expect(csv[0]).to.not.include.members(['lname', 'fname', 'reminder'])                        
                })
            })

            it('Should have the ability to remove notes box fields', () => {
                cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
                cy.get('tr#reprow_ALL').find('button.data_export_btn').contains('Export Data').click()
                cy.get('input[value="csvraw"]').click()
                cy.get('#deid-remove-notes').check()
                cy.export_csv_report().should((csv) => {
                    expect(csv[0]).to.not.include.members(['description'])                                                 
                   
                })
            })

        })

        describe('Date and Datetime Fields', () => {

            it('Should have the ability to remove all date and datetime fields', () => {
                cy.get('input[value="csvraw"]').click()
                cy.get('#deid-dates-remove').check()
                cy.export_csv_report().should((csv) => {
                    expect(csv[0]).to.not.include.members(['dob'])                                                                 
                   
                })
            })

            it('Should have the ability to shift all dates by value between 0 and 364 days', () => {
                cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
                cy.get('tr#reprow_ALL').find('button.data_export_btn').contains('Export Data').click()
                cy.get('input[value="csvraw"]').click()
                cy.export_csv_report().then((csv_orig) => {
                    cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
                    cy.get('tr#reprow_ALL').find('button.data_export_btn').contains('Export Data').click()
                    cy.get('input[value="csvraw"]').click()
                    cy.get('#deid-dates-shift').check()
                    cy.export_csv_report().should((csv_new) => {
                        let dob_orig = csv_orig[1][csv_orig[0].indexOf('dob')]
                        let dob_new = csv_new[1][csv_new[0].indexOf('dob')]
                        expect(dob_new).to.not.equal(dob_orig)
                    })    
                })
            })

            it('Should have the ability to shift all survey completion timestamps by value between 0 and 364 days', () => {
                cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
                cy.get('tr#reprow_ALL').find('button.data_export_btn').contains('Export Data').click()
                cy.get('input[value="csvraw"]').click()
                cy.export_csv_report().then((csv_orig) => {
                    cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
                    cy.get('tr#reprow_ALL').find('button.data_export_btn').contains('Export Data').click()
                    cy.get('input[value="csvraw"]').click()
                    cy.get('#deid-dates-shift').check()
                    
                })
            })

        })

    })

    describe('Export Permissions', () => {

        before(() => {
            cy.visit_version({page: 'UserRights/index.php', params: `pid=${pid}`}).then(() => {
                cy.get(`a.userLinkInTable[userid="${standard}"]`).should('be.visible').click().then(() =>{
                    cy.get('div#tooltipBtnSetCustom').should('be.visible').find('button').click()
                    cy.get('input[name="data_export_tool"][value="2"]').click()
                    cy.get('button').contains('Save Changes').click()
                })
            })
        })

        it('Should have the ability to restrict users from exporting data', () => {

            // To get real data values
            cy.set_user_type('admin')
            cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
            cy.get('tr#reprow_ALL').find('button.data_export_btn').contains('Export Data').click()
          
          
            cy.get('#export_choices_table > tbody > :nth-child(1) > td').click()

            cy.export_csv_report().then((csv_orig) => {
                cy.set_user_type('standard')
                cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
                cy.get('tr#reprow_ALL').find('button.data_export_btn').contains('Export Data').click()
                cy.get('#deid-remove-identifiers').should($inpt => expect($inpt).to.be.checked)
                    .click().should($inpt => expect($inpt).to.be.checked)
            
                cy.get('input[value="csvraw"]').click()
                cy.export_csv_report().then((csv) => {
                    expect(csv[0]).to.have.lengthOf(7)                                                              
                    expect(csv[0][0]).to.equal('record_id')                                                         
                    expect(csv[1][csv[0].indexOf('redcap_event_name')]).to.equal('event_1_arm_1')                   
                    expect(csv.length - 1).to.equal(19)                                                             
                 
                    let dob_orig = csv_orig[1][csv_orig[0].indexOf('dob')]                                                                 
                    let dob = csv[1][csv[0].indexOf('dob')]
                    expect(dob).to.not.equal(dob_orig)

                    
                    let excluded_fields = ['lname', 'fname', 'redcap_survey_identifier', 'reminder', 'description'] 
                    expect(csv[0]).to.not.include.members(excluded_fields)                                          
                })
            })

            cy.visit_version({page: 'UserRights/index.php', params: `pid=${pid}`}).then(() => {
                cy.get(`a.userLinkInTable[userid="${standard}"]`).should('be.visible').click().then(() =>{
                    cy.get('div#tooltipBtnSetCustom').should('be.visible').find('button').click()
                    cy.get('input[name="data_export_tool"][value="0"]').click()
                    cy.get('button').contains('Save Changes').click()
                })
            })

            cy.visit_version({page: 'DataExport/index.php', params: `pid=${pid}`})
            cy.get('tr#reprow_ALL').find('button.data_export_btn').contains('Export Data').should('not.exist')
        })
    })
})