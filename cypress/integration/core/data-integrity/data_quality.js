describe('Data Quality', () => {

	before(() => {
        cy.mysql_db('projects/pristine')
        cy.set_user_type('admin')
        cy.visit_version({page: 'DataQuality/index.php', params: 'pid=13'})
	})

    it('Should have default rules available after installation', () => {
            cy.get('table#table-rules').should(($t) => {
                expect($t).to.contain('Missing values*')
                expect($t).to.contain('Field validation errors (out of range)')
                expect($t).to.contain('Incorrect values for calculated fields')
            })

    })

    it('Should have the ability to create a data quality rule', () => {
        cy.get('textarea#input_rulename_id_0').type("new rule")
        cy.get('textarea#input_rulelogic_id_0').type('![my_first_instrument_complete]')
        cy.get('button').contains("Add").click()
        cy.get('table#table-rules').should(($t) => {
            expect($t).to.contain('new rule')
        })
        cy.get('div#rulename_1').should(($div) => {
            expect($div).to.contain('new rule')
        })
    })

	it('Should have the ability to execute a data quality rule', () => {
            cy.get('div#rulename_1').parent().parent().parent().within(($tr) => {
                cy.get('button').contains('Execute').click()
                cy.get('div#ruleexe_1').should(($div) => {
                    expect($div).not.to.contain('Execute')
                })
            })
    })

	it('Should have the ability to execute all data quality rules at the same time', () => {
            cy.get('button').contains('All').click()
            cy.get('table#table-rules').within(($t) => {
                cy.get('div.exebtn').should(($d) => {
                    expect($d).not.to.contain('Execute')
                })
            })
           
    })

	it('Should have the ability to view the discrepancies found during rule execution', () => {
        //cy.get('div#rulename_pd-10').parent().parent().parent().within(($tr) => {
          //  cy.get('button').contains('Execute').click()
        //})
   
        cy.get('div#ruleexe_pd-10').within(($d) => {
            cy.get('a').click()
        })
        cy.wait(500)
        cy.get('span#ui-id-1').should(($s) => {
            expect($s).to.contain('Discrepancies found:')
        })



        
    })

	it('Should have the ability to support the removal of exclusion of discrepancies', () => {

        cy.get('.ui-dialog-buttonset > .ui-button').click()

        cy.get('[href="/redcap_v8.8.2/ProjectSetup/index.php?pid=13"]').click()
        cy.get('[style="line-height:24px;"] > .btn > span').click()
        cy.get('#formlabel-my_first_instrument').click()
        cy.get('#btn-last').click()
        
        

        cy.get('select').contains('Text Box (Short Text, Number, Date/Time, ...)').parent().select('Text Box (Short Text, Number, Date/Time, ...)')
                cy.get('#field_label').type('Number Check')
                cy.get('#field_name').type('age')
						cy.get('button').contains('Save').click()

                        cy.get(':nth-child(11) > a').click()


        cy.get('textarea#input_rulename_id_0').type("number rule")
        cy.get('textarea#input_rulelogic_id_0').type('[age] > 1')
        cy.get('button').contains("Add").click()

        cy.get(':nth-child(2) > .x-panel-bwrap > .x-panel-body > :nth-child(1) > .menubox > :nth-child(5) > a').click()
        cy.get('.data > button').click()

        cy.get('.data > .x-form-text').type('3')
        cy.get('#__SUBMITBUTTONS__-div > #submit-btn-saverecord').click()
        cy.get(':nth-child(11) > a').click()
        cy.get('#ruleexe_2 > button').click



        cy.get('#ruleexe_2 > button').click()
        cy.get('[style="float:right;"] > a').click()
        //add exclusion
        cy.get('.fc > a').click()
        cy.wait(500)

        //remove exclusion
        cy.get('.fc > a').click()
        cy.wait(500)
      
        cy.get('.ui-dialog-buttonset > .ui-button').click()


        //needs a validation Check/need to solve this..........



        
    })

    it('Should have the ability to clear discrepancies from executed rules', () => {
            
        cy.get('#clearBtn').click()
        // expect($div).not.to.contain('number rule') //needs a validation Check/need to solve this..........
    })

	it('Should have the ability to limit the viewing of a rule to a specific Data Access Group', () => {
            
    })

	it('Should have the ability to limit a rule viewing that references a Field for which users do not have User Rights', () => {
            
    })

	it('Should have the ability to delete a user defined rule', () => {
        cy.get('#ruledel_2 > a > img').click() 
        
        //needs a validation Check....................
    })

	it('Should have the ability to validate a unique event name used in custom rules for longitudinal projects', () => {
            
    })

	it('Should have the ability to execute a custom data quality rule in real time', () => {
        cy.get('#rulerte_1 > img').click()
        cy.get('#rulerte_newvalue_1').click()
        cy.get('#rulerte_1 > button').click()
        // cy.get('#rulerte_1 > button').contains('img') //needs a validation Check/figure out test....................
    })

})