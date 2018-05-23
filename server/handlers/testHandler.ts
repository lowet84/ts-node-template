import test from '../../shared/model/test'
import { handler } from './handler'
import { testRequest } from '../../shared/requests/requests'

export default class testHandler extends handler<testRequest, test> {
  handle(req: testRequest): test {
    return new test(req.requestName)
  }
}
