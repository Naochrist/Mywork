interface PassengerInt {
  name: string;
  location: string;
}
interface Output {
  boarded: object[];
  reservation: object[];
  count: number;
}
let locations: string[] = ["Abuja", "Benue", "Katsina", "Lagos", "Sambisa"];
let passangerGenerator = function (passengers: number): object[] {
  let passengerArr: object[] = [];
  for (let i = 0; i < passengers; i++) {
    let passenger: PassengerInt = {
      name: "",
      location: "",
    };
    let locationIndex = i % 5;
    let passengerIndex = i + 1;
    passenger.location = locations[locationIndex];
    passenger.name = `passenger${passengerIndex}`;
    passengerArr.push(passenger);
  }
    console.log(passengerArr);
  return passengerArr;
};
const taskOne = (passengers: number, shuffle: number) => {
  // complete your work here
  let output: Output = {
    boarded: [],
    reservation: [],
    count: 0,
  };
  let totalPassengers = passangerGenerator(passengers);
    console.log(totalPassengers);
  if (totalPassengers.length < 5) {
    totalPassengers.forEach((el) => output.reservation.push(el));
    return output;
  }
  if (totalPassengers.length <= 50 && totalPassengers.length >= 5) {
    let remainder: number = totalPassengers.length % 5;
    let extraPassengers: object[] = totalPassengers.splice(
      totalPassengers.length - remainder
    );
    extraPassengers.forEach((el) => output.reservation.push(el));
    totalPassengers.forEach((el) => output.boarded.push(el));
    output.count += 1;
    // console.log(output);
    return output;
  }
  if (totalPassengers.length > 50 && shuffle <= 0) {
    let extraPassengers: object[] = totalPassengers.splice(50);
    extraPassengers.forEach((el) => output.reservation.push(el));
    totalPassengers.forEach((el) => output.boarded.push(el));
    output.count += 1;
    console.log(output);
    return output;
  }
  if (totalPassengers.length > 50 && shuffle > 0) {
    shuffle += 1;
    while (totalPassengers.length > 50 && shuffle > 1) {
      shuffle -= 1;
      output.count += 1;
      totalPassengers = totalPassengers.splice(50);
    }
      if (shuffle > 1) {
      let remainder: number = totalPassengers.length % 5;
      let extraPassengers: object[] = totalPassengers.splice(
        totalPassengers.length - remainder
      );
      extraPassengers.forEach((el) => output.reservation.push(el));
      totalPassengers.forEach((el) => output.boarded.push(el));
      output.count += 1;
      shuffle -= 1;
      //   console.log(shuffle)
      } else {
           console.log(totalPassengers)
      let extraPassengers = totalPassengers.splice(50);
      //   console.log(totalPassengers);
      totalPassengers.forEach((el) => output.boarded.push(el));
      extraPassengers.forEach((el) => output.reservation.push(el));
      output.count += 1;
      shuffle -= 1;
    }
  }
  return output;

}
export default taskOne;

console.log(taskOne(50,1));``