import express,{Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {DoctorInstance} from '../model/doctorModel';
import {string} from 'joi';

const secret = process.env.JWT_SECRET as string;

export async function auth(req:Request, res:Response, next:NextFunction){
    try{
        const authorization = req.headers.authorization;
        if(!authorization && !req.cookies.token){
            return res.status(401).json({
                Error: 'Kindly sign in as a user'
            }) 
        } 
        
    const token = authorization?.slice(7, authorization.length) as string || req.cookies.token

    let verified = jwt.verify(token, secret);

    if(!verified){
        return res.status(401).json({
            Error:'User not verified, you cant access this route'
        })
    }
   const {id} = verified as {[key:string]:string}
  
   const user = await DoctorInstance.findOne({where:{id}})

   if(!user){
       return res.status(404).json({
         Error:'User not verified'
       })
   }

req.user = id  
next()
return;
    } catch(error){
        return res.status(403).json({
            Error:'User not logged in'
        })
    }
}