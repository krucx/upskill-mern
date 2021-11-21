const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

dotenv.config({path:"backend/config/.env"});


connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`SERVER RUNNING ON http://localhost:${process.env.PORT}`)
})