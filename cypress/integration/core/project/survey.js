describe('Data Entry through the Survey Feature', () => {

	before(() => {
		cy.mysql_db("projects/pristine")
		cy.set_user_type('admin')

        //add mandatory field

        cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})

            cy.get('input[value="Enter Draft Mode"]').click()
            cy.get('#formlabel-demographics').click()
            cy.get('[onclick="openAddQuesForm(\'first_name\',\'text\',0,\'0\');"] > img').click()
            cy.get('#field_req1').check()
            cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()

            cy.get('[onclick="openAddQuesForm(\'last_name\',\'text\',0,\'0\');"] > img').click()
            cy.get('#field_req1').click()
            cy.get('[style="font-weight: bold; color: rgb(51, 51, 51);"]').click()
            cy.get('.jqbutton').click()
            cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
            cy.wait(1000)
            // cy.get('.ui-dialog-buttonset > .ui-button').click()

   



        //Add Record
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
        // cy.get('#__LOCKRECORD__').check()   //lock record(optional)

        cy.get('#__SUBMITBUTTONS__-div > #submit-btn-saverecord').click()


	})

    describe('Enable/Disable Survey', () => {
        before(() => {
            cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=1'})

        })
        it('Should have the ability for the survey feature to be enabled or disabled', () => {
            cy.get('#center').should(($body) => {
				expect($body).to.contain('Use surveys in this project?')
			})
            cy.get('#setupEnableSurveysBtn').click()
            cy.wait(1000)
            cy.get('#center').should(($body) => {
				expect($body).to.contain('Disable')
                })
			})
           

        })


    // })

    describe('User Interface - Survey Distribution', () => {
        before(() => {
        cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
        cy.get(':nth-child(1) > :nth-child(5) > .fc > .jqbuttonsm').click({force:true})
        cy.get(':nth-child(37) > [valign="middle"] > .btn').click()
        // cy.pause()
        cy.wait(1000)
        cy.visit_version({page: 'Surveys/invite_participants.php', params: 'pid=1'})

    //     //opens survey
    //     // cy.get('#longurl').invoke('val').then((val1) => {cy.visit(val1)});
        })

    //     it('Should have the ability to automatically create a participant list using a designated email field when a survey is not in the first instrument position', () => {
		   
		// })

		it('Should have the ability for a survey to be generated from within a participant record using Log Out + Open Survey', () => {
			cy.get('button').should(($body) => {
				expect($body).to.contain('Log out')
			})
		})

		it('Should have the ability for a survey to be generated from within a participant record using Open Survey link', () => {
			cy.get('button').should(($body) => {
				expect($body).to.contain('Open public survey')
			})
		})

		it('Should have the ability to prompt the user to leave the survey to avoid overwriting survey responses when opening surveys from a data entry form when using Open Survey link', () => {
		    cy.visit_version({page: 'DataEntry/record_home.php', params: 'pid=1'})
            cy.get('#record').select('1')
            cy.get(':nth-child(1) > .nowrap > a > img').click()
            cy.get('#SurveyActionDropDown').click()
            cy.get(':nth-child(1) > #surveyoption-openSurvey').click()
            cy.wait(1000)
            cy.get('.ui-dialog-buttonset > :nth-child(2)').should(($body) => {
				expect($body).to.contain('Leave without saving changes')
			})

		})

	// 	it('Should have the ability to creation of a participant list manually where each survey is assigned a unique survey link when the survey is in the first instrument position', () => {
		    
	// 	})


    })

    describe('User Interface ', () => {
        before(() => {
           
            cy.visit_version({page: 'Surveys/invite_participants.php', params: 'pid=1'})

                // opens survey
            cy.get('#longurl').invoke('val').then((val1) => {cy.visit(val1)});

            
            cy.get('#date_enrolled-tr > .data > .jqbuttonsm').click()

            cy.get('#first_name-tr > .data > .x-form-text').type('sName')
            cy.get('#last_name-tr > .data > .x-form-text').type('sLast')
            cy.get('#address').type('sCity')
            cy.get('#telephone_1-tr > .data > .x-form-text').type('(415) 555 1111')
            cy.get('#email-tr > .data > .x-form-text').type('aaa@aaa.aaa')
            cy.get('#dob-tr > .data > .jqbuttonsm').click()
            cy.get('.col-11 > :nth-child(6) > input').check()
            cy.get('span > .x-form-text').select('Unknown / Not Reported')
            cy.get('#sex-tr > .data > :nth-child(3) > input').check()
            cy.get('#id-__chk__gym_RC_0').check()
            cy.get('#id-__chk__aerobics_RC_0').check()
            cy.get('#id-__chk__eat_RC_0').check()
            cy.get('#id-__chk__drink_RC_0').check()
            cy.get('#id-__chk__drink_RC_0').click()
            cy.get('#id-__chk__meds_RC_1').check()
            cy.get('#height-tr > .data > .x-form-text').type('182')
            cy.get('#weight-tr > .data > .x-form-text').type('182')
            cy.get('#comments').type('sComment')
            cy.get('.jqbutton').click()
            cy.get('.jqbuttonmed').click()
              

        })
        it('Should have the ability for a participant to enter data in a data collection instrument enabled and distributed as a survey', () => {
		    
            cy.visit_version({page: 'DataEntry/record_home.php', params: 'pid=1'})
            cy.get('select#record').should(($val) => {
                expect($val).to.contain('2')
            }) 
		


		})

		it('Should have the ability to submit survey responses to be changed by a user who has edit survey responses rights', () => {
            cy.get('#record').select('2')
            cy.get(':nth-child(1) > .nowrap > a > img').click()
            cy.get('#form_response_header').should(($val) => {
                expect($val).to.contain('Survey response is editable')
            }) 

            
		})

		it('Should have the ability to support Incomplete surveys status', () => {
            cy.visit_version({page: 'DataEntry/record_home.php', params: 'pid=1'})
            cy.get('.data > button').click()
            cy.get(':nth-child(1) > .nowrap > a > img').click()
            
            cy.get('#formSaveTip > #submit-btn-saverecord').click()
            cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
            cy.get('#record_select1').select('3')
            cy.get('#formSaveTip > .btn-defaultrc').click()
            cy.get('.red').should(($val) => {
                expect($val).to.contain('data entry cancelled')
            }) 
    
		})

		it('Should have the ability to support Partial Survey Response status', () => {
		    cy.visit_version({page: 'DataEntry/record_home.php', params: 'pid=1'})
            cy.get('.data > button').click()

           
            cy.get(':nth-child(1) > .nowrap > a > img').click()
            cy.get('#first_name-tr > .data > .x-form-text').type('firstly')
            cy.get('#formSaveTip > #submit-btn-saverecord').click()
            cy.get('.ui-dialog-buttonset > :nth-child(2)').click()
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Partial Responses')
            }) 
		})

		it('Should have the ability to support Completed Survey Response status', () => {
		    // cy.visit_version({page: 'DataEntry/record_home.php', params: 'pid=1'})
            cy.get('#center').should(($val) => {
                expect($val).to.contain('Complete Responses')
            }) 
		})

    })

    describe('User Interface - Survey Project Settings', () => {
        before(() => {
           
            //Code here

        })
        it(' The system shall support a participant list for each survey in the project', () => {
		    //Code HEre
        })

        it('The system shall support tracking responders and non-responders to surveys when using the participant list', () => {
		    //Code HEre
        })
        it(' The system shall delete all survey-related information and functions including survey link, return codes and date/time stamp when disabling survey functionality', () => {
		    //Code HEre
        })
        it(' The system shall allow for the saving of completed instruments as a PDF', () => {
		    //Code HEre
        })
        it('The system shall support the eMailing of completed instruments to the participant.', () => {
		    //Code HEre
        })

    })
})