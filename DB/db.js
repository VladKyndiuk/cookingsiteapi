const { Client, Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,

  database: "cookingsite",
});


pool.connect((err) =>{
  if(err){
    console.log("ERROR: ", err);
  }else{
    console.log("SUCCESFULLY CONNECTED");
  }
});

module.exports = pool;
