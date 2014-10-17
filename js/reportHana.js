$(function(){
  gapi.client.setApiKey(apiKey);
  gapi.auth.authorize(config, function(){

    gapi.client.load('drive', 'v2', function(){

      var reqMail = gapi.client.drive.about.get();
        reqMail.execute(function(respMail){
          mail = respMail.user.emailAddress;
          console.log(mail);
          drawChart(mail);  
        });
    });
  });
});

function drawChart(mail){
  var oModelJSON = new sap.ui.model.json.JSONModel();
  var urlClass = "js/services.xsodata/documents/?$format=json&$select=CLASS, TOTAL";
    urlClass += "&$filter=AUTOR eq '"+mail+"'";

  oModelJSON.loadData(urlClass);

  sap.ui.getCore().setModel(oModelJSON);  


  var dataset = new sap.viz.ui5.data.FlattenedDataset({  
    dimensions : [  
      { axis : 1, name : 'Class', value : "{CLASS}" }
    ],  
    measures : [  
      { name : 'Total', value : '{TOTAL}' }  
    ],  
    data : { path : "/d/results" }  
  });  

  var oChart = new sap.viz.ui5.Pie("oChart",{
    width: "100%",
    height: "400px",
    dataset: dataset
  });

  oChart.placeAt("reportChart");
}

// var oChart = new sap.viz.ui5.Pie("oChart",{  
//   width : "100%",  
//   height : "400px",  
//   dataset : dataset  
// }).placeAt("reportChart");  