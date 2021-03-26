describe('Data Entry through the Survey Feature', () => {

	before(() => {
		cy.mysql_db("projects/pristine")
		cy.set_user_type('admin')
		
		cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=1'})
        cy.get('#setupEnableSurveysBtn').click()
        cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
        cy.get(':nth-child(1) > :nth-child(5) > .fc > .jqbuttonsm').click({force:true})
        cy.get(':nth-child(37) > [valign="middle"] > .btn').click()
        cy.visit_version({page: 'Surveys/invite_participants.php', params: 'pid=1'})

        //opens survey
        // cy.get('#longurl').invoke('val').then((val1) => {cy.visit(val1)});

	})

	it('Should have the ability to directly enter data through a survey', () => {
        
	})

	it('Should have the ability to delete all survey-related information and functions without impacting saved data', () => {

	})

	describe('User Interface - Survey Distribution', () => {

		before(() => {
			cy.visit_version({page: 'Surveys/invite_participants.php', params: 'pid=1'})
		})

		it('Should have the ability to automatically create a participant list using a designated email field when a survey is not in the first instrument position', () => {
		    
		})

		it('Should have the ability for a survey to be generated from within a participant record using Log Out + Open Survey', () => {
		    
		})

		it('Should have the ability for a survey to be generated from within a participant record using Open Survey link', () => {
		    
		})

		it('Should have the ability to prompt the user to leave the survey to avoid overwriting survey responses when opening surveys from a data entry form when using Open Survey link', () => {
		    
		})

		it('Should have the ability to creation of a participant list manually where each survey is assigned a unique survey link when the survey is in the first instrument position', () => {
		    
		})
	})

	describe('User Interface', () => {

		it('Should have the ability for a participant to enter data in a data collection instrument enabled and distributed as a survey', () => {
		    
		})

		it('Should have the ability to submitted survey responses to be changed by a user who has edit survey responses rights', () => {
		    
		})

		it('Should have the ability to support Incomplete surveys status', () => {
		    
		})

		it('Should have the ability to support Partial Survey Response status', () => {
		    
		})

		it('Should have the ability to support Completed Survey Response status', () => {
		    
		})
	})

	describe('Control Center', () => {

		before(() => {
			cy.set_user_type('admin')
		})

		it('Should have the ability for the survey feature to be enabled or disabled', () => {
		    
		})

		it('Should have the ability for "Edit Survey Responses" feature to be enabled or disabled', () => {
		    
		})
	})
})