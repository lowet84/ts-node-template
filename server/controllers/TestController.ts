import { Test } from '../model/Test'
import { TestRepository } from '../repository/TestRepository';

export class TestController {
  async GetTest(id: string): Promise<Test> {
    return await TestRepository.GetTest(id);
  }

  GetAllTests(value: string, test: Test): Test[] {
    return [new Test('dsflijsd'), new Test('dsoöksö3o4k4öo')]
  }
}
