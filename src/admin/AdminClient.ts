/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-23 10:49:15
 * @Description:
 * @LastEditTime: 2021-10-23 10:55:20
 * @LastEditors: HaoTian Qi
 */

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";

import AdminClientConfig from "./AdminClientConfig";

function streamToString(stream: Readable): Promise<string> {
  // https://stackoverflow.com/a/49428486/12608675
  const chunks: Array<any> = [];
  return new Promise((resolve, reject) => {
    stream.on(
      "data",
      (chunk: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>) =>
        chunks.push(Buffer.from(chunk))
    );
    stream.on("error", (err: any) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

export default class AdminClient {
  s3client: S3Client;
  name: string;
  bucket: string;
  constructor(conf: AdminClientConfig, name: string) {
    this.s3client = new S3Client(conf);
    this.name = name;
    this.bucket = conf.Bucket;
  }
  async get() {
    // 返回文件对应的 JS 对象
    // 文件不存在 / 结构不合法 返回 undefined

    // TODO 文件不存在的情况

    let input = { Bucket: this.bucket, Key: this.name };
    const command = new GetObjectCommand(input);
    let response = await this.s3client.send(command);
    let result = await streamToString(response.Body as Readable);

    try {
      return JSON.parse(result);
    } catch (e) {
      return undefined;
    }
  }

  async set(content: any) {
    if (typeof content != "string") {
      content = JSON.stringify(content);
    }
    let input = { Bucket: this.bucket, Body: content, Key: this.name };
    const command = new PutObjectCommand(input);
    return this.s3client.send(command);
  }
}
