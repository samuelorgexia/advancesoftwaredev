// signup 
const testData=[
    {firstName:"",lastName:"",email:"",password:""},
    {firstName:"Samuel",lastName:"Li",email:"",password:""},
    {firstName:"Samuel",lastName:"Li",email:"@gmail.com",password:"123"},
    {firstName:"",lastName:"",email:"",password:""},
];

for(var i in testData){
    console.log(testData[i]);
}


describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })
  