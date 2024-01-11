import Elysia from "elysia";
import { UserController } from "./users.controller";

const userController = new UserController();

const app = new Elysia({ prefix: "/users" });

function callFunc() {
    console.log("Hello");
}

app.post("/create", userController.createUser, {
    beforeHandle: callFunc,
});

app.post("/login", userController.login);

export default app;
