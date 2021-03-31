describe('Design forms Using Data Dictionary and Online Designer', () => {
	
	
    describe('Field Creation', () => {
	
            before(() => {
                cy.mysql_db("projects/pristine")
                cy.set_user_type('admin')
                cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
                cy.get('body').should(($body) => {
                    expect($body).to.contain('Enter Draft Mode')
                }).then(() => {
                    cy.get('input[value="Enter Draft Mode"]').click()
                    cy.get('a').contains('Demographics').click()
                    cy.get('input[value="Add Field"]').first().click({force: true})
                    cy.get('select').contains('Text Box (Short Text, Number, Date/Time, ...)').parent().select('Text Box (Short Text, Number, Date/Time, ...)')
                    cy.get('#field_name').type('test_inst')
                    
                })	
  

            })

            it('Shall support the creation of Text box (Short Text)', () => {
                
                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Text Box (Short Text, Number, Date/Time, ...)')
                    
                })		            
            })

            it('Shall support the creation of Notes Box (Paragraph Text)', () => {
            
                cy.get('select').contains('Notes Box (Paragraph Text)').parent().select('Notes Box (Paragraph Text)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Notes Box (Paragraph Text)')
                    
                })		            
            })

            it('Shall support the creation of Notes Box (Paragraph Text)', () => {
            
                cy.get('select').contains('Notes Box (Paragraph Text)').parent().select('Notes Box (Paragraph Text)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Notes Box (Paragraph Text)')
                    
                })		            
            })

            it('The system shall support creation and customization of algorithms for calculated fields', () => {
            
                cy.get('select').contains('Calculated Field').parent().select('Calculated Field')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Calculated Field')
                    
                })       
            })

            it('The system shall support the creation and manual coding for Multiple Choice - Dropdown List (Single Answer)', () => {
            
                cy.get('select').contains('Multiple Choice - Drop-down List (Single Answer)').parent().select('Multiple Choice - Drop-down List (Single Answer)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Multiple Choice - Drop-down List (Single Answer)')
                    
                })	
            })

            it('The system shall support the creation and manual coding for Multiple Choice - Radio Buttons (Single Answer) ', () => {
            
                cy.get('select').contains('Multiple Choice - Radio Buttons (Single Answer)').parent().select('Multiple Choice - Radio Buttons (Single Answer)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Multiple Choice - Radio Buttons (Single Answer)')
                    
                })	
               	            
            })
     
            it('The system shall support the creation of Checkboxes (Multiple Answers)', () => {
            
                cy.get('select').contains('Checkboxes (Multiple Answers)').parent().select('Checkboxes (Multiple Answers)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Checkboxes (Multiple Answers)')
                    
                })	
               	            
            })

            it('The system shall support the creation of Signature (draw signature with mouse or finger)', () => {
            
                cy.get('select').contains('Signature (draw signature with mouse or finger)').parent().select('Signature (draw signature with mouse or finger)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Signature (draw signature with mouse or finger)')
                    
                })	
               	            
            })
            it('The system shall support the creation of File Upload (for users to upload file)', () => {
            
               	           
                cy.get('select').contains('File Upload (for users to upload files)').parent().select('File Upload (for users to upload files)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('File Upload (for users to upload files)')
                    
                })	
            })

            it('The system shall support the creation  of Descriptive Text (with optio nal Image/Video/Audio/File Attachment)', () => {
           
                cy.get('select').contains('Descriptive Text (with optional Image/Video/Audio/File Attachment)').parent().select('Descriptive Text (with optional Image/Video/Audio/File Attachment)')

 
                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Descriptive Text (with optional Image/Video/Audio/File Attachment)')
                    
                })	
               	            
            })

            it('The system shall support the creation of Begin New Section (with optional text)', () => {
             
                cy.get('select').contains('Begin New Section (with optional text)').parent().select('Begin New Section (with optional text)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Begin New Section (with optional text)')
                    
                })	
               	            
            })
           
            it('The system shall support marking a data entry field as an identifier', () => {
                cy.get('select').contains('Notes Box (Paragraph Text)').parent().select('Notes Box (Paragraph Text)')
                cy.get('#field_phi1').click()
                .should('be.checked') 	            
            })
           
            it('The system shall support marking a data entry field as required', () => {
                cy.get('#field_req1').click()
                .should('be.checked') 
            })
           
            it('The system shall support the provision of field notes (reminders underneath the field)', () => {
                cy.get('#field_note').type('Test field note functionality')

                    cy.get('#field_note').should('have.value', 'Test field note functionality')
    
            })

            it('The system shall support the use of ActionTags / Field annotations  to enhance the user experience.', () => {
            
              
                cy.get('[style="margin:5px 0;font-size:11px;color: #808080;"] > .btn').click()
              
                //add Default value for Field annotation
                cy.get(':nth-child(4) > [style="text-align:center;background-color:#f5f5f5;color:#912B2B;padding:7px 15px 7px 12px;font-weight:bold;border:1px solid #ccc;border-bottom:0;border-right:0;"] > .btn').click()
                //add read only action tag
                cy.get(':nth-child(20) > [style="text-align:center;background-color:#f5f5f5;color:#912B2B;padding:7px 15px 7px 12px;font-weight:bold;border:1px solid #ccc;border-bottom:0;border-right:0;"] > .btn').click()
                
        
                cy.get('[aria-describedby="action_tag_explain_popup"] > .ui-dialog-buttonpane > .ui-dialog-buttonset > .ui-button').click()    
               
                //checks action tags exists
                cy.get('#field_annotation').should('have.value', '@READONLY @DEFAULT')

                cy.get('#field_annotation').type('=\'testname\'')
                
            })
            
           
             it('The system shall support the relative positioning of fields with respect to the question text:', () => {
                   
                cy.get('select').contains('Text Box (Short Text, Number, Date/Time, ...)').parent().select('Text Box (Short Text, Number, Date/Time, ...)')

                    cy.get('select').contains('Right / Vertical (RV)').parent().select('Right / Vertical (RV)') 
                    cy.get('select#custom_alignment').should(($val) => {
                        expect($val).to.contain('Right / Vertical (RV)')
                            
                        })

                    cy.get('select').contains('Right / Horizontal (RH)').parent().select('Right / Horizontal (RH)')
                    cy.get('select#custom_alignment').should(($val) => {
                        expect($val).to.contain('Right / Horizontal (RH)')
                            
                        })  

                    cy.get('select').contains('Left / Vertical (LV)').parent().select('Left / Vertical (LV)') 
                    cy.get('select#custom_alignment').should(($val) => {
                        expect($val).to.contain('Left / Vertical (LV)')
                            
                        }) 

                    cy.get('select').contains('Left / Horizontal (LH)').parent().select('Left / Horizontal (LH)') 
                    cy.get('select#custom_alignment').should(($val) => {
                        expect($val).to.contain('Left / Horizontal (LH)')
                            
                        }) 
                        cy.get('#field_label').type('testing')
                        cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()
                 })

                 

            it('The system shall support the ability to add, edit, copy, move and delete data collection fields', () => {
            
                //ADD has been proven by the first test

                //MOVE 
                cy.get('#design-test_inst > tbody > :nth-child(1) > .frmedit')
                .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
                .trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
                .trigger('mouseup')

                
                //DELETE
                cy.get('#label-patient_document').should(($val) => {
                    expect($val).to.contain('Upload the patient\'s consent form')
                        
                    }) 
                cy.get('[onclick="deleteField(\'patient_document\',0);"] > img').click()
                cy.get('.ui-dialog-buttonset > :nth-child(2)').click()

                cy.contains('Upload the patient\'s consent form').should('not.exist')

                //COPY
                cy.get('[onclick="copyField(\'last_name\')"] > img').click()
                cy.get('.ui-dialog-buttonset > :nth-child(2)').click() 
                cy.get('#design-last_name_2 > tbody > :nth-child(1) > .frmedit > .frmedit_icons > .designVarName').contains('last_name_2')  

                //EDIT
                cy.get('[onclick="openAddQuesForm(\'last_name_2\',\'text\',0,\'0\');"] > img').click()
                cy.get('select').contains('Notes Box (Paragraph Text)').parent().select('Notes Box (Paragraph Text)')
                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Notes Box (Paragraph Text)')
                    
                })		       
                cy.get('button').contains('Save').click()
           
           
           
            })

            it('The system shall support the injection of previously collected data / system defined variables into text on a data collection (piping)', () => {
                

                cy.get('[onclick="openAddQuesForm(\'address\',\'textarea\',0,\'0\');"] > img').click()
                cy.get('#field_annotation').type('@DEFAULT=\'[user-name], [user-dag-name] , [user-dag-id] , [record-name], [record-dag-name] , [record-dag-id],[record-dag-label],[is-form],[form-url:instrument],[form-link:instrument:Custom Text],[is-survey],[survey-url:instrument],urvey-link:instrument:Custom Text],[survey-queue-url],[survey-queue-link:Custom Text],[survey-time-completed:instrument],[survey-date-completed:instrument],[event-name],[event-label],[previous-event-name],[previous-event-label],[next-event-name],[next-event-label],[first-event-name],[first-event-label],[last-event-name],[last-event-label],[arm-number],[arm-label],[previous-instance],[current-instance],[next-instance],[first-instance],[last-instance] \'') 
                cy.get('button').contains('Save').click()  


                //
                cy.get('.float-left > .btn').click()
                cy.get('#formlabel-baseline_data').click()

                
                cy.get('[onclick="openAddQuesForm(\'alb_b\',\'text\',0,\'0\');"] > img').click()
                cy.get('#field_annotation').type('@DEFAULT=\'[first_name]\'')


                cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()
                cy.get('.jqbutton').click()
                cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
                cy.get('.ui-dialog-buttonset > .ui-button').click()
                cy.get(':nth-child(2) > .x-panel-bwrap > .x-panel-body > :nth-child(1) > .menubox > :nth-child(2) > a').click()
                cy.get('.data > button').click()
                cy.get(':nth-child(1) > .nowrap > a > img').click()
                cy.get('#date_enrolled-tr > .data > .jqbuttonsm').click()

                 //adds name
                 cy.get('#first_name-tr > .data > .x-form-text').type('4')
                
               //checks 
                cy.get('#address').contains('site_admin')

               
                cy.get('#formSaveTip > #submit-btn-saverecord').click()

               
                //Baseline check
                cy.get(':nth-child(2) > .nowrap > a > img').click()

            })
            
  
         
 describe('Form Creation', () => {


    before(() => {
        cy.mysql_db("projects/pristine")
        cy.set_user_type('admin')
        cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
        
        cy.get('input[value="Enter Draft Mode"]').click()
        

    })
                        
                it('The system shall support the ability to rename data collection instruments', () => {
                    cy.get('#row_1 > :nth-child(5) > .fc > .formActions > .jqbuttonsm').click()
                    cy.get('#ui-id-1 > span').click()
                    cy.get('#form_menu_description_input-demographics').type('Test Renaming ')
                    cy.get('#form_menu_save_btn-demographics').click()
                    cy.get('#formlabel-demographics').contains('Test Renaming Demographics')

                  })

                  it('The system shall support the creation of new data collection instruments via the Online Designer', () => {
                  //this is proven above, using the Online Designer
                })
        
            
                it('The system shall support the ability to delete data collection instruments', () => {
                    cy.get('#row_1 > :nth-child(5) > .fc > .formActions > .jqbuttonsm').click()
                    cy.get('#ui-id-3 > span').click()   
                    cy.get('.ui-dialog-buttonset > :nth-child(2)').click()  
                    cy.wait(1000) 
                })
                it('The system shall support the ability to re-order data collection instruments', () => {
                    cy.get('#row_3 > .dragHandle')
                    .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
                    .trigger('mousemove', { which: 1, pageX: 650, pageY: 150 })
                    .trigger('mouseup')
     
                })
              
                
               
                  it('The system shall support the ability to copy data collection instruments and add a suffix to each variable name in the new instrument', () => {
                    cy.get('#row_6 > :nth-child(5) > .fc > .formActions > .jqbuttonsm').click()  
                    cy.get('#ui-id-2 > span').click()
                    // cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
                    cy.get('[aria-describedby="copy-instrument-popup"] > .ui-dialog-buttonpane > .ui-dialog-buttonset > :nth-child(2)').click()
                    cy.wait(1000)
                    cy.get('#formlabel-completion_data_2').click()
                    cy.get('#design-complete_study_v2 > tbody > :nth-child(1) > .frmedit > .frmedit_icons > .designVarName').contains('_v2')

                })

                it('The system shall support linking to different ontology servers', () => { 
                    cy.get('[onclick="openAddQuesForm(\'withdraw_reason_v2\',\'select\',0,\'0\');"] > img').click()
                    cy.get('#field_type').select('Text Box (Short Text, Number, Date/Time, ...)')
                    cy.get('select#ontology_service_select').should(($val) => {
                        expect($val).to.contain('BioPortal Ontology Service')
                    })
                    cy.get('#ontology_service_select').select('BioPortal Ontology Service')
                   


                })

                 it('The system shall support the creation of new data collection instruments using the Data Dictionary', () => {
                    cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=1'})
                    cy.get('#center').should(($val) => {
                        expect($val).to.contain('uploading a Data Dictionary')
                    })
                    cy.get('[style="line-height:24px;margin-right:30px;"] > .btn').click()
                    cy.upload_file('import_files/classic_db_instrument.csv', 'csv', 'input[name="uploadedfile"]')
                    cy.wait(1000)
                    cy.get('input').contains('Upload File').click()
                    cy.get('#center').should(($val) => {
                        expect($val).to.contain('Your document was uploaded successfully and awaits your confirmation below')
                    })

                  })
        
        })
    })



   



})