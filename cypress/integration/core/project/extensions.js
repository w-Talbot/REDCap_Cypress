describe('Extensions Check', () => {

	before(() => {
		cy.set_user_type('admin')
	})


    describe('Control Center', () => {

		beforeEach(() => {
		   cy.visit_version({page: "ControlCenter/index.php"})
		})


    	describe('Extensions', () => {
	
			it('should have API Tokens', () => { cy.contains_cc_link('API Tokens') })
    	})

    	describe('Technical / Developer Tools', () => {
			it('should have External Modules', () => { cy.contains_cc_link('External Modules') })
			it('should have API Documentation', () => { cy.contains_cc_link('API Documentation') })
			it('should have Plugin & Hook Documentation', () => { cy.contains_cc_link('Plugin & Hook Documentation') })

            it('For an extension to be usable it must be enabled in the Control Centre by an Administrator', () => {
                cy.contains_cc_link('External Modules')
                cy.get('#external-modules-enable-modules-button').click()
                cy.get('.external-modules-action-buttons > .btn-success').click()
                cy.get('.modal-footer > .enable-button').click()

                cy.get('.external-modules-title').contains("Configuration Example - v0.1")

    	    })

        })

            describe('Extensions configuration', () => {
                
                
                     it('Enable Extension on all modules by default ', () => {
                        cy.contains_cc_link('External Modules')
                         cy.get('.external-modules-configure-button').click()
                         cy.get('[field="enabled"] > .external-modules-input-td > .external-modules-input-element').check()
                         cy.get('[field="discoverable-in-project"] > .external-modules-input-td > .external-modules-input-element').check()
                         cy.get('#external-modules-configure-modal > .modal-dialog > .modal-content > .modal-footer > .save').click()
                         cy.get('.label-warning').contains('Enabled for All Projects')
                     
                        })
             })

             describe('Extensions configuration – Project Level', () => {
                
                
                it('An extension can be enabled/disabled at the project level once installed in the system ', () => {

                    cy.get(':nth-child(1) > :nth-child(2) > .nav-link').click()
                    cy.get(':nth-child(1) > td > div > .aGrid').click()
                    cy.get(':nth-child(14) > a').click()
                    cy.get('.external-modules-title').contains('Configuration Example - v0.1')
                    cy.get('.external-modules-configure-button').click()
                    cy.get('[field="form-name"] > .external-modules-input-td > .external-modules-input-element').select('demographics')
                    cy.get('[field="arm-name"] > .external-modules-input-td > .external-modules-input-element').select('Arm 1')
                    cy.get('[field="event-name"] > .external-modules-input-td > .external-modules-input-element').select("Arm: Arm 1 - Event: Event 1")
                    cy.get('[field="test-text"] > .external-modules-input-td > .external-modules-input-element').type('test')
                    cy.get('[field="text-area"] > .external-modules-input-td > textarea').type('testing')
                    cy.get('button').contains('Save').click()  

                    
                })
        })

             

	    

	
    })
})