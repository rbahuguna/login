// ==UserScript==
// @name		login http://www.outlook.com/
// @namespace	http://use.i.E.your.homepage/
// @version		0.1
// @description	login http://www.outlook.com/
// @match		https://outlook.live.com/*
// @match		https://login.live.com/login.srf?*
// @match		https://login.live.com/ppsecure*
// @match		https://*.mail.live.com/*
// @match		https://signout.live.com/content/dam/imp/surfaces/mail_signout/*
// @match		http://in.msn.com/?ocid=mailsignout*
// @match		http://in.msn.com/*
// @match		http://www.msn.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @require		https://rawgithub.com/rbahuguna/login/master/utility.js
// @copyright	2012+, You
// ==/UserScript==

userLinkSelector = '#c_melink';
logoutSelector = 'a:contains("Sign out")';
meLink = '[class*="me-tileimg"]';

userSelectedCookie = 'selectedUser';
autoLoginCookie = 'autoLogin';

usernameSelector = '#i0116';
passwordSelector = '#i0118';
signInLink = '#idSIButton9';

function init() {
	var signIns = jQuery("a:contains('Sign in')");
	var signIn;
	for(var index = 0;index < signIns.length;index++) {
		var signInTemp = signIns[index];
		if (signInTemp.host.indexOf("outlook") >= 0) {
			signIn = signInTemp;
			break;
		}
	}

	var outlooks = jQuery("a:contains('Outlook')");
	var outlook;
	if (outlooks.length == 1 && outlooks[0].host.indexOf("outlook") >= 0) {
		outlook = outlooks[0];
	}
	if (signIn) {
		signIn.click();
	}
	else if (outlook) {
		outlook.click();
		close();
	}
	var userParentSelector = 'body';
	var userSelectionId = "user";
	var userSelector = '#' + userSelectionId;

	jQuery(signInLink).click(function(){
		fillAuthentication(jQuery(userSelector));
	});

	var userSelect = 'select';

	jQuery(userParentSelector).append('<' + userSelect + '/>');
	jQuery(userSelect + ':last').attr('id', userSelectionId);
	jQuery(userSelector).attr('accesskey', 'a');
	for(var userIndex = 0;userIndex < users.length;userIndex++) {
		jQuery(userSelector).append('<option ' + '' +'>' + users[userIndex].user + '</option>');
		if (users[userIndex].user == readCookie(userSelectedCookie)) {
			jQuery(userSelector + ' option:last').attr('selected', true);
		}
		jQuery(userSelector + ' option:last').attr('value', users[userIndex].user);
	}

	jQuery(userSelector).css("position", "fixed").css("top", 50).css("left", 350).css('z-index', 10);
	
	jQuery(userSelector).change(switchUser);

	if (jQuery(signInLink).length>0 && readCookie(autoLoginCookie) != null) {
		removeCookie(autoLoginCookie);
		jQuery(signInLink).click();
	}
}

function fillAuthentication(userSelect) {
	createCookie(userSelectedCookie, userSelect.val());

	jQuery(usernameSelector).val(userSelect.val());
	for(userIndex in users) {
		if (users[userIndex].user == userSelect.val()) {
			jQuery(passwordSelector).val(users[userIndex].password);
			break;
		}
	}
}

function switchUser() {
	createCookie(autoLoginCookie, '');

	if (jQuery(signInLink).length > 0) {
		jQuery(signInLink).click();
	}
	else {
		createCookie(userSelectedCookie, jQuery(this).val());
		if (jQuery(meLink).length) {
			jQuery(meLink).click();
		}
		if (jQuery(logoutSelector).length == 0) {
			jQuery(userLinkSelector).click();
		}
		if (jQuery(logoutSelector).length > 0) {
			jQuery(logoutSelector)[0].click();
		}
	}
}

users =
[
	{
		user: "r _ bahuguna hot mail",
		password: 'password'
	},
	{
		user: "rajeev . bahuguna out look",
		password: 'password'
	},
	{
		user: "rajeev . bahuguna . dev out look",
		password: 'password'
	},
	{
		user: "rajeev . bahuguna . java out look",
		password: 'password'
	},
	{
		user: "rajeev . bahuguna . developer out look",
		password: 'password'
	},
	{
		user: "rajeev . bahuguna . seema out look",
		password: 'password'
	},
	{
		user: "rajeev . bahuguna . naukri out look",
		password: 'password'
	},
];

init();