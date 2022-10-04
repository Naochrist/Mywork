function findDuplicateTransactions(transactions) {

//Confirm if transaction exist
    if (transactions === null || transactions === "") {
      throw new Error("Invalid transaction");
    }
  // convert transaction into an array for manipulation
    let transactionArr = [...transactions];

//confirm the the type of transaction Array
    if (typeof transactionArr !== "object") {
      throw new Error("Invalid Input");
    }

//sort transaction based on time difference between same duplicate transaction
    transactionArr.sort((a, b) => new Date(a.time) - new Date(b.time));

//    
    let duplicates = []; //
    let match = [];
    let src, dst;
    while (transactionArr.length > 1) {
      src = 0; //source
      dst = 1; //destination
      match = [src];
      while (
        new Date(transactionArr[dst].time) -
          new Date(transactionArr[src].time) <=
          60000 &&
        src < transactionArr.length - 1
      ) { //
        if (compare_equal(transactionArr[src], transactionArr[dst])) {
          match.push(dst);
          src = dst;
        }
        dst += 1;
        if (dst === transactionArr.length) {
          break;
        }
      }
  
      if (match.length > 1) {
        let temp = [];
        while (match.length) {
          let item = transactionArr.splice(match.pop(), 1);
          temp.unshift(item[0]);
        }
        duplicates.push(temp);
        match = [];
      } else {
        transactionArr.shift();
      }
  
      if (transactionArr.length == 1) {
        break;
      }
    }
    return duplicates;
  }
  
  function compare_equal(a, b) {
    if (
      a.sourceAccount === b.sourceAccount &&
      a.targetAccount === b.targetAccount &&
      a.amount === b.amount &&
      a.category === b.category
    ) {
      return true;
    } else {
      return false;
    }
  }
  
  export default findDuplicateTransactions; 
