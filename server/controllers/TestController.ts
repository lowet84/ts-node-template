import { Test } from '../model/Test'
import { TestRepository } from '../repository/TestRepository';

export class TestController {
  GetTest(id: string): Test {
    return new Test(id)
  }

  GetAllTests(value: string, test: Test): Test[] {
    return [new Test('dsflijsd'), new Test('dsoöksö3o4k4öo')]
  }
}
