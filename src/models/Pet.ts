import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface PetAttributes {
  id: number;
  nome: string;
  especie: string;
  idade: number;
  adotado: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// ID é gerado automaticamente pelo banco
export type PetCreationAttributes = Optional<PetAttributes, 'id'>;

export class Pet extends Model<PetAttributes, PetCreationAttributes> implements PetAttributes {
  declare id: number;
  declare nome: string;
  declare especie: string;
  declare idade: number;
  declare adotado: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    especie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    adotado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'pets',
    timestamps: true,
  },
);
