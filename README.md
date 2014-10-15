Mexbalia

Google Drive Connector for SAP HANA

1. Crear una cuenta de Google, que se usará para subir los archivos a SAP HANA. 

![](https://github.com/suecarmol/gDrive_P1/blob/master/screencaps/ScreenCap1.png)

2. Acceder a https://www.console.developers.google.com con el usuario y contraseña de la cuenta de Google que se creó.

3. Crear un nuevo proyecto.

4. En el menú izquierdo, seleccionar *APIs & auth*.

5. En la lista de las APIs disponibles, activar Drive API y Drive SDK.

![](https://github.com/suecarmol/gDrive_P1/blob/master/screencaps/ScreenCap2.png)

6. Acceder a la pestaña de Credentials y crear un nuevo ID de cliente.

7. En el campo "Authorized JavaScript origins" poner el host donde estará hospedada la aplicación. Si hay más de un origen, poner uno por línea.

8. En el campo "Authorized redirect URI" se puede poner: https://www.googleapis.com/auth/drive

![](https://github.com/suecarmol/gDrive_P1/blob/master/screencaps/ScreenCap3.png)

9. Crear una nueva llave para "Public API access" de tipo "Browser key".

10. Dentro de la configuración del archivo de javascript (js/config.js), copiar y pegar el ClientID y el valor de ApiKey.

11. Terminar de configurar la aplicación en el menú izquierdo "Consent screen".
