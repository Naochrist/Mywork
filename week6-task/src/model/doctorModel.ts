import { DataTypes, Model } from "sequelize";
import db from '../config/database.config'
import { ReportInstance } from "./reportModel";

interface DoctorAttributes {

      id:string;
      DoctorsName: string;
      email: string; // no duplicates allowed.
      specialization:string;
      gender: string;
      phone: string;
      password:string;
    }
    
     
    
     export class DoctorInstance extends Model<DoctorAttributes>{}


     DoctorInstance.init({
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      DoctorsName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Full name is required",
          },
          notEmpty: {
            msg: "Provide the full name",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Provide the valid email",
          },
        },
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          notNull: {
            msg: "specialization is required",
          },
          isAlpha: {
            msg: "Provide the valid specialization",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Phone number is required",
          },
          isNumeric: {
            msg: "Provide the valid phone number",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

        },{
            sequelize:db,
            tableName:'doctor'
        }
      );

      DoctorInstance.hasMany(ReportInstance, { foreignKey: 'createdBy', as: 'reports' })
      ReportInstance.belongsTo(DoctorInstance, { foreignKey: 'createdBy', as: 'doctor' })
      
