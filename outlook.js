// ==UserScript==
// @name		login http://www.outlook.com/
// @namespace	http://use.i.E.your.homepage/
// @version		0.1
// @description	login http://www.outlook.com/
// @match		https://login.live.com/login.srf?*
// @match		https://*.mail.live.com/default.aspx?*
// @match		https://signout.live.com/content/dam/imp/surfaces/mail_signout/*
// @match		http://in.msn.com/?ocid=mailsignout*
// @match		http://in.msn.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @require		https://rawgithub.com/rbahuguna/login/master/utility.js
// @copyright	2012+, You
// ==/UserScript==

userLinkSelector = '#c_melink';
logoutSelector = '#c_signout';

userSelectedCookie = 'selectedUser';
autoLoginCookie = 'autoLogin';

usernameSelector = '#i0116';
passwordSelector = '#i0118';
signInSelector = '#idSIButton9';

function init() {
	if (jQuery("a[href*=outlook]:contains('Sign In')").length>0) {
		jQuery("a[href*=outlook]:contains('Sign In')")[0].click();
	}
	var signInAnchorSelector = '#brand a';
	if (jQuery(signInAnchorSelector).length) {
		jQuery(signInAnchorSelector)[0].click();
	}
	var userParentSelector = 'body';
	var userSelectionId = "user";
	var userSelector = '#' + userSelectionId;

	jQuery(signInSelector).click(function(){
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

	if (jQuery(signInSelector).length>0 && readCookie(autoLoginCookie) != null) {
		removeCookie(autoLoginCookie);
		login(jQuery(userSelector));
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

function login(userSelect) {
	fillAuthentication(userSelect);
	jQuery(signInSelector).click();
}

function switchUser() {
	createCookie(autoLoginCookie, '');

	if (jQuery(signInSelector).length > 0) {
		login(jQuery(this));
	}
	else {
		createCookie(userSelectedCookie, jQuery(this).val());
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
		user: "r _ bahuguna hot",
		password: 'password'
	},
	{
		user: "rajeev . bahuguna out",
		password: 'password'
	},
	{
		user: "rajeev . bahuguna . dev out",
		password: 'password'
	},
	{
		user: "rajeev . bahuguna . java out",
		password: 'password'
	},
	{
		user: "rajeev . bahuguna . developer out",
		password: 'password'
	},
];

init();