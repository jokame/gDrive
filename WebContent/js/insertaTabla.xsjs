var x = $.request.parameters.get("x");
var y = $.request.parameters.get("y");
//var y = $.request.body.asString();
var st = x.toString();
x = JSON.parse(st);
//var longitud = y.length;


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

var catalogo = connection.prepareStatement("upsert \"GDRIVE\".\"CATALOGO\" values (?,?,?,?) with primary key");
catalogo.setString(1,x[0]);
catalogo.setString(2,x[1]);
catalogo.setString(3,x[2]);
catalogo.setString(4,y);
catalogo.execute();
$.response.setBody('OK');
$.response.status = $.net.http.OK;


}catch(e){
    var code = getStatusCode(e.message);
    if(code && code ===301){
        $.response.setBody('unique constraint violated');
    }else{
        $.response.setBody('Error al insertar registro en CATALOGO:  ' + e);
    }
    $.response.status = $.net.http.BAD_REQUEST;
}

finally{
	connection.commit();
	closeresource(catalogo);
    closeresource(connection);
}