describe('Record Locking and E-Signatures', () => {

	before(() => {
        cy.mysql_db("projects/pristine")
		cy.set_user_type('admin')



        cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
		cy.get('body').should(($body) => {
			expect($body).to.contain('Enter Draft Mode')
		}).then(() => {

			//Enter Draft Mode
			cy.get('input[value="Enter Draft Mode"]').click()
			cy.get('a').contains('Demographics').click()
			cy.get('input[value="Add Field"]').first().click({force: true})
			cy.get('select').contains('Signature (draw signature with mouse or finger)').parent().select('Signature (draw signature with mouse or finger)')
			cy.get('#field_name').type('signature')
			cy.get('#field_label').type('Sign Here: ')
			cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()
			cy.wait(1000)

			cy.get('#design-signature > tbody > :nth-child(1) > .frmedit')
			.trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
			.trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
			.trigger('mouseup')

			cy.get('.jqbutton').focus().click({force:true})
			cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
			cy.wait(1000) 

			//Add Record LOCKED
			cy.visit_version({page: 'DataEntry/record_home.php', params: 'pid=1'})
			cy.get('.data > button').click()

			cy.get(':nth-child(1) > .nowrap > a > img').click()
			cy.get('#date_enrolled-tr > .data > .jqbuttonsm').click()

					//signature
			cy.get('#signature-linknew > .fileuploadlink').click({force:true})
			cy.get('.jSignature').click('center')
			cy.get('#signature-div-actions > button').click()

        cy.get('#first_name-tr > .data > .x-form-text').type('first ')
        cy.get('#last_name-tr > .data > .x-form-text').type('last ')
        cy.get('#address').type('city')
        cy.get('#telephone_1-tr > .data > .x-form-text').type('(415) 555 1234')
        cy.get('#email-tr > .data > .x-form-text').type('www@www.www')
        cy.get('#dob-tr > .data > .jqbuttonsm').click()
        cy.get('.labelrc > :nth-child(6) > input').check()
        cy.get('#id-__chk__gym_RC_0').check()
        cy.get('#id-__chk__aerobics_RC_0').check()
        cy.get('#id-__chk__eat_RC_0').check()
        cy.get('#id-__chk__drink_RC_0').check()
        cy.get('.sldrtd').click({force:true})
        cy.get('#id-__chk__meds_RC_2').check()
        cy.get('#height-tr > .data > .x-form-text').type('182')
        cy.get('#weight-tr > .data > .x-form-text').type('182')
        cy.get('#comments').type('comment')
        cy.get('#demographics_complete-tr > .data > span > .x-form-text').select('Complete')
        cy.get('#__LOCKRECORD__').check()

        cy.get('#__SUBMITBUTTONS__-div > #submit-btn-saverecord').click()


        //Add record 2 UNLOCKED
        cy.visit_version({page: 'DataEntry/record_home.php', params: 'pid=1'})
			cy.get('.data > button').click()

			cy.get(':nth-child(1) > .nowrap > a > img').click()
			cy.get('#date_enrolled-tr > .data > .jqbuttonsm').click()

					//signature
			cy.get('#signature-linknew > .fileuploadlink').click({force:true})
			cy.get('.jSignature').click('center')
			cy.get('#signature-div-actions > button').click()

        cy.get('#first_name-tr > .data > .x-form-text').type('first ')
        cy.get('#last_name-tr > .data > .x-form-text').type('last ')
        cy.get('#address').type('city')
        cy.get('#telephone_1-tr > .data > .x-form-text').type('(415) 555 1234')
        cy.get('#email-tr > .data > .x-form-text').type('www@www.www')
        cy.get('#dob-tr > .data > .jqbuttonsm').click()
        cy.get('.labelrc > :nth-child(6) > input').check()
        cy.get('#id-__chk__gym_RC_0').check()
        cy.get('#id-__chk__aerobics_RC_0').check()
        cy.get('#id-__chk__eat_RC_0').check()
        cy.get('#id-__chk__drink_RC_0').check()
        cy.get('.sldrtd').click({force:true})
        cy.get('#id-__chk__meds_RC_2').check()
        cy.get('#height-tr > .data > .x-form-text').type('182')
        cy.get('#weight-tr > .data > .x-form-text').type('182')
        cy.get('#comments').type('comment')
        cy.get('#demographics_complete-tr > .data > span > .x-form-text').select('Complete')
        

        cy.get('#__SUBMITBUTTONS__-div > #submit-btn-saverecord').click()

    })

        
		// cy.visit_version({page: 'Locking/locking_customization', params: 'pid=1'})
		// cy.visit_version({page: 'Locking/esign_locking_management', params: 'pid=1'})
	})

	 describe('Basic Functionality', () => {

		before(() => {
            cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=1'})
            cy.get(':nth-child(10) > a').click()
		})

		it('Should display all records with status that is Locked or E-signed for all Data Collection instruments', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Locked?')
                expect($val).to.contain('E-signed?')
                }) 
	    })

	    it('Should NOT display Data Collection instruments that are NOT designated to be Locked', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.not.contain('Designated')
                
                }) 
	    })

	    it('Should display the Locked status of Data Collection instruments for all records', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Locked?')
                
                }) 
	    })

	    it('Should display the E-Signature status of Data Collection instruments for all records', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('E-signed?')
                
                }) 
	    })

	    it('Should have the ability to navigate directly to a selected a record', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('\'View Record\'')
                
                }) 
	    })
	 })   

    describe('Customization', () => {

		before(() => {
            cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=1'})
            cy.get('#app_panel > .x-panel-bwrap > .x-panel-body > :nth-child(1) > .menubox > :nth-child(9) > a').click()
            cy.get('.ui-dialog-buttonset > :nth-child(1)').click()
		})

    	it('Should have the ability to enable display of the Lock option for each Data Collection instrument', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Display the Lock option for this instrument?')
                    
                }) 
    	})

    	it('Should have the ability to disable display of the E-Signature option for each Data Colllection instrument', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Also display E-signature option on instrument?')
                    
                }) 
    	})

    	it('Should have the ability to edit Lock Record Custom Text', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Lock Record Custom Text')
                    
                }) 
                cy.get('#label-demographics').type('TEST CUSTOM TEXT')
                cy.get('#cell-demographics > input').click()
                
	    })

    	it('Should have the ability to remove Lock Record Custom Text', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Edit / Remove Custom Tex')
                    
                }) 
	    })
    })

    describe('Filtering Options', () => {

        before(() => {
            cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=1'})
            cy.get(':nth-child(10) > a').click()
             
		})

	    it('Should have the Filtering ability to display all rows', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('SHOW ALL ROWS')
                    
                }) 
	    })

	    it('Should have the Filtering ability to show timestamp / user', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Show timestamp / user')
                    
                }) 
	    })

	    it('Should have the Filtering ability to hide timestamp / user', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Hide timestamp / user')
                    
                }) 
	    })

	    it('Should have the Filtering ability to show Locked records', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Show locked')
                    
                })  
	    })

	    it('Should have the Filtering ability to hide Locked records', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Show not locked')
                    
                }) 
	    })

	    it('Should have the Filtering ability to show E-signed records', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Show e-signed')
                    
                }) 
	    })

	    it('Should have the Filtering ability to hide E-signed records', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Show not e-signed (excludes N/A)')
                    
                }) 
	    })

	    it('Should have the Filtering ability to show both Locked and E-signed records', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Show both locked and e-signed')
                    
                })
	    })

	    it('Should have the Filtering ability to show neither Locked nor E-signed records', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Show neither locked nor e-signed (excludes N/A)')
                    
                })
	    })

	    it('Should have the Filtering ability to show Locked but not E-signed records', () => {
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Show locked but not e-signed (excludes N/A)')
                    
                })
	    })
    })

    describe('Editability', () => {
      
        it('Should have the ability to support Edits in Production for administrators', () => {
            cy.get('#app_panel > .x-panel-bwrap > .x-panel-body > :nth-child(1) > .menubox > :nth-child(9) > a').click()
            cy.get('#labelProdChanges > p').should(($val) => {
                expect($val).to.contain('Only REDCap administrators may access this page while the project is in production status')
               
                })

                cy.get('.ui-dialog-buttonset > :nth-child(1)').should(($val) => {
                    expect($val).to.contain('I understand. Let me make changes.')
                   
                    })
	    })
       
        it('Should NOT have the ability to support Edits in Production for standard project users', () => {
            cy.set_user_type('standard')
            cy.visit_version({page: 'ProjectSetup/other_functionality.php', params: 'pid=1'})
            cy.get('#app_panel > .x-panel-bwrap > .x-panel-body > :nth-child(1) > .menubox > :nth-child(9) > a').click()
         
	    })


        it('Should have the ability to support Edits in Development for administrators', () => {
            cy.set_user_type('admin')
            cy.visit_version({page: 'ProjectSetup/other_functionality.php', params: 'pid=1'})
            cy.get(':nth-child(2) > :nth-child(1) > .jqbuttonmed').click()
            cy.get('#app_panel > .x-panel-bwrap > .x-panel-body > :nth-child(1) > .menubox > :nth-child(9) > a').click()
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Edit')
               
                })

	    })

	    it('Should have the ability to support Edits in Development for standard project users', () => {
            cy.set_user_type('standard')
            cy.visit_version({page: 'ProjectSetup/other_functionality.php', params: 'pid=1'})
            cy.get('#app_panel > .x-panel-bwrap > .x-panel-body > :nth-child(1) > .menubox > :nth-child(9) > a').click()
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Edit')
               
                })

	    })

	    
    })    

})