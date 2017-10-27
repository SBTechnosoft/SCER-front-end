//
// Dynamsoft JavaScript Library for Basic Initiation of Dynamic Web TWAIN
// More info on DWT: http://www.dynamsoft.com/Products/WebTWAIN_Overview.aspx
//
// Copyright 2016, Dynamsoft Corporation 
// Author: Dynamsoft Team
// Version: 12.1
//
// <reference path="dynamsoft.webtwain.initiate.js" />
var Dynamsoft = Dynamsoft || { WebTwainEnv: {} };

Dynamsoft.WebTwainEnv.AutoLoad = true;

Dynamsoft.WebTwainEnv.ResourcesPath = 'app/views/QuickMenu/DocumentScan/Resources';

Dynamsoft.WebTwainEnv.Containers = [{ContainerId:'dwtcontrolContainer', Width:'560px', Height:'600px'}];


 // Dynamsoft.WebTwainEnv.ProductKey = 't0068MgAAACeu/ikM+76C3+Jnx5t9JForZMAWXJHn67KiW8080sTlb/sHRs6sKMhAHE191Ii91gAvGJ0BMW4lxn/TBMEXf2w=';
 Dynamsoft.WebTwainEnv.ProductKey = 'AE37392CC96F0E5006A0085A116FD4D47EC096B81DE8F5AC0B216006961092E4917C7FF6E8A736795E3E176CEB7E99959013B0A13B7FBBA95E912210A71B03D9D79433A3ADC874B3B976D0682CF3F00733F72FE29037810D4CF47E6C1D0F0DBB0D6282F442986C100D0A0EB6';

Dynamsoft.WebTwainEnv.Trial = true;


Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB = false;
//Dynamsoft.WebTwainEnv.ResourcesPath = 'Resources';
// All callbacks are defined in the dynamsoft.webtwain.install.js file, you can customize them.
// Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', function(){
// 		// webtwain has been inited
// });