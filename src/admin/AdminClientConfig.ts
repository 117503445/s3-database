/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-23 10:54:23
 * @Description:
 * @LastEditTime: 2021-10-29 11:31:11
 * @LastEditors: HaoTian Qi
 */

import { S3ClientConfig } from "@aws-sdk/client-s3";
/**
 * The Admin Config extends from S3ClientConfig
 */
export interface AdminClientConfig extends S3ClientConfig {
  /**
   * The Bucket of the file.
   */
  Bucket: string;
}
