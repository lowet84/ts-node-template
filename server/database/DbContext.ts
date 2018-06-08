import * as r from 'rethinkdb'
import { tables } from '../Handler'

export class DbContext {
  private static instance: r.Connection
  public static connection(): r.Connection {
    if (!this.instance) {
      throw 'Context not initialized'
    }
    return this.instance
  }

  public static async initialize(hostName: string, databaseName: string) {
    console.log(`Connecting to database on ip:${hostName}`)
    let connection = await r.connect(hostName)
    let databases = await r.dbList().run(connection)
    if (databases.filter(d => d.match(databaseName)).length === 0) {
      console.log(`Generating database: ${databaseName}`)
      await r.dbCreate(databaseName).run(connection)
    }
    let existingTables = await r
      .db(databaseName)
      .tableList()
      .run(connection)
    for (let index = 0; index < tables.length; index++) {
      const table = tables[index]
      if (existingTables.filter(d => d.match(table)).length === 0) {
        console.log(`Adding missing table: ${table}`)
        await r
          .db(databaseName)
          .tableCreate(table)
          .run(connection)
      }
    }
    this.instance = connection
  }
}
