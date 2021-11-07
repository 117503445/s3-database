/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-23 13:00:46
 * @Description:
 * @LastEditTime: 2021-11-01 00:30:05
 * @LastEditors: HaoTian Qi
 */
import axios, { AxiosInstance } from "axios";
/**
 * User 直接操作文件的 Client
 */
export class UserClient {
  host: string;
  name: string;
  axios: AxiosInstance;

  constructor(host: string, name: string) {
    this.host = host;
    this.name = name;
    this.axios = axios.create({
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  }
  /**
   * 读取文件
   *
   * @returns 返回 JS 对象
   */
  async get(): Promise<any> {
    let url = `${this.host}/${this.name}`;
    let response = await this.axios.get(url);

    let data = response.data;
    return data;
  }
}
