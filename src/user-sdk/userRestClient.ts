/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-22 00:50:37
 * @Description:
 * @LastEditTime: 2021-10-22 01:01:33
 * @LastEditors: HaoTian Qi
 */

import axios from "axios";

export default class UserRestClient {
  host: string;
  name: string;
  constructor(host: string, name: string) {
    this.host = host;
    this.name = name;
  }
  async getAll(){
    let url = `${this.host}/${this.name}`;
    let response = await axios.get(url);
    return response.data;
  }

  async getOne(index: number) {
    let items = await this.getAll();
    return items[index];
  }
}
