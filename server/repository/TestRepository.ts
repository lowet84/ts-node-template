import { Repository } from "./Repository";
import { Test } from "../model/Test";

export class TestRepository extends Repository<Test> {
    tableName: string = 'Test'
}