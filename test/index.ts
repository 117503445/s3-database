/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-21 16:46:00
 * @Description:
 * @LastEditTime: 2021-10-23 10:59:39
 * @LastEditors: HaoTian Qi
 */

var assert = require("assert");

import conf from "./config/conf.json";

import UserRestClient from "../src/user/UserRestClient";
import AdminRestClient from "../src/admin/AdminRestClient";

interface Task {
  title: string;
  lastUpdate: string;
}

const date = new Date().toLocaleString("zh-CN", { hour12: true });

let content = [
  { title: "任务1", lastUpdate: date },
  { title: "任务2", lastUpdate: date },
  { title: "任务3", lastUpdate: date },
];

describe("AdminRestClient", function () {
  const adminRestClient = new AdminRestClient(conf, "test.json");

  it("available", async function () {
    await adminRestClient.set("not a valid JSON");
    assert.equal(await adminRestClient.available(), false);
  });

  it("init", async function () {
    await adminRestClient.init();
    assert.equal(await adminRestClient.available(), true);
  });

  it("setAll", async function () {
    await adminRestClient.set(content);
  });

  it("getAll", async function () {
    const items = await adminRestClient.get();
    assert.equal(items[0].lastUpdate, date);
  });

  it("createOne", async function () {
    await adminRestClient.createOne({ title: "任务4", lastUpdate: date });
    const items = await adminRestClient.get();
    assert.equal(items.length, 4);
  });

  it("deleteOne", async function () {
    await adminRestClient.deleteOne(2);
    const items = await adminRestClient.get();
    assert.equal(items.length, 3);
  });

  it("updateOne", async function () {
    await adminRestClient.updateOne(0, {
      title: "任务1-update",
      lastUpdate: date,
    });
  });
});

describe("UserRestClient", function () {
  const userController = new UserRestClient(conf["Host"], "test.json");
  it("getAll", async function () {
    let items = (await userController.getAll()) as Task[];
    assert.equal(items[0].lastUpdate, date);
    assert.equal(items.length, 3);
  });
  it("getOne", async function () {
    let item = (await userController.getOne(2)) as Task;
    assert.equal(item.title, "任务4");
  });
});
