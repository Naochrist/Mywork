import express from 'express'
import {auth} from '../middleware/auth'

const router = express.Router();

import {Record,getRecord,getSingleRecord,updateRecord,deleteRecord} from '../controller/reportController'

router.post('/create',auth, Record);
router.get('/read',auth, getRecord)
router.get('/read/:id',auth, getSingleRecord)
router.patch('/update/:id',auth,updateRecord)
router.delete('/delete/:id',auth,deleteRecord)


export default router

