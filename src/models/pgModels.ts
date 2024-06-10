import sequalize from '../../db.js'
import {DataTypes} from "sequelize";

const User = sequalize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

export {User}
