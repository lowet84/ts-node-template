import test from '../../shared/model/test'
export abstract class request<Tr> {
    constructor(public requestName: string){}
}

export class testRequest extends request<test> {
    constructor(){
        super("testRequest")
    }
}

export class testRequest extends request<test> {
    constructor(){
        super("testRequest")
    }
}
