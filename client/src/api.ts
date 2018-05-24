export class Test{
    constructor(public value: string) {
        
    }
}
import axios from 'axios' 
export default class Api{static async GetOtherTest(): Promise<Test> { return (await axios.post('/api',{name:'OtherController.GetOtherTest', 
      body:{}})).data }
static async GetAllOtherTests(value: string, test: Test): Promise<Test[]> { return (await axios.post('/api',{name:'OtherController.GetAllOtherTests', 
      body:{value:value, test: test}})).data }
static async GetTest(): Promise<Test> { return (await axios.post('/api',{name:'TestController.GetTest', 
      body:{}})).data }
static async GetAllTests(value: string, test: Test): Promise<Test[]> { return (await axios.post('/api',{name:'TestController.GetAllTests', 
      body:{value:value, test: test}})).data }}