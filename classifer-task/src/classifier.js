const  classifier = (input) => {
  //Check the input from Array
  if (!Array.isArray(input)) {
      throw Error;
    }
    if (!input.length) {
      return { noOfGroups: 0 };
    }
  //We want to modify our input
    const newArr = [...input];
  
    // calculate age of the member from input
    const modifiedContent = newArr.map((element) => ({
      name: element.name,
      age: calcAge(element.dob),//calling CalcAgeFunction inside
      regNo: element.regNo,
      dob: element.dob,
    }));
  
    // sort array by age
    const sortedInfo = modifiedContent.sort(function (compareA, compareB) {
      return compareA.age - compareB.age;
    });
  
    //initialize 1st group with the first student in the sorted array
    let group = [sortedInfo[0]];
    let studentGroup = [];
  
    // sort group by age difference and group length
    for (let i = 1; i < modifiedContent.length; i++) {
      if (sortedInfo[i].age - group[0].age <= 5 && group.length <= 2) {
        group.push(modifiedContent[i]);
      } else {
        studentGroup.push(group);
        group = [];
        group.push(modifiedContent[i]);
      }
    }
  
    // last group in the StudentGroups
    if (group.length) {
      studentGroup.push(group);
    }
  
    // set noOfGroups key
    let output = {};
    output.noOfGroups = studentGroup.length;
  
    // format groups based on output requirement
    const groupOutput = studentGroup.map(function (group) {
      return {
        members: group.map((member) => ({
          name: member.name,
          age: member.age,
          dob: member.dob,
          regNo: member.regNo,
        })),
        oldest: group[group.length - 1].age,
        sum: group.reduce((acc, el) => {
          return acc + el.age;
        }, 0),
        regNos: group
          .map((element) => Number(element.regNo))
          .sort(function (a, b) {
            return a - b;
          }),
      };
    });
  
    // set output key for each group
    groupOutput.forEach((group, idx) => {
      let currentGroup = `group${idx + 1}`;
      output = { ...output, [currentGroup]: group };
      console.log(output);
    });
  
    return output;
  }
  
  // function to calculate age
  function calcAge(year) {
    const date = new Date(year);
    return new Date().getFullYear() - new Date(year).getFullYear();
  }
  console.log(
    classifier([
      {
        name: "Hendrick",
        dob: "1853-07-18T00:00:00.000Z",
        regNo: "041",
      },
      {
        name: "Albert",
        dob: "1879-03-14T00:00:00.000Z",
        regNo: "033",
      },
      {
        name: "Marie",
        dob: "1867-11-07T00:00:00.000Z",
        regNo: "024",
      },
      {
        name: "Neils",
        dob: "1885-10-07T00:00:00.000Z",
        regNo: "02",
      },
      {
        name: "Max",
        dob: "1858-04-23T00:00:00.000Z",
        regNo: "014",
      },
      {
        name: "Erwin",
        dob: "1887-08-12T00:00:00.000Z",
        regNo: "09",
      },
      {
        name: "Auguste",
        dob: "1884-01-28T00:00:00.000Z",
        regNo: "08",
      },
      {
        name: "Karl",
        dob: "1901-12-05T00:00:00.000Z",
        regNo: "120",
      },
      {
        name: "Louis", //
        dob: "1892-08-15T00:00:00.000Z",
        regNo: "022",
      },
      {
        name: "Arthur",
        dob: "1892-09-10T00:00:00.000Z",
        regNo: "321",
      },
      {
        name: "Paul",
        dob: "1902-08-08T00:00:00.000Z",
        regNo: "055",
      },
      {
        name: "William",
        dob: "1890-03-31T00:00:00.000Z",
        regNo: "013",
      },
      {
        name: "Owen",
        dob: "1879-04-26T00:00:00.000Z",
        regNo: "052",
      },
      {
        name: "Martin",
        dob: "1871-02-15T00:00:00.000Z",
        regNo: "063",
      },
      {
        name: "Guye",
        dob: "1866-10-15T00:00:00.000Z",
        regNo: "084",
      },
      {
        name: "Charles",
        dob: "1868-02-14T00:00:00.000Z",
        regNo: "091",
      },
    ])
  );
  
  //
  
  
  
  export default classifier;