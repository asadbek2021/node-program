import { DataTypes } from "sequelize";

import * as Loaders from '../../loaders';


export const User = Loaders.sequelize.define('user',{
    id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    is_deleted: {
       type: DataTypes.BOOLEAN,
       defaultValue: false, 
    }
});