/*
 * @Author: HaoTian Qi
 * @Date: 2021-11-20 18:35:58
 * @Description:
 * @LastEditTime: 2021-11-25 00:01:09
 * @LastEditors: HaoTian Qi
 */

var assert = require("assert");
import conf from "./config/conf.json";
import { UserClient } from "../src/user/UserClient";
import { AdminClient } from "../src/admin/AdminClient";

const data = {
  key: "value",
};

describe("AdminClient", function () {
  it("isAvailable InvalidAccessKeyId", async function () {
    const adminClient = new AdminClient({
      region: "oss-cn-hangzhou",
      endpoint: "https://oss-cn-hangzhou.aliyuncs.com",
      credentials: {
        accessKeyId: "123",
        secretAccessKey: "456",
      },
      Bucket: "s3-crud",
    });
    assert.equal(await adminClient.tryWrite(), "InvalidAccessKeyId");
  });

  it("isAvailable bucket", async function () {
    const c = JSON.parse(JSON.stringify(conf));
    c["Bucket"] = "s3";
    const adminClient = new AdminClient(c);
    assert.equal(await adminClient.tryWrite(), "InvalidBucketName");
  });

  const adminClient = new AdminClient(conf);

  it("isAvailable bucket", async function () {
    assert.equal(await adminClient.tryWrite(), undefined);
  });

  it("set", async function () {
    adminClient.set("kv.json", data);
  });

  it("get", async function () {
    assert.equal((await adminClient.get("kv.json"))["key"], data["key"]);
  });
});

describe("UserClient", function () {
  const userClient = new UserClient(
    "https://s3-crud.oss-cn-hangzhou.aliyuncs.com"
  );
  it("get", async function name() {
    assert.equal((await userClient.get("kv.json"))["key"], data["key"]);
  });
});
