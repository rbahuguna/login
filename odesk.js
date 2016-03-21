// ==UserScript==
// @name        use https://www.upwork.com/
// @version     0.1
// @description use https://www.upwork.com/
// @match       https://www.upwork.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @require		https://rawgithub.com/rbahuguna/login/master/utility.js
// @copyright   2015+, rbahuguna
// ==/UserScript==

loginPageSelector   = "a[href='/login']"
logoutPageSelector  = "a[href='/logout'], a[href='/Logout'], a[title='Log out'], a[ng-click='logout()'"
userSelector        = "#login_username, #username"
passwordSelector    = "#login_password, #password"
loginCaptchaSelector= "#login_captcha"
submitSelector      = "[type=submit]"

loginPage           = document.querySelector(loginPageSelector)
logoutPage          = document.querySelector(logoutPageSelector)
user                = document.querySelector(userSelector)
password            = document.querySelector(passwordSelector)
loginCaptcha        = document.querySelector(loginCaptchaSelector)
submit              = document.querySelector(submitSelector)

userParentSelector  = 'body'
selectElement       = 'select';
usersId             = "users"
usersSelector       = "#" + usersId
profilesId          = "profiles"
profilesSelector    = "#" + profilesId
proposalSelector    = '#coverLetter'
agreementSelector   = '#agreement'
bid                 = '#submitButton'

cookie              = "user"

function logUser(logout) {
    var userName = jQuery(usersSelector).val()
    if (loginPage) {
        loginPage.click()
    }
    else if (user && !loginCaptcha) {
        user.value = userName
        logins.forEach(function(user){
            if (userName == user.user) {
                password.value = user.password
                return false;
            }
        })
        submit.disabled = false
        submit.click()
    }
    else if (logoutPage && logout) {
        createCookie(cookie, userName);
        logoutPage.click()
    }
}

logins = 
[
	{
		user: "panda_king",
		password: 'password'
	},
	{
		user: "saryu_ram",
		password: 'password'
	},
	{
		user: "r_b28 yahoo",
		password: 'password'
	},
	{
		user: "developer-rb",
		password: 'password'
	},
	{
		user: "kh-sharma",
		password: 'password'
	},	{
		user: "rajeevbahuguna",
		password: 'password'
	},
];

jQuery(userParentSelector).append('<' + selectElement + ' id=' + '"' + usersId + '"' + '/>');
jQuery(usersSelector).attr('accesskey', 'a');
for(var login in logins) {
    jQuery(usersSelector).append('<option ' + '' +'>' + logins[login].user + '</option>');
    if (logins[login].user == readCookie(cookie)) {
        jQuery(usersSelector + ' option:last').attr('selected', true);
    }
    jQuery(usersSelector + ' option:last').attr('value', logins[login].user);
}

jQuery(usersSelector).css("position", "fixed").css("top", 50).css("left", 0);

logUser()

jQuery(usersSelector).change(function() {
    logUser(true)
});

profiles =
[
	{
		display: 'J2EE',
		value: 'I want to apply for this assignment. I am expert in Java J2EE, Android, NodeJS, AngularJS, Java Spring, REST, Scala, database development, javascript, CSS3, HTML. I am available to start immediate.'
	},
	{
		display: 'Web',
		value: 'I am interested in this assignment. My expertise is PHP, Java, AngularJS, Bootstrap, NodeJS, Meteor.js, Javascript, CSS3, HTML, Adobe CC developer. I am available to start immediate.'
	},
	{
		display: 'General',
		value: 'I am interested in this job and will start immediate. I am expert Java, PHP, C, Android, Python,HTML, CSS3, Javascript, Scala developer with working knowledge of Adobe CC.'
	}
]

jQuery(userParentSelector).append('<' + selectElement + ' id=' + '"' + profilesId + '"' + '/>');
jQuery(profilesSelector).attr('accesskey', 'p');
for(var profile in profiles) {
    jQuery(profilesSelector).append('<option ' + '' +'>' + profiles[profile].display + '</option>');
    jQuery(profilesSelector + ' option:last').attr('value', profiles[profile].value);
}

jQuery(profilesSelector).css("position", "fixed").css("top", 150).css("left", 0);

jQuery(profilesSelector).change(fillForm);
jQuery(profilesSelector).click(fillForm);

jQuery(bid).click( function() {
    fillForm();
});

function fillForm() {
	jQuery(proposalSelector).val(jQuery(profilesSelector).val());
	jQuery(agreementSelector).attr('checked', true);
}