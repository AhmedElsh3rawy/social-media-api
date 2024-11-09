import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

export default (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: process.env.CORS_ORIGIN }));
  app.use(cookieParser());
};
