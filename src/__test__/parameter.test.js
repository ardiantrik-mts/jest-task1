const { beforeEach, afterAll } = require('@jest/globals');
const request = require('supertest')
const app = require('../../index')
const mongoose = require("mongoose")
const Param = require('../models/Parameter')
const dateNow = Date.now()

beforeAll(done => {
    done()
  })

describe("Parameter Unit Testing - Success : True Case", () => {
    test("properly insert /POST parameter", async () => {
        const response = await request(app).post("/api/param")
        .field('paramVariable', 'Testing_Param#'+dateNow)
        .field('paramLimit', 10)
        expect(response.statusCode).toBe(200);
    });

    test("properly fetch /GET ALL parameter", async () => {
        const response = await request(app).get("/api/param");
        expect(response.statusCode).toBe(200);
    });

    test("properly update /PATCH parameter", async () => {
        const params = await Param.findOne({ paramVariable: new RegExp('Testing_Param#'+dateNow, 'i') })

        const response = await request(app).patch("/api/param/"+params._id)
        .field('paramVariable', 'Testing_Param_Change#'+dateNow)
        .field('paramLimit', 20)
        expect(response.statusCode).toBe(200);
    });



});

describe("Parameter Unit Testing - Success : False Case", () => {
    const randomFalse_id = "60da70996e85a4328048ggac"
    test("failed to insert /POST parameter", async () => {
        const response = await request(app).post("/api/param")
        .field('paramVariable', 'Testing_Param#'+dateNow)
        .field('paramLimit', "one hundred")
        expect(response.statusCode).toBe(500);
    });

    // test("properly fetch /GET parameter", async () => {
    //     const response = await request(app).get("/api/param");
    //     expect(response.statusCode).toBe(400);
    // });

    test("failed to update /PATCH parameter", async () => {
        const response = await request(app).patch("/api/param/60da72aa3a1f06246024c0db")
        .field('paramLimit', "one thousand")
        expect(response.statusCode).toBe(500);
    });

});


afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })
