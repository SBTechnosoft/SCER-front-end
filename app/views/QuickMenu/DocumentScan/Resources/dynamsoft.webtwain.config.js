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
 Dynamsoft.WebTwainEnv.ProductKey = '3378ED8BBA8569CFDEDDFDAE3E113D7488F069D22CE25282A7ABAE3DB3574EBD0CAB8489FD9A98F12E341602114115D2F6E85757CB061FDA2593D6A5915A05317FB53FBF342BA42038DFC80F339A7E7399D5E34579E6E0AFE8E96140685177302FB2A63D44818F060E860EC9';

Dynamsoft.WebTwainEnv.Trial = true;


Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB = false;
//Dynamsoft.WebTwainEnv.ResourcesPath = 'Resources';
// All callbacks are defined in the dynamsoft.webtwain.install.js file, you can customize them.
// Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', function(){
// 		// webtwain has been inited
// });