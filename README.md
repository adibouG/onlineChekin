1- OnlineCheckin: PWA application Web/mobile

FrontEnd using the onlineCheckingBackend services. If this backend contains a valid reservation (that can be checked in and within the date offset) is found , an email is triggered.

This email contains a link (tokenized for a single personal uses and for 2 hours of validity, valididty values from setting) sllowing the access the checkin app generic entry point/page. At this generic page load, the token get verified and user is redirected to the customized welcome page (data, stuyyles , etc... setup and pre-filled according to the user case) . And the "commercial" flow can start.

Ivarious steps are offered to finalize registartion and payment, once the flow finish and is succeesfully validated, a QRcode is generated , on the screen and sent by email too.

If you reuse the link while valid, the prechecked reservation is still retrievd but you re notified that it is already prechcked and allows you to continue in order to update values .

In the DEMO MODE instead of sending a new 2nd QRcode , this 2nd time end up with the reset of the reservation values and state in the db to eaily porovide a new DEMO flown without access to the backend or manual change


![success page mobile version - screenshot](https://github.com/adibouG/adibouG/blob/main/Pre-check-in-GUI.jpeg) 

![success page mobile version - screenshot](https://github.com/adibouG/adibouG/blob/main/Online%20Pre-Check-In%20-%20online%20check-in%20for%20hotels%20-%20Enzosystems.png) 

![success page mobile version - screenshot](https://github.com/adibouG/adibouG/blob/main/Online%20Pre-Check-In%20-%20Enzosystems.png) 
