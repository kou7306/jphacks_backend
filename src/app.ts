import express from "express";
import dotenv from "dotenv";
import http from "http";
import prisma from "./config/prisma";

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORSの設定
const corsOptions = {
  origin: "*",
  methods: ["*"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ユーザーの取得
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export { app, server };
