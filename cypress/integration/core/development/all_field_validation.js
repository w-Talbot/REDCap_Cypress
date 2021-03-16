describe('Field Validation', () => {
	
	

	describe('User Interface', () => {
		
		describe('Text Field Validations', () => {
			before(() => {
				cy.mysql_db("projects/pristine")
				cy.set_user_type('admin')
				cy.visit_version({page: 'ControlCenter/validation_type_setup.php'})

				//Enable all disabled options: 

				//Social Security Number
				cy.get('tr#ssn').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
			
				// Code Postal 5 caracteres (France)
				cy.get('tr#postalcode_french').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				// MRN (10 digits)
				cy.get('tr#mrn_10d').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//MRN (generic)
				cy.get('tr#mrn_generic').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				// Number (1 decimal place - comma as decimal)
				cy.get('tr#number_1dp_comma_decimal').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				// Number (1 decimal place)
				cy.get('tr#number_1dp').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Number (2 decimal place - comma as decimal)
				cy.get('tr#number_2dp_comma_decimal').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Number (2 decimal place)
				cy.get('tr#number_2dp').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Number (3 decimal place - comma as decimal)
				cy.get('tr#number_3dp_comma_decimal').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Number (3 decimal place)
				cy.get('tr#number_3dp').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Number (4 decimal place - comma as decimal)
				cy.get('tr#number_4dp_comma_decimal').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Number (4 decimal place)
				cy.get('tr#number_4dp').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Number (comma as decimal)
				cy.get('tr#number_comma_decimal').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Phone (Australia)
				cy.get('tr#phone_australia').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Postal Code (Australia)
				cy.get('tr#postalcode_australia').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Postal Code (Cananda)
				cy.get('tr#postalcode_canada').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Postal Code (Germany)
				cy.get('tr#postalcode_germany').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Time (MM:SS)
				cy.get('tr#time_mm_ss').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				//Vanderbilt MRN
				cy.get('tr#vmrn').within(($tr) => {
					cy.get('button').contains('Enable').click()
                    cy.wait(1000)
				})
				
				
				cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
				cy.get('body').should(($body) => {
					expect($body).to.contain('Enter Draft Mode')
				}).then(() => {
					cy.get('input[value="Enter Draft Mode"]').click()
					cy.get('a').contains('Demographics').click()
					cy.get('input[value="Add Field"]').first().click({force: true})
					cy.get('select').contains('Text Box (Short Text, Number, Date/Time, ...)').parent().select('Text Box (Short Text, Number, Date/Time, ...)')
				})	})

			it('Should have the ability to validate Date (D-M-Y) field', () => {
                cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Date (D-M-Y)')
                })
		    })
			it('Should have the ability to validate Date (M-D-Y) field', () => {
                cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Date (M-D-Y)')
                })
		    })
			it('Should have the ability to validate Date (Y-M-D) field', () => {
                cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Date (Y-M-D)')
                })
		    })

			it('Should have the ability to validate Datetime (M-D-Y H:M) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Datetime (M-D-Y H:M)')
                })	            
		    })
			it('Should have the ability to validate Datetime (D-M-Y H:M) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Datetime (D-M-Y H:M)')
                })	            
		    })
			it('Should have the ability to validate Datetime (Y-M-D H:M) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Datetime (Y-M-D H:M)')
                })	            
		    })

			it('Should have the ability to validate Datetime w/ seconds (Y-M-D H:M:S) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Datetime w/ seconds (Y-M-D H:M:S)')
                })
					            
			})
			it('Should have the ability to validate Datetime w/ seconds (D-M-Y H:M:S) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Datetime w/ seconds (D-M-Y H:M:S)')
                })
					            
			})
			it('Should have the ability to validate Datetime w/ seconds (M-D-Y H:M:S) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Datetime w/ seconds (M-D-Y H:M:S)')
                })
					            
			})

			it('Should have the ability to validate Email field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Email')
                })		            
			})

			it('Should have the ability to validate Integer field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Integer')
                })		            
			})

			
			it('Should have the ability to validate MRN(10 digits) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('MRN (10 digits)')
                })		            
			})
			
			it('Should have the ability to validate MRN(generic) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('MRN (generic)')
                })		            
			})

			it('Should have the ability to validate Number field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Number')
                })		            
			})

			it('Should have the ability to validate Number (1 decimal place - comma as decimal) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Number (1 decimal place - comma as decimal)')
                })		            
			})

			it('Should have the ability to validate Number (1 decimal place) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Number (1 decimal place)')
                })		            
			})

            it('Should have the ability to validate Number (2 decimal places - comma as decimal) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Number (2 decimal places - comma as decimal)')
                })		            
			})

			it('Should have the ability to validate Number (2 decimal places) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Number (2 decimal places)')
                })		            
			})


            it('Should have the ability to validate Number (3 decimal places - comma as decimal) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Number (3 decimal places - comma as decimal)')
                })		            
			})
			

			it('Should have the ability to validate Number (3 decimal places) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Number (3 decimal places)')
                })		            
			})

			
			it('Should have the ability to validate Number (comma as decimal) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Number (comma as decimal)')
                })		            
			})

			
			it('Should have the ability to validate Phone (Australia) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Phone (Australia)')
                })		            
			})

			it('Should have the ability to validate Phone (North America) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Phone (North America)')
                })		            
			})

			
			it('Should have the ability to validate Postal Code (Australia) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Postal Code (Australia)')
                })		            
			})

			
			it('Should have the ability to validate Postal Code (Canada) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Postal Code (Canada)')
                })		            
			})
			
			
			it('Should have the ability to validate Postal Code (Germany) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Postal Code (Germany)')
                })		            
			})

			
			it('Should have the ability to validate Code Postal 5 caracteres (France) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Code Postal 5 caracteres (France)')
                })		            
			})

			it('Should have the ability to validate Social Security Number (U.S.) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Social Security Number (U.S.)')
                })		            
			})

			it('Should have the ability to validate Time (HH:MM) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Time (HH:MM)')
                })   
		    })
			
			it('Should have the ability to validate Time (MM:SS) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Time (MM:SS)')
                })   
		    })

		
			it('Should have the ability to validate Vanderbilt MRN field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Vanderbilt MRN')
                })		            
			})

			it('Should have the ability to validate Zipcode (U.S.) field', () => {
				cy.get('select#val_type').should(($val) => {
                    expect($val).to.contain('Zipcode (U.S.)')
                })		            
			})

		})

		


	})
    describe('Range Validations', () => {
			
        before(() => {
            cy.set_user_type('admin')
            cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
            cy.get('a').contains('Demographics').click({force:true})
            cy.get('input.btn2').first().click({force:true})
            cy.get('select').contains('Text Box (Short Text, Number, Date/Time, ...)').parent().select('Text Box (Short Text, Number, Date/Time, ...)')
        })
        
        it('Should support ranges for a Date (D-M-Y) field', () => {
            cy.get('select').contains('Date (D-M-Y)').parent().select('Date (D-M-Y)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })
        //(M-D-Y)
        it('Should support ranges for a Date (M-D-Y) field', () => {
            cy.get('select').contains('Date (M-D-Y)').parent().select('Date (M-D-Y)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })
        //(Y-M-D)
        it('Should support ranges for a Date (Y-M-D) field', () => {
            cy.get('select').contains('Date (Y-M-D)').parent().select('Date (Y-M-D)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

        it('Should support ranges for a Datetime (M-D-Y H:M) field', () => {
            cy.get('select').contains('Datetime (M-D-Y H:M)').parent().select('Datetime (M-D-Y H:M)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })
        //(D-M-Y H:M)
        it('Should support ranges for a Datetime (D-M-Y H:M) field', () => {
            cy.get('select').contains('Datetime (D-M-Y H:M)').parent().select('Datetime (D-M-Y H:M)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })
        //(Y-M-D H:M)
        it('Should support ranges for a Datetime (Y-M-D H:M) field', () => {
            cy.get('select').contains('Datetime (Y-M-D H:M)').parent().select('Datetime (Y-M-D H:M)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

        it('Should support ranges for a Datetime w/ seconds (Y-M-D H:M:S) field', () => {
            cy.get('select').contains('Datetime w/ seconds (Y-M-D H:M:S)').parent().select('Datetime w/ seconds (Y-M-D H:M:S)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

        // (D-M-Y H:M:S)
        it('Should support ranges for a Datetime w/ seconds (D-M-Y H:M:S) field', () => {
            cy.get('select').contains('Datetime w/ seconds (D-M-Y H:M:S)').parent().select('Datetime w/ seconds (D-M-Y H:M:S)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

        //(M-D-Y H:M:S)
        it('Should support ranges for a Datetime w/ seconds (M-D-Y H:M:S) field', () => {
            cy.get('select').contains('Datetime w/ seconds (M-D-Y H:M:S)').parent().select('Datetime w/ seconds (M-D-Y H:M:S)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

        it('Should support ranges for a Integer field', () => {
            cy.get('select').contains('Integer').parent().select('Integer')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

      
          //Number 
          it('Should support ranges for a Number field', () => {
            cy.get('#val_type').select('Number',{force: true})
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })



        })

        //Number (1 decimal place - comma as decimal)
        it('Should support ranges for a Number (1 decimal place - comma as decimal) field', () => {
            cy.get('select').contains('Number (1 decimal place - comma as decimal)').parent().select('Number (1 decimal place - comma as decimal)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

        //Number (1 decimal place)
        it('Should support ranges for a Number (1 decimal place) field', () => {
            cy.get('select').contains('Number (1 decimal place)').parent().select('Number (1 decimal place)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

         //Number (2 decimal places - comma as decimal)
         it('Should support ranges for a Number (2 decimal places - comma as decimal) field', () => {
            cy.get('select').contains('Number (2 decimal places - comma as decimal)').parent().select('Number (2 decimal places - comma as decimal)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

        //Number (2 decimal places)
        it('Should support ranges for a Number (2 decimal places) field', () => {
            cy.get('select').contains('Number (2 decimal places)').parent().select('Number (2 decimal places)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

         //Number (3 decimal places - comma as decimal)
         it('Should support ranges for a Number (3 decimal places - comma as decimal) field', () => {
            cy.get('select').contains('Number (3 decimal places - comma as decimal)').parent().select('Number (3 decimal places - comma as decimal)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

        //Number (3 decimal places)
        it('Should support ranges for a Number (3 decimal places) field', () => {
            cy.get('select').contains('Number (3 decimal places)').parent().select('Number (3 decimal places)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

    
       
        it('Should support ranges for a Time (HH:MM) field', () => {
            cy.get('select').contains('Time (HH:MM)').parent().select('Time (HH:MM)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })

        //Time (MM:SS)
        it('Should support ranges for a Time (MM:SS) field', () => {
            cy.get('select').contains('Time (MM:SS)').parent().select('Time (MM:SS)')
            cy.wait(1000)
            cy.get('div#div_val_minmax').should(($div) => {
                expect($div).to.contain('Minimum')
                expect($div).to.contain('Maximum')
            })
        })


    })

})