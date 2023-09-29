const appBuilder = require('../appBuilder');
const request = require('supertest');

describe('POST /', () => {
    let mockDatabase;
    let testApp;

    beforeEach(() => {
        mockDatabase = {
            askFavorite: jest.fn(),
        };
        testApp = appBuilder(mockDatabase);
    });

    it('should respond with 400 for missing fields', async () => {
        const response = await request(testApp)
            .post('/') 
            .send({});
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            status: 'error',
            message: 'Required fields are missing',
        });
    });
    
    it('should respond with 201 for success', async () => {
        const mockId = 1;
        mockDatabase.askFavorite.mockResolvedValue(mockId);

        const response = await request(testApp)
            .post('/')
            .send({
                name: "Rosie",
                personality: "Peppy",
            });
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            status: 'created',
            data: {
                id: 1,
                name: "Rosie",
                personality: "Peppy"
            }
        })
    })

    it('should respond with 500 for failure', async () => {
        mockDatabase.askFavorite.mockRejectedValue(new Error('Database error'));

        const response = await request(testApp)
            .post('/')
            .send({
                name: "Rosie",
                personality: "Peppy"
            })
        
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual(
            {
                status: 'error',
                message: 'database connection failed'
            }
        )

    })
});