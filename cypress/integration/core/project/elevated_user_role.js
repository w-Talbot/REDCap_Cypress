describe('Add / Manage Users', () => {

	before(() => {
		cy.set_user_type('admin')
		cy.mysql_db('projects/pristine')
	})

	describe('Control Center', () => {

	
			before(() => {
				cy.visit_version({page: 'ControlCenter/superusers.php'})

			})

			
            it('Should allow users to be defined as system administrators (highest level of access to the REDCap application)', () => {
              
                cy.get('#control_center_window').should(($table) => {
                     expect($table).to.contain('Designate an Administrator')
                                            
                 })

			})
            it('Should allow users to be defined as Account Managers ', () => {
                
                cy.get('#control_center_window').should(($table) => {
                    expect($table).to.contain('Designate an Account Manager')
                                           
                })

            //if necessary log out and back in to check:
            //     cy.get('select#new_account_manager').contains('test_user (Test User)').parent().select('test_user (Test User)')
            //     cy.get('#add_account_manager_btn').click()
            //     cy.get('.ml-auto > :nth-child(3) > .nav-link').click({force:true})
            //     cy.get('#username').type('test_user')
            //     cy.get('#password').type('Testing123')
            //     cy.get('#login_btn').click()
			})



	})
})
