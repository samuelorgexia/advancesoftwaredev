const express = require("express");
const router = express.Router();
const connection = require("./db");
const bycrpt = require("bcrypt");
const createJwt = require("./jwt/jwt-function");
const jwtAuth = require("./jwt/jwt-auth");
const UserVerify = require("./middleware/UserVerify");
const BudgetVerify=require("./middleware/BudgetVerify");
const salt = 10;

router.post("/signup", UserVerify, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const budget="100000";
  try {
    // hashed password
    const hashPassword = await bycrpt.hash(password, salt);
    // check for existing user
    const findsql =
      `SELECT * FROM user WHERE email = ` + connection.escape(email);
    const find = connection.query(findsql, function (error, result) {
      if (error) throw error;
      //console.log(result.length);
      if (result.length == 0) {
        const roleSql = `SELECT * FROM role WHERE role_id =` + 1;
        connection.query(roleSql, function (error, result) {
          if (error) throw error;
          const role = JSON.parse(JSON.stringify(result[0].role_name));

          // add user
          const sql = `INSERT INTO user (first_name,last_name,role,email,password,budget) VALUES (?,?,?,?,?,?)`;
          connection.query(
            sql,
            [firstName, lastName, role, email, hashPassword,budget],
            function (error, row) {
              if (error) throw error;
              const token = createJwt(row.insertId, role);
              console.log(token);
              res.status(200).json({ token });
            }
          );
        });
      } else {
        res.sendStatus(400).json("Existing user with that emails exist");
      }
    });
  } catch (err) {
    console.log(err.message);
    res.send(err);
  }
});

