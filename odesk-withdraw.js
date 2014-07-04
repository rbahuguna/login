// ==UserScript==
// @name		withdraw application on https://www.odesk.com/
// @namespace	http://use.i.E.your.homepage/
// @version		0.1
// @description	withdraw application on https://www.odesk.com/
// @match		https://www.odesk.com/*
// @copyright	2012+, You
// ==/UserScript==

setTimeout(function(){
	var applications=jQuery("#applications a[name*=job], #interviews a[id*=job], #invitations a[id*=job]")
	if (applications.length){
	    applications[0].click();
	}
}, 3000
);

var withdrawnDeclined = false;

var withdraw = jQuery("#withdrawApplicationLink");
withdraw.click()
jQuery('label:contains("Applied by mistake")').click()
jQuery('*[value="Withdraw Application"]').click()

var decline = jQuery("A:contains('Decline')");
decline.click();
jQuery('label:contains("Job is not a fit for my skills")').click();
jQuery('*[value="Decline"]').click();

archivedCurrentTab = jQuery("a.oTab.isCurrent:contains('Archived')");
activedTab = jQuery("a.oTab:contains('Active')");

if ( archivedCurrentTab.length == 1 && activedTab.length == 1 ) {
    activedTab[0].click();
}

var backToApplications = jQuery("A:contains('Back to My Job Applications')");
if (!withdraw.length && !decline.length && backToApplications.length) {
	backToApplications[0].click();
}