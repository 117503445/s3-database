/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-21 16:46:00
 * @Description:
 * @LastEditTime: 2021-10-22 01:04:19
 * @LastEditors: HaoTian Qi
 */

var assert = require("assert");

import conf from "./config/conf.json";

import UserRestClient from "../src/user-sdk/userRestClient";
import AdminRestClient from "../src/admin-sdk/adminRestClient";

const date = new Date().toLocaleString("zh-CN", { hour12: true });

let content = [
  { title: "任务1", lastUpdate: date },
  { title: "任务2", lastUpdate: date },
  { title: "任务3", lastUpdate: date },
];

describe("AdminController", function () {
  const adminController = new AdminRestClient(conf, "test.json");

  it("available", async function () {
    await adminController.setAll("not a valid JSON");
    assert.equal(await adminController.available(), false);
  });

  it("init", async function () {
    await adminController.init();
    assert.equal(await adminController.available(), true);
  });

  it("setAll", async function () {
    await adminController.setAll(content);
  });

  it("getAll", async function () {
    const items = await adminController.getAll();
    assert.equal(items[0].lastUpdate, date);
  });

  it("createOne", async function () {
    await adminController.createOne({ title: "任务4", lastUpdate: date });
    const items = await adminController.getAll();
    assert.equal(items.length, 4);
  });

  it("deleteOne", async function () {
    await adminController.deleteOne(2);
    const items = await adminController.getAll();
    assert.equal(items.length, 3);
  });

  it("updateOne", async function () {
    await adminController.updateOne(0, {
      title: "任务1-update",
      lastUpdate: date,
    });
  });
});

describe("UserController", function () {
  const userController = new UserRestClient(conf["Host"], "test.json");
  it("getAll", async function () {
    let items: any = await userController.getAll();
    assert.equal(items[0].lastUpdate, date);
    assert.equal(items.length, 3);
  });
  it("getOne", async function () {
    let item = await userController.getOne(2);
    assert.equal(item.title, "任务4");
  });
});
