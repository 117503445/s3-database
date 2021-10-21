/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-22 00:51:01
 * @Description:
 * @LastEditTime: 2021-10-22 01:01:20
 * @LastEditors: HaoTian Qi
 */

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  S3ClientConfig,
} from "@aws-sdk/client-s3";

function streamToString(stream): Promise<string> {
  // https://stackoverflow.com/a/49428486/12608675
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

export default class AdminRestClient {
  s3client: S3Client;
  name: string;
  bucket: string;
  constructor(conf: S3ClientConfig, name: string) {
    this.s3client = new S3Client(conf);
    this.name = name;
    this.bucket = conf["Bucket"];
  }

  async getAll() {
    // 返回 items 数组
    // 文件不存在 / 结构不合法 返回 undefined

    // TODO 文件不存在的情况
    // TODO JSON 结构不合法 的情况
    // TODO 合法 JSON 不是数组的情况

    let input = { Bucket: this.bucket, Key: this.name };
    const command = new GetObjectCommand(input);
    let response = await this.s3client.send(command);
    let result = await streamToString(response.Body);

    try {
      return JSON.parse(result);
    } catch (e) {
      return undefined;
    }
  }

  setAll(content) {
    if (typeof content != "string") {
      content = JSON.stringify(content);
    }
    let input = { Bucket: this.bucket, Body: content, Key: this.name };
    const command = new PutObjectCommand(input);
    return this.s3client.send(command);
  }

  async deleteAll() {
    await this.setAll([]);
  }

  async deleteOne(index) {
    let items = await this.getAll();
    items.splice(index, 1);
    await this.setAll(items);
  }

  async available() {
    let items = await this.getAll();
    return !(typeof items == "undefined");
  }

  async init() {
    if (!(await this.available())) {
      await this.deleteAll();
    }
  }

  async createOne(item) {
    let items = await this.getAll();
    if (typeof items == "undefined") {
      this.setAll([item]);
    } else {
      items.push(item);
      this.setAll(items);
    }
  }

  async updateOne(index, item) {
    let items = await this.getAll();
    items[index] = item;
    await this.setAll(items);
  }
}
