// ==UserScript==
// @name		login and bid on http://www.elance.com
// @namespace	http://use.i.E.your.homepage/
// @version		0.1
// @description	login and bid on http://www.elance.com
// @match		https://www.elance.com/*
// @match		http://www.elance.com/*
// @copyright	2014+, You
// ==/UserScript==

var usersElementId			= 'users';
var proposalsElementId		= 'proposals';
var proposalDescId			= 'bid_desc-plaintext';
var proposalExpId			= 'bid_exp-plaintext';
var loginNameId				= 'login_name';
var loginPasswdId		 	= 'passwd';
var signInId				= 'spr-sign-in-btn-standard';
var userCurrentCookie		= 'user';
var signOutSelector			= 'A:contains(Sign Out)';

function init() {
	var usersX 		= 10;
	var usersY 		= 450;
	var proposalsY 	= 700;

	var continueId		 		= 'ContinueLogin';
	var challengeAnswerId		= 'challengeAnswerId';

	var users = new Element('select',
		{id: usersElementId,
			accesskey: 'a',
			styles: {
				position: 'fixed',
				top: usersX,
				left: usersY},
			events: {
				change: function() {
					selectUser();
				}
			}
		}
	);

	users.inject(document.body);

	var userCurrent = Cookie.read(userCurrentCookie);

	logins.forEach(function(login){
		var userOption = new Element('option', {text: login.user, value: login.password});
		if (userCurrent == login.user) {
			userOption.setProperty('selected', true);
		}
		userOption.inject(users);
	});

	if ( $$('#' + signInId).length ) {
		selectUser();
	}

	if ( $$('#' + continueId).length ) {
		questions.forEach(function(question){
			if ($$('*::contains(' + question.question + ')').length) {
				$(challengeAnswerId).set('value', question.answer);
			}
		});
		$$('#' + continueId)[0].click();
	}

	var proposalsElement = new Element('select',
		{id: proposalsElementId,
			accesskey: 'p',
			styles: {
				position: 'fixed',
				top: usersX,
				left: proposalsY},
			events: {
				focus: function() {
					selectProposal();
				}
			}
		}
	);

	proposalsElement.inject(document.body);

	proposals.forEach(function(proposal){
		var proposalOption = new Element('option', {text: proposal.name, value: proposal.proposal});
		proposalOption.inject(proposalsElement);
	});
}

function selectProposal() {
	var baseRateId	= 'baseRate';
	var hoursId 	= 'hours';
	var baseRate	= 11;
	var hours		= 24;

	if ($(proposalExpId)) {
		$(proposalExpId).set('value', $(proposalsElementId).getSelected().get('value'));
		if ($(proposalDescId)) {
			$(proposalDescId).set('value', 'use tools');
		}
	}
	else {
		$(proposalDescId).set('value', $(proposalsElementId).getSelected().get('value'));
	}
	$(baseRateId).set('value', baseRate);
	$(hoursId).set('value', hours);
}

function selectUser() {
	if ($(loginNameId)) {
		$(loginNameId).set('value', $(usersElementId).getSelected().get('text'));
		$(loginPasswdId).set('value', $(usersElementId).get('value'));
		$$('#' + signInId)[0].click();
	}
	else {
		Cookie.write(userCurrentCookie, $(usersElementId).getSelected().get('text'));
		javascript:EOL.nav.toggleDialog('myaccount');
		$$(signOutSelector)[0].click();
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
		user: "developer_outlook",
		password: 'password'
	},
	{
		user: "rbahuguna-developer",
		password: 'password'
	},
	{
		user: "rbahuguna-dev",
		password: 'password'
	},
];

proposals = 
[
	{
		proposal: "I am interested to apply for this job. I am an expert java, spring, database developer with experience in jQuery, MooTools, HTML. Please consider me for this",
		name: "java"
	},
	{
		proposal: "I am interested to apply. Please consider me for this",
		name: "general"
	},
];

questions = 
[
	{
		question: "What city was your father born in?",
		answer: "nyc"
	},
	{
		question: "What city was your mother born in?",
		answer: "paris"
	},
];

init();