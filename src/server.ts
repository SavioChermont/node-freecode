import express from "express";

const app = express();

app.get("/test", (req, res) => {
    console.log(req, res);
    res.send("Hello world!")
})

app.post("/test-post", (req, res) => {
    res.send("Method Post!");
})

app.listen(3000, () => console.log("Server running!"));