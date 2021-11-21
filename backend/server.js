const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({path:"backend/config/.env"});

app.listen(process.env.PORT,()=>{
    console.log(`SERVER RUNNING ON http://localhost:${process.env.PORT}`)
})