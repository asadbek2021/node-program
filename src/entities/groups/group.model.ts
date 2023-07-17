import { DataTypes } from 'sequelize';

import * as Loaders from '../../loaders';

export const Group = Loaders.sequelize.define(
  'group',
  {
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
      type: DataTypes.JSON,
      defaultValue: false,
      set(value: string[]) {
        this.setDataValue('permissions', value.join(';'));
      },
      get() {
        return this.getDataValue('permissions').split(';');
      },
    },
  },
  { timestamps: false },
);
