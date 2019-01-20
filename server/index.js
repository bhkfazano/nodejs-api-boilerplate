import express from "express";
import cors from "cors";

const app = express();

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || "local";
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/boilerplate";

app.set("env", env);
app.set("mongoUrl", mongoUrl);

console.log("EXPRESS:", `Running as ${env}`);

app.use(cors());

app.listen(port, err => {
    if(err) {
        console.log(err);
    } else {
        console.log(`EXPRESS: Server online - Listening to port ${port}`);
    }
});