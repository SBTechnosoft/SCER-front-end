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
 Dynamsoft.WebTwainEnv.ProductKey = '9893F0CD9B3292C1792E062DE224FCA3D7C013369D78360608B2E524B573EDFCFDBDC5E3C5B7C1505AA72FB61D473B2687528FC76B9917621A90C6FA4F14C9D4DF8037F63A970B279A15B70D3AF19DFDCB3CACACB469A0FB2C7369BE272BB2C65C678AB76101C7F60B9B0ECD';

Dynamsoft.WebTwainEnv.Trial = true;


Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB = false;
//Dynamsoft.WebTwainEnv.ResourcesPath = 'Resources';
// All callbacks are defined in the dynamsoft.webtwain.install.js file, you can customize them.
// Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', function(){
// 		// webtwain has been inited
// });