describe('Add / Manage Users', () => {

	before(() => {
		cy.set_user_type('admin')
		cy.mysql_db('projects/pristine')
	})

	describe('Control Center', () => {

		describe('Users', () => {

			before(() => {
				cy.visit_version({page: 'ControlCenter/create_user.php'})
                
                
			})

			it('Should have the ability to create an individual user', () => {
				cy.get('input#username').type('TestUser1')
				cy.get('input#user_firstname').type('Test')
				cy.get('input#user_lastname').type('User')
				cy.get('input#user_email').type('user@email.com')
				cy.get('input[type="submit"]').click()
				cy.get('div').should(($div) => {
					expect($div).to.contain('User has been successfully saved')
				})

			})

			it('Should have the ability to suspend an individual user', () => {
				cy.visit_version({page: 'ControlCenter/view_users.php'})
				cy.get('input#user_search').type('testuser1')
				cy.get('button#user_search_btn').click()
				cy.get('input[value="Suspend user account"]').click()

				//Check for the telltale signs of the appropriate pop up window
				cy.get('div.ui-dialog').should(($div) => {
					expect($div).to.contain('Success! The user has now been suspended')					
				})

				cy.get('button').contains('Close').click()
				cy.get('a').contains('View User List By Criteria').click()
				cy.get('select#activity-level').select('Suspended users')
				cy.get('button').contains('Display User List').click()
				cy.get('table#sponsorUsers-table').should(($t) => {
					expect($t).to.contain('testuser1')
				})
			})

			it('Should have the ability to unsuspend an individual user', () => {
				cy.visit_version({page: 'ControlCenter/view_users.php'})
				cy.get('input#user_search').type('testuser1')
				cy.get('button#user_search_btn').click()

				//Check to make sure the page has refreshed with user info
				cy.get('table').should(($table) => {
					expect($table).to.contain('User information for')
				})

				cy.get('a').contains('unsuspend user').click()

				//Check for the telltale signs of the appropriate pop up window
				cy.get('div.ui-dialog').should(($div) => {
					expect($div).to.contain('Success! The user has now been unsuspended')					
				})

				cy.get('button').contains('Close').click()
				cy.get('a').contains('View User List By Criteria').click()
				cy.get('select#activity-level').select('Non-suspended users')
				cy.get('button').contains('Display User List').click()
				cy.get('table#sponsorUsers-table').should(($t) => {
					expect($t).to.contain('testuser1')
				})
			})

			

			it('Should have the ability to view all users in a tabular form', () => {
				cy.visit_version({page: 'ControlCenter/view_users.php'})
				cy.get('a').contains('View User List By Criteria').click()
				cy.get('button').contains('Display User List').click()
			})

			it('Should have the ability to search for an individual user', () => {
				cy.visit_version({page: 'ControlCenter/view_users.php'})
				cy.get('input#user_search').type('user-search')
			})

			it('Should have the ability to delete an individual user', () => {
				cy.visit_version({page: 'ControlCenter/create_user.php'})
				cy.get('input#username').type('testuser2')
				cy.get('input#user_firstname').type('test')
				cy.get('input#user_lastname').type('user')
				cy.get('input#user_email').type('user2@email.com')
				cy.get('input[type="submit"]').click()
				
				cy.visit_version({page: 'ControlCenter/view_users.php'})
				cy.get('input#user_search').type('testuser2')
				cy.get('button#user_search_btn').click()

				//Check to make sure the page has refreshed with user info
				cy.get('table').should(($table) => {
					expect($table).to.contain('User information for')
				})

				cy.get('span').contains('Delete user from system').click()

				//Check for the telltale signs of the appropriate pop up window
				cy.get('div.ui-dialog').should(($div) => {
					expect($div).to.contain('has now been removed and deleted')					
				})

				cy.get('button').contains('Close').click()
				cy.get('a').contains('View User List By Criteria').click()
				cy.get('button').contains('Display User List').click()
				cy.get('table#sponsorUsers-table').should(($t) => {
					expect($t).not.to.contain('testuser2')
				})
			})
		}) 

		// describe('Security & Authentication', () => { 

		// 	it('Should have the ability to lock out users after a certain number of failed login attempts', () => {
		// 		cy.visit_version({page: 'ControlCenter/security_settings.php'})
		// 		cy.get('form#form').should(($f) => {
		// 			expect($f).to.contain('Number of failed login attempts before user is locked out')
		// 		})
		// 	})

		// 	it('Should have the ability to specify the amount of time a user will be locked out after failed login attempts', () => {
		// 		cy.visit_version({page: 'ControlCenter/security_settings.php'})
		// 		cy.get('tr#logout_fail_window-tr').within(($tr) => {
		// 			cy.get('input').type('25')
		// 		})
		// 		cy.get('input[value="Save Changes"]').click()
		// 	})
		// })

        describe('Assign User Rights', () => {

            before(() => {
				// cy.visit_version({page: 'UserRights/index.php'})
                cy.visit_version({page: 'UserRights/index.php', params: 'pid=1'})

                cy.get('#new_username').type('test_user')
                cy.get('#addUserBtn').click()
			})

     
            it('The system shall allow data entry form user access to be ', () => {
				cy.get(':nth-child(2) > [align="left"]').should(($temp) => {
                    expect($temp).to.contain('No Access')
                    expect($temp).to.contain('Read Only')
                    expect($temp).to.contain('View & Edit')
                })

			})

            it('The system shall allow Data Exports to be of the type', () => {
                cy.get('[style="width:325px;background:#F2F2F2;font-size:12px;padding:5px;border:1px solid #808080;position:relative;"]').should(($temp) => {
                    expect($temp).to.contain('No Access')
                    expect($temp).to.contain('De-Identified')
                    expect($temp).to.contain('Remove all tagged Identifier fields')
                    expect($temp).to.contain('Full Data Set')
                    
                })
                cy.get('[style="padding-top:2px;"] > :nth-child(4) > input').check()
			})

            it('The system shall allow the following options for Data Quality rules', () => {
                cy.get('[style="width:325px;background:#F2F2F2;font-size:12px;padding:5px;border:1px solid #808080;position:relative;"]').should(($temp) => {
                    expect($temp).to.contain('Create & edit rules')
                    expect($temp).to.contain('Execute rules')
                })
                cy.get('[name="data_quality_design"]').check()
                cy.get('[name="data_quality_execute"]').check()

			})

            it('The system shall allow the following options for Locking/unlocking records', () => {
                cy.get('[style="width:325px;background:#F2F2F2;font-size:12px;padding:5px;border:1px solid #808080;position:relative;"]').should(($temp) => {
                    expect($temp).to.contain('Disabled')
                    expect($temp).to.contain('Locking / Unlocking')
                    expect($temp).to.contain('Locking / Unlocking with E-signature authority')
                })
                cy.get(':nth-child(35) > [style="padding-top:2px;"] > :nth-child(2) > input').check()
			})

            it('The system shall allow the ability to add, edit or delete the following core user privileges (when all modules are enabled) for the following', () => {
                cy.get('#expiration').type('01/01/2099')
                cy.get(':nth-child(3) > [style="padding-top:2px;"] > input').check()
                cy.get(':nth-child(4) > [style="padding-top:2px;"] > input').check()
                cy.get(':nth-child(5) > [style="padding-top:2px;"] > input').check()

                cy.get(':nth-child(14) > [style="padding-top:2px;"] > input').check()
                cy.get(':nth-child(15) > [style="padding-top:2px;"] > input').check()

                cy.get(':nth-child(16) > [style="padding-top:2px;"] > input').check()
                cy.get('[name="api_export"]').check()
                cy.get('[name="api_import"]').check()
                cy.get(':nth-child(27) > [style="padding-top:2px;"] > input').check()
                cy.get('[aria-describedby="mobileAppEnableConfirm"] > .ui-dialog-buttonpane > .ui-dialog-buttonset > :nth-child(2)').click()

                cy.get('[style="padding-top:12px;"] > div > input').check()
                cy.get(':nth-child(31) > [style="padding-top:2px;"] > input').check()
                cy.get(':nth-child(32) > :nth-child(2) > input').check()

                cy.get(':nth-child(34) > [style="padding-top:2px;"] > input').check()
                cy.get(':nth-child(36) > [style="padding-top:2px;"] > div > input').check()
                cy.get('[style="font-weight: bold; color: rgb(34, 34, 34);"]').click()
                cy.get('.erow > :nth-child(2) > [style="width:260px;"] > .wrap > .userNameLinkDiv > .userLinkInTable').click()

                cy.get('#tooltipBtnSetCustom > .jqbuttonmed').should(($temp) => {
                    expect($temp).to.contain('Edit user privileges')
                })
                cy.get('#tooltipBtnSetCustom > .jqbuttonmed').click()

                cy.get('.ui-dialog-buttonpane').should(($temp) => {
                    expect($temp).to.contain('Remove user')
                })
                cy.get('.ui-dialog-buttonset > :nth-child(2)').click()

			})
			
		})

        describe('User Roles', () => {

			it('Should have the ability to Create a User Role', () => {
				cy.get('#new_rolename').type('New User role')
                
                cy.wait(1000)
                cy.get('#createRoleBtn').click()

                cy.get('.ui-dialog').should(($temp) => {
                    expect($temp).to.contain('Creating new role')
                })

                cy.get(':nth-child(3) > .nobr > [onclick="$(this).parent().find(\'input[type=checkbox]\').prop(\'checked\',false);"]').check()
                cy.get(':nth-child(4) > .nobr > [onclick="$(this).parent().find(\'input[type=checkbox]\').prop(\'checked\',false);"]').check()
                cy.get(':nth-child(5) > .nobr > [onclick="$(this).parent().find(\'input[type=checkbox]\').prop(\'checked\',false);"]').check()
                cy.get(':nth-child(6) > .nobr > [onclick="$(this).parent().find(\'input[type=checkbox]\').prop(\'checked\',false);"]').check()
                cy.get(':nth-child(7) > .nobr > [onclick="$(this).parent().find(\'input[type=checkbox]\').prop(\'checked\',false);"]').check()
                cy.get(':nth-child(8) > .nobr > [onclick="$(this).parent().find(\'input[type=checkbox]\').prop(\'checked\',false);"]').check()

                cy.get('[style="font-weight: bold; color: rgb(34, 34, 34);"]').click()
			})

			it('Should have the ability to Copy a User Role', () => {
				cy.get('#rightsTableUserLinkId_1').click()

                cy.get('.ui-dialog-buttonpane').should(($temp) => {
                    expect($temp).to.contain('Copy role')
                })
                cy.get('.ui-dialog-buttonset > :nth-child(3)').click()
			})

			it('Should have the ability to Add a User to a User Role', () => {
				cy.get('#new_username_assign').type('test_user2')
                cy.get('#assignUserBtn').should(($temp) => {
                    expect($temp).to.contain('Assign to role')
                })
                cy.get('#assignUserBtn').click()
                cy.get('#assignUserRoleId_1').click()


			})

			it('Should have the ability to Remove a User from a User Role', () => {
				cy.get('[style="color:#800000;"] > .userNameLinkDiv > .userLinkInTable').click()
                cy.get('#tooltipBtnRemoveRole > .jqbuttonmed').should(($temp) => {
                    expect($temp).to.contain('Remove from role')
                })
                cy.get('#tooltipBtnRemoveRole > .jqbuttonmed').click()

			})
		})

   

		
	})
})

