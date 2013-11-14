// ==UserScript==
// @name		login http://www.freelancer.com/
// @namespace	http://use.i.E.your.homepage/
// @version		0.1
// @description	login http://www.freelancer.com/
// @match		https://www.freelancer.com/*
// @match		http://www.freelancer.com/*
// @require		https://cdn.jsdelivr.net/jquery.cookie/1.3.1/jquery.cookie.js
// @copyright	2012+, You
// ==/UserScript==

var userParentSelector = 'body';
var userSelectionId = "user";
var userSelector = '#' + userSelectionId;
var profileSelectionId = "profile";
var profileSelector = '#' + profileSelectionId;
var userLinkSelector = '.user-name-link';
var logoutSelector = 'a:contains(Logout)';
var userSelectedCookie = 'selectedUser';
var autoLoginCookie = 'autoLogin';

var proposal = '*[name=descr]';
var bid = '#place-bid';
submitProposal = 'button:contains("Submit Proposal")';

setTimeout(function() {
	jQuery('.login-btn').click(function(){
		loginUser(jQuery(userSelector));
	});

	var selectElement = 'select';

	jQuery(userParentSelector).append('<' + selectElement + '/>');
	jQuery(selectElement + ':last').attr('id', userSelectionId);
	jQuery(userSelector).attr('accesskey', 'a');
	for(var login in logins) {
		jQuery(userSelector).append('<option ' + '' +'>' + logins[login].user + '</option>');
		if (logins[login].user == jQuery.cookie(userSelectedCookie)) {
			jQuery(userSelector + ' option:last').attr('selected', true);
		}
		jQuery(userSelector + ' option:last').attr('value', logins[login].user);
	}

	jQuery(userSelector).css("position", "fixed").css("top", 50).css("left", 0);
	
	jQuery(userSelector).change(switchUser);

	jQuery(userParentSelector).append('<' + selectElement + '/>');
	jQuery(selectElement + ':last').attr('id', profileSelectionId);
	jQuery(profileSelector).attr('accesskey', 'p');
	for(var profile in profiles) {
		jQuery(profileSelector).append('<option ' + '' +'>' + profiles[profile].display + '</option>');
		jQuery(profileSelector + ' option:last').attr('value', profiles[profile].value);
	}

	jQuery(profileSelector).css("position", "fixed").css("top", 150).css("left", 0);

	jQuery(profileSelector).change(switchProfile);

	if (jQuery('.login-btn').length>0 && jQuery.cookie(autoLoginCookie) != null) {
		jQuery.removeCookie(autoLoginCookie);
		loginUser(jQuery(userSelector));
	}

	jQuery(submitProposal).click( function() {
		jQuery(proposal).val(jQuery(profileSelector).val());
	});

	jQuery(bid).click( function() {
		jQuery(proposal).val(jQuery(profileSelector).val());
	});
}, 3000);

function loginUser(loginSelect) {
	jQuery.cookie(userSelectedCookie, loginSelect.val(), {path: '/'});
	jQuery('.username').val(loginSelect.val());
	for(login in logins) {
		if (logins[login].user == loginSelect.val()) {
			jQuery('.password').val(logins[login].password);
			break;
		}
	}
	jQuery('#login-bt').click();
}

function switchProfile() {
	jQuery(proposal).val(jQuery(this).val());
	jQuery(bid).click();
}

function switchUser() {
	jQuery.cookie(autoLoginCookie, '', {path: '/'});

	if (jQuery('.login-btn').length > 0) {
		jQuery('.login-btn').click();
		loginUser(jQuery(this));
	}
	else {
		jQuery.cookie(userSelectedCookie, jQuery(userSelector).val(), {path: '/'});
		if (jQuery(logoutSelector).length == 0) {
			jQuery(userLinkSelector).click();
		}
		if (jQuery(logoutSelector).length > 0) {
			jQuery(logoutSelector)[0].click();
		}
	}
}

logins = 
[
	{
		user: "rbahuguna",
		password: 'password'
	},
	{
		user: "rbahugunadev",
		password: 'password'
	},
	{
		user: "rajeevbqa",
		password: 'password'
	},
	{
		user: "rbahugunajs",
		password: 'password'
	},
	{
		user: "rajeevdeveloper",
		password: 'password'
	},
];

profiles =
[
	{
		display: 'Java',
		value: 'I have experience using java J2EE extensively for web development. I am experienced in latest technologies including web services, ajax, jquery, CSS3, HTML5, hibernate, spring. I have experience using several application servers - both open source and commercial grade. I also have experience using Oracle 11, SQLServer 12, MySQL databases. Please consider me for this assignment'
	},
	{
		display: 'General',
		value: 'I have long experience in web application development. I am experienced in latest technologies including PHP, Java, .NET, web services, ajax, jquery, CSS3, HTML5. I have experience using several application servers - both open source and commercial grade. I also have experience using Oracle 11, SQLServer 12, MySQL databases. Please consider me for this assignment'
	}
]