/*
 * @Author: HaoTian Qi
 * @Date: 2021-11-20 18:35:58
 * @Description:
 * @LastEditTime: 2021-11-20 19:12:33
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
  const adminClient = new AdminClient(conf);

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
