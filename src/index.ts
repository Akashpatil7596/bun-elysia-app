import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

import { dbConn } from "../models";
import userRoutes from "./services/users/users.routes";

dbConn();

const app = new Elysia();

app.use(cors());

app.use(userRoutes);

app.listen(4000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
