import * as r from 'rethinkdb'
import { tables } from './Handler'

export default async function(
  hostName: string,
  databaseName: string
): Promise<r.Connection> {
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

  return connection
}
