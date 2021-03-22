describe('Module/Services Configuration', () => {

	before(() => {
		cy.set_user_type('admin')
		cy.mysql_db('projects/pristine')

	})

    describe('Users', () => {

        
        it('Projects can utilise Surveys', () => {
            cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=1'})
            cy.get('table').should(($table) => {
                expect($table).to.contain('Use surveys in this project?')
                
                             })	

         })

         it('Projects can access the REDCap Shared Library', () => {
                cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
                cy.get('.yellow > div > input').click()
                cy.wait(1000)
                cy.get('table').should(($table) => {
                    expect($table).to.contain('REDCap Shared Library')
                    
                                 })	

         })
        
        it('Projects can use the REDCap API', () => { 
            cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=1'})
            cy.get('table').should(($table) => {
                expect($table).to.contain('API')
                
                             })	
            })
        
        it('Projects can use the REDCap Mobile App', () => { 
            cy.visit_version({page: 'ProjectSetup/index.php', params: 'pid=1'})
          
            cy.get('#app_panel').should(($a) => {
                expect($a).to.contain('REDCap Mobile App')
                             })	 
            })
        
        it('Embedding of Videos ', () => {
            cy.visit_version({page: 'Design/online_designer.php', params: 'pid=1'})
            cy.get('#formlabel-baseline_data').click()
            cy.get('#btn-date_visit_b-f').click()
            cy.get('select').contains('Descriptive Text (with optional Image/Video/Audio/File Attachment)').parent().select('Descriptive Text (with optional Image/Video/Audio/File Attachment)')
            cy.get('#div_attachment').should(($a) => {
                expect($a).to.contain('Embed an external video')
                             })	 

         })

         it('Access Bioontology Portal for code lookups', () => {
        cy.get('select').contains('Text Box (Short Text, Number, Date/Time, ...)').parent().select('Text Box (Short Text, Number, Date/Time, ...)')
        cy.get('#ontology_service_select').contains('BioPortal Ontology Service').parent().select('BioPortal Ontology Service')
        cy.get('select#ontology_service_select').should(($val) => {
            expect($val).to.contain('BioPortal Ontology Service')
                
            })	
         })

         it('Enable Data Entry Trigger', () => {
            cy.visit_version({page: "ControlCenter/index.php"})
            cy.get(':nth-child(16) > :nth-child(7) > a').click()
            
            cy.get('table').should(($table) => {
                expect($table).to.contain('Enable the Data Entry Trigger for all projects?')
                    
                 })
         })
         
         it('Project Backup in XML Format ', () => {

            cy.get('table').should(($table) => {
                expect($table).to.contain('Enable the project XML export functionality \(i.e., project backup\)?')
                    
                 })  
         })
        
        it('Projects can utilise Computer Adaptive Tests ', () => {
            // cy.visit_version({page: "ControlCenter/index.php"})
            // cy.get(':nth-child(16) > :nth-child(7) > a').click()
           
            cy.get('table').should(($table) => {
            expect($table).to.contain('Computer adaptive tests')
                
             })
         })
         
         it('Projects can use the eConsent Framework ', () => {
            // cy.visit_version({page: "ControlCenter/index.php"})
            cy.get('table').should(($table) => {
                expect($table).to.contain('e-Consent')
                    
                 })
         })


         it('Define which field validation types are available to Projects ', () => {
            cy.visit_version({page: "ControlCenter/index.php"})
            cy.get(':nth-child(16) > :nth-child(8) > a').click()
            var nec = ["Code Postal 5 caracteres (France)", "Date (D-M-Y)", "Date (M-D-Y)", "Date (Y-M-D)", "Datetime (D-M-Y H:M)", "Datetime (M-D-Y H:M)", "Datetime (Y-M-D H:M)", "Datetime w/ seconds (D-M-Y H:M:S", "Datetime w/ seconds (M-D-Y H:M:S)", "Datetime w/ seconds (Y-M-D H:M:S)", "Email", "Integer", "MRN (10 digits)", "MRN (generic)", "Number", "Number (1 decimal place - comma as decimal)", "Number (1 decimal place)", "Number (2 decimal places - comma as decimal)", "Number (2 decimal places)", "Number (3 decimal places - comma as decimal)", "Number (3 decimal places)", "Number (comma as decimal)", "Phone (Australia)", "Phone (North America)", "Postal Code (Australia)", "Postal Code (Canada)", "Postal Code (Germany)", "Social Security Number (U.S.)", "Time (HH:MM)", "Time (MM:SS)", "Vanderbilt MRN" ,"Zipcode (U.S.)"]
           
            cy.get('table').should(($table) => {
                var i;
                for( i = 0; i < nec.length; i++ ){
                    expect($table).to.contain(nec[i])
                }

                             })	
         })
       
    })



})
