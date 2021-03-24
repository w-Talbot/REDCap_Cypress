describe('Extensions Check', () => {

	before(() => {
		cy.set_user_type('admin')
        cy.mysql_db('projects/pristine')
        // cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})

	})

    
    describe('Control Centre', () => {

        before(() => {
            cy.visit_version({page: 'ControlCenter/user_settings.php', params: "pid=1"})
    
        })
    

                it('The system shall support the option to limit the creation of new projects to administrators', () => {
                    

                    cy.get('#control_center_window').should(($table) => {
                        expect($table).to.contain('Allow normal users to create new projects?')
                        
                                     })	
                })
                it('The system shall support the option to limit moving projects to production to the administrators', () => {
                    cy.get('#control_center_window').should(($table) => {
                        expect($table).to.contain('Allow normal users to move projects to production?')
                        
                                     })	
                    })
                    it('The system shall support enabling users to edit survey responses', () => {
                        cy.get('#control_center_window').should(($table) => {
                            expect($table).to.contain('Allow users to edit survey responses?')
                            
                                         })	
                    })
                    it('The system shall allow production Draft Mode changes to be approved automatically under certain conditions', () => {
                        cy.get('#control_center_window').should(($table) => {
                            expect($table).to.contain('Allow production Draft Mode changes to be approved automatically under certain conditions?')
                            
                                         })
                    })
                    it('The system shall support the option to limit adding or modifying events and arms while in production to administrators. Note: user can add instrument to event in production', () => {
                        cy.get('#control_center_window').should(($table) => {
                            expect($table).to.contain('Allow normal users to add or modify events and arms on the Define My Events page for longitudinal projects while in production status?')
                            
                                         })
                    })

     })

    describe('User Interface – General', () => {
        
        before(() => {
            cy.visit_version({page: 'FileRepository/index.php', params: "pid=1"})
    
        })
                                
            it('A user can upload files to the project ', () => {
                cy.get('#center').should(($temp) => {
					expect($temp).to.contain('Upload New File')
				})
            })
            it('Copies of data files exported from the system can be stored in the project ', () => {
                cy.get('#center').should(($temp) => {
					expect($temp).to.contain('Data Export Files')
				})
            })
            it('Copies of saved surveys can be stored in the file repository. ', () => {
                cy.get('#center').should(($temp) => {
					expect($temp).to.contain('resulting data and syntax files are stored here')
				})
            })
            it('The system shall support the ability to create new projects from a blank slate ', () => {
                cy.visit_version({page: 'index.php', params: "pid=1"})
            })


            it('The system shall support customization of project titles ', () => {
                cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})
                cy.get('#setupChklist-modify_project > table > tbody > tr > [style="padding-left:30px;"] > .chklisttext > .fs13').click()
                cy.get('#edit_project').should(($table) => {
                    expect($table).to.contain('Project title')
                                              })
                cy.get('#app_title').type('{selectall}').type('new project title')
               


            })

            it('The system shall support the designation of the purpose of the project ', () => {
                cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})
                cy.get('#setupChklist-modify_project > table > tbody > tr > [style="padding-left:30px;"] > .chklisttext > .fs13').click()

                cy.get('#edit_project').should(($table) => {
                    expect($table).to.contain('Purpose of this project')
                                              })
                cy.get('#purpose').select('Other')
                cy.get('#purpose_other_text').type('Modify the project settings')
                cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
            })
            it('The system shall support the ability to copy the project, all users, and all data during any project status ', () => {
                cy.visit_version({page: 'ProjectSetup/other_functionality.php', params: "pid=1"})
                cy.get('#row_copy > :nth-child(1) > .jqbuttonmed').click()
                cy.get('#center').should(($table) => {
                        expect($table).to.contain('All users and roles')
                        expect($table).to.contain('All records/responses')
                                            
                                                  })
                
            })
            it('The system shall support the ability to erase all data for a project at once only in development ', () => {
                cy.visit_version({page: 'ProjectSetup/other_functionality.php', params: "pid=1"})
                cy.get('#center').should(($table) => {
                    expect($table).to.contain('Erase all data')
   
                                              })
              

            })
            it('The system shall support the ability to delete projects only in development for project users and in any status for administrators ', () => {
                cy.visit_version({page: 'ProjectSetup/other_functionality.php', params: "pid=1"})
                cy.get('#center').should(($table) => {
                    expect($table).to.contain('Delete the project')
   
                                              })
            })

     })
 
     
     describe('User Interface – Longitudinal Project Settings', () => {
        before(() => {
           
            cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})
    
        })
       
                                
         it('The system shall support enabling and disabling longitudinal data collection', () => {
            cy.get('#center').should(($table) => {
                expect($table).to.contain('Use longitudinal data collection with defined events')

                                          })
            
            
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
                 cy.set_user_type('standard')
                cy.visit_version({page: 'Design/define_events.php', params: "pid=1"})
               
                cy.get('[onclick="delVisit(\'1\',\'1\',2);"] > img').click()

                cy.get('#center').should(($table) => {
                    expect($table).to.contain('Deleting any events below will result in data loss. Please proceed with caution.')
                    
                                 })	
                })
         

    
        describe('User Interface – Survey Project Settings', () => {

          
                before(() => {
                    cy.set_user_type('admin')
                    cy.visit_version({page: 'ProjectSetup/index.php', params: "pid=1"})

                })

                  
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
                    cy.get('#center').should(($table) => {
                        expect($table).to.contain('Repeatable instruments')
                 
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