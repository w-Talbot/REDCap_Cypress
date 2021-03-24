describe('System Security Settings', () => {

	before(()=> {
		//Reset the projects back to what they should be
		cy.mysql_db('projects/pristine')

		cy.set_user_type('admin')
		cy.visit('/')
		cy.visit_version({page: 'ControlCenter/general_settings.php'})
	})


	describe('Security & Authentication Settings', () => {
		it('Should have Table-based Authentication Settings', () => {
			cy.visit_version({page: 'ControlCenter/security_settings.php'})
			cy.get('#control_center_window').should(($a) => {
				expect($a).to.contain('text','Table-based Authentication Settings')
			})
		})
	
	
			it('Should have Auto logout time', () => {
				cy.visit_version({page: 'ControlCenter/security_settings.php'})
				cy.get('#control_center_window').should(($a) => {
					expect($a).to.contain('text','Auto logout time')
				})
			})
				it('Should have Number of failed login attempts before user is locked out', () => {
					cy.visit_version({page: 'ControlCenter/security_settings.php'})
					cy.get('#control_center_window').should(($a) => {
						expect($a).to.contain('text','Number of failed login attempts before user is locked out')
					})
				})
					it('Should have amount of time user will be locked out after having failed login attempts', () => {
						cy.visit_version({page: 'ControlCenter/security_settings.php'})
						cy.get('#control_center_window').should(($a) => {
							expect($a).to.contain('text','Amount of time user will be locked out after having failed login attempts')
						})
					})
						it('Should have Force users to change their password after a specified number of days', () => {
							cy.visit_version({page: 'ControlCenter/security_settings.php'})
							cy.get('#control_center_window').should(($a) => {
								expect($a).to.contain('text','Force users to change their password after a specified number of days')
							})
						})
						it('Should automatically suspended after a set period of inactivity', () => {
							cy.visit_version({page: 'ControlCenter/security_settings.php'})
							cy.get(':nth-child(16) > :nth-child(5) > a').click()
							cy.get('#control_center_window').should(($a) => {
								expect($a).to.contain('text','Auto-suspend users after period of inactivity')
							})
						})
	
	
					})

	it('Should initially display system status as "SYSTEM ONLINE"', () => {
		cy.get('select').contains('SYSTEM ONLINE').should(($a) => {
			expect($a).to.contain('SYSTEM ONLINE')
		})
	})

	it('Should change system status to "SYSTEM OFFLINE"', () => {
		cy.get('select').contains('SYSTEM OFFLINE').parent().select('SYSTEM OFFLINE')
		cy.get('input').contains('Save Changes').click({force: true})
		cy.get('div').should(($div) => {
			expect($div).to.contain('Your system configuration values have now been changed!')
		})
		cy.get('select').contains('SYSTEM OFFLINE').should(($a) => {
			expect($a).to.contain('SYSTEM OFFLINE')
		})
	})

	it('Should change system status back to "SYSTEM ONLINE"', () => {
		cy.visit_version({page: 'ControlCenter/general_settings.php'})
		cy.get('select').contains('SYSTEM ONLINE').parent().select('SYSTEM ONLINE')
		cy.get('input').contains('Save Changes').click({force: true})
		cy.get('div').should(($div) => {
			expect($div).to.contain('Your system configuration values have now been changed!')
		})
	})

    describe('SYSTEM OFFLINE', () => {

		before(() => {
			cy.set_user_type('admin')
			cy.visit_version({page: 'ControlCenter/general_settings.php'})
			cy.get('select').contains('SYSTEM OFFLINE').parent().select('SYSTEM OFFLINE')
			cy.get('input').contains('Save Changes').click({force: true})
		})

		it('Should display system offline message when user logs in', () => {
			cy.set_user_type('standard')
			cy.visit_base({url: 'index.php'})
			cy.get('div').should(($div) => {
				expect($div).to.contain('REDCap is currently offline. Please return at another time. We apologize for any inconvenience.')
			})
		})

		it('Should display system offline message when admin logs in', () => {
			cy.set_user_type('admin')
			cy.visit_base({url: 'index.php'})
			cy.get('div').should(($div) => {
				expect($div).to.contain('REDCap and all its projects are currently OFFLINE and are not accessible to normal users.')
			})
		})

		it('Should update system offline message when a new message is inputted', () => {
			cy.set_user_type('admin')
			cy.visit_version({page: 'ControlCenter/general_settings.php'})
			cy.get('textarea').first().type('System is offline')
			cy.get('input').contains('Save Changes').click({force: true})
			cy.set_user_type('standard')
			cy.visit_base({url: 'index.php'})
			cy.get('div').should(($div) => {
				expect($div).to.contain('System is offline')
			})
		})
	})
})
describe('Project Security Settings', () => {

	before(() => {
		cy.set_user_type('admin')
		cy.visit_version({page: 'ControlCenter/general_settings.php'})
		cy.get('select').contains('SYSTEM ONLINE').parent().select('SYSTEM ONLINE')
    	cy.get('input').contains('Save Changes').click({force: true})
		cy.visit_version({page: 'ControlCenter/edit_project.php', params: "project=13"})
	})

	it('Should save changes after project status is changed from online to offline', () => {
		cy.get('select').contains('OFFLINE').parent().select('OFFLINE')
		cy.get('input').contains('Save Changes').click({force: true})
		cy.get('div').should(($div) => {
			expect($div).to.contain('Your changes have been saved!')
		})
	})

	it('Should save changes after project status is changed from offline to online', () => {
		cy.visit_version({page: 'ControlCenter/edit_project.php', params: "project=13"})
		cy.get('select').contains('ONLINE').parent().select('ONLINE')
		cy.get('input').contains('Save Changes').click({force: true})
		cy.get('div').should(($div) => {
			expect($div).to.contain('Your changes have been saved!')
		})
	})

	describe('PROJECT OFFLINE', () => {

		before (() => {
			cy.set_user_type('admin')
			cy.visit_version({page: 'ControlCenter/edit_project.php', params: "project=13"})
			cy.get('select').contains('OFFLINE').parent().select('OFFLINE')
			cy.get('input').contains('Save Changes').click({force: true})
		})

		it('Should display project offline message next to project title when user logs in', () => {
			cy.set_user_type('standard')
			cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=13"})
			cy.get('div').should(($div) => {
				expect($div).to.contain('currently offline')
			})
		})

		it('Should display offline message when admin logs in', () => {
			cy.set_user_type('admin')
			cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=13"})
			cy.get('div').should(($div) => {
				expect($div).to.contain('This project is currently OFFLINE and is not accessible to normal users.')
			})
		})

		//This will return the test project to its normal ONLINE state, too
		it('Should allow me to return the project to ONLINE', () => {
			cy.visit_version({page: 'ControlCenter/edit_project.php', params: "project=13"})
			cy.get('select').contains('OFFLINE').parent().select('ONLINE')
			cy.get('input').contains('Save Changes').click({force: true})

			cy.get('div').should(($div) => {
				expect($div).to.contain('Your changes have been saved!')
			})





		})
	})
})