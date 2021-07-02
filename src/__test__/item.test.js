const { beforeEach, afterAll } = require('@jest/globals');
const request = require('supertest')
const app = require('../../index')
const mongoose = require("mongoose")
const Item = require('../models/Item')
const assetsTest_path = "assets/test_image/"
const dateNow = Date.now()

beforeAll(done => {
    done()
  })

describe("Item Bazaar Unit Testing - Success : True Case", () => {
    test("properly insert /POST item", async () => {
        const response = await request(app).post("/api/item")
        .field('name', 'Testing Item #'+dateNow)
        .field('stock', 10)
        .field('description', 'Testing item description is here!')
        .field('expiredDate', '2021-07-30')
        .field('carrotRate', 10)
        .attach('image', assetsTest_path+'Test Item Image.png')
        expect(response.statusCode).toBe(200);
    });

    test("properly fetch /GET item", async () => {
        const response = await request(app).get("/api/item");
        expect(response.statusCode).toBe(200);
    });

    test("properly fetch with parameter /GET item", async () => {
        const items = await Item.findOne({ name: new RegExp('Testing Item #'+dateNow, 'i') })

        const response = await request(app).get("/api/item/"+items._id);
        expect(response.statusCode).toBe(200);
    });

    test("properly update /PATCH item", async () => {
        const items = await Item.findOne({ name: new RegExp('Testing Item #'+dateNow, 'i') })

        const response = await request(app).patch("/api/item/"+items._id)
        .field('stock', 10)
        .field('description', 'Testing item description is here!')
        .field('expiredDate', '2021-08-01')
        .attach('image', assetsTest_path+'Test Item Image Change.jpg')
        expect(response.statusCode).toBe(200);
    });

    test("properly update /PATCH item set to Active", async () => {
        const items = await Item.findOne({ name: new RegExp('Testing Item #'+dateNow, 'i') })

        const response = await request(app).patch("/api/item/setActive/"+items._id)
        .field('staffGroup', ['60d911a964afdf1cac1bb4c2'])
        .field('status', 1)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('Data Item Actived')
    });

    test("properly update /PATCH item set to Inactive", async () => {
        const items = await Item.findOne({ name: new RegExp('Testing Item #'+dateNow, 'i') })

        const response = await request(app).patch("/api/item/setInactive/"+items._id)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('Data Item Inactived')
    });

    test("properly delete /PATCH item", async () => {
        const items = await Item.findOne({ name: new RegExp('Testing Item #'+dateNow, 'i') })

        const response = await request(app).delete("/api/item/"+items._id)
        expect(response.statusCode).toBe(200);
    });

});

describe("Item Bazaar Unit Testing - Success : False Case", () => {
    const randomFalse_id = "60da70996e85a4328048ggac"
    test("failed to insert /POST item (general)", async () => {
        const response = await request(app).post("/api/item")
        .field('name', 'Testing Item #'+dateNow)
        .field('stock', "one hundred")
        .field('description', 'Testing item description is here!')
        .field('expiredDate', '2021-07-30')
        .field('carrotRate', 10)
        .attach('image', assetsTest_path+'Test Item Image.png')
        expect(response.statusCode).toBe(500);
    });

    test("failed to insert /POST item (without image)", async () => {
        const response = await request(app).post("/api/item")
        .field('name', 'Testing Item #'+dateNow)
        .field('stock', 10)
        .field('description', 'Testing item description is here!')
        .field('expiredDate', '2021-07-30')
        .field('carrotRate', 10)
        expect(response.statusCode).toBe(500);
    });

    // test("properly fetch /GET item", async () => {
    //     const response = await request(app).get("/api/item");
    //     expect(response.statusCode).toBe(400);
    // });

    test("failed to fetch with parameter /GET item", async () => {
        const response = await request(app).get("/api/item/"+randomFalse_id);
        expect(response.statusCode).toBe(400);
    });

    test("failed to update /PATCH item", async () => {
        const response = await request(app).patch("/api/item/60da70996e85a4328048ffac")
        .field('stock', "one thousand")
        .field('description', 'Testing item description is here!')
        .field('expiredDate', '2021-08-01')
        expect(response.statusCode).toBe(500);
    });

    test("failed to update /PATCH set item to active", async () => {
        const response = await request(app).patch("/api/item/setActive/"+randomFalse_id)
        .field('staffGroup', ['60d911a964afdf1cac1bb4c2'])
        .field('status', 1)
        expect(response.statusCode).toBe(500);
    });

    test("failed to update /PATCH set item to Inactive", async () => {
        const response = await request(app).patch("/api/item/setInactive/"+randomFalse_id)
        expect(response.statusCode).toBe(500);
    });

    test("failed to delete /DELETE item", async () => {
        const response = await request(app).delete("/api/item/"+randomFalse_id)
        expect(response.statusCode).toBe(500);
    });

});


afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })
