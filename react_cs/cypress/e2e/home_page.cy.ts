import { Button } from "react-bootstrap";

describe('The home page',()=>{
    // it('sucessfully loads', ()=>{
    //     cy.visit('/')

    //     cy.contains('Sign Up').click()

    //     cy.get('input[name="username"]').type('peter20')

    //     cy.get('input[name="email"]').type('peter20@gmail.com')

    //     cy.get('input[name="password"]').type('Honey200$')

    //     cy.get('input[name="confirmpassword"]').type('Honey200$')

    //     cy.get('input[name="firstname"]').type('Peter')

    //     cy.get('input[name="lastname"]').type('Hain')

    //     cy.get('button').contains('Submit').click()
        
    // })

    it('To Test plan creation ', ()=>{
        cy.visit('/login')

        cy.get('input[name="username"]').type('peter')
        cy.get('input[name="password"]').type('Honey200$')

        cy.get('button').contains("Submit").click()

        // cy.get('button').contains("Create Plan").click()
        
    })

})


// describe('Admin cleanup',()=>{
//     it('sucessfully loads', ()=>{
//         cy.visit('/v1/admin',{baseUrl:'http://localhost:8000'})
//     })
// })