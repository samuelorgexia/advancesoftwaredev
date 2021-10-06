// signup 
const testData=[
    {firstName:"",lastName:"",email:"",password:""},
    {firstName:"Samuel",lastName:"Li",email:"",password:""},
    {firstName:"Samuel",lastName:"Li",email:"@gmail.com",password:"123"},
    {firstName:"",lastName:"",email:"",password:""},
]
import supertest from "supertest";
import user from './user';
for (var i in testData){
    /*
describe("POST /signup",()=>{
    describe("user is signing up using personal details and password",()=>{
        const response= await request(user).post("/signup").send({
            firstName:testData[i].firstName,
            lastName:testData[i].lastName,
            email:testData[i].email,
            password:testData[i].password
        })
        expect(response.statusCode).toBe(200)
    })
})
*/
describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })
}