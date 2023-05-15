const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const multer = require("multer");
const db = require("./mysql");
const dayjs = require("dayjs");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//采用设置所有均可访问的方法解决跨域问题
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type,Authorization");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options")
    res.sendStatus(200); //让options尝试请求快速结束
  else next();
});

db.connect((err) => {
  if (err) throw err;
  console.log("连接成功");
});
// 创建数据库
app.get("/", (req, res) => {
  let sql = "CREATE DATABASE cardListInfo";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send("Datebase create success...");
    }
  });
});
//创建路由实例，我们可以在该实例上自由的添加路由
// let usersRouter = express.Router();
// let orderRouter = express.Router();

//添加两个路由到应用上
// app.use("/users", usersRouter);
// app.use("/order", orderRouter);

app.use(
  session({
    secret: "itcase", //加密存储
    cookie: { maxAge: 8000 },
    resave: false, //客户端并行请求是否覆盖
    saveUninitialized: true, //初始化session存储
  })
);
/**
 * 附件上传功能
 */
const storage = multer.diskStorage({
  //保存路径
  destination: function (req, file, cb) {
    cb(null, "../src/assets/imgsForHome");
    //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
  },
  //保存在 destination 中的文件名
  filename: function (req, file, cb) {
    cb(null, file.originalname + "." + file.mimetype.slice(6));
  },
});
const upload = multer({ storage: storage });
let add = "";
let id = 1;
app.post("/profile", upload.single("file"), function (req, res, next) {
  add = req.file.filename;
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话

  res.send({
    fileName: res.filename,
  });
});
app.get("/imgs", upload.single("file"), function (req, res, next) {
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
  const createTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  id++;
  res.send({
    id,
    filename: add,
    createTime,
  });
});
app.listen(3001, () => {
  console.log("服务器开启在3001端口......");
});
