import request from 'supertest'
import {app} from "../app";

import createConnection from '../database'

describe("Surveys", () =>{
    beforeAll(async ()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    })

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/Surveys").send({
            title: "Title exemple",
            description: "This is a description"
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Shouldn't be able to create a survey twice!", async () => {
        const response = await request(app).post("/Surveys").send({
            title: "Title exemple",
            description: "This is a description"
        });
        expect(response.status).toBe(400);
    });

    it("Should get all surveys", async () => {
        await request(app).post("/Surveys").send({
            title: "Title exemple 2",
            description: "This is a description 2"
        });

        const response = await request(app).get("/surveys/show")
        expect(response.body.length).toBe(2);
    });
});
