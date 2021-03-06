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
 Dynamsoft.WebTwainEnv.ProductKey = 'DEE52F0B6753A79C5407847705EA761D2C4A73AC59F8A9FC0C7981BCF45BA557793924974AF8D43D63ECFBA737D69AE86FDCC2560F8146EDF3C254B5C4968E51B0419D5051EADAD70F45CBC9C796B127CFD6C830C0B8D1D937DDBC2860E58DAB325838ECECDB1D5C8726300C397799C53B4BFDA5F2A46643C2ED7E5EBF769A4D104C481826365C56AAB8835F2CE96D64073BBA04494912DAED014CFBE6A6296192AC727D0443CA0CE7AA80DE27659A59';

Dynamsoft.WebTwainEnv.Trial = true;


Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB = false;
//Dynamsoft.WebTwainEnv.ResourcesPath = 'Resources';
// All callbacks are defined in the dynamsoft.webtwain.install.js file, you can customize them.
// Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', function(){
// 		// webtwain has been inited
// });