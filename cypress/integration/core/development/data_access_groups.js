describe('Data Access Groups (DAGs)', () => {

	before(() => {
		cy.set_user_type('standard')
		cy.mysql_db('projects/pristine')
	})

	describe('User Interface', () => {
		
		before(() => {
			cy.set_user_type('admin')
			cy.visit_version({page: 'DataAccessGroups/index.php', params: 'pid=1'})
		})

		it('Should have the ability to create Data Access Groups', () => {
			cy.get('input#new_group').type('Test Group')
			cy.get('button#new_group_button').click()
			cy.get('div#dags_table').should(($div) => {
				expect($div).to.contain('Test Group')
			})
	    })

	    it('Should have the ability to delete Data Access Groups', () => {
	        cy.get('tr').contains('Test Group').parent().parent().parent().within(($tr) => {
				cy.get('img').click()
			})
			cy.get('button').contains('Delete').click()
			cy.get('div#dags_table').should(($div) => {
				expect($div).not.to.contain('Test Group')
			})
	    })

	    it('Should have the ability to provide a unique Data Access Group name in the data export CSV or label', () => {
			cy.visit_version({page: 'DataAccessGroups/index.php', params: 'pid=13'})
			cy.get('input#new_group').type('t1')
			cy.get('button#new_group_button').click()
			cy.wait(1000)
			cy.visit_version({page: 'DataExport/index.php', params: 'pid=13'})
			cy.get('button').contains('Export Data').click()
			cy.get('form#exportFormatForm').should(($form) => {
				expect($form).to.contain('Export Data Access Group name for each record (if record is in a group)?')
			})
		})
	})

	    describe('Data Restriction Abilities', () => {
			before(() => {
				cy.add_users_to_project(['test_user', 'test_user2'], '13')
				cy.add_users_to_data_access_groups(['Group 1', 'Group 2'], ['test_user', 'test_user2'], '13')
			})

	
		    it('Should have the ability to restrict a user to data they entered / data of the same Data Access Group', () => {
				cy.set_user_type('standard')  
				cy.visit_version({page: 'index.php', params: 'pid=13'})
				cy.get('a').contains("Add / Edit Records").click()
				
				cy.get('button').contains('Add new record').click().then(() => {

					cy.get('button#submit-btn-saverecord').first().click()

					cy.set_user_type('standard2')
					cy.visit_version({page: 'index.php', params: 'pid=13'})
					cy.get('a').contains("Add / Edit Records").click()
					cy.get('button').contains('Add new record').click()
					cy.get('button#submit-btn-saverecord').click()
					cy.get('a').contains('Record Status Dashboard').click()
					cy.get('table#record_status_table').should(($table) => {
						expect($table).not.to.contain('3-1')
						expect($table).to.contain('4-1')
					})
					cy.set_user_type('standard') 
					cy.visit_version({page: 'index.php', params: 'pid=13'})
					cy.get('a').contains('Record Status Dashboard').click()
					cy.get('table#record_status_table').should(($table) => {
						expect($table).not.to.contain('4-1')
						expect($table).to.contain('3-1')
					})
					cy.set_user_type('admin')
					cy.visit_version({page: 'index.php', params: 'pid=13'})
					cy.get('a').contains('Record Status Dashboard').click()
					cy.get('table#record_status_table').should(($table) => {
						expect($table).to.contain('4-1')
						expect($table).to.contain('3-1')
					})

				})
		    })

	    })

		describe('Assign Records', () => {

			it('The system shall provide the ability to assign records to a data access group from the Record Home page or from the form dropdown list when creating a new record', () => {
				cy.get('.odd > [style="font-size:12px;"] > a').click()
				cy.get('[style="vertical-align:middle;color:#000066;margin-right:6px;margin-left:3px;"]').click()
				cy.get('#ui-id-5 > span').click();
				cy.wait(1000)
				cy.get('select').contains('Group 2').parent().select('Group 2')
				cy.get('.ui-dialog-buttonset > :nth-child(2)').click()

				cy.get('#record_display_name').should(($b) => {
					expect($b).to.contain('Group 2')
					
				})

			})

				
		})

	}) 