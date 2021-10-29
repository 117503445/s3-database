/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-22 00:51:01
 * @Description:
 * @LastEditTime: 2021-10-29 11:36:26
 * @LastEditors: HaoTian Qi
 */

import { AdminClient } from "./AdminClient";
/**
 * Admin REST 风格操作文件的 Client
 */
export class AdminRestClient extends AdminClient {
  /**
   * 设置文件为空数组
   */
  async deleteAll() {
    await this.set([]);
  }
  /**
   * 删除指定元素
   *
   * @param index - the index of item
   */
  async deleteOne(index: number) {
    let items = await this.get();
    items.splice(index, 1);
    await this.set(items);
  }
  /**
   * 文件是否为合法的数组对象
   *
   * @returns True/False
   */
  async available() {
    let items = await this.get();
    return !(typeof items == "undefined");
  }
  /**
   * 初始化，文件不是合法的数组对象时，设置文件为空数组
   *
   */
  async init() {
    if (!(await this.available())) {
      await this.deleteAll();
    }
  }
  /**
   * 创建一个元素
   *
   * @param item - the item to be created
   *
   */
  async createOne(item: any) {
    let items = await this.get();
    if (typeof items == "undefined") {
      this.set([item]);
    } else {
      items.push(item);
      this.set(items);
    }
  }
  /**
   * 修改指定 index 的元素
   *
   * @param index - the index of item
   * @param item - the item to be created
   */
  async updateOne(index: number, item: any) {
    let items = await this.get();
    items[index] = item;
    await this.set(items);
  }
}
