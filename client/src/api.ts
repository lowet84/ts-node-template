import axios, { AxiosResponse } from 'axios'
import { request, testRequest } from '../../shared/requests/requests'
import test from '../../shared/model/test';
export class api {
  static async request<T>(req: request<T>): Promise<T> {
    var response = await axios.post<T>('/api/', { request: req })
    return response.data
  }

  static async getTest(): Promise<test>{
    return await api.request<test>(new testRequest())
  }
}
