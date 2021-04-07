describe('e-Consent Framework', () => {

	before(() => {
		cy.set_user_type('admin')
		cy.mysql_db('projects/pristine')

	})


        it('The e-consent framework is available in Survey mode', () => {
            cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=1'})
            cy.wait(1000)
            cy.get('#setupEnableSurveysBtn').click()
            
            
            cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
            cy.wait(1000)
            cy.get(':nth-child(1) > :nth-child(5) > .fc > .jqbuttonsm').click()
            cy.get('#center').should(($table) => {
             expect($table).to.contain('Auto-Archiver + e-Consent Framework')
                                        
                                                     })

         })

         it('When enabled, the eConsent Framework shall store a PDF copy of the completed survey ', () => {
            cy.get('[style="padding-left:15px;padding-bottom:5px;"] > :nth-child(3) > input').check()

            cy.get('#pdf_econsent_options').should(($table) => {
                expect($table).to.contain('First name field')
                expect($table).to.contain('Last name field')
                expect($table).to.contain('e-Consent type')
                expect($table).to.contain('Date of birth field')
                                           
                                                        })

             cy.get('#pdf_econsent_options > :nth-child(2) > .x-form-text').type('47')

             cy.get('#pdf_econsent_options > :nth-child(3) > .x-form-text').select('first_name "First Name"')
             cy.get('#pdf_econsent_options > :nth-child(4) > .x-form-text').select('last_name "Last Name"')
             cy.get('#pdf_econsent_options > :nth-child(7) > .x-form-text').type('Pediatric')
             cy.get('#pdf_econsent_options > :nth-child(8) > .x-form-text').select('dob "Date of birth"')

             cy.get('#confirmation_email_enable').select('Yes')
             cy.get('#confirmation_email_subject').type('test')
             cy.get('#confirmation_email_content').type('test')
             cy.get('#confirmation_email_attach_pdf').check()
            
             cy.get('[style="padding:10px 0;padding-left:15px;"] > .x-form-text').select('Yes')
             cy.get('[style="padding:10px 0;padding-left:15px;"] > .x-form-text').should(($table) => {
                expect($table).to.contain('Yes')

            })
             cy.get('[style="padding:10px 0;padding-left:15px;"] > :nth-child(2) > input').check()//repeat surveys
             cy.get('[style="padding:10px 0;padding-left:15px;"] > :nth-child(3) > input').check()

         })


         it('It is possible to send the completer a copy of the completed consent form', () => {
            cy.get('#center').should(($table) => {
                expect($table).to.contain('Send confirmation email (optional)?')
                                           
                                                        })

            //close out the survey changes
             cy.get(':nth-child(37) > [valign="middle"] > .btn').click()

         })


         it('Prior to submission the completer is asked to confirm that they are happy to consent', () => {
         
        cy.visit_version({page: 'Surveys/invite_participants.php', params: 'pid=1'})


    })

})