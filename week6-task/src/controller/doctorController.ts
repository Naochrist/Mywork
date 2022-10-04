import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'
// import {DoctorInstance } from '../model/doctor'
import { DoctorInstance } from '../model/doctorModel'
import {
  registerSchema,
  loginSchema,
  options,
  generateToken,
} from '../utils/utils';
import bcrypt from "bcryptjs";
import { ReportInstance } from "../model/reportModel"



export async function RegisterDoctor(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const doctorId = uuidv4();
  // let users = { ...req.body, id };
  try {
    const validateResult = registerSchema.validate(req.body, options);
    if (validateResult.error) {
      return res
        .status(400)
        .json({ Error: validateResult.error.details[0].message });
    }

    console.log("before");
    const duplicateEmail = await DoctorInstance.findOne({
      where: { email: req.body.email },
    });
    console.log("after");
    if (duplicateEmail) {
      return res.status(409).json({ msg: "Email has been used by another doctor" });
    }

    const duplicatePhoneNumber = await DoctorInstance.findOne({
      where: { phone: req.body.phone },
    });

    if (duplicatePhoneNumber) {
      return res
        .status(409)
        .json({ msg: "Phone number has been used by another user" });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8);

    const doctors = {
      id: doctorId,
      DoctorsName: req.body.DoctorsName,
      email: req.body.email,
      specialization: req.body.specialization,
      gender: req.body.gender,
      phone: req.body.phone,
      password: passwordHash,
    };

    const record = await DoctorInstance.create(doctors);

    return res
      .status(200)
      .json({ msg: "You have successfully created a user", record });
  } catch (err) {
    return res.status(500).json({
      msg: "Failed to create user",
      route: "/register",
    });
  }
}

export async function loginDoctor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const doctorId = uuidv4();

  try {
    const validateResult = loginSchema.validate(req.body, options);
    if (validateResult.error) {
      return res
        .status(400)
        .json({ Error: validateResult.error.details[0].message });
    }

    const doctor = (await DoctorInstance.findOne({
      where: { email: req.body.email },
    })) as unknown as { [key: string]: string };

    // console.log(Doctor);

    const { id } = doctor;
    // console.log(id);

    //   console.log("before");
    const token = generateToken({ id });
    //   console.log("after");

    console.log(token);

    const validUser = await bcrypt.compare(req.body.password, doctor.password);
    if (!validUser) {
      return res.status(401).json({
        msg: "Incorrect password",
      });
    }
    res.cookie("token", token,{ maxAge:7*24*60*60*1000, sameSite: 'strict', httpOnly:true }) 
    return res.status(200).json({
        msg: "Login Successfully",
        token,
        doctor,
      });
  } catch (err) {
    return res.status(500).json({
      msg: "Failed to login",
      route: "/login",
    });
  }
}

export async function getDoctorsReports(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.user;
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    const record = await DoctorInstance.findOne({
      where: { id },
      include: [{ model: ReportInstance, as: "reports" }],
    });
    res.status(200).json({
      msg: "Doctor reports retrieved successfully",
      record: record
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: "Failed to fetch Doctor reports",
      route: "/read",
    });
  }
}



