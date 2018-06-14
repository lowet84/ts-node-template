import { Test } from '../model/Test'
import { DbContext } from '../database/DbContext'

export class TestRepository {
  public static async GetTest(id: string) {
    return await DbContext.database
      .table('Test')
      .get<Test>(id)
      .run(DbContext.connection)
  }
}
