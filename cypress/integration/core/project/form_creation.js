describe('Design forms Using Data Dictionary and Online Designer', () => {
	
	
    describe('Field Creation', () => {
	
            before(() => {
                cy.mysql_db("projects/pristine")
                cy.set_user_type('admin')
                cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
                cy.get('body').should(($body) => {
                    expect($body).to.contain('Enter Draft Mode')
                }).then(() => {
                    cy.get('input[value="Enter Draft Mode"]').click()
                    cy.get('a').contains('Demographics').click()
                    cy.get('input[value="Add Field"]').first().click({force: true})
                    cy.get('select').contains('Text Box (Short Text, Number, Date/Time, ...)').parent().select('Text Box (Short Text, Number, Date/Time, ...)')
                    cy.get('#field_name').type('test_inst')
                    
                })	
  

            })

            it('Shall support the creation of Text box (Short Text)', () => {
                
                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Text Box (Short Text, Number, Date/Time, ...)')
                    
                })		            
            })

            it('Shall support the creation of Notes Box (Paragraph Text)', () => {
            
                cy.get('select').contains('Notes Box (Paragraph Text)').parent().select('Notes Box (Paragraph Text)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Notes Box (Paragraph Text)')
                    
                })		            
            })

            it('Shall support the creation of Notes Box (Paragraph Text)', () => {
            
                cy.get('select').contains('Notes Box (Paragraph Text)').parent().select('Notes Box (Paragraph Text)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Notes Box (Paragraph Text)')
                    
                })		            
            })

            it('The system shall support creation and customization of algorithms for calculated fields', () => {
            
                cy.get('select').contains('Calculated Field').parent().select('Calculated Field')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Calculated Field')
                    
                })       
            })

            it('The system shall support the creation and manual coding for Multiple Choice - Dropdown List (Single Answer)', () => {
            
                cy.get('select').contains('Multiple Choice - Drop-down List (Single Answer)').parent().select('Multiple Choice - Drop-down List (Single Answer)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Multiple Choice - Drop-down List (Single Answer)')
                    
                })	
            })

            it('The system shall support the creation and manual coding for Multiple Choice - Radio Buttons (Single Answer) ', () => {
            
                cy.get('select').contains('Multiple Choice - Radio Buttons (Single Answer)').parent().select('Multiple Choice - Radio Buttons (Single Answer)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Multiple Choice - Radio Buttons (Single Answer)')
                    
                })	
               	            
            })
     
            it('The system shall support the creation of Checkboxes (Multiple Answers)', () => {
            
                cy.get('select').contains('Checkboxes (Multiple Answers)').parent().select('Checkboxes (Multiple Answers)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Checkboxes (Multiple Answers)')
                    
                })	
               	            
            })

            it('The system shall support the creation of Signature (draw signature with mouse or finger)', () => {
            
                cy.get('select').contains('Signature (draw signature with mouse or finger)').parent().select('Signature (draw signature with mouse or finger)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Signature (draw signature with mouse or finger)')
                    
                })	
               	            
            })
            it('The system shall support the creation of File Upload (for users to upload file)', () => {
            
               	           
                cy.get('select').contains('File Upload (for users to upload files)').parent().select('File Upload (for users to upload files)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('File Upload (for users to upload files)')
                    
                })	
            })

            it('The system shall support the creation  of Descriptive Text (with optio nal Image/Video/Audio/File Attachment)', () => {
           
                cy.get('select').contains('Descriptive Text (with optional Image/Video/Audio/File Attachment)').parent().select('Descriptive Text (with optional Image/Video/Audio/File Attachment)')

 
                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Descriptive Text (with optional Image/Video/Audio/File Attachment)')
                    
                })	
               	            
            })

            it('The system shall support the creation of Begin New Section (with optional text)', () => {
             
                cy.get('select').contains('Begin New Section (with optional text)').parent().select('Begin New Section (with optional text)')


                cy.get('select#field_type').should(($val) => {
                expect($val).to.contain('Begin New Section (with optional text)')
                    
                })	
               	            
            })
           
            it('The system shall support marking a data entry field as an identifier', () => {
                cy.get('select').contains('Notes Box (Paragraph Text)').parent().select('Notes Box (Paragraph Text)')
                cy.get('#field_phi1').click()
                .should('be.checked') 	            
            })
           
            it('The system shall support marking a data entry field as required', () => {
                cy.get('#field_req1').click()
                .should('be.checked') 
            })
           
            it('The system shall support the provision of field notes (reminders underneath the field)', () => {
                cy.get('#field_note').type('Test field note functionality')

                    cy.get('#field_note').should('have.value', 'Test field note functionality')
    
            })

            it('The system shall support the use of ActionTags / Field annotations  to enhance the user experience.', () => {
            
              
                cy.get('[style="margin:5px 0;font-size:11px;color: #808080;"] > .btn').click()
              
                //add Default value for Field annotation
                cy.get(':nth-child(4) > [style="text-align:center;background-color:#f5f5f5;color:#912B2B;padding:7px 15px 7px 12px;font-weight:bold;border:1px solid #ccc;border-bottom:0;border-right:0;"] > .btn').click()
                //add read only action tag
                cy.get(':nth-child(20) > [style="text-align:center;background-color:#f5f5f5;color:#912B2B;padding:7px 15px 7px 12px;font-weight:bold;border:1px solid #ccc;border-bottom:0;border-right:0;"] > .btn').click()
                
        
                cy.get('[aria-describedby="action_tag_explain_popup"] > .ui-dialog-buttonpane > .ui-dialog-buttonset > .ui-button').click()    
               
                //checks action tags exists
                cy.get('#field_annotation').should('have.value', '@READONLY @DEFAULT')

                cy.get('#field_annotation').type('=\'testname\'')
                
            })
            
           
             it('The system shall support the relative positioning of fields with respect to the question text:', () => {
                   
                cy.get('select').contains('Text Box (Short Text, Number, Date/Time, ...)').parent().select('Text Box (Short Text, Number, Date/Time, ...)')

                    cy.get('select').contains('Right / Vertical (RV)').parent().select('Right / Vertical (RV)') 
                    cy.get('select#custom_alignment').should(($val) => {
                        expect($val).to.contain('Right / Vertical (RV)')
                            
                        })

                    cy.get('select').contains('Right / Horizontal (RH)').parent().select('Right / Horizontal (RH)')
                    cy.get('select#custom_alignment').should(($val) => {
                        expect($val).to.contain('Right / Horizontal (RH)')
                            
                        })  

                    cy.get('select').contains('Left / Vertical (LV)').parent().select('Left / Vertical (LV)') 
                    cy.get('select#custom_alignment').should(($val) => {
                        expect($val).to.contain('Left / Vertical (LV)')
                            
                        }) 

                    cy.get('select').contains('Left / Horizontal (LH)').parent().select('Left / Horizontal (LH)') 
                    cy.get('select#custom_alignment').should(($val) => {
                        expect($val).to.contain('Left / Horizontal (LH)')
                            
                        }) 
                        cy.get('#field_label').type('testing')
                        cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()
                 })

                 

            it('The system shall support the ability to add, edit, copy, move and delete data collection fields', () => {
            
                //ADD has been proven by the first test

                //EDIT has been proven by injection of prev. collected data


                //MOVE ......doesnt work for now

                //open button
                cy.get('[onclick="moveField(\'test_inst\',\'\')"] > img').click()
                //select
                // cy.get("#move_after_field").should( "have.value", 'last_name "Last Name"' ).select( 'last_name "Last Name"')
                cy.get("#move_after_field").contains('last_name "Last Name"').parent().select( 'last_name "Last Name"')
                // cy.get('select').contains('last_name "Last Name"').parent().select( 'last_name "Last Name"')
                //close button
                 cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
                 
               	  
                //DELETE
                cy.get('#label-patient_document').should(($val) => {
                    expect($val).to.contain('Upload the patient\'s consent form')
                        
                    }) 
                cy.get('[onclick="deleteField(\'patient_document\',0);"] > img').click()
                cy.get('.ui-dialog-buttonset > :nth-child(2)').click()

                cy.contains('Upload the patient\'s consent form').should('not.exist')
                        
                   
            })
            it('The system shall support the injection of previously collected data into text on a data collection form or survey, thus providing greater precision and control over question wording (piping)', () => {
            
                // cy.get('[onclick="openAddQuesForm(\'first_name\',\'text\',0,\'0\');"] > img').click() 
                // cy.get('#field_annotation').type('@DEFAULT=\'[test_inst]\'')  
                // cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()


                // cy.get('.jqbutton').click()
                // cy.get('.ui-dialog-buttonset > :nth-child(2)').click()

            })
            it('The system shall support the injection of system defined variables that contain system level information rather than study field data:', () => {
            
                               
            })
  
         
           


    })



})