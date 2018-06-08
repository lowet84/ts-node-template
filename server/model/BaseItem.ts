export abstract class BaseItem{
    public id: number

    constructor() {
        this.id = Number(Math.random().toString(36).substr(2, 16))
    }
}