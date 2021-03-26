describe('Reporting', () => {

	before(() => {
		
			cy.mysql_db("projects/pristine")
			cy.set_user_type('admin')
	
	
			//Add Record
			cy.visit_version({page: 'DataEntry/record_home.php', params: 'pid=1'})
			cy.get('.data > button').click()
	
			cy.get(':nth-child(1) > .nowrap > a > img').click()
			cy.get('#date_enrolled-tr > .data > .jqbuttonsm').click()
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
			// cy.get('#__LOCKRECORD__').check()   //lock record(optional)
	
			cy.get('#__SUBMITBUTTONS__-div > #submit-btn-saverecord').click()
			
			cy.visit_version({page: 'DataExport/index.php', params: 'pid=1'})
		
	})

    describe('Basic Functionality', () => {

	    it('Should have the ability to assign a name to a report', () => {
			cy.get(':nth-child(3) > div > .jqbuttonmed').click()
			cy.get(':nth-child(1) > .nowrap').should(($body) => {
				expect($body).to.contain('Name of Report')
			})


			
			cy.get('[colspan="3"] > .x-form-text').type('TEST Report')
			cy.get('#description').type('test description')
			cy.get('.limiter_row > :nth-child(2) > .field-auto-suggest-div > .jqbuttonsm').click()
			cy.get('.limiter-dropdown-div > .x-form-text').select('age')
			cy.wait(1000)
		
			 

	    })
		it('Limiters include: “equal to”, “not equal to”, “greater than or equal to”, “less than or equal to”, “less than” and greater than” and are dependent on field type', () => {
			
			cy.get(':nth-child(17) > .labelrc.nowrap > .limiter-operator').select('<')
			cy.get(':nth-child(17) > .labelrc.nowrap > .limiter-operator').select('not =')
			cy.get(':nth-child(17) > .labelrc.nowrap > .limiter-operator').select('=')
			cy.get(':nth-child(17) > .labelrc.nowrap > .limiter-operator').select('>')
			cy.get(':nth-child(17) > .labelrc.nowrap > .limiter-operator').select('> =')

		
	    })
		it('The ability to order results in either ascending or descending order', () => {
			cy.get(':nth-child(31) > [colspan="2"] > .x-form-text').select('Ascending order')
			cy.get(':nth-child(31) > [colspan="2"] > .x-form-text').select('Descending order')
	    })


	    it('Should have the ability to copy a report', () => {
			// //finalize the report
			cy.get('button').contains('Save Report').click()
			cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
			cy.get('ul > :nth-child(2) > a').click()
			cy.get('#center').should(($body) => {
				expect($body).to.contain('Copy')
			})
	    })

	    it('Should have the ability to edit a report', () => {
			cy.get('#center').should(($body) => {
				expect($body).to.contain('Edit')
			})
	    })

	    it('Should have the ability to view a report', () => {
			cy.get('#center').should(($body) => {
				expect($body).to.contain('View Report')
			})
	    })

	    it('Should have the ability to delete a report', () => {
			cy.get('#center').should(($body) => {
				expect($body).to.contain('Delete')
			})
	    })
	})

 

    describe('Data Export Formats', () => {

    	it('Should have the ability to export a custom report to CSV format', () => {
			cy.get('[onclick="showExportFormatDialog(\'1\');"]').click()
			
			cy.get('.ui-dialog').should(($body) => {
				expect($body).to.contain('CSV')
			})
    	})

    	it('Should have the ability to export a custom report to SPSS format', () => {
			cy.get('.ui-dialog').should(($body) => {
				expect($body).to.contain('SPSS')
			})
    	})

    	it('Should have the ability to export a custom report to SAS format', () => {
			cy.get('.ui-dialog').should(($body) => {
				expect($body).to.contain('SAS')
			})
    	})

    	it('Should have the ability to export a custom report to R format', () => {
			cy.get('.ui-dialog').should(($body) => {
				expect($body).to.contain('R Statistical')
			})
    	})

		it('Should have the ability to export a custom report to STATA format', () => {
			cy.get('.ui-dialog').should(($body) => {
				expect($body).to.contain('Stata')
			})
    	})

		it('Should have the ability to export a custom report to CDISC ODM (XML) format', () => {
			cy.get('.ui-dialog').should(($body) => {
				expect($body).to.contain('CDISC')
			})
			cy.get('.ui-dialog-buttonset > :nth-child(1)').click()
    	})
    })

})