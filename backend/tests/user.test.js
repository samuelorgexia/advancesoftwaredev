// signup 
const testData=[
    {firstName:"",lastName:"",email:"",password:""},
    {firstName:"Samuel",lastName:"Li",email:"",password:""},
    {firstName:"Samuel",lastName:"Li",email:"@gmail.com",password:"123"},
    {firstName:"",lastName:"",email:"",password:""},
];
const request =require ('supertest');
const index=require('../index'); 

describe("test sign up",()=>{
  test("reponse is 200", async () => {
    const response = await request(index).post("user/signup").send({
      firstName: "test",
      lastName:"one",
      email:"testing.li@gmail.com",
      password: "password123"
    })
    expect(response.status).toBe(200)
    console.log(response);
  })
  test("send password error", async () => {
    const response = await request(index).post("user/signup").send({
      firstName: "test",
      lastName:"two",
      email:"testing@gmail.com",
      password: "password"
    })
    expect(response.body).toBe("Password must be 6 to 20 character with which contains a number and upper and lower case letters")
    console.log(response);
  })

 
})


  
/*
describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })
  */