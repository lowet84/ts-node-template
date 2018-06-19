import * as admin from 'firebase-admin'

export class FirebaseContext {
  private databaseURL: string = 'https://ts-node-test.firebaseio.com'

  constructor() {
    var serviceAccount = require('path/to/serviceAccountKey.json')

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://ts-node-test.firebaseio.com'
    })
  }
}
