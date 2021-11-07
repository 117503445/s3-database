/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-23 10:49:15
 * @Description:
 * @LastEditTime: 2021-11-07 23:11:04
 * @LastEditors: HaoTian Qi
 */

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";

import { AdminClientConfig } from "./AdminClientConfig";

function streamToString(stream: Readable): Promise<string> {
  //   https://stackoverflow.com/a/36944450

  return new Promise(async (resolve, reject) => {
    let responseDataChunks = [];

    // Attach a 'data' listener to add the chunks of data to our array
    // Each chunk is a Buffer instance
    stream.on("data", (chunk) => responseDataChunks.push(chunk));

    // Once the stream has no more data, join the chunks into a string and return the string
    stream.once("end", () => resolve(responseDataChunks.join("")));
  });
}
/**
 * Admin 直接操作文件的 Client
 */
export class AdminClient {
  s3client: S3Client;
  name: string;
  bucket: string;

  constructor(conf: AdminClientConfig, name: string) {
    this.s3client = new S3Client(conf);
    this.name = name;
    this.bucket = conf.Bucket;
  }
  /**
   * 读取文件
   *
   * @returns 返回 JS 对象, 文件不存在 / 结构不合法 返回 undefined
   */
  async get() {
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
  /**
   * 写入文件
   *
   * @param content - 要写入的 JS 对象
   */
  async set(content: any) {
    if (typeof content != "string") {
      content = JSON.stringify(content);
    }
    let input = { Bucket: this.bucket, Body: content, Key: this.name };
    const command = new PutObjectCommand(input);
    return this.s3client.send(command);
  }
}
