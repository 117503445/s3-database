/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-22 00:51:01
 * @Description:
 * @LastEditTime: 2021-10-23 10:57:12
 * @LastEditors: HaoTian Qi
 */

import AdminClientConfig from "./AdminClientConfig";
import AdminClient from "./AdminClient";

export default class AdminRestClient extends AdminClient {
  async deleteAll() {
    await this.set([]);
  }

  async deleteOne(index: number) {
    let items = await this.get();
    items.splice(index, 1);
    await this.set(items);
  }

  async available() {
    let items = await this.get();
    return !(typeof items == "undefined");
  }

  async init() {
    if (!(await this.available())) {
      await this.deleteAll();
    }
  }

  async createOne(item: any) {
    let items = await this.get();
    if (typeof items == "undefined") {
      this.set([item]);
    } else {
      items.push(item);
      this.set(items);
    }
  }

  async updateOne(index: number, item: any) {
    let items = await this.get();
    items[index] = item;
    await this.set(items);
  }
}
