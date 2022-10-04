import {Request,Response,NextFunction}
 from 'express'
 import {v4 as uuidv4} from 'uuid'
 import {createReportSchema,options,updateReportSchema} from '../utils/utils'
 import {ReportInstance } from '../model/reportModel'
 

 export async function Record(
   req: Request,
   res: Response,
   next: NextFunction
 ) {
   // create a Record
   const id = uuidv4();
   let patient = { ...req.body, patientId: id, createdBy: req.user };
   try {
     const validateResult = createReportSchema.validate(req.body, options);
     if (validateResult.error) {
       return res
         .status(400)
         .json({ Error: validateResult.error.details[0].message });
     }
     const record = await ReportInstance.create(patient);
     return res
       .status(201)
       .json({ msg: "You have successfully created a patient report", record });
   } catch (err) {
     return res.status(500).json({
       msg: "Failed to create patient report",
       route: "/create",
     });
   }
 }
 
 // GET all Record 
 export async function getRecord(
   req: Request,
   res: Response,
   next: NextFunction
 ) {
   try {
     const limit = req.query?.limit as number | undefined;
     const offset = req.query?.offset as number | undefined;
     const record = await ReportInstance.findAndCountAll({ limit, offset });
     res.status(200).json({
       msg: "You have successfully fetch all patient report",
       count: record.count,
       record: record.rows,
     });
   } catch (err) {
     res.status(500).json({
       msg: "Failed to fetch all patient report",
       route: "/read",
     });
   }
 }
 
 export async function getSingleRecord(
   req: Request,
   res: Response,
   next: NextFunction
 ) {
   try {
     const { id } = req.params;
     const record = await ReportInstance.findOne({ where: { patientId: id } });
     res
       .status(200)
       .json({ msg: "You have successfully find your patient report", record });
   } catch (err) {
     res.status(500).json({
       msg: "Failed to read single patient report",
       route: "/read/:id",
     });
   }
 }
 
 /* UPDATE Record  */
 export async function updateRecord(
   req: Request,
   res: Response,
   next: NextFunction
 ) {
   try {
     const { id } = req.params;
     const {
       patientName,
       age,
       hospitalName,
       weight,
       height,
       bloodGroup,
       genotype,
       bloodPressure,
       HIV_status,
       hepatitis,
     } = req.body;
     const validateResult = updateReportSchema.validate(req.body, options);
     if (validateResult.error) {
       return res
         .status(400)
         .json({ Error: validateResult.error.details[0].message });
     }
 
     const record = await ReportInstance.findOne({ where: { patientId: id } });
     if (!record) {
       return res.status(404).json({
         Error: "Cannot find existing patient report",
       });
     }
     if(req.user !== record.getDataValue('createdBy')){
      return res.status(401).json({ msg: "Not authorized. Report belongs to another doctor" });
     }
     const updatedRecord = await record.update({
       patientName: patientName,
       age: age,
       hospitalName: hospitalName,
       weight: weight,
       height: height,
       bloodGroup: bloodGroup,
       genotype: genotype,
       bloodPressure: bloodPressure,
       HIV_status: HIV_status,
       hepatitis: hepatitis,
     });
     return res.status(202).json({
       msg: "You have successfully updated your patient report",
       record: updatedRecord,
     });
   } catch (err) {
     return res.status(500).json({
       msg: "Failed to update patient report",
       route: "/update/:id",
     });
   }
 }
 
 // DELETE Record
 export async function deleteRecord(
   req: Request,
   res: Response,
   next: NextFunction
 ) {
   try {
     const { id } = req.params;
     const record = await ReportInstance.findOne({ where: { patientId: id } });
     if (!record) {
       return res.status(404).json({ msg: "Can not find patient report" });
     }
     if(req.user !== record.getDataValue('createdBy')){
      return res.status(401).json({ msg: "Not authorized. Report belongs to another doctor" });
     }
     const deletedRecord = await record.destroy();
     return res
       .status(200)
       .json({ msg: "Successfully deleted patient report", deletedRecord });
   } catch (err) {
     return res.status(500).json({
       msg: "Failed to delete patient report",
       route: "/delete/:id",
     });
   }
 }
 
