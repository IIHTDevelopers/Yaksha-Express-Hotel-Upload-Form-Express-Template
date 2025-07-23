const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');  // Path to your Express app
const Hotel = require('../../models/hotel');  // Hotel model

let mongoServer;
let createdHotelId;

beforeAll(async () => {
  // Start an in-memory MongoDB server before tests
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Close the in-memory MongoDB server after tests
  await mongoose.disconnect();
  await mongoServer.stop();
});

let hotelRoutesBoundaryTest = `HotelRoutes boundary test`;

describe('HotelRoutes', () => {

  describe('boundary', () => {

    // Test case for creating a hotel
    it(`${hotelRoutesBoundaryTest} should create a new hotel`, async () => {
      const hotelData = {
        name: 'Sunset Resort',
        location: 'California',
        price: 200,
        rooms: 50
      };

      const response = await request(app).post('/api/hotels').send(hotelData);

      expect(response.status).toBe(201);  // Expect status 201 for created
      createdHotelId = response.body._id;  // Save the ID for use in other tests
    });

    // Test case for getting all hotels
    it(`${hotelRoutesBoundaryTest} should get all hotels`, async () => {
      const response = await request(app).get('/api/hotels');

      expect(response.status).toBe(200);  // Expect status 200 for successful GET
      expect(Array.isArray(response.body)).toBe(true);  // Should be an array
      expect(response.body.length).toBeGreaterThan(0);  // Should return at least one hotel
    });
  });
});
