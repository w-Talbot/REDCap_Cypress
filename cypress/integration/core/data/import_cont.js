// describe('Repeat / Records Access  ', () => {

//     it('Should have the ability to not allow a new record to be imported if user does not have Create Records access', () => {
        
//         cy.delete_records(1)
//         cy.mysql_db('projects/pristine')
    
//         cy.set_user_type('admin')
//         cy.visit_version({page: 'UserRights/index.php', params: "pid=1"})	
//         cy.get(':nth-child(3) > [href="/index.php?action=myprojects&logout=1"]').click()
//         cy.get('#username').type('test_admin')
//         cy.get('#password').type('Testing123')
//         cy.get('#login_btn').click()
//         cy.get(':nth-child(1) > :nth-child(3) > .nav-link').click()
//         cy.get('#app_title').type('testing')
//         cy.get('#purpose').select('Practice / Just for fun')
//         cy.get('.btn-primaryrc').click()

        

//         cy.visit_version({page: 'UserRights/index.php', params: "pid=14"})	
//         cy.wait(1000)
//         cy.get('#new_username').type('test_user2')
//         cy.wait(1000)
//              //   cy.get('[onclick="undelete_project(14)"]').click() //this is only necessary running all together
//              //   cy.wait(1000)


        


//         cy.get('#addUserBtn').click()
//         cy.wait(1000)
//         cy.get(':nth-child(30) > [style="padding-top:2px;"] > input').uncheck()
//         cy.get(':nth-child(14) > [style="padding-top:2px;"] > input').check()
//         cy.get('.nobr > [value="2"]').check()
//         cy.wait(1000)
    
//         cy.get('[style="font-weight: bold; color: rgb(34, 34, 34);"]').click()
//         cy.wait(1000)

//         cy.get('[style="font-size:11px;color:#888;margin:3px -10px 7px -2px;"] > :nth-child(3) > a').click()
//         cy.wait(1000)
//         cy.get('#username').type('test_user2')
//         cy.wait(1000)
//         cy.get('#password').type('Testing123')
//         cy.wait(1000)
//         cy.get('#login_btn').click()
//         cy.get('#app_panel > .x-panel-bwrap > .x-panel-body > :nth-child(1) > .menubox > :nth-child(3) > a').click()
//         cy.upload_file('import_files/classic_db_import_rows_nonAdmin.csv', 'csv', 'input[name="uploadedfile"]')
       
       
//         cy.wait(1000)
//         cy.get('input').contains('Upload File').click()
//         cy.get('#center').should(($table) => {
//             expect($table).to.contain('Your user privileges do NOT allow you to create new records')
                                
//                 })	
//     })

//     it('The system shall allow data to be changed only by a user who has “edit” access to the data entry form.', () => {
//         cy.get('#west').should(($table) => {
//             expect($table).to.contain('View / Edit Records')
//             expect($table).to.not.contain('Add / Edit Records')
                                
//                 })

//     })

//     it('Should have the ability to require the event name in the csv file when importing data to a longitudinal study', () => {
//         cy.get('[style="font-size:11px;color:#888;margin:3px -10px 7px -2px;"] > :nth-child(3) > a').click()
//         cy.get('#username').type('test_admin')
//         cy.get('#password').type('Testing123')
//         cy.get('#login_btn').click()
//         cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=14"})
//         cy.wait(1000)
//         cy.get('#setupLongiBtn').click({force:true})
//         cy.wait(1000)
//         cy.visit_version({page: 'Design/define_events.php', params: "pid=14"})	
//         cy.get('#descrip').type('test event')
//         cy.wait(1000)
//         cy.get('#addbutton').click()
//         cy.visit_version({page: 'DataEntry/record_status_dashboard.php', params: "pid=14"})	
//         cy.get('a').contains('Data Import Tool').click()
//         cy.upload_file('import_files/classic_db_import_rows_longitude.csv', 'csv', 'input[name="uploadedfile"]')
//         cy.wait(1000)
//         cy.get('input').contains('Upload File').click()
//         //value cant be left blank
//         cy.get('.red').contains('The following values for \'redcap_event_name\' are not valid unique event names for this project, so you will need to fix them and then reimport this data: ""')
                

//     })

//     it('The system shall require the repeating instrument and instance number in the csv file when importing data to a repeating event project', () => {
//         cy.set_user_type('admin')
//         cy.visit_version({page: 'Design/online_designer.php', params: 'pid=14'})
//         cy.get('a').contains('My First Instrument').click()
//         cy.get('#btn-last').click()
//         cy.get('select').contains('Text Box (Short Text, Number, Date/Time, ...)').parent().select('Text Box (Short Text, Number, Date/Time, ...)')
//         cy.get('#field_name').type('first_name')
//         cy.get('#field_label').type('First Name')
//         cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()
//         cy.get('#btn-last').click()
//         cy.get('select').contains('Text Box (Short Text, Number, Date/Time, ...)').parent().select('Text Box (Short Text, Number, Date/Time, ...)')
//         cy.get('#field_name').type('last_name')
//         cy.get('#field_label').type('Last Name')
//         cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()
//         cy.visit_version({page: 'Design/designate_forms.php', params: "pid=14"})
//         cy.get('button').contains('Begin Editing').click()
//         cy.get('#my_first_instrument--41').check()
//         cy.get('#save_btn').click()
//         cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=14"})
//         cy.get('#enableRepeatingFormsEventsBtn').click()
//         cy.get(':nth-child(1) > :nth-child(3) > div > .x-form-text').select('Repeat Entire Event (repeat all instruments together)')
//         cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
//         cy.wait(1000)
//         cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=14"})
//         cy.get(':nth-child(8) > table > tbody > tr > [style="padding-left:30px;"] > .chklisttext > .chklistbtn > .btn').click()
//         cy.get('#keep_data').check()
//         cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
//         cy.visit_version({page: 'DataEntry/record_home.php', params: "pid=14"})	
//         cy.get('.data > button').click()
//         cy.get('#first_name-tr > .data > .x-form-text').type('fred')
//         cy.get('#last_name-tr > .data > .x-form-text').type('flintstone')
//         cy.get('span > .x-form-text').select('Complete')
//         cy.get('#__SUBMITBUTTONS__-div > #submit-btn-saverecord').click()
//         cy.visit_version({page: 'DataEntry/record_status_dashboard.php', params: "pid=14"})	
//         cy.get('a').contains('Data Import Tool').click()
//         cy.upload_file('import_files/classic_db_import_rows_repeat.csv', 'csv', 'input[name="uploadedfile"]')
//         cy.wait(1000)
//         cy.get('input').contains('Upload File').click()
//         cy.wait(1000)
//         cy.get('[style="padding-top:10px;"] > input').click()
//         cy.wait(1000)

//         cy.get('#center').should(($table) => {
//             expect($table).to.contain('Import Successful')
                                
//                 })

//                 cy.visit_version({page: 'DataExport/index.php', params: "pid=14"})	
//                 cy.get(':nth-child(3) > div > .jqbuttonmed').click()
//                 cy.get('[colspan="3"] > .x-form-text').type('test')
//                 cy.get('#add_form_field_dropdown').select('My First Instrument')
//                 cy.get('[style="text-align:center;margin:30px 0 50px;"] > .btn').click()
//                 cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()

//             cy.get('#center').should(($table) => {
//                     expect($table).to.contain('fred')
//                     expect($table).to.contain('John')
//                     expect($table).to.contain('Janice')
//                     expect($table).to.contain('Janet')
                                
//                 })

//             })

//     })