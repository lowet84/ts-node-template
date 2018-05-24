import { OtherController } from "./controllers/OtherController"
import { TestController } from "./controllers/TestController"
export class Handler {  constructor(private otherController: OtherController,
private testController: TestController  ) {}
handle(name: string, body: any): any {  switch (name) {case 'OtherController.GetOtherTest':
      return this.otherController.GetOtherTest()
case 'OtherController.GetAllOtherTests':
      return this.otherController.GetAllOtherTests(body.value,body.test)
case 'TestController.GetTest':
      return this.testController.GetTest()
case 'TestController.GetAllTests':
      return this.testController.GetAllTests(body.value,body.test)  } }}