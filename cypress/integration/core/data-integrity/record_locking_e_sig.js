describe('Record Locking and E-Signatures', () => {

	before(() => {
		cy.set_user_type('admin')
		cy.visit_version({page: 'Locking/locking_customization', params: 'pid=1'})
		cy.visit_version({page: 'Locking/esign_locking_management', params: 'pid=1'})
	})

	 describe('Basic Functionality', () => {

		before(() => {
			// cy.visit_version({page: 'Locking/locking_customization', params: 'pid=1'})
			// cy.visit_version({page: 'Locking/esign_locking_management', params: 'pid=1'})
		})

		// it('Should display all records with status that is Locked or E-signed for all Data Collection instruments', () => {

	    // })

	    // it('Should NOT display Data Collection instruments that are NOT designated to be Locked', () => {
	            
	    // })

	    // it('Should display the Locked status of Data Collection instruments for all records', () => {

	    // })

	    // it('Should display the E-Signature status of Data Collection instruments for all records', () => {

	    // })

	    // it('Should have the ability to navigate directly to a selected a record', () => {

	    // })
	 })   

    describe('Customization', () => {

		before(() => {
			cy.visit_version({page: 'Locking/locking_customization', params: 'pid=1'})
		
		})

    	// it('Should have the ability to enable display of the Lock option for each Data Collection instrument', () => {

    	// })

    	it('Should have the ability to disable display of the Lock option for each Data Colllection instrument', () => {
			//DONT NEED THIS?
    	})

    	it('Should have the ability to enable display of the E-Signature option for each Data Collection instrument', () => {

			//DONT NEED THIS?
    	})

    	// it('Should have the ability to disable display of the E-Signature option for each Data Colllection instrument', () => {
    		
    	// })

    	// it('Should have the ability to edit Lock Record Custom Text', () => {

	    // })

    	// it('Should have the ability to remove Lock Record Custom Text', () => {

	    // })
    })

    // describe('Filtering Options', () => {

	//     it('Should have the Filtering ability to display all rows', () => {
	            
	//     })

	//     it('Should have the Filtering ability to show timestamp / user', () => {
	            
	//     })

	//     it('Should have the Filtering ability to hide timestamp / user', () => {
	            
	//     })

	//     it('Should have the Filtering ability to show Locked records', () => {
	            
	//     })

	//     it('Should have the Filtering ability to hide Locked records', () => {
	            
	//     })

	//     it('Should have the Filtering ability to show E-signed records', () => {
	            
	//     })

	//     it('Should have the Filtering ability to hide E-signed records', () => {
	            
	//     })

	//     it('Should have the Filtering ability to show both Locked and E-signed records', () => {
	            
	//     })

	//     it('Should have the Filtering ability to show neither Locked nor E-signed records', () => {
	            
	//     })

	//     it('Should have the Filtering ability to show Locked but not E-signed records', () => {
	            
	//     })
    // })

    describe('Editability', () => {

	    it('Should have the ability to support Edits in Development for standard project users', () => {

	    })

	    it('Should NOT have the ability to support Edits in Production for standard project users', () => {

	    })

	    it('Should have the ability to support Edits in Development for administrators', () => {
			cy.set_user_type('admin')
	    })

	    it('Should have the ability to support Edits in Production for administrators', () => {
			cy.set_user_type('admin')
	    })
    })    

})