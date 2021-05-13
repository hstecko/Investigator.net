var fs = require('fs');
var institutionSample = fs.readFileSync('./institutionSample.json', 'utf-8', 'r+');
institutionSample =JSON.parse(institutionSample);
    

for(var i = 0; i < institutionSample.length; i++) {
    
    var div = document.createElement("div");
    div.innerHTML = institutionSample[i].division;
    barchartHTML.appendChild(div);
}

 google.charts.load('current', {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function fillChart(institutionSample){
      var data = google.visualization.arrayToDataTable([
        ['Industry', 'Agriculture', 'Finance', 'Services', 'Manufacturing',
         'Utilities', 'Technology', { role: 'annotation' } ],
        ['2017', 10, 24, 20, 32, 18, 5, ''],
        ['2018', 10, 24, 20, 32, 18, 5, ''],
        ['2019', 10, 24, 20, 32, 18, 5, ''],
        ['2020', 16, 22, 23, 30, 16, 9, ''],
        ['2021', 28, 19, 29, 30, 12, 13, '']
      ]);

      var options = {
        width: 600,
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        bar: {groupWidth: '75%'},
        bars: 'vertical',
        isStacked: true,
        backgroundColor: 'transparent',
        chartArea: {left:'20%',top:'10%',width:'75%',height:'75%'},
        legend: { position: 'bottom', alignment: 'end'  }
      };
      var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_stacked'));
      chart.draw(data, options);
  }

function fillChart(institutionSample) {
    
var barchartHTML = document.getElementById("columnchart_stacked");


}