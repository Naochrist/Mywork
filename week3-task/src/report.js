const { getTrips, getDriver, getVehicle } = require('api');

/**
 * This function should return the data for drivers in the specified format
 *
 * Question 4
 *
 * @returns {any} Driver report data
 */

async function driverReport() {
  const reports = {};

  //get all trips
  //get all unique driver ids from trips
  //for all unique driver ids, prepare reportForm
    //get driver(fullName and phone) and get vehicle for each of their vehicles
  //loop over trips
  //for each trip, update reportForm
  //return reports

  
  // let dataTrips = await getTrips();
  // let arrayOutput = [];

  // let uniqueId = dataTrips.map((item) => item.driverID).filter((item, index, arr) => {
  //     return arr.indexOf(item) === index;
  //   });

  

  let data = await getTrips()
  let drivers =[]
for(let key of data){
  if(!drivers.includes(key.driverID)){
    drivers.push(key.driverID)
  }
}

let driverDetails =[]
for(let driver of drivers){
  driverDetails.push(getDriver(driver))
}
const resolved = await Promise.allSettled(driverDetails)

let nowAllFulfilled = resolved.filter(item => item.status === 'fulfilled')

  const driversTrip = data.reduce((acc, val) => {
    acc[val.driverID] = (acc[val.driverID] || 0 ) + 1
    return acc
  },{})

 const driverID = Object.keys(driversTrip)
 const tripNum = Object.values(driversTrip)
   
 vehicles = resolved.filter(item => item.status === "fulfilled")
   
 let newVehicles =vehicles.map(item => item.value.vehicleID)
 let vehicleCount = newVehicles.map(item => item.length)
  newVehicles = newVehicles.flat()
 let vehicleDetails = []
for(i of newVehicles){
  vehicleDetails.push(getVehicle(i))
}
//Resolving the  promises
 const resolvedVehicles = await Promise.allSettled(vehicleDetails)

 //Filtering the vehicles with rejected status 
 let nowAllFulfilledVehicle = resolvedVehicles.filter(item =>  item.status === 'fulfilled')
  
 //To get the vehicles Manufacturer
let vehiclesMaunufacturer = nowAllFulfilledVehicle.map((item) => item.value.manufacturer)

//TO get  the vehicles plate details
let vehiclesPlate = nowAllFulfilledVehicle.map((item) => item.value.plate)

let cash = data.reduce((acc, val) =>{
if(val.isCash === true){
  acc[val.driverID] = (acc[val.driverID] || 0 ) + 1
}
  return  acc
},{})
let noOfCash = Object.values(cash)

let notCash = data.reduce((acc, val) =>{
  if(val.isCash === false){
    acc[val.driverID] = (acc[val.driverID] || 0 ) + 1
  }
    return  acc
  },{})
  let noOfNonCash = Object.values(notCash)
  
  let totolAmountEarned = data.reduce((acc, val) =>{
      acc[val.driverID] = (acc[val.driverID] || 0) + parseFloat(val.billedAmount.toString().split(',').join(''))
  return  acc
},{})
let totalEarn = Object.values(totolAmountEarned)

  let totalCash = data.reduce((acc, val) =>{
    if(val.isCash === true){
      acc[val.driverID] = (acc[val.driverID] || 0 ) + parseFloat(val.billedAmount.toString().split(',').join(''))
    }
      return  acc
    },{})
    let CashInTotal = Object.values(totalCash)
    
    let totalNonCash = data.reduce((acc, val) =>{
      if(val.isCash === false){
        acc[val.driverID] = (acc[val.driverID] || 0 ) + parseFloat(val.billedAmount.toString().split(',').join(''))
      }
        return  acc
      },{})
    
let notCashInTotal = Object.values(totalNonCash)
let name = data.map(item =>  item.user.name)
let created = data.map(item =>  item.created)
let pickup = data.map(item => item.pickup)
let destination = data.map(item => item.destination)
let billed = data.map(item => Number(item.billedAmount.toString().split(',').join('')))
let isCash = data.map(item => item.isCash)

 let newData = driverID.map((acc, val, index) => {
  if(nowAllFulfilled[val] !== undefined){
  return {
    "fullName": nowAllFulfilled[val].value.name,
    "id":driverID[val],
    "phone": nowAllFulfilled[val].value.phone,
    "noOfTrips": tripNum[val],
    "noOfVehicles": vehicleCount[val],
    "vehicles":[
      {
        "plate": vehiclesPlate[val],
        "manufacturer":vehiclesMaunufacturer[val],
      }
    ],
    "noOfCashTrips":noOfCash[val],
    "noOfNonCashTrips":noOfNonCash[val],
    "totalAmountEarned":Number(totalEarn[val].toFixed(2)),
    "totalCashAmount": Number(CashInTotal[val]).toFixed(2),
    "totalNonCashAmount": notCashInTotal[val].toFixed(2),
    "trips": [
      {"user":name[val],
      "created":created[val],
      "pickup": pickup[val],
      "destination": destination[val],
      "billed": billed[val],
      "isCash": isCash[val]
      }
    ]
  }}
})
return newData


}


driverReport()
module.exports = driverReport;
