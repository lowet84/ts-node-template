import testRequest from 'requests/testRequest'
import test from 'model/test'

class testHandler extends handler<testRequest, test> {
  handle(req: testRequest): test {
    return new test('hej')
  }
}
