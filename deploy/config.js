"use strict";

const fs = require("fs");
const path = require("path");

// 服务器文件上传配置
function getSftpConfig(name, env = "release") {
  const configs = {
    develop: {},

    release: {
      projectName: "fezs_frontend_server",
      context: path.resolve(__dirname, "../dist/zip/"),
      connectTimeout: 30000,
      host: "aaa",
      port: 22223,
      username: "fesit",
      privateKey: fs.readFileSync(
        path.resolve(__dirname, "./ssh/frontend_rsa"),
        "utf-8"
      ),
      // password: 'fe#2018',
      remotePath: "/app/package_tmp/frontend/test/h5activity_transfer",

      // 测试服务器，前端机器配置
      remoteWebUsername: "fesit",
      remoteWebIp: "127.0.0",
      remoteWebPath: "/app/3th_celebration",
    },

    production: {},
  };

  return configs[env];
}

module.exports = getSftpConfig;
