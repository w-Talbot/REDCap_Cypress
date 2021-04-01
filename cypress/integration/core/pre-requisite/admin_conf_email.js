describe('Notification', () => {

	before(() => {
		//Reset the projects back to what they should be
		cy.mysql_db('projects/pristine')
	})

	describe('Basic Functionality', () => {

		before(() => {
			//Set standard user
			cy.set_user_type('standard')
		})


		describe('Change Management', () => {

			let i = 0

			beforeEach(() => {
				//Submit some Changes for Approval
				cy.set_user_type('standard')

				//Seed the db for the project before each test
				cy.mysql_db('projects/project_2')

				//Visit Longitudinal Database 
				cy.visit_version({page: 'Design/online_designer.php', params: "pid=2"})

				//Search for the Enter Draft Mode button
				let draft = cy.get('input[value="Enter Draft Mode"]').should(($draft_mode) => {
					if($draft_mode.length > 0){
						$draft_mode.first().click()
					} 

					return $draft_mode;
				})

				if(draft.length > 0 ){
					cy.get('div#actionMsg').should(($alert) => {
						expect($alert).to.contain('The project is now in Draft Mode.')
					})					
				}

				//Visit the demographics instrument
				cy.visit_version({page: 'Design/online_designer.php', params: "pid=2&page=demographics"})

				//Select field to edit some choices for
				cy.edit_field_by_label('Ethnicity')

				//Get the field choices and set the new values / labels
				let field_choices = cy.select_field_choices()
				field_choices.clear()
				field_choices.type('0, NEW LABEL ' + i + '\n1, NEW LABEL 1' + i + '\n2, NEW LABEL 2' + i)

				//Save this particular field we are editing
				cy.save_field()


				cy.get('input[value="Submit Changes for Review"]').click()
				
				//Submit for Appproval
				cy.get('button').contains('Submit').click()
				
				//Visit modification panel as admin
				cy.set_user_type('admin')
				cy.visit_version({page: 'Design/project_modifications.php', params: "pid=2"})

				i++
				
			})

			

			describe('Notifications', () => {

				it('Should allow an Administrator to send a confirmation email (templated, but editable) to the requestor', () => {
					//Click Remove All Changes button and verify notice
					cy.get('button').contains('Compose confirmation email').click()

					//Check for the telltale signs of an email template
					cy.get('div.ui-dialog').should(($div) => {
						expect($div).to.contain('Compose confirmation email')
						expect($div).to.contain('To:')
						expect($div).to.contain('From:')
						expect($div).to.contain('Subject:')
						expect($div).to.contain('Send Email')						
					})

                    //Check to see that REDCap generates an email 
					cy.get('body').should(($body) => {
						expect($body).to.contain('Below is a pre-filled confirmation email')
					})
					
				})	
			})
		})

		

	})

		
	})	
