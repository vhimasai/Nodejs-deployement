import * as dotenv from "dotenv";
import express, { json } from "express";
import chalk from "chalk";
import routes from "./app/routes/index.routes.js";
import db from "./app/models/index.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
    console.log(chalk.green("Connected to Database..."))
}).catch((error => {
    console.log(chalk.red("Error connecting to the Database" + error));
}))

// db.sequelize.authenticate().then(() => {
//     console.log(chalk.green("Connected to Database..."))
// }).catch((error => {
//     console.log(chalk.red("Error connecting to the Database"+ error));
// }))

// Middleware
app.use(json())
app.use((req, res, next) => {
    console.log(chalk.green(req.method), chalk.blue(req.url))
    next();
});

app.use("/api/v1/", routes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.log("Error", error);
    res.status(500).json({ status: "Internal Server Error", error: error })
})

app.listen(PORT, () => {
    console.log(chalk.blue("Server is running on PORT:") + chalk.red(PORT))
})

export default app
