function closeresource(r){
    if(r){
        try{
            r.close();
        }catch(e){
            
        }
    }
}

function getStatusCode(msg){
    var m = msg.match('\\:\\s(\\d+)\\s\\-');
    return (m) ? parseInt(m[1], 10) : null;
}

var connection = $.db.getConnection();

try{
    var qry = 'CALL "GDRIVE"."gDrive.Classifier::ClassifyGDrive"()';
    var clasifica = connection.prepareStatement(qry);
    clasifica.execute();
    $.response.setBody('OK');
    $.response.status = $.net.http.OK;

}catch(e){
    var code = getStatusCode(e.message);
    if(code && code ===301){
        $.response.setBody('unique constraint violated');
    }else{
        $.response.setBody('No se pudo clasificar ' + e);
    }
    $.response.status = $.net.http.BAD_REQUEST;
}

finally{
	connection.commit();
	closeresource(clasifica);
    closeresource(connection);
}