import { DataTypes, Model } from "sequelize";
import db from '../config/database.config'


interface ReportAttributes
{
patientId: string,
patientName: String,
age: Number,
hospitalName: String,
weight: String,
height: String,
bloodGroup: String,
genotype: String,
bloodPressure: String,
HIV_status: String,
hepatitis: String
createdBy: String
}

export class ReportInstance extends Model<ReportAttributes>{}

ReportInstance.init({
  patientId: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  hospitalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  height: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bloodGroup: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genotype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bloodPressure: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  HIV_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hepatitis: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  },{
      sequelize:db,
      tableName:'report'
  }
);

