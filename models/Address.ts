import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../db/config'
import addressInterface from '../interfaces/address'
class Address extends Model<addressInterface>{}
Address.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
      
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep:{
        type:DataTypes.STRING,
        allowNull: false
    },
    complement:{
        type:DataTypes.STRING,
        allowNull: false
    }
  },
  {
    sequelize:sequelizeConnection
  });
export default Address;