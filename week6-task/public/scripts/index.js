// Fetch all reports
// Creat a list of report and add to the html
 
fetch('/records/read', {})
.then((res) => res.json())
.then((val) => {
    createReports(val.record)
});

function createReports(arrayOfReports) {
    //get element that holds reports
    for (report of arrayOfReports) {
        //create a html element for a report using
        //report.patientId etc
        createReport(report)
        //append element to the one that holds reports
    }
}

function updateReport(report) { 
    //find it by id in the html
    //update all the cols in the html
}