// admin features
router.get("/get-users", (req, res) => {
  try {
    const sql = "SELECT * FROM user";
    connection.query(sql, function (error, results) {
      if (error) throw error;
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    console.log(err.message);
  }
});

// admin features
router.get("/find-user/:id", (req, res) => {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM user WHERE user_id =" + connection.escape(id);
    const find = connection.query(sql, function (err, result, fields) {
      if (err) throw error;

      //if(result.length>0){
      res.send(result);
      //  } res.send("does not exist");
    });
  } catch (err) {
    console.log(err.message);
  }
});
// user features
router.post("/get-user", jwtAuth, (req, res) => {
  try {
    const sql =
      "SELECT * FROM user WHERE user_id =" + connection.escape(req.user.id);
    console.log(sql);
    const get = connection.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.json(data);
      // console.log(data);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
// admin feature
router.put("/update-user/:id", UserVerify, async (req, res) => {
  const { id } = req.params;
  var { firstName, lastName, email, password } = req.body;

  try {
    // retrieve current details
    const sql = "SELECT * FROM user WHERE user_id =" + connection.escape(id);
    connection.query(sql, function (err, result) {
      if (err) throw err;
      const previousFirstName = JSON.parse(
        JSON.stringify(result[0].first_name)
      );
      const previousLastName = JSON.parse(JSON.stringify(result[0].last_name));
      const previousEmail = JSON.parse(JSON.stringify(result[0].email));
      const previousPassword = JSON.parse(JSON.stringify(result[0].password));
      // update details first
      const updatesql =
        "UPDATE user SET first_name=?,last_name=?,email=?,password=? WHERE user_id =" +
        connection.escape(id);
      connection.query(
        updatesql,
        [firstName, lastName, email, password],
        function (err, result) {
          if (err) throw err;
          // console.log(result);
        }
      );
      // fill in details that body did not have
      if (email == "") {
        console.log("email");
        const updateEmail =
          "UPDATE user SET email=? WHERE user_id =" +
          connection.escape(req.user.id);
        connection.query(updateEmail, [previousEmail], function (err, result) {
          if (err) throw err;
          //  console.log(result);
        });
      }
      if (firstName == "") {
        console.log("first name");
        const updateFirstName =
          "UPDATE user SET first_name=? WHERE user_id =" +
          connection.escape(req.user.id);
        connection.query(
          updateFirstName,
          [previousFirstName],
          function (err, result) {
            if (err) throw err;
            //  console.log(result);
          }
        );
      }
      if (lastName == "") {
        console.log("last name");
        const updatesqlLastName =
          "UPDATE user SET last_name=? WHERE user_id =" +
          connection.escape(req.user.id);
        connection.query(
          updatesqlLastName,
          [previousLastName],
          function (err, result) {
            if (err) throw err;
            //  console.log(result);
          }
        );
      }
      if (password == "") {
        console.log("password");
        const updatesqlPassword =
          "UPDATE user SET password=? WHERE user_id =" +
          connection.escape(req.user.id);
        connection.query(
          updatesqlPassword,
          [previousPassword],
          function (err, result) {
            if (err) throw err;
            //  console.log(result);
          }
        );
      }
    });

    res.send("Updated details");
  } catch (err) {
    console.log(err.message);
  }
});
// update user for themselves when login
router.put("/update-user-themselves", UserVerify, jwtAuth, async (req, res) => {
  var { firstName, lastName, email } = req.body;
  console.log(req.body);
  console.log(req.user.id);
  try {
    // retrieve current details
    const sql =
      "SELECT * FROM user WHERE user_id =" + connection.escape(req.user.id);
    connection.query(sql, function (err, result) {
      if (err) throw err;
      const previousFirstName = JSON.parse(
        JSON.stringify(result[0].first_name)
      );
      const previousLastName = JSON.parse(JSON.stringify(result[0].last_name));
      const previousEmail = JSON.parse(JSON.stringify(result[0].email));

      // update details first
      const updatesql =
        "UPDATE user SET first_name=?,last_name=?,email=? WHERE user_id =" +
        connection.escape(req.user.id);
      connection.query(
        updatesql,
        [firstName, lastName, email],
        function (err, result) {
          if (err) throw err;
          // console.log(result);
          res.send("Updated details");
        }
      );
      // fill in details that body did not have
      if (email == "") {
        console.log("email");
        const updateEmail =
          "UPDATE user SET email=? WHERE user_id =" +
          connection.escape(req.user.id);
        connection.query(updateEmail, [previousEmail], function (err, result) {
          if (err) throw err;
          //  console.log(result);
        });
      }
      if (firstName == "") {
        console.log("first name");
        const updateFirstName =
          "UPDATE user SET first_name=? WHERE user_id =" +
          connection.escape(req.user.id);
        connection.query(
          updateFirstName,
          [previousFirstName],
          function (err, result) {
            if (err) throw err;
            //  console.log(result);
          }
        );
      }
      if (lastName == "") {
        console.log("last name");
        const updatesqlLastName =
          "UPDATE user SET last_name=? WHERE user_id =" +
          connection.escape(req.user.id);
        connection.query(
          updatesqlLastName,
          [previousLastName],
          function (err, result) {
            if (err) throw err;
            //  console.log(result);
          }
        );
      }
    });
  } catch (err) {
    console.log(err.message);
  }
});

// update user password for themselves when log in
router.put("/update-user-password", UserVerify, jwtAuth, async (req, res) => {
  var { password } = req.body;
  console.log(password.length);
  console.log(req.user.id);
  try {
    if (password.length != 0) {
      console.log("password update");
      password = await bycrpt.hash(password, salt);
      const updatesql =
        "UPDATE user SET password=? WHERE user_id =" +
        connection.escape(req.user.id);
      connection.query(updatesql, [password], function (err, result) {
        if (err) throw err;
        res.send("updated password");
      });
    } else {
      res.send("No password field in");
    }
  } catch (err) {
    console.log(err.message);
  }
});
// update user password for themselves when log in
router.put("/update-budget",BudgetVerify ,jwtAuth, async (req, res) => {
  const { budget } = req.body;
  console.log(budget);
  console.log(req.user.id);
  try {
    const updatesql =
    "UPDATE user SET budget=? WHERE user_id =" +
    connection.escape(req.user.id);
  connection.query(updatesql, [budget], function (err, result) {
    if (err) throw err;
    res.send("updated budget");
  });
  } catch (err) {
    console.log(err.message);
  }
});
 // admin
router.delete("/delete-user/:id", (req, res) => {
  const { id } = req.params;
  try {
    const sql = "DELETE FROM user WHERE user_id = " + connection.escape(id);
    const deleteUser = connection.query(sql, function (err, result) {
      if (err) throw err;
      res.send("Deleted user" + id);
    });
  } catch (err) {
    console.log(err.message);
  }
});
router.post("/verify", jwtAuth, async (req, res) => {
  console.log(res.headersSent);
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/login", UserVerify, async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    // get user by email
    const getUsersql =
      "SELECT user_id,email,password,role FROM user WHERE email= " +
      connection.escape(email);
    connection.query(getUsersql, function (err, result) {
      if (err) throw err;
      //const queryEmail=JSON.parse(JSON.stringify(result[0].email));
      console.log(result.length);
      console.log(JSON.parse(JSON.stringify(result[0].email)));
      if (result.length == 1) {
        // mismatch
        if (
          email == JSON.parse(JSON.stringify(result[0].email)) &&
          !bycrpt.compareSync(
            password,
            JSON.parse(JSON.stringify(result[0].password))
          )
        ) {
          res.json("Password is incorrect");
        }
        // if user email and password matches
        if (
          email == JSON.parse(JSON.stringify(result[0].email)) &&
          bycrpt.compareSync(
            password,
            JSON.parse(JSON.stringify(result[0].password))
          )
        ) {
          const token = createJwt(
            JSON.parse(JSON.stringify(result[0].user_id)),
            JSON.parse(JSON.stringify(result[0].role))
          );
          //console.log(token);
          res.status(200).json({ token });
        }
      } else {
        res.json("Email does not match");
      }
    });
  } catch (err) {}
});

module.exports = router;
