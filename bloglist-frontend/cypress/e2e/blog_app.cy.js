describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const newUser = { username: 'testuser', name: 'Test von Test', password: 'correct' }
        cy.request('POST', 'http://localhost:3003/api/users', newUser)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testuser')
            cy.get('#password').type('correct')
            cy.get('#login-button').click()
            cy.contains('Test von Test is logged in.')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('testuser')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.contains('wrong credentials')
        })
    })

    describe('When logged in', function (){
        beforeEach(function(){
            cy.login({ username: 'testuser', password: 'correct' })
        })

        it('A blog can be created', function () {
            cy.get('#create-new-button').click()
            cy.get('#title').type('Testing')
            cy.get('#author').type('Test von Test')
            cy.get('#url-address').type('http://localhost')
            cy.get('#create-blog').click()
            cy.contains('Testing Test von Test')
        })

        it('Users can like blogs', function () {
            cy.createBlog({title:'Blog to like', author:'Test von Test', url:'http://someurl'})
            cy.get('#show-button').click()
            cy.get('#like-button').click()
            cy.contains('likes: 1')
        })

        it('Owner can delete blog', function(){
            cy.createBlog({title:'Blog to be deleted', author:'Test von Test', url:'http://someurl'})
            cy.get('#show-button').click()
            cy.get('#remove-button').click()
            cy.get('#title').should('not.have.text','Blog to be deleted')
        })

        it('Other users can not delete the blog', function () {
            cy.createBlog({title:'Blog to be deleted', author:'Test von Test', url:'http://someurl'})
            cy.get('#logout-button').click()
            const anOtherUser = { username: 'another', name: 'Not Authorized', password: 'correct' }
            cy.request('POST', 'http://localhost:3003/api/users', anOtherUser)
            cy.login({username: 'another', password: 'correct'})
            cy.get('#show-button').click()
            cy.get('#remove-button').click()
            cy.get('.error').contains('Request failed with status code 401')
        })

        it('Blogs are ordered by likes', function (){
            cy.createBlog({ title:'1 like', author: 'TT', url: 'url', likes:1 })
            cy.createBlog({ title:'2 likes', author: 'TT', url: 'url', likes:2 })
            cy.createBlog({ title:'3 likes', author: 'TT', url: 'url', likes:3 })
            cy.get('.title-author').eq(0).should('contain','3 likes')
            cy.get('.title-author').eq(1).should('contain','2 likes')
            cy.get('.title-author').eq(2).should('contain','1 like')
        })
    })
})