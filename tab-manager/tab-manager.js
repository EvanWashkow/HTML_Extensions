// Add a class to an object
Object.prototype.addClass = function(newClass) {

	// Add class to an array of elements recursively
	for (var i = this.length - 1; i >= 0; i--)
		this[i].addClass(newClass);

	// Add the new class name to a singular object if the element does not already have the new class
	if (typeof this.className ==='string' && (this.className.indexOf(newClass) < 0)) {
		this.className += ' ' + newClass;
		this.className.replace(/^\s+|\s+$/g, '');
	}
}

// Remove class from an object
Object.prototype.removeClass = function(oldClass) {

	// Remove class from an array of elements recursively
	for (var i = this.length - 1; i >= 0; i--)
		this[i].removeClass(oldClass);

	// Remove the old class name from a singular object
	if (this.className)
		this.className = this.className.replace(oldClass, '').replace(/^\s+|\s+$/g, '');
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

	// Switch tabs
	newTab.parentNode.children.removeClass(tabManager.constants.activeClass);
	newTabContent.parentNode.children.removeClass(tabManager.constants.activeClass);
	newTab.addClass(tabManager.constants.activeClass);
	newTabContent.addClass(tabManager.constants.activeClass);

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