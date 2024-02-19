import { Sequelize, Op } from "sequelize";

const sequelize = new Sequelize("postgres", "postgres", "root@123", {
    host: "127.0.0.1",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const dbConn = async () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log("database connected");
            sequelize.sync({ alter: true }).then(() => {
                console.log("all models synced");
            });
        })
        .catch((err) => console.log("err", err));
};

export { sequelize, dbConn, Op };
