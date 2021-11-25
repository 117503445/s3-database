/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-23 10:49:15
 * @Description:
 * @LastEditTime: 2021-11-24 23:59:37
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
  bucket: string;

  constructor(conf: AdminClientConfig) {
    this.s3client = new S3Client(conf);
    this.bucket = conf.Bucket;
  }

  /**
   * 尝试进行写入操作，判断是否可用
   * @returns 返回报错字符串，如果成功则返回 undefined
   */
  async tryWrite() {
    try {
      await this.set("S3-DATABASE-ADMIN-TEST.json", "test");
    } catch (error: any) {
      // console.error(error);

      if (error.Code != undefined) {
        return error.Code as string;
      } else {
        return JSON.stringify(error);
      }
    }
    return undefined;
  }

  /**
   * 读取文件
   *
   * @returns 返回 JS 对象, 文件不存在 / 结构不合法 返回 undefined
   */
  async get(name: string) {
    // TODO 文件不存在的情况

    let input = { Bucket: this.bucket, Key: name };
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
   * 写入文件,传入非 string 类型时会自动 JSON 序列化
   *
   * @param content - 要写入的 JS 对象
   */
  async set(name: string, content: any) {
    if (typeof content != "string") {
      content = JSON.stringify(content);
    }

    return this.setRaw(name, content);
  }

  /**
   * 写入原始文件
   *
   * @param content - 要写入的 JS 对象
   */
  async setRaw(name: string, content: any) {
    let input = { Bucket: this.bucket, Body: content, Key: name };
    const command = new PutObjectCommand(input);
    return this.s3client.send(command);
  }
}
