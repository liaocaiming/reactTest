"use strict";

const chalk = require("chalk");
const gulp = require("gulp");
const path = require("path");
const zip = require("gulp-zip");
const fs = require("fs");
// const argv = require("yargs").argv;
const Client = require("ssh2").Client;
const serveConfig = require("./deploy/config");
const conn = new Client();

const config = serveConfig();

const sshConfig = {
  host: config.host,
  port: config.port,
  username: config.username,
  privateKey: config.privateKey,
};

const NAME = config.projectName;
// 输出路径
const OUTPUT_PATH = config.context;
// 输出zip名
const OUTPUT_ZIPNAME = `${NAME}-zip.zip`;
// 输出zip路径
const OUTPUT_ZIP_PATH = path.join(OUTPUT_PATH, OUTPUT_ZIPNAME);
// 远程zip路径
const REMOTE_ZIP_PATH = `${config.remotePath}/${OUTPUT_ZIPNAME}`;
// 上传参数
const uploadParams = { file: OUTPUT_ZIP_PATH, target: REMOTE_ZIP_PATH };
// 中转缓存目录
const UPLOAD_TMP = "upload_serve_tmp";

const shellExecList = [
  `rm -rf ${config.remotePath}/${UPLOAD_TMP}/*`,
  `unzip -o ${REMOTE_ZIP_PATH} -d ${config.remotePath}/${UPLOAD_TMP}`,
  `scp -r ${config.remotePath}/${UPLOAD_TMP}/* ${config.remoteWebUsername}@${config.remoteWebIp}:${config.remoteWebPath}\n`,
  `ssh ${config.remoteWebUsername}@${config.remoteWebIp}`,
  `cd ${config.remoteWebPath}`,
  "npm run reset",
  "exit",
];

function Ready() {
  log("SSH: release Ready...");
  conn
    .on("ready", function() {
      log("SSH Client: ready success...");
      UploadFile(conn, uploadParams);
    })
    .connect(sshConfig);
}

/**
 * 上传文件
 * @param conn
 * @param uploadParams 上传参数
 * @class
 */
function UploadFile(conn, uploadParams) {
  const file = uploadParams.file;
  const target = uploadParams.target;
  if (!conn) {
    return;
  }
  conn.sftp(function(err, sftp) {
    if (err) {
      throw err;
    }
    const step = function() {};
    sftp.fastPut(file, target, { step }, function(err) {
      if (err) {
        // console.log(chalk.red(err.message));
        throw err;
      }
      log("Please wait while uploding...");
      Shell(conn);
    });
  });
}

function Shell(conn) {
  conn.shell(function(err, stream) {
    if (err) {
      throw err;
    }
    stream
      .on("close", function() {
        conn.end();
      })
      .on("data", function(data) {
        log("Stdout: " + data);
      });
    stream.end(shellExecList.map((shell) => shell + " \n").join(""));
  });
}

gulp.task("zip", function() {
  delZipPath();
  return gulp
    .src([
      "./**/*",
      "!./node_modules",
      "!./node_modules/**/*",
      "!./dist",
      "!./dist/**/*",
      "!./test",
      "!./test/**/*",
      "!./staticsrc",
      "!./staticsrc/**/*",
      "!./logs",
      "!./logs/**/*",
      "!./typings",
      "!./typings/**/*",
      "!./deploy",
      "!./deploy/**/*",
      "!./db",
      "!./db/**/*",
      "!./run",
      "!./run/**/*",
      "!./yarn.lock",
      "!./gulpfile.js",
      "!./prettier.config.js",
    ])
    .pipe(zip(OUTPUT_ZIPNAME))
    .pipe(gulp.dest(OUTPUT_PATH));
});

gulp.task("connect", function(done) {
  Ready();
  done();
});

gulp.task("deploy", gulp.series(["zip", "connect"]));

function log(str) {
  // 字色编号：30黑，31红，32绿，33黄，34蓝，35紫，36深绿，37白色
  // console.log(`\u001b[32m ${str} \u001b[32m`);
  console.log(chalk.green(str));
}

function delZipPath() {
  try {
    fs.unlinkSync(OUTPUT_ZIP_PATH);
  } catch (e) {
    console.log(`没有上传文件：${OUTPUT_ZIP_PATH}`);
  }
}
