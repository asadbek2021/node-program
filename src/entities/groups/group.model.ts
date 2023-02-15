import { Model, DataTypes } from "sequelize";

import * as Loaders from '../../loaders';


export const Group = Loaders.sequelize.define('group',{
    id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    permissions: {
       type: DataTypes.ARRAY(DataTypes.STRING),
       defaultValue: false, 
    }
});
