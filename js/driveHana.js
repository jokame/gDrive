var files = [];

$.support.cors = true;

function autentica(){
    
    gapi.client.setApiKey(apiKey);
    
    gapi.auth.authorize(config, function(){
	
		gapi.client.load('drive', 'v2', function(){
		    var req = gapi.client.drive.files.list({q: "trashed=false", maxResults: 50});
		    
		    req.execute(function(resp){
		    	
		    	bootbox.confirm('Are you sure?', function(e){
		    		if (e) {
		    			archivos(resp);
		    		};
		    	});
			
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
	    var mime = respuesta.items[i].mimeType;
	    var download = respuesta.items[i].downloadUrl;

	    console.log(titulo);
	    
        if (download && mime == "text/plain"){
    		files.push({
    		    "titulo": titulo,
    		    "link": download, 
    		    "ext": fileExt,
    		    "id": fileId, 
    		    "autor": autor[0],
    		    "cont": ""
    		    });
	    }

	}

	getArchivos(files);
}



function getArchivos(archivos){
    
    var accessToken = gapi.auth.getToken().access_token;
    
    for (var j=0; j<archivos.length; j++){
        (function(j){
            var xhr = new XMLHttpRequest();
            
            var datos =[archivos[j].id, archivos[j].titulo, archivos[j].autor];
            
            xhr.onreadystatechange = function(){
                
                if (this.readyState == 4 && this.status == 200) {
                    archivos[j].cont = this.responseText;
                    envio(datos,this.responseText);
                }
            }
            
            xhr.open('GET', archivos[j].link);
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        	xhr.send();
        })(j);
        
    }
	
}



function envio(encabezado,contenido){
	var y=contenido;
	var x = JSON.stringify(encabezado);
	
	
	jQuery.ajax({url:"js/insertaTabla.xsjs",data:{'x':x, 'y':y},
		method:'POST',
		dataType:'json',
		success: function(result){console.log(result.d.results + "OK");}});

}