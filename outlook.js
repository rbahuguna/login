// ==UserScript==
// @name		login http://www.outlook.com/
// @namespace	http://use.i.E.your.homepage/
// @version		0.1
// @description	login http://www.outlook.com/
// @match		https://login.live.com/login.srf?*
// @match		https://bay172.mail.live.com/default.aspx?*
// @match		https://blu175.mail.live.com/default.aspx?*
// @match		https://signout.live.com/content/dam/imp/surfaces/mail_signout/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @copyright	2012+, You
// ==/UserScript==

init();

userLinkSelector = '#c_melink';
logoutSelector = '#c_signout';

userSelectedCookie = 'selectedUser';
autoLoginCookie = 'autoLogin';

usernameSelector = '#i0116';
passwordSelector = '#i0118';
signInSelector = '#idSIButton9';

function init() {
	var signInAnchorSelector = '#brand a';
	if (jQuery(signInAnchorSelector).length) {
		jQuery(signInAnchorSelector)[0].click();
	}
	var userParentSelector = 'body';
	var userSelectionId = "user";
	var userSelector = '#' + userSelectionId;

	setTimeout(function() {
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

		jQuery(userSelector).css("position", "fixed").css("top", 50).css("left", 150).css('z-index', 10);
		
		jQuery(userSelector).change(switchUser);

		if (jQuery(signInSelector).length>0 && readCookie(autoLoginCookie) != null) {
			eraseCookie(autoLoginCookie);
			login(jQuery(userSelector));
		}

	}, 3000);
}

function eraseCookie(name) {
	createCookie(name,"",-1);
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
		user: "username1@google.com",
		password: 'Password123'
	},
	{
		user: "username2@google.com",
		password: 'Password123'
	},
];

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/;" + "domain="+/\.?[^.]+\.[^.]+$/.exec(location.hostname);
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}