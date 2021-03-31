describe('Data Collection and Storage', () => {

	beforeEach(() => {
		cy.set_user_type('standard')	
		cy.visit_version({page: 'DataEntry/record_status_dashboard.php', params: "pid=1"})	
		cy.get('a').contains('Data Import Tool').click()
	})


	


	describe('Basic Functionality', () => {

		

		it('Should have the ability to download two versions of a data import template formatted as a CSV file (records by row or column)', () => {
			cy.get('body').should(($body) => {
				expect($body).to.contain('Download your Data Import Template (with records in rows)')
				expect($body).to.contain('Download your Data Import Template (with records in columns)')
			})	    
	    })

		it('Should have the ability to import data by Columns', () => {
			cy.get('select[name="format"]').select('Columns')

			cy.upload_file('import_files/classic_db_import_columns.csv', 'csv', 'input[name="uploadedfile"]').then(() => {

				cy.wait(1000)

				cy.get('input').contains('Upload File').click().then(() => {
					cy.get('body').should($body => {
						expect($body).to.contain('Your document was uploaded successfully and is ready for review.')
						expect($body).to.contain('Jane')
						expect($body).to.contain('John')
						expect($body).to.contain('Doe')
					})

					cy.wait(1000)

					cy.get('input').contains('Import Data').click().then(() => {

						cy.get('body').should($body => {
							expect($body).to.contain('Import Successful!')
						})
					})
				})
			})
		})

		it('Should have the ability to import data by Rows', () => {
			cy.get('select[name="format"]').select('Rows')

			cy.upload_file('import_files/classic_db_import_rows.csv', 'csv', 'input[name="uploadedfile"]').then(() => {

				cy.wait(1000)

				cy.get('input').contains('Upload File').click().then(() => {
					cy.get('body').should($body => {
						expect($body).to.contain('Your document was uploaded successfully and is ready for review.')
						expect($body).to.contain('Jane')
						expect($body).to.contain('John')
						expect($body).to.contain('Doe')
					})

					cy.wait(1000)

					cy.get('input').contains('Import Data').click().then(() => {

						cy.get('body').should($body => {
							expect($body).to.contain('Import Successful!')
						})
					})
				})
			})
		})



		
		it('The system shall highlight data modifications for user confirmation', () => {
			cy.upload_file('import_files/classic_db_import_rows.csv', 'csv', 'input[name="uploadedfile"]')
			cy.wait(1000)
			cy.get('input').contains('Upload File').click()
			cy.get('.blue').should($body => {
				expect($body).to.contain('Data Review')
				expect($body).to.contain('Gray text = Existing data (will not change)')
				expect($body).to.contain('(Red text) = Data that will be overwritten')
				expect($body).to.contain('Red box = error')
				expect($body).to.contain('Orange box = warning')
			})
			
	    })
	})	

	describe('Existing Data Modifications', () => {

	

		let body = null;

		beforeEach(() => {
			cy.get('select[name="format"]').select('Rows')
			cy.upload_file('import_files/classic_db_import_rows_modified.csv', 'csv', 'input[name="uploadedfile"]').then(() => {
				cy.wait(1000)
				cy.get('input').contains('Upload File').click().then(() => {

					cy.get('body').should($body => {
						body = $body
					})
				})
			})
		})

		it('Should have the ability to import a CSV template to create and modify records', () => {
			//Modfying existing records (Jane => Janet and John => Johnathan)
			expect(body).to.contain('Janet')			
			expect(body).to.contain('Doe')		

			expect(body).to.contain('Johnathan')			
			expect(body).to.contain('Doer')		

			expect(body).to.contain('existing record')

			//New Record as well
			expect(body).to.contain('new record')
			expect(body).to.contain('Joe')
			expect(body).to.contain('Average')
		})

		it('Should have the ability to highlight data modifications for user confirmation', () => {
			expect(body).to.contain('(Jane)')
			expect(body).to.contain('(John)')
	    })

    	it('Should have the ability to allow blank values to overwrite existing saved values', () => {
			cy.get('select[name="format"]').select('Rows')
			cy.get('select[name="overwriteBehavior"]').select('Yes, blank values in the file will overwrite existing values')
			cy.get('button').contains('Yes').click()

			cy.upload_file('import_files/classic_db_import_rows_blank_first_name.csv', 'csv', 'input[name="uploadedfile"]').then(() => {
				cy.wait(1000)
				cy.get('input').contains('Upload File').click().then(() => {

					cy.get('body').should($body => {
						body = $body
					})
				})
			})
	    })

    

	})

	describe('Data Validation Abilities', () => {



		it('Should have the ability to import only valid formats for text fields with validation', () => {
			cy.upload_file('import_files/classic_db_import_rows_invalid_email.csv', 'csv', 'input[name="uploadedfile"]')
			cy.wait(1000)
			cy.get('input').contains('Upload File').click()
			cy.get('#center').should(($table) => {
				expect($table).to.contain('Errors were detected in the file that was uploaded')
			})
			
	    })

		it('Should have the ability to import only valid choice codes for radio buttons', () => {
			cy.upload_file('import_files/classic_db_import_rows_radio.csv', 'csv', 'input[name="uploadedfile"]')
			cy.wait(1000)
			cy.get('input').contains('Upload File').click()

			cy.get('#center').should(($table) => {
				expect($table).to.contain('Errors were detected in the file that was uploaded')
				expect($table).to.contain('The value is not a valid category for sex')
				expect($table).to.not.contain('John')
			})
		
	    })

		it('Should have the ability to import only valid choice codes for  dropdowns', () => {
			cy.upload_file('import_files/classic_db_import_rows_dropdown.csv', 'csv', 'input[name="uploadedfile"]')
			cy.wait(1000)
			cy.get('input').contains('Upload File').click()
			cy.get('#center').should(($table) => {
				expect($table).to.contain('Errors were detected in the file that was uploaded')
				expect($table).to.contain('The value is not a valid category for race')
				expect($table).to.not.contain('John')
			})

	    })

		it('Should have the ability to import only valid choice codes for checkboxes', () => {
			cy.upload_file('import_files/classic_db_import_rows_checkbox.csv', 'csv', 'input[name="uploadedfile"]')
			cy.wait(1000)
			cy.get('input').contains('Upload File').click()
			cy.get('#center').should(($table) => {
				expect($table).to.contain('Errors were detected in the file that was uploaded')
				expect($table).to.contain('The following fields were not found in the project as real data fields: meds')
				expect($table).to.not.contain('John')
			})
	    })
	})

	describe('Data Access Controls', () => {

		

		it('Should have the ability to not allow data to be changed on locked data entry forms', () => {
	            

			//Add Locked Record
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
			cy.get('#__LOCKRECORD__').check()

			cy.get('#__SUBMITBUTTONS__-div > #submit-btn-saverecord').click()
		
			
			cy.visit_version({page: 'DataEntry/record_status_dashboard.php', params: "pid=1"})	
			cy.get('a').contains('Data Import Tool').click()
			cy.upload_file('import_files/classic_db_import_rows_locked.csv', 'csv', 'input[name="uploadedfile"]')
			cy.wait(1000)
			cy.get('input').contains('Upload File').click()

			cy.get('#center').should(($table) => {
							expect($table).to.contain('Errors were detected in the file that was uploaded')
							expect($table).to.contain('This field is located on a form that is locked. You must first unlock this form for this record.')
							expect($table).to.contain('Locke')
							expect($table).to.contain('Smith')
							expect($table).to.not.contain('John')
						})
	    })

		it('Should have the ability to assign data instruments to a data access group with the Data Import Tool', () => {
			
			cy.visit_version({page: 'UserRights/index.php', params: 'pid=1'})
			cy.get('#new_username').type('test_user')
			cy.get('#addUserBtn').click()
			cy.get('[style="font-weight: bold; color: rgb(34, 34, 34);"]').click()
			
			cy.visit_version({page: 'DataAccessGroups/index.php', params: 'pid=1'})
			cy.get('#new_group').type('New Group DAG')
			cy.get('#new_group_button').click()
			
			cy.wait(1000)
			cy.get('#group_users').select('test_user')
			cy.wait(1000)
			cy.get('#groups').select('New Group DAG')
			cy.wait(1000)
			cy.get('#user_group_button').click()
			
			
			cy.visit_version({page: 'DataEntry/record_status_dashboard.php', params: "pid=1"})	
			cy.get('a').contains('Data Import Tool').click()

			cy.upload_file('import_files/classic_db_import_rows_dag.csv', 'csv', 'input[name="uploadedfile"]')
			cy.wait(1000)
			cy.get('input').contains('Upload File').click()
			cy.wait(1000)
			cy.get('#center').should(($table) => {
				 expect($table).to.contain('Your document was uploaded successfully and is ready for review')
				expect($table).to.contain('redcap_data_access_group')
				expect($table).to.contain('Jack')
				expect($table).to.contain('Doe')
				expect($table).to.contain('new_group_dag')
			})
			
			cy.get('[style="padding-top:10px;"] > input').click() 
			cy.wait(1000)

			cy.visit_version({page: 'DataEntry/record_status_dashboard.php', params: "pid=1"})	
			cy.get(':nth-child(4) > :nth-child(2) > a > .fstatus').click()
			cy.get('span > b').should(($table) => {
					expect($table).to.contain('New Group DAG')
				})

	    })

		it('Should have the ability to ignore survey identifier and timestamp fields on all data import spreadsheets and allow all other data to be imported', () => {
            cy.upload_file('import_files/classic_db_import_rows_timestamp.csv', 'csv', 'input[name="uploadedfile"]')
			cy.wait(1000)
			cy.get('input').contains('Upload File').click()
			cy.wait(1000)
			cy.get('#center').should(($table) => {
				expect($table).to.contain('skip')
				expect($table).to.contain('redcap_survey_identifier')
				expect($table).to.contain('redcap_survey_timestamp')
			
			})
			cy.wait(1000)
			cy.get('[style="padding-top:10px;"] > input').click()
			cy.wait(1000)


			cy.get('#center').should(($table) => {
				expect($table).to.contain('Import Successful!')
			})
	    })

	

	
	})
})
