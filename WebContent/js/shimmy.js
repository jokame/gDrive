var files = [];
$.support.cors = true;

function autentica(){
    var config = {
	    'client_id': '485111268922-h2tvs4ue56khfa4hfpb8mm93iqfcv9bk.apps.googleusercontent.com',
	    
	    'scope': ['https://www.googleapis.com/auth/drive', 
	              'https://www.googleapis.com/auth/drive.appdata', 
	              'https://www.googleapis.com/auth/drive.apps.readonly', 
	              'https://www.googleapis.com/auth/drive.file', 
	              'https://www.googleapis.com/auth/drive.metadata.readonly', 
	              'https://www.googleapis.com/auth/drive.readonly']
	    
	    //'scope': 'https://www.googleapis.com/auth/drive'
    }
    
    var apiKey = 'AIzaSyC_IRpidAa-TiyNM2gqJd27tXhNdso0OoI';
    gapi.client.setApiKey(apiKey);
    
    gapi.auth.authorize(config, function(){
	
	gapi.client.load('drive', 'v2', function(){
	    var req = gapi.client.drive.files.list();
	    
	    req.execute(function(resp){
		archivos(resp);
		
	    });
	});
    });
}



function archivos(respuesta){
    
	for (i=0; i<respuesta.items.length; i++) {
	    var titulo = respuesta.items[i].title;
	    var autor = respuesta.items[i].ownerNames;
	    var fileId = respuesta.items[i].id;
	    var fileExt = respuesta.items[i].fileExtension;
	    
	    var download = respuesta.items[i].embedLink;
	    var expo = respuesta.items[i].exportLinks;
	    
	    if (expo && expo["text/plain"]){
	        console.log(titulo, autor, expo["text/plain"]);
    		files.push({"titulo": titulo, "link": download, 
    		    "ext": fileExt, "id": fileId, "autor": autor,
    		    "expo": expo["text/plain"], "cont": ""
    		    });
	    }
	    
	    //console.log("Archivos", files);

	}
	
	getArchivos(files);
}



function getArchivos(archivos){
	
    for (j=0; j<archivos.length; j++){
	var dir = archivos[j].expo;
	var datos = new Array(3);
	datos[0] = archivos[j].id;
	datos[1] = archivos[j].titulo;
	datos[2] = archivos[j].autor[0];
	//console.log(dir);
	//alert("sss");
	makeCorsRequest(dir);
	//alert("xxxx");
	
	/*$.get(dir).done(function(data){
		//console.log(data);
		envio(datos, data);
		});
	*/

    }
	
}