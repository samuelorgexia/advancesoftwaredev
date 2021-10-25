const request = require("supertest");
const connection = require("../db");
const index=require("../index");
// login
const testData = [
  { firstName: "Michael", lastName: "leee", email: "testing1@gmail.com", password: "password123" },
  { firstName: "Samuel", lastName: "Li", email: "", password: "" },
  { firstName: "Samuel", lastName: "Li", email: "@gmail.com", password: "123" },
  { firstName: "", lastName: "", email: "", password: "" },
];


/*
describe("test login", () => {
  beforeAll((done)=>{
    setTimeout(done,3000);
  });
  test("working login response",(done)=>{
    const loginSql="SELECT user_id,email,password,role FROM user WHERE email= " +
connection.escape("samuelgh.li@gmail.com");
    connection.query(loginSql,["samuelgh.li@gmail.com","dranzer123"],function(error,result){
      console.log(result);
      expect(result.length).toBe(1);
    });
    done();
  });

});
*/
