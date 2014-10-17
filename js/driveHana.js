var files = [];
var cont = 0;
var MAX_RESULTS = 50;
var mail = "";

$.support.cors = true;

function autentica(){
    
    gapi.client.setApiKey(apiKey);
    gapi.auth.authorize(config, function(){
	
		gapi.client.load('drive', 'v2', function(){

			var reqMail = gapi.client.drive.about.get();
				reqMail.execute(function(respMail){
					mail = respMail.user.emailAddress;

				    var req = gapi.client.drive.files.list({q: "trashed=false", maxResults: MAX_RESULTS});
					    req.execute(function(resp){
					    	bootbox.confirm('Are you sure?', function(e){
					    		if (e) {
					    			archivos(resp, mail);
					    		};
					    	});
						
					    });

				})
		});
    });
}



function archivos(respuesta, mail){
    
	for (i=0; i<respuesta.items.length; i++) {
	    var titulo = respuesta.items[i].title;
	    //var autor = respuesta.items[i].ownerNames;
	    var autor = mail;
	    var fileId = respuesta.items[i].id;
	    var fileExt = respuesta.items[i].fileExtension;
	    var mime = respuesta.items[i].mimeType;
	    var download = respuesta.items[i].downloadUrl;
	    
        if (download && mime == "text/plain"){
    		files.push({
    		    "titulo": titulo,
    		    "link": download, 
    		    "ext": fileExt,
    		    "id": fileId, 
    		    "autor": autor
    		    });
	    }

	    MAX_RESULTS = files.length;

	}

	getArchivos(files);
}



function getArchivos(archivos){

	var t = $("#startCopy");
    	t.removeClass("btn-default");
		t.addClass("btn-warning");
		t[0].disabled = true;    
		t[0].innerText = "Processing...";	


    var accessToken = gapi.auth.getToken().access_token;
    
    for (var j=0; j<archivos.length; j++){
        (function(j){
        	var dir = archivos[j].link;
        	var datos =[archivos[j].id, archivos[j].titulo, archivos[j].autor];

        	$.ajax({
        		url: dir,
        		type: "GET",
        		beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);},
        		success: function(data){
        			envio(datos, data.substring(0,400));
        		}
        	});

        })(j);
        
    }
	
}



function envio(encabezado,contenido){
	var y=contenido;
	var x = JSON.stringify(encabezado);

	$.ajax({
		url: "js/insertaTabla.xsjs",
		type: "POST",
		data: {'x':x, 'y':y},
		success: function(resp){
			cont += 1;
			verifica(cont);
		},
		error: function(rError){
			cont += 1;
			verifica(cont);
		}
	});

}


function verifica(reqCont){
	if (cont === MAX_RESULTS) {
		console.log("Clasifica")
		$.post("js/setClass.xsjs", function(e){
			console.log("Clasifico");
			document.location.href="dashboard.html";
		});
	};
}