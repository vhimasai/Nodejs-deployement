import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import userModel from "./user.model.js";
import taskModel from "./task.model.js";
import profileModel from "./profile.model.js";
import projectModel from "./project.model.js";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = userModel(sequelize, Sequelize);
db.task = taskModel(sequelize, Sequelize);
db.profile = profileModel(sequelize, Sequelize);
db.project = projectModel(sequelize, Sequelize);

db.users.hasMany(db.task, { foreignKey: "userId" }); // one-to-many relationsnhip
db.task.belongsTo(db.users, { foreignKey: "userId" }); // many-to-one relationsnhip

db.users.hasOne(db.profile, { foreignKey: "userId" }); // one-to-one relationship
db.profile.belongsTo(db.users, { foreignKey: "userId" }); // one-to-one relationship 

db.users.belongsToMany(db.project, { through: "UserProjects" }); // Many-to-many relationship
db.project.belongsToMany(db.users, { through: "UserProjects" }); // Many-to-many relationship


export default db;

// Blog
// 1. Post (id, title, desciption)
// 2. Category Table (id, title)