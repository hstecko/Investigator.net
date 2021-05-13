function update(cusip, year, quarter) {
var req = new XMLHttpRequest();
var url = "Api?page=company&identifier="+cusip+ "&year="+year + "&quarter="+quarter
req.overrideMimeType("application/json");
req.open('GET', url, false);
req.onload  = function() {
     console.log(url);
     var jsonResponse = JSON.parse(req.responseText);
     console.log(jsonResponse.numOfOwners);
     populateSummaryStats(jsonResponse);
};
req.send();
}

//populates summary stats table
function populateSummaryStats(json) {
var summaryStats = jq3$(".metricVals");
console.log(summaryStats);
summaryStats[0].innerText = json.numOfOwners
summaryStats[1].innerText = json.sharesHeldByInstitutions
summaryStats[2].innerText = json.numOfBuyers
summaryStats[3].innerText = json.numOfSellers
summaryStats[4].innerText = json.numOfOpened
summaryStats[5].innerText = json.numOfClosed
summaryStats[6].innerText = json.annualChangeInInstitutionalOwnership
summaryStats[7].innerText = json.quarterlyChangeInInstitutionalOwnership
summaryStats[8].innerText = json.netBuys
summaryStats[9].innerText = json.netPurchases
summaryStats[10].innerText = json.controllingOwners
summaryStats[11].innerText = json.top3Shareholders
}







