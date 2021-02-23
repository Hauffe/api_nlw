import express from 'express';

const app = express();

app.get("/users", (req, res) => {
    return res.json({"message": "Hello World"})
});

app.post("/", (req, res) => {
    return res.json({"message": "Success!!"})
});

app.listen(3333, () => console.log("Server is running"));