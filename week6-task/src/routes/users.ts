import express from 'express'
const router = express.Router();
import {getDoctorsReports, loginDoctor, RegisterDoctor} from '../controller/doctorController'
import { auth } from '../middleware/auth';

router.get('/read', auth, getDoctorsReports)
router.post('/register',RegisterDoctor)
router.post('/login',loginDoctor)


export default router

