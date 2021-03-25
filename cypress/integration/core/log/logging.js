describe('Logging', () => {

	before(() => {
		cy.mysql_db("projects/pristine")
		// cy.set_user_type('standard')
		cy.set_user_type('admin')
		// cy.visit_version({page: 'Logging/index.php'})
		// cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})

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
		


			//Add Record
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

			//Edit Record
			cy.visit_version({page: 'DataEntry/record_home.php', params: 'pid=1'})
			cy.get('#record').select('1')


			cy.get(':nth-child(1) > td.nowrap > a > img').click()
			cy.get('#unlockbtn > input').click()
			cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
			cy.get('.ui-dialog-buttonset > .ui-button').click()
			cy.get('#first_name-tr > .data > .x-form-text').type('{selectall}').type('NEWname')
			cy.get('#last_name-tr > .data > .x-form-text').type('{selectall}').type('NEWlast')
			cy.get('#formSaveTip > #submit-btn-saverecord').click()
			

			//Delete Record
			cy.visit_version({page: 'DataEntry/record_home.php', params: 'pid=1'})
			cy.get('#record').select('1')

			
			cy.get('#recordActionDropdownTrigger').click()
			cy.get('#ui-id-7 > span').click() 
			cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
			cy.wait(500)
			cy.get('.ui-dialog').should(($body) => {
				expect($body).to.contain('Study ID "1" was successfully deleted.')
			})
			cy.get('.ui-dialog-buttonset > .ui-button').click()

			//Data Export
			cy.visit_version({page: 'DataExport/index.php', params: 'pid=1'})
			cy.get('body').should(($body) => {
				expect($body).to.contain('My Reports & Exports')
			})
			cy.get('button').contains('Export Data').click()
			cy.get('#export_choices_table > tbody > :nth-child(2) > td').click()
			cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()
			
			//User rights
			cy.visit_version({page: 'UserRights/index.php', params: 'pid=1'})
			cy.get('#new_username').type('test_user')
			cy.wait(1000)
			cy.get('#addUserBtn').click()
			cy.wait(1000)

						//user right selections
			cy.get(':nth-child(3) > [style="padding-top:2px;"] > input').check()
			cy.get(':nth-child(4) > [style="padding-top:2px;"] > input').check()
			cy.get(':nth-child(5) > [style="padding-top:2px;"] > input').check()
			cy.get(':nth-child(14) > [style="padding-top:2px;"] > input').check()
			cy.get('[style="font-weight: bold; color: rgb(34, 34, 34);"]').click()
			cy.wait(1000)

			//User Role
			cy.get('#new_rolename').type('{selectall}').type('NEW ROLE')
			cy.wait(1000)
			cy.get('#createRoleBtn').click()
			cy.get(':nth-child(2) > [style="padding-top:2px;"] > input').check()
			cy.get(':nth-child(3) > [style="padding-top:2px;"] > input').check()
			cy.get(':nth-child(4) > [style="padding-top:2px;"] > input').check()
			cy.get('[style="font-weight: bold; color: rgb(34, 34, 34);"]').click()
			cy.wait(1000)

				//Delete User Role part 1
				cy.get('#new_rolename').type('{selectall}').type('Deleted role')
				cy.wait(1000)
				cy.get('#createRoleBtn').click()
				cy.wait(1000)
				cy.get(':nth-child(2) > [style="padding-top:2px;"] > input').check()
				cy.get(':nth-child(3) > [style="padding-top:2px;"] > input').check()
				cy.get(':nth-child(4) > [style="padding-top:2px;"] > input').check()
				cy.get('[style="font-weight: bold; color: rgb(34, 34, 34);"]').click()
				cy.wait(1000)

				

		//Updated User Role
		cy.get('#rightsTableUserLinkId_1').focus().click({force:true})
		cy.wait(1000)
		cy.get('td > .x-form-text').type('{selectall}').type('Updated TEST Role')
		cy.get(':nth-child(3) > [style="padding-top:2px;"] > input').uncheck()
		cy.get(':nth-child(4) > [style="padding-top:2px;"] > input').uncheck()
		cy.get(':nth-child(3) > .nobr > [onclick="$(this).parent().find(\'input[type=checkbox]\').prop(\'checked\',false);"]').check()
		cy.get('[style="font-weight: bold; color: rgb(34, 34, 34);"]').click()
		cy.wait(1000)

					//Delete User Role part 2 ....needs to be fixed
					cy.visit_version({page: 'UserRights/index.php', params: 'pid=1'})
					cy.get('#rightsTableUserLinkId_2').click()
					
					cy.get('[style="color: rgb(192, 0, 0); font-size: 11px; margin: 9px 0px 0px 5px;"]').click()

					cy.get('#editUserPopup').should(($val) => {
						expect($val).to.contain('Delete role')
							
						}) 
				
					
					// // cy.contains('Delete role').click({force:true})
					// // cy.get('button').contains('Delete role').click({force:true})
					


		cy.visit_version({page: 'Logging/index.php', params: 'pid=1'})
		})
	})


	describe('Log of User Actions', () => {

		it('Should keep a record of the time / date of user actions', () => {
			cy.get('#center').should(($val) => {
				expect($val).to.contain('Time / Date')
					
				}) 
		})

		it('Should keep a record of when a Data Export is performed', () => {
			cy.get('#center').should(($val) => {
				expect($val).to.contain('Data Export')
					
				}) 
		})

		it('Should keep a record of E-signature events', () => {
			cy.get('#center').should(($val) => {
				expect($val).to.contain('signature')
					
				}) 
		})

		it('Should keep a record of changes to project instruments (Manage / Design)', () => {
			cy.get('#center').should(($val) => {
				expect($val).to.contain('Manage/Design')
					
				}) 
		})

	 	describe('Data Recorded', () => {

	    	it('Should keep a record of the username who performed the action', () => {
				cy.get('#center').should(($val) => {
					expect($val).to.contain('site_admin')
						
					}) 
	    	})


	    	describe('Updated Data', () => {

	    		it('Should keep a record of the new value for an updated record', () => {
					cy.get('#center').should(($val) => {
								expect($val).to.contain('Updated Record')
							
								})
	    		})


	    		it('Should keep a record of the new value for lock/unlock actions', () => {
					cy.get('#center').should(($val) => {
						expect($val).to.contain('Lock/Unlock Record')
						expect($val).to.contain('Action: Lock record')
						expect($val).to.contain('Form: Demographics')
						}) 
	    		})

	    	})

    		it('Should keep a record of the fields exported', () => {
				cy.get('#center').should(($val) => {
					expect($val).to.contain('first_name = \'first \'')
					expect($val).to.contain('last_name = \'last \'')	
					expect($val).to.contain('study_id = \'1\'')
					}) 
    		})

	    })

		describe('Changes to Records', () => {

		    it('Should keep a record of all create actions', () => {
	            cy.get('#center').should(($val) => {
					expect($val).to.contain('Create project field')
					
					}) 
		    })

		    it('Should keep a record of all update actions', () => {
				cy.get('#center').should(($val) => {
					expect($val).to.contain('Reorder project fields')
					
					}) 
		    })

		    it('Should keep a record of all delete actions', () => {
				cy.get('#center').should(($val) => {
					expect($val).to.contain('Deleted Record')
				
					})
		    })

		    it('Should keep a record of all record locks', () => {
				cy.get('#center').should(($val) => {
					expect($val).to.contain('Lock/Unlock Record')
					expect($val).to.contain('Action: Lock record')
					expect($val).to.contain('Form: Demographics')
					}) 
		    })

		    it('Should keep a record of all record unlocks', () => {
				 	cy.get('#center').should(($val) => {
							expect($val).to.contain('Lock/Unlock Record')
							expect($val).to.contain('Action: Unlock record')
							expect($val).to.contain('Form: Demographics')
							}) 
		    })
		   
		})

		describe('Changes to User Roles', () => {

		    it('Should keep a record of all created user roles', () => {
				cy.get('#center').should(($val) => {
					        expect($val).to.contain('Created Role')
					    })  
		    })

		    it('Should keep a record of all updated user roles', () => {
				cy.get('#center').should(($val) => {
					expect($val).to.contain('Edited Role')
				}) 
		    })
			it('Should keep a record of all Deleted user roles', () => {
				cy.get('#center').should(($val) => {
					expect($val).to.contain('Deleted role')
				}) 
		    })

		})

		
			

	})

	describe('Filtering Options', () => {

		describe('By Event Type', () => {

			it('Should allow filtering on ALL Event Types (excluding Page Views)', () => {
				cy.get('select#logtype').should(($val) => {
                    expect($val).to.contain('All event types (excluding page views)')
                })   
			})

			it('Should allow filtering by Data Export type', () => {
				cy.get('select#logtype').should(($val) => {
                    expect($val).to.contain('Data export')
                })   
			})

			it('Should allow filtering by Manage/Design type', () => {
				cy.get('select#logtype').should(($val) => {
                    expect($val).to.contain('Manage/Design')
                }) 
			})

			it('Should allow filteirng by User or Role (created-updated-deleted)', () => {
				cy.get('select#logtype').should(($val) => {
                    expect($val).to.contain('User or role created-updated-deleted')
                }) 
			})

			it('Should allow filtering by Record (created-updated-deleted)', () => {
				cy.get('select#logtype').should(($val) => {
                    expect($val).to.contain('Record created-updated-deleted')
                }) 
			})

			it('Should allow filtering by Record created (only)', () => {
				cy.get('select#logtype').should(($val) => {
                    expect($val).to.contain('Record created (only)')
                }) 
			})

			it('Should allow filtering by Record (updated only)', () => {
				cy.get('select#logtype').should(($val) => {
                    expect($val).to.contain('Record updated (only)')
                }) 
			})

			it('Should allow filtering by Record locking and e-signatures', () => {
				cy.get('select#logtype').should(($val) => {
                    expect($val).to.contain('Record locking & e-signatures')
                }) 
			})

			it('Should allow filtering by Page Views', () => {
				cy.get('select#logtype').should(($val) => {
                    expect($val).to.contain('Page Views')
                }) 
			})	
		})

		describe('By Specific Username', () => {

			it('Should allow filtering by Username (all users for a given study selectable)', () => {
				cy.get('select#usr').should(($val) => {
                    expect($val).to.contain('All users')
                }) 
			})	

		})

		describe('By Specific Record', () => {

			it('Should allow filtering by Record (all records for a given study selectable)', () => {
				cy.get('select#record').should(($val) => {
                    expect($val).to.contain('All records')
                }) 
			})				

		})

		describe('Export', () => {
			it('Should have the ability to export the logs to a CSV file', () => {
					
					cy.get('#center').should(($val) => {
						expect($val).to.contain('Download entire logging record to Microsoft Excel (CSV)')
					}) 
			})
		})

	})
})