/*
 * @Author: HaoTian Qi
 * @Date: 2021-10-21 16:46:00
 * @Description:
 * @LastEditTime: 2021-10-21 17:01:00
 * @LastEditors: HaoTian Qi
 */

import assert from "assert";

import { multiply } from "../src/index";

describe("index", () => {
  it("multiply", () => {
    assert.equal(multiply(2, 3), 6);
  });
});
