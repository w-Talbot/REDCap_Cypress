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

			})



	})
})
