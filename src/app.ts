import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors"; // corsをインポート
import prisma from "./config/prisma";

dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(express.json());
// CORSの設定
const corsOptions = {
  origin: "*", // 全てのオリジンを許可
  methods: ["GET", "POST", "PUT", "DELETE"], // 許可するメソッド
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"], // 許可するヘッダー
};

// CORSミドルウェアを使用
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ユーザーの取得
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { app, server };
