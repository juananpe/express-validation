require("leaked-handles");

const supertest = require('supertest');
const app = require('../app');

const { get, post } = supertest(app);

describe('Testing index', () => {
    it('redirects to /users', () =>
        get('/').then(({ header, statusCode }) => {
            expect(header.location).toBe('/users');
            expect(statusCode).toBe(302);
        }));
});


describe('User add', () => {
    it('GET /users should show all users', async () => {
        await get('/users').then( ( res ) => {
            expect(res.status).toEqual(200);
            expect(res.type).toMatch(/html/);
            expect(res.text).toMatch(/<h2>Erabiltzaileak<\/h2>/)
            // expect(res.body).toHaveProperty('users')
        });

    });
})


/* test("GET /posts", async () => {

    // create user in mongo

    const mongojs = require('mongojs')
    const db = mongojs('mongodb://localhost:27017/usersdb', ['users'])
   
	await supertest(app)
		.get("/api/posts")
		.expect(200)
		.then((response) => {
			// Check the response type and length
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(response.body.length).toEqual(1)

			// Check the response data
			expect(response.body[0]._id).toBe(post.id)
			expect(response.body[0].title).toBe(post.title)
			expect(response.body[0].content).toBe(post.content)
		})
})
*/
