// ==UserScript==
// @name		login https://www.odesk.com/
// @namespace	http://use.i.E.your.homepage/
// @version		0.1
// @description	login https://www.odesk.com/
// @match		https://www.odesk.com/*
// @require		https://rawgithub.com/rbahuguna/login/master/utility.js
// @copyright	2012+, You
// ==/UserScript==

userParentSelector = 'body';
userSelectionId = "user";
userSelector = '#' + userSelectionId;
profileSelectionId = "profile";
profileSelector = '#' + profileSelectionId;
userLinkSelector = '#simpleCompanySelector .oDropdownValue';
logoutSelector = 'a.oLogout';
userSelectedCookie = 'selectedUser';
manualLoginCookie = 'manualLogin';
loginSelector = 'a[id=login]';
usernameSelector = '#username';
passwordSelector = '#password';
signInSelector = '#submit';
proposal = '#coverLetter';
bid = '#submitButton';
captchaResponseSelector = '*[name=captcha_response_field]'
agreementSelector = '#agreement';

function init() {
	jQuery(loginSelector).click(function() {
		removeCookie(manualLoginCookie);
	});

	jQuery(signInSelector).click(function() {
		removeCookie(manualLoginCookie);
		var userSelect = jQuery(userSelector);
		createCookie(userSelectedCookie, userSelect.val());
		jQuery(usernameSelector).val(userSelect.val());
		for(login in logins) {
			if (logins[login].user == userSelect.val()) {
				jQuery(passwordSelector).val(logins[login].password);
				break;
			}
		}
	});

	jQuery(logoutSelector).click(function() {
		var userSelect = jQuery(userSelector);
		createCookie(userSelectedCookie, userSelect.val());
		createCookie(manualLoginCookie, '');
	});

	var selectElement = 'select';

	jQuery(userParentSelector).append('<' + selectElement + '/>');
	jQuery(selectElement + ':last').attr('id', userSelectionId);
	jQuery(userSelector).attr('accesskey', 'a');
	for(var login in logins) {
		jQuery(userSelector).append('<option ' + '' +'>' + logins[login].user + '</option>');
		if (logins[login].user == readCookie(userSelectedCookie)) {
			jQuery(userSelector + ' option:last').attr('selected', true);
		}
		jQuery(userSelector + ' option:last').attr('value', logins[login].user);
	}

	jQuery(userSelector).css("position", "fixed").css("top", 50).css("left", 0);
	
	jQuery(userSelector).change(switchUser);

	if (readCookie(manualLoginCookie) == null) {
		loginUser();
	}

	jQuery(userParentSelector).append('<' + selectElement + '/>');
	jQuery(selectElement + ':last').attr('id', profileSelectionId);
	jQuery(profileSelector).attr('accesskey', 'p');
	for(var profile in profiles) {
		jQuery(profileSelector).append('<option ' + '' +'>' + profiles[profile].display + '</option>');
		jQuery(profileSelector + ' option:last').attr('value', profiles[profile].value);
	}

	jQuery(profileSelector).css("position", "fixed").css("top", 150).css("left", 0);

	jQuery(profileSelector).change(fillForm);

	jQuery(bid).click( function() {
		fillForm();
	});

	fillForm();
}

function fillForm() {
	jQuery(proposal).val(jQuery(profileSelector).val());
	jQuery(agreementSelector).attr('checked', true);
}

function loginUser() {
	if (jQuery(loginSelector).length != 0) {
		jQuery(loginSelector)[0].click();
	}
	else if (jQuery(signInSelector).length == 1) {
		if (jQuery(captchaResponseSelector).length ==0) {
			jQuery(signInSelector).click();
		}
	}
	else {
		return false;
	}
	return true;
}

function lououtUser() {
	var activeClass = 'isActive';
	if (!jQuery(logoutSelector).hasClass(activeClass)) {
		jQuery(userLinkSelector).addClass(activeClass);
	}
	if (jQuery(logoutSelector).length > 0) {
		jQuery(logoutSelector)[0].click();
		removeCookie(manualLoginCookie);
	}
}

function switchProfile() {
	jQuery(bid).click();
}

function switchUser() {
	if (!loginUser()) {
		lououtUser();
	}
}

logins = 
[
	{
		user: "rbahuguna",
		password: 'password'
	},
	{
		user: "rbahuguna1",
		password: 'password'
	},
	{
		user: "rbahuguna-java",
		password: 'password'
	},
	{
		user: "rbahuguna-dev",
		password: 'password'
	},
	{
		user: "rajeev-bahuguna",
		password: 'password'
	},
	{
		user: "rbahuguna-php",
		password: 'password'
	},
	{
		user: "rbahuguna-progra",
		password: 'password'
	},
	{
		user: "khelan-sharma",
		password: 'password'
	},
	{
		user: "bhagwan-ghildyal",
		password: 'password'
	},
	{
		user: "ravi_sayu",
		password: 'password'
	},
];

profiles =
[
	{
		display: 'Java',
		value: 'I have experience using java J2EE extensively for web development. ' +
		'I am experienced in latest technologies including web services, ajax, jquery, CSS3, HTML5, hibernate, spring. ' +
		'I have experience using several application servers - both open source and commercial grade. ' +
		'I also have experience using Oracle 11, SQLServer 12, MySQL databases. Please consider me for this assignment'
	},
	{
		display: 'General',
		value: 'I have long experience in web application development. ' +
		'I am experienced in latest technologies including PHP, Java, .NET, web services, ajax, jquery, CSS3, HTML5. ' +
		'I have experience using several application servers - both open source and commercial grade. ' +
		'I also have experience using Oracle 11, SQLServer 12, MySQL databases. Please consider me for this assignment'
	},
	{
		display: 'php',
		value: 'I have long experience in web application development. ' +
		'I am experienced in latest technologies including PHP, WordPress, Joomal, web services, ajax, jquery, CSS3, HTML5. ' +
		'I have experience using several application servers - both open source and commercial grade. ' +
		'I also have experience using Oracle 11, SQLServer 12, MySQL databases. Please consider me for this assignment'
	}
]

init();