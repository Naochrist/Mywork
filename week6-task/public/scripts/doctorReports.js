const singleReportTemplate = document.getElementById('single-report')
const reportsList = document.getElementById('reports')

fetch('/users/read', {})
.then((res) => res.json())
.then((val) => {
    createReports(val.record.reports)
});

function createReports(arrayOfReports) {
    for (report of arrayOfReports) {
        createReport(report)
    }
}

function updateReport(report) {

    for (prop of Object.keys(report)){
        const query = `td[headers="${prop}"]`;
        const col = newReport.querySelector(query);
        col.innerText = report[prop]
    }
    
    
    //find the matching id in the html
    //update all the cols in the html, just like in create report
    //no new report, instead oldreport
}

function deleteReport(report) {
    //find the matching element
    //reportsList.removeChild(element)
}

function createReport(report) { 
    const newReport = singleReportTemplate.content.cloneNode(true);
    for (prop of Object.keys(report)){
        const query = `td[headers="${prop}"]`;
        const col = newReport.querySelector(query);
        col.innerText = report[prop]
    }
    newReport.setAttribute('id', report.patientId)
    const getUpdate = (id) => {
        //fetch for this id
        fetch().then(res => res.json()).then(data => updateReport(data.record))
    }
    editButton.addEventListener('click', getUpdate.bind(null, report.patientId)) 
    //find delete button, attach event listener
    reportsList.appendChild(newReport);
}