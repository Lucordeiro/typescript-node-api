import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../db/config'
import userInterface from '../interfaces/user';
import Address from './Address';
class User extends Model<userInterface>{}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    }
  },
  {
    sequelize:sequelizeConnection
  });
  User.hasMany(Address,{
      sourceKey:"id",
      foreignKey:"user_id",
      as: "address"
  })
export default User;