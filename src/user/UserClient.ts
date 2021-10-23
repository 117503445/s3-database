/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-23 13:00:46
 * @Description:
 * @LastEditTime: 2021-10-23 13:00:53
 * @LastEditors: HaoTian Qi
 */
import axios from "axios";

export default class UserClient {
  host: string;
  name: string;
  constructor(host: string, name: string) {
    this.host = host;
    this.name = name;
  }
  async get(): Promise<any> {
    let url = `${this.host}/${this.name}`;
    let response = await axios.get(url);

    let data = response.data;
    return data;
  }
}
