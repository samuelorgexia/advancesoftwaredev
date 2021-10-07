// signup 
const testData=[
    {firstName:"",lastName:"",email:"",password:""},
    {firstName:"Samuel",lastName:"Li",email:"",password:""},
    {firstName:"Samuel",lastName:"Li",email:"@gmail.com",password:"123"},
    {firstName:"",lastName:"",email:"",password:""},
];
const supertest =require ('supertest');
const index=require('../index'); 
/*
describe("test sign up",()=>{

})
*/
test("should respond with a 200 status code", async () => {
    const response = await request(index).post("user/signup").send({
      firstName: "test",
      lastName:"la",
      email:"123",
      password: "password"
    })
    expect(response.statusCode).toBe(200)
  })
  

describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })
  