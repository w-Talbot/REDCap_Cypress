describe('Extensions Check', () => {

	beforeEach(() => {
		cy.set_user_type('admin')
        cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})

	})

    
    // describe('Control Centre', () => {

      

        
    //             it('The system shall support the option to limit the creation of new projects to administrators', () => {
    //                 //code here
    //             })
    //             it('The system shall support the option to limit moving projects to production to the administrators', () => {
    //                 //code here
    //                 })
    //                 it('The system shall support enabling users to edit survey responses', () => {
    //                     //code here
    //                 })
    //                 it('The system shall allow production Draft Mode changes to be approved automatically under certain conditions', () => {
    //                     //code here
    //                 })
    //                 it('The system shall support the option to limit adding or modifying events and arms while in production to administrators. Note: user can add instrument to event in production', () => {
    //                     //code here
    //                 })

    //  })

    // describe('User Interface – General', () => {
        
     
                                
    //         it('A user can upload files to the project ', () => {
    //                         //code here
    //         })
    //         it('Copies of data files exported from the system can be stored in the project ', () => {
    //             //code here
    //         })
    //         it('Copies of saved surveys can be stored in the file repository. ', () => {
    //             //code here
    //         })
    //         it('The system shall support the ability to create new projects from a blank slate ', () => {
    //             //code here
    //         })
    //         it('The system shall support customization of project titles ', () => {
    //             //code here
    //         })
    //         it('The system shall support the designation of the purpose of the project ', () => {
    //             //code here
    //         })
    //         it('The system shall support the ability to copy the project, all users, and all data during any project status ', () => {
    //             //code here
    //         })
    //         it('The system shall support the ability to erase all data for a project at once only in development ', () => {
    //             //code here
    //         })
    //         it('The system shall support the ability to delete projects only in development for project users and in any status for administrators ', () => {
    //             //code here
    //         })

    //  })
 
     
     describe('User Interface – Longitudinal Project Settings', () => {
        
       
                                
         it('The system shall support enabling and disabling longitudinal data collection', () => {
            cy.get('#setupLongiBtn').click()
            
         })
         it('The system shall support the ability to designate data collection instruments for defined events in each arm', () => {
            cy.get('[onclick="window.location.href=app_path_webroot+\'Design/define_events.php?pid=1\';"]').click()
            cy.get('#descrip').type('Test Event')
            cy.get('#addbutton').click()

            // cy.get('#menu-div > .menubox > :nth-child(5) > a').click()
            cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})

            //define event
            cy.get('button').contains('Designate Instruments for My Events').click()
            
            cy.get('button').contains('Begin Editing').click()
            cy.wait(1000)

            //add to test event
            cy.get('#demographics--41').check()
            cy.get('#save_btn').click()



            })
         it('The system shall support multiple study arms and the ability to define unique event schedules for each arm', () => {
            
            cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})
            cy.get('[onclick="window.location.href=app_path_webroot+\'Design/define_events.php?pid=1\';"]').click()
            cy.get('#table > #sub-nav > ul > :nth-child(2) > a').click()
            cy.get('#arm_name').type('Test Arm Name')
            cy.get('#savebtn').click()



            })

         it('The system shall support the ability to create repeating events and instruments within events', () => {
        
            cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})
            cy.get('table').should(($table) => {
                expect($table).to.contain('Repeatable instruments and events')
                // expect($table).to.contain('Scheduling module (longitudinal only)')
                expect($table).to.contain('Scheduling module')
                // expect($table).to.contain('Designate an email field for sending survey invitations')
                
            })	


            })
         it('The system shall require administrators to delete events for longitudinal projects while in production', () => {
                //code here
                })
         

    
        describe('User Interface – Survey Project Settings', () => {
                  
                it('The system shall support enabling and disabling survey functionality at the project level', () => {
                            
                    cy.get('table').should(($table) => {
                        expect($table).to.contain('Use surveys in this project?')
                        
                                     })	

                })
               
                it('The system shall support enabling and disabling each data collection instrument in a project as a survey', () => {
                    cy.get('#setupEnableSurveysBtn').click()
                    cy.visit_version({page: 'Design/online_designer.php', params: "pid=1"})
                    cy.wait(1000)
                    cy.get('.yellow > div > input').click()
                    cy.wait(1000)
                    cy.get('#row_1 > :nth-child(5) > .fc > .jqbuttonsm').click()
                    cy.get(':nth-child(37) > [valign="middle"] > .btn').click()
                    cy.get('[onclick="window.location.href=app_path_webroot+\'Surveys/edit_info.php?pid=\'+pid+\'&view=showform&page=demographics&redirectDesigner=1\';"]').click()
                    cy.get('#survey_enabled_div').contains('Survey Active')
                    cy.get('[style="float:left;"] > .x-form-text').select('Survey Offline')
                    cy.get('#survey_enabled_div').contains('Survey Offline')
                    
                })

                it('The system shall support the ability to create repeating surveys', () => {
                    cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})
                    cy.get('table').should(($table) => {
                        expect($table).to.contain('Repeatable instruments and events')
                 
                    })	
                   
                   
                })

                it('The system shall support survey status as active or offline', () => {
                
                    cy.visit_version({page: 'Design/online_designer.php', params: "pid=1"})
                    cy.get('[onclick="window.location.href=app_path_webroot+\'Surveys/edit_info.php?pid=\'+pid+\'&view=showform&page=demographics&redirectDesigner=1\';"]').click()

                })
       
         
         })

       
       
         describe('User Interface – Survey distribution', () => {
                                
             it('The system shall allow creation of a public survey link when the survey is in the first instrument position', () => {
                cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})
                cy.get('[style="position:relative;left:-8px;"] > a').click()

             })
            it('The system shall allow creation of a designated email field ', () => {
                cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})
                cy.get('table').should(($table) => {
                    expect($table).to.contain('Designate an email field for sending survey invitations')
             
                })	
             })
         
        })

    })

 })