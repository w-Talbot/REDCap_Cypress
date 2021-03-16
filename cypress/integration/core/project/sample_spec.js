describe('My first Test',function(){
    it('Does not do much',function(){
        expect(true).to.equal(true)
    })
})

// describe('Browse Projects', () => {
    // it('Should display the "Browse Projects" page when you click on "Control Center"', () => {
    //     cy.visit_v({ page: '' }).then(() => {                
    //         cy.get('a').contains('Control Center').click().then(() => {
    //             cy.get('a').contains('Browse Projects').click().then(() => {  
    //                 cy.get('div h4').should('contain', 'Browse Projects')
    //             })
    //         })            
    //     })
    // })
// })