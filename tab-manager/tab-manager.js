// Add a class to an object
Object.prototype.addClass = function(newClass) {

	// Add class to an array of elements recursively
	for (var i = this.length - 1; i >= 0; i--) {
		this[i].addClass(newClass);
	};

	// Add the new class name to a singular object
	if (typeof this.className ==='string' && !this.className.contains(newClass)) {
		this.className += ' ' + newClass;
	}
}

var tabManager = new Object();

// *Function* callbacks. When called, these functions receive the new tab as a parameter.
tabManager.doBeforeSwitch;
tabManager.doAfterSwitch;

// Constants
tabManager.constants = {
	'activeClass'     : 'active',
	'tabWrapperClass' : 'tab-wrapper'
}

// Switch tabs
tabManager.switchTo = function(newTab) {

	// Variables
	var newTabContent = document.getElementById(newTab.getAttribute('content'));

	// Perform needed actions before switching tabs
	if (typeof this.doBeforeSwitch === 'function')
		this.doBeforeSwitch(newTab);

	newTab.addClass(tabManager.constants.activeClass);
	newTabContent.addClass(tabManager.constants.activeClass);

	$(newTab)
		.siblings()
			.removeClass(tabManager.constants.activeClass);
	$(newTabContent)
		.siblings()
			.removeClass(tabManager.constants.activeClass);

	// Save the tab bookmark in the URL hash
	var tabBookmark = $(newTab).attr('bookmark');
	if (typeof tabBookmark !== 'undefined')
		location.hash = tabBookmark;

	// Perform needed actions after switching tabs.
	if (typeof this.doAfterSwitch === 'function')
		this.doAfterSwitch(newTab);
};

window.onload = function () {
	var newTab = document.querySelectorAll('[bookmark="' + location.hash.substr(1) + '"]')[0];

	// On page load open the hashed tab
	if (newTab && newTab.parentElement.className === tabManager.constants.tabWrapperClass) {
		tabManager.switchTo(newTab);
	}

	// For each tab group, identify the tabs
	var tabGroups = document.getElementsByClassName(tabManager.constants.tabWrapperClass);
	for (var x = tabGroups.length - 1; x >= 0; x--) {
		var tabs = tabGroups[x].children;

		// For each tab, perform an action on click
		for (var y = tabs.length - 1; y >= 0; y--) {
			tabs[y].addEventListener('click', function() {
				tabManager.switchTo(this);
			});
		};
	}
}