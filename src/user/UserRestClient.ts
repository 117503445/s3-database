/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-22 00:50:37
 * @Description:
 * @LastEditTime: 2021-11-20 18:28:50
 * @LastEditors: HaoTian Qi
 */

import { UserClient } from "./UserClient";
/**
 * User REST 风格操作文件的 Client
 */
export class UserRestClient extends UserClient {
  name: string;
  constructor(host: string, name: string) {
    super(host);
    this.name = name;
  }

  async get(): Promise<any> {
    return super.get(this.name);
  }

  /**
   * 读取数组文件
   *
   * @returns 返回 JS 数组
   */
  async getAll(): Promise<object[] | undefined> {
    let data = await this.get();
    if (Array.isArray(data)) {
      return data;
    } else {
      return undefined;
    }
  }
  /**
   * 读取数组文件中的特定元素
   *
   * @param index - the index of item
   *
   * @returns 返回 指定index 的元素
   */
  async getOne(index: number) {
    let items = await this.getAll();
    if (typeof items == "undefined") {
      return undefined;
    }
    return items[index];
  }
}
