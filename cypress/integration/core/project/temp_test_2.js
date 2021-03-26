describe('Survey Testing', () => {

	before(() => {
        cy.mysql_db("projects/pristine")
		cy.set_user_type('admin')

      
       
        

    })


    
    it('Should  go to new survey page', () => {
        cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=1'})
        cy.get('#setupEnableSurveysBtn').click()
        cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
        cy.get(':nth-child(1) > :nth-child(5) > .fc > .jqbuttonsm').click({force:true})
        cy.get(':nth-child(37) > [valign="middle"] > .btn').click()
        cy.visit_version({page: 'Surveys/invite_participants.php', params: 'pid=1'})


        //opens survey
        cy.get('#longurl').invoke('val').then((val1) => {cy.visit(val1)});

      
    })

})