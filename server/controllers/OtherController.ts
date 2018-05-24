import { Test } from '../model/Test'
export class OtherController {
  GetOtherTest(): Test {
    return new Test('lidjsidfj')
  }

  GetAllOtherTests(value: string, test: Test): Test[] {
    return [new Test('dsflijsd'), new Test('dsoöksö3o4k4öo')]
  }
}
