/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-23 10:49:15
 * @Description:
 * @LastEditTime: 2021-11-07 23:56:39
 * @LastEditors: HaoTian Qi
 */

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { Response } from "node-fetch";
import { AdminClientConfig } from "./AdminClientConfig";

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
    let result = await new Response(response.Body as any).text();

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
