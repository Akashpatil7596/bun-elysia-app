import User from "../../../models/user";

export class UserController {
    async createUser({ body }: any) {
        try {
            return await User.create(body);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async login({ body, set }: any) {
        try {
            const data = await User.findOne({
                where: {
                    email: body.email,
                    password: body.password,
                },
            });

            set.status = 200;
            return data?.dataValues;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
