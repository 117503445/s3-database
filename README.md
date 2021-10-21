# npm-package-typescript

使用 TypeScript 编写 NPM 包

## 使用

1. 注册 [NPM 注册](https://www.npmjs.com)，记得去邮箱接收验证邮件，获取到 NPM_TOKEN。

2. 以本项目为模版，创建 Repo [generate](https://github.com/117503445/npm-package-typescript/generate)

3. 修改 package.json

- name 包名， 以 `@NPM账号/` 开头
- version 版本，改为 0.1.0，详见 [语义化版本](https://semver.org/lang/zh-CN)
- description 项目描述
- author 作者
- license 许可证，详见 <https://spdx.org/licenses/> 的 Identifier

4. 去 GitHub Repo Setting 设置 secrets

settings - secrets - New xrepository secret

Name 填入 NPM_TOKEN，Value 填入 自己获取到的 NPM_TOKEN。
