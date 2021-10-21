/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-22 00:50:37
 * @Description:
 * @LastEditTime: 2021-10-22 01:29:30
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
  async getAll(): Promise<any[] | undefined> {
    let url = `${this.host}/${this.name}`;
    let response = await axios.get(url);

    let data: any = response.data;
    if (Array.isArray(data)) {
      return data;
    } else {
      return undefined;
    }
  }

  async getOne(index: number) {
    let items = await this.getAll();
    if (typeof items == "undefined") {
      return undefined;
    }
    return items[index];
  }
}