describe('Add / Manage Users', () => {

	before(() => {
		//Reset the projects back to what they should be
		cy.mysql_db('projects/pristine')

	    cy.set_user_type('admin')
		window.modified_project_title = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789Validation'
	})

        describe('Project Access', () => {

            it('Users who are Administrators can access any project in the system', () => {
                cy.visit_version({page: 'index.php'})
                cy.get(':nth-child(1) > :nth-child(2) > .nav-link').click()
                cy.get(':nth-child(1) > :nth-child(3) > .nav-link').click()
                cy.get('#app_title').type('access only test')
                cy.get('#purpose').select('Practice / Just for fun')
                cy.get('.btn-primaryrc').click()
                cy.get(':nth-child(3) > [href="/index.php?action=myprojects"]').click()
                cy.get('#pagecontent').should(($temp) => {
                    expect($temp).to.contain('access only test')
                })


                

            })
           
           
            it('Users who are not Administrators need to be assigned to a project in order to access it.', () => {
                cy.get('.ml-auto > :nth-child(3) > .nav-link').click()
                cy.get('#username').type('test_user2')
                cy.get('#password').type('Testing123')
                cy.get('#login_btn').click()

                cy.get('#pagecontent').should(($temp) => {
                    expect($temp).to.not.contain('access only test')
                })

                cy.get('.ml-auto > :nth-child(3) > .nav-link').click()
                cy.get('#username').type('test_admin')
                cy.get('#password').type('Testing123')
                cy.get('#login_btn').click()

                cy.visit_version({page: 'UserRights/index.php', params: 'pid=14'})

                cy.get('#new_username').type('test_user2')
                cy.get('#addUserBtn').click()
                cy.get('[style="font-weight: bold; color: rgb(34, 34, 34);"]').click()


                cy.get('[style="font-size:11px;color:#888;margin:3px -10px 7px -2px;"] > :nth-child(3) > a').click()


                cy.get('#username').type('test_user2')
                cy.get('#password').type('Testing123')
                cy.get('#login_btn').click()
                cy.get('#menu-div > .menubox > :nth-child(3) > a').click()
                cy.get('#pagecontent').should(($temp) => {
                    expect($temp).to.contain('access only test')
                })
            })

    
        })

      






    })
