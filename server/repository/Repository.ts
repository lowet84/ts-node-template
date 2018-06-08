import { BaseItem } from '../../client/src/Api'
import * as r from 'rethinkdb'
import { DbContext } from '../database/DbContext'

export abstract class Repository<T extends BaseItem> {
  abstract tableName: string

  public async GetById(id: string): Promise<T> {
    return <T>await r
      .table(this.tableName)
      .get(id)
      .run(DbContext.connection())
  }

  public async GetAll(): Promise<T[]> {
    return <T[]>await (await r
      .table(this.tableName)
      .getAll()
      .run(DbContext.connection())).toArray()
  }
}
