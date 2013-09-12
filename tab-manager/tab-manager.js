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
	'activeClass'      : 'active',
	'contentAttribute' : 'content-id',
	'hashDivider'      : '/',
	'tabWrapperClass'  : 'tab-wrapper'
}

// Switch tabs
tabManager.switchTo = function(newTab) {
	var newTabContent = document.getElementById(newTab.getAttribute(tabManager.constants.contentAttribute));

	// Perform needed actions before switching tabs
	if (typeof this.doBeforeSwitch === 'function')
		this.doBeforeSwitch(newTab);

	// Switch tabs
	var newTabSiblings = newTab.parentNode.children;
	newTabSiblings.removeClass(tabManager.constants.activeClass);
	newTabContent.parentNode.children.removeClass(tabManager.constants.activeClass);
	newTab.addClass(tabManager.constants.activeClass);
	newTabContent.addClass(tabManager.constants.activeClass);

	// Add the current tab content to the URL hash
	for (var i = newTabSiblings.length - 1; i >= 0; i--)
		location.hash = location.hash.replace(tabManager.constants.hashDivider + newTabSiblings[i].getAttribute(tabManager.constants.contentAttribute), '');
	location.hash += tabManager.constants.hashDivider + newTab.getAttribute(tabManager.constants.contentAttribute);


	// Perform needed actions after switching tabs.
	if (typeof this.doAfterSwitch === 'function')
		this.doAfterSwitch(newTab);
};



window.onload = function () {

	// On page load, open the tabs corresponding to the URL hash
	var tabsToOpen = location.hash.split(tabManager.constants.hashDivider);
	for (var i = tabsToOpen.length - 1; i >= 1; i--) {
		var newTab = document.querySelectorAll('[' + tabManager.constants.contentAttribute + '="' + tabsToOpen[i] + '"]')[0];
		if (newTab && newTab.parentElement.className === tabManager.constants.tabWrapperClass)
			tabManager.switchTo(newTab);
	};

	// Add click handler for each tab in each tab group
	var tabGroups = document.getElementsByClassName(tabManager.constants.tabWrapperClass);
	for (var x = tabGroups.length - 1; x >= 0; x--) {
		var tabs = tabGroups[x].children;
		for (var y = tabs.length - 1; y >= 0; y--) {
			tabs[y].addEventListener('click', function() {
				tabManager.switchTo(this);
			});
		};
	}
}