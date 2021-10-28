# s3-database

JavaScript SDK uses S3 as the data source, to build applications that don't need a backend.

## Description

对于某些简单的数据请求，完全可以将其放置在对象储存中，由前端进行直接的存取，可以构建不需要后端的应用程序。基于 s3-database 提供的 SDK，前端可以存取非结构化的 JS 对象数据，也可以使用 REST 风格的接口操作结构化的数据。

s3-database 的权限控制基于对象储存本身。匿名用户通过 user-sdk 可以读取文件，管理员用户使用 ak 和 sk，通过 admin-sdk 可以读写文件。

s3-database 的优点在于数据静态化，缓存友好、CDN 友好，同时不需要后端，运维方便，稳定性高。此外，s3-database 可以非常方便的处理键值型数据，后端如果用关系型数据库实现则会相当麻烦。

s3-database 不能取代后端。s3-database 的局限在于，每次只能读取全量的数据，且不能实现复杂的权限控制。如果数据满足 数据量少、匿名用户可读、权限控制简单 的特性，则可以使用 s3-database。举例：公告、联系方式。

## Getting Started

### 准备测试文件

先按照 wiki，创建一个支持 S3 接口的 对象储存。以 `https://s3-crud.oss-cn-hangzhou.aliyuncs.com` 为例。

创建 `./test.json`, 内容为

```json
[
  { "title": "任务1-update", "lastUpdate": "2021/10/23 下午1:03:09" },
  { "title": "任务2", "lastUpdate": "2021/10/23 下午1:03:09" },
  { "title": "任务4", "lastUpdate": "2021/10/23 下午1:03:09" }
]
```

通过 `https://s3-crud.oss-cn-hangzhou.aliyuncs.com/test.json` 可以访问到这个文件

### JS 访问

`yarn add @t117503445/s3-database`

```js
import UserRestClient from "../src/user/UserRestClient";
const client = new UserRestClient(
  "https://s3-crud.oss-cn-hangzhou.aliyuncs.com",
  "test.json"
);
let items = await userController.getAll();
console.log(items);
```

## Authors

[@117503445](https://github.com/117503445)

## License

This project is licensed under the GPL-3.0 License - see the LICENSE file for details
