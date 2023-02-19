import { DataTypes } from "sequelize";
import { sequelize } from "../../loaders";
import { Group } from "../groups/group.model";
import { User } from "../users/user.model";


export const UserGroup = sequelize.define('usergroup', {
    usergroupId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {timestamps:false})

export async function setRelations() {
    Group.belongsToMany(User, {
        through: UserGroup,
        onDelete: 'CASCADE',
        foreignKey: {
            name: 'group_id', 
            allowNull: true, 
        },
    });

    User.belongsToMany(Group, {
        through: UserGroup, 
        onDelete: 'CASCADE',   
        foreignKey: {
            name: 'user_id', 
            allowNull: true, 
        },
    })
}