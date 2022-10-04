const { getTrips, getDriver } = require('api');

/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */
async function analysis() {
  // Your code goes here
  
  let noOfCashTrips = 0;
  let noOfNonCashTrips = 0;
  let billedTotal =0;
  let cashBilledTotal = 0;
  let nonCashBilledTotal = 0;
  const allDriverIDs = []
  

  
  const trips = await getTrips();
  let billedAmt;
  trips.forEach(trip => {
    allDriverIDs.push(trip.driverID)
    billedAmt = parseFloat(String(trip.billedAmount).split(",").join(""));
    billedTotal += parseFloat(billedAmt);
    if(trip.isCash){
      noOfCashTrips++
      cashBilledTotal += Number(billedAmt)

    } else {
      noOfNonCashTrips++
      nonCashBilledTotal += billedAmt
    }
    
  });


  let uniqueDrivers = [...new Set(allDriverIDs)]
uniqueDrivers

 // Number of drivers with more than one vehicle.
 let driverInfomation = {}

 uniqueDrivers.forEach((driver) => {
  driverInfomation[driver] = getDriver(driver)
 })



 let driversInfomationArray = await Promise.allSettled(Object.values(driverInfomation))


let resolvedDriverInfomation = {}

uniqueDrivers.forEach((driverID, i) => {
  resolvedDriverInfomation[driverID] = driversInfomationArray[i]
})


let noOfDriversWithMoreThanOneVehicle = 0;
  
  driversInfomationArray.forEach((info) => {
    if (info.status === "fulfilled") {
      if(info.value.vehicleID.length > 1) {
        noOfDriversWithMoreThanOneVehicle++
      }
    }
  })


  // Most Trips By Driver
  let noOfTripsOfDrivers = {}

  uniqueDrivers.forEach((id) => {
    noOfTripsOfDrivers[id] = trips.filter((trip) => trip.driverID === id).length
  })

  let mostTrips = 0
  let idOfDriverWithTheMostTrip = ""
  for (let driverID in noOfTripsOfDrivers) {
    if (noOfTripsOfDrivers[driverID] > mostTrips) {
      idOfDriverWithTheMostTrip = driverID
      mostTrips = noOfTripsOfDrivers[driverID]
    } 
  }

  let driverWithTheMostTripsInfo = resolvedDriverInfomation[idOfDriverWithTheMostTrip]


  // Highest Earner
  let earningsOfAllDrivers = {}

  uniqueDrivers.forEach((id) => {
    earningsOfAllDrivers[id] = trips.filter((trip) => trip.driverID === id).reduce((accumulator, current) => {
      return accumulator + parseFloat(String(current.billedAmount).split(",").join(""))
    }, 0)
  })

  let highestAmount = 0
  let idOfHighestEarningDriver = ""
  for (let driverID in earningsOfAllDrivers) {
    if (earningsOfAllDrivers[driverID] > highestAmount) {
      highestAmount = earningsOfAllDrivers[driverID]
      idOfHighestEarningDriver = driverID
    }
  }

  let highestEarningDriver = resolvedDriverInfomation[idOfHighestEarningDriver]

  return {
    noOfCashTrips,
    noOfNonCashTrips,
    billedTotal: parseFloat(billedTotal.toFixed(2)),
    cashBilledTotal,
    nonCashBilledTotal: parseFloat(nonCashBilledTotal.toFixed(2)),

    noOfDriversWithMoreThanOneVehicle: noOfDriversWithMoreThanOneVehicle,
    mostTripsByDriver: {
      name: driverWithTheMostTripsInfo.value.name,
      email: driverWithTheMostTripsInfo.value.email,
      phone: driverWithTheMostTripsInfo.value.phone,
      noOfTrips: noOfTripsOfDrivers[idOfDriverWithTheMostTrip],
      totalAmountEarned: trips.filter((trip) => trip.driverID === idOfDriverWithTheMostTrip).reduce((accumulator, current) => {
        return accumulator + parseFloat(String(current.billedAmount).split(",").join(""))
      }, 0)
    },
    highestEarningDriver: {
      name: highestEarningDriver.value.name,
      email: highestEarningDriver.value.email,
      phone: highestEarningDriver.value.phone,
      noOfTrips: noOfTripsOfDrivers[idOfHighestEarningDriver],
      totalAmountEarned: earningsOfAllDrivers[idOfHighestEarningDriver]
    }
  }
}

// const res = await analysis()
// res
module.exports = analysis;

