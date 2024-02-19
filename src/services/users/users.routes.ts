import Elysia from "elysia";
import { UserController } from "./users.controller";

const userController = new UserController();

const app = new Elysia({ prefix: "/users" });

function callFunc() {
    console.log("Hello");
}

app.post("/create", userController.createUser, {
    beforeHandle: [callFunc],
    type: "multipart/form-data",
});

app.post("/login", userController.login);

app.get("/", userController.list);

export default app;
