### 配置 npm 国内镜像提升安包装速度

由于网速问题，国内推荐使用 npm 淘宝镜像

```shell
npm config set registry https://registry.npm.taobao.org

# 解决 node-sass 由于网络 问题安装不上
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/

yarn config set registry https://registry.npm.taobao.org
```

#### 1. npm install 或者 yarn

#### 2. 开发命令: yarn start --name=boss, 生产命令: yarn production --name=boss 或者 npm run production --name=boss;

#### 3. 生产代码: dist => boss



### 分支介绍

|     master          |     biduofeng    |
|      ---            |           ---    |
| huntertrades公司代码 |  币多分公司代码   |





### 系统介绍

|     boss             |     h-mobile         |  h-off     |      hTrade        |    mobile                 |
|      ---             |           ---        |     ---    |    ---             |    ---                    |
|原管理系统，暂无使用     |  手机端官网及注册      |  pc官网     |   运营管理系统        |  原手机策略设置系统， 暂无使用 |

