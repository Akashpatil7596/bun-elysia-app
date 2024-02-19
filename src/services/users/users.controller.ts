import * as parseMultipartData from "parse-multipart-data";
import jwt from "jsonwebtoken";
import User from "../../../models/user";
import { writeFileSync } from "fs";

export class UserController {
    async createUser({ body }: any) {
        try {
            const image = body.image;

            const imageData = await image.arrayBuffer();

            writeFileSync("image.jpg", imageData);

            const isUserExists = await User.findOne({
                where: {
                    email: body.email,
                },
            });

            if (isUserExists) {
                return {
                    status: 404,
                    message: "User already registered",
                };
            }

            body.password = await Bun.password.hash(body.password);

            return await User.create(body);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async login({ body, set }: any) {
        try {
            let data = await User.findOne({
                where: {
                    email: body.email,
                },
            });

            const isPasswordMatch = await Bun.password.verify(body.password, data?.dataValues.password);

            if (isPasswordMatch) {
                if (data !== null) {
                    data.dataValues.token = await jwt.sign({ id: data?.dataValues.id }, "secret");
                }

                return {
                    status: 200,
                    data: data?.dataValues,
                };
            } else {
                return {
                    status: 404,
                    message: "Password not match",
                };
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async list() {
        try {
            return await User.findAndCountAll();
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
