const { askFavorite, getFavorite } = require('../../data/database');

jest.mock('mysql2', () => {
    const mPool = {
        promise: jest.fn().mockReturnThis(),
        query: jest.fn(),
    };
    return {
        createPool: jest.fn(() => mPool),
    };
});

describe('Database Functions', () => {
    test('askFavorite', async () => {
        const insertId = 1;
        require('mysql2').createPool().query.mockResolvedValueOnce([{ insertId }]);
        const result = await askFavorite('Test Name', 'Test Personality');
        expect(result).toBe(insertId);
    });

    test('getFavorite', async () => {
        const rows = [{ name: 'Test Name', personality: 'Test Personality' }];
        require('mysql2').createPool().query.mockResolvedValueOnce([rows]);
        const result = await getFavorite();
        expect(result).toEqual(rows);
    });
});