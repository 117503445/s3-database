/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-22 00:50:37
 * @Description:
 * @LastEditTime: 2021-10-23 13:02:13
 * @LastEditors: HaoTian Qi
 */

import UserClient from "./UserClient";

export default class UserRestClient extends UserClient {
  async getAll(): Promise<object[] | undefined> {
    let data = await this.get();
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
