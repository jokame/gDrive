Google Drive Connector for SAP HANA

1. Create a google account that will be used for getting the user files. This is the "Google App". (Optional)

![](https://github.com/suecarmol/gDrive_P1/blob/master/screencaps/ScreenCap1.png)

2. Go to https://www.console.developers.google.com with the Google App credentials.

3. Make a new project.

4. On the left side, choose *APIs & auth*.

5. Activate *Drive API* y *Drive SDK*.

![](https://github.com/suecarmol/gDrive_P1/blob/master/screencaps/ScreenCap2.png)

6. Go to *Credentials* and create a new *client ID*.

7. Fill the *Authorized JavaScript origins* with the URL where your SAP HANA App will be hosted. You can use more than one *origin*, but it is just one per line.

8. In the *Authorized redirect URI* you can put something like: https://www.googleapis.com/auth/drive

![](https://github.com/suecarmol/gDrive_P1/blob/master/screencaps/ScreenCap3.png)

9. Create a new key for *Public API access*. Choose a *Browser key* type.

10. Copy and paste the ClientID and ApiKey from the Google App, to the configuration file in the SAP HANA App. This is located under *js/config.js*.

11. Finish the Google App configuration in the left menu *Consent screen*.