const { request } = require("express");
const ApiError = require("../error/ApiError")
const pool = require("../DB/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {secret} = require("../config");

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

const generateAccessToken=(id)=>{
  const payload = {
    id
  }
  return jwt.sign(payload,secret,{expiresIn:"24h"});
}


class personController {
  async createPerson(req, res, next) {
    const {email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 7);
    const newperson = await pool.query(
      "insert into users(email,password) values($1,$2) returning *",
      [email, hashedPassword]
    ).catch((err) => {next(ApiError.badRequest("Error creating account"));res.status(400);})
    res.json(`${email} created`);
  }



  async getAllPersons(req, res) {
    const users = await pool.query("select * from users");
    res.json(users.rows);
  }

  async authorize(req, res) {
    const {email,password} = req.body;
    const user = await pool.query("select * from users where email = $1", [
      email
    ]);
    console.log(user)

    if(!user.rows[0]){
      return res.status(400).json({message:"Пользователь не найден"});
    }

    


    const validPassword = bcrypt.compareSync(password,user.rows[0].password)
    if(!validPassword){
      return res.status(400).json({message:"Введен невірний логін чи пароль"})
    }

    const token = generateAccessToken(user.rows[0].id);

    return res.status(200).json({token});
  }
//   async deletePerson(req, res) {
//     const id = req.params.id;
//     const deletedPerson = await pool.query("delete from person where person_id=$1",[id]);
//     res.json(`USER ${id} DELETED`);
//   }
}

module.exports = new personController();
