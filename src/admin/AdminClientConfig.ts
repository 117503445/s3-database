/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-23 10:54:23
 * @Description:
 * @LastEditTime: 2021-10-23 10:54:24
 * @LastEditors: HaoTian Qi
 */

import { S3ClientConfig } from "@aws-sdk/client-s3";

export default interface AdminClientConfig extends S3ClientConfig {
  Bucket: string;
}
