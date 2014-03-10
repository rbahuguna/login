// ==UserScript==
// @name       orgfree.freewebhostingarea
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  orgfree.freewebhostingarea
// @match      http://orgfree.freewebhostingarea.com/
// @match      http://144.76.99.197/cgi-bin/amanager.cgi
// @match      http://cloudcompute.6te.net/wp-admin/update.php*
// @copyright  2012+, You
// ==/UserScript==
var frm = document.forms["login"];
if (frm) {
	user=frm.login;
	user.value = "cloudcompute.6te.net"
	passwd=frm.passwd
	passwd.value="password";

	frm.target = "_top";
	frm.submit();
}
else{
	passwd=document.getElementById('password');
	passwd.value="Ra980101"
}