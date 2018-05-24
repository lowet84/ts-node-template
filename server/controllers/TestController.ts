import { Test } from '../model/Test'
export class TestController {
  GetTest(): Test {
    return new Test('lidjsidfj')
  }

  GetAllTests(value: string, test: Test): Test[] {
    return [new Test('dsflijsd'), new Test('dsoöksö3o4k4öo')]
  }
}
