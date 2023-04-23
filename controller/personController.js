const { request } = require("express");
const pool = require("../DB/db");

class personController {
  async createPerson(req, res) {
    const {email,password} = req.body;
    const newperson = await pool.query(
      "insert into users(email,password) values($1,$2) returning *",
      [email, password]
    );
    res.json(`${email} ${password} created`);
  }

//   async updatePerson(req, res) {
//     const { id, login, name, surname } = req.body;
//     const updated_person = await pool.query(
//       "update person set person_login= $2 , person_name= $3 ,person_surname= $4 where person_id = $1",
//       [id, login, name, surname]
//     );
//     res.json(`USER ${id} UPDATED`);
//   }

//   async getAllPersons(req, res) {
//     const users = await pool.query("select * from person");
//     res.json(users.rows);
//   }

  async getOnePerson(req, res) {
    const id = req.params.id;
    const user = await pool.query("select * from person where id = $1", [
      id,
    ]);
    res.json(user.rows[0]);
  }
//   async deletePerson(req, res) {
//     const id = req.params.id;
//     const deletedPerson = await pool.query("delete from person where person_id=$1",[id]);
//     res.json(`USER ${id} DELETED`);
//   }
}

module.exports = new personController();
