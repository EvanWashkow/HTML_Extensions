var tabManager = new Object();

// *Function* callbacks. When called, these functions receive the new tab as a parameter.
tabManager.doBeforeSwitch;
tabManager.doAfterSwitch;

// Switch tabs
tabManager.switch = function(newTab) {
	// Variables
	var newTabContent = $('#' + $(newTab).attr('content'));

	// Perform needed actions before switching tabs
	if (typeof this.doBeforeSwitch === 'function')
		this.doBeforeSwitch(newTab);

	// Switch tabs
	$(newTab)
		.addClass('active')
		.siblings()
			.removeClass('active');
	$(newTabContent)
		.addClass('active')
		.siblings()
			.removeClass('active');

	// Save the tab bookmark in the URL hash
	var tabBookmark = $(newTab).attr('bookmark');
	if (typeof tabBookmark !== 'undefined')
		location.hash = tabBookmark;

	// Perform needed actions after switching tabs.
	if (typeof this.doAfterSwitch === 'function')
		this.doAfterSwitch(newTab);
};

window.onload = function () {
	var newTab = document.querySelectorAll('[bookmark="' + location.hash.substr(1) + '"]');

	// On page load open the hashed tab
	if (newTab.length && newTab[0].parentElement.className === 'tab-wrapper') {
		tabManager.switch(newTab);
	}

	// For each tab group, identify the tabs
	var tabGroups = document.getElementsByClassName('tab-wrapper');
	for (var x = tabGroups.length - 1; x >= 0; x--) {
		var tabs = tabGroups[x].children;

		// For each tab, perform an action on click
		for (var y = tabs.length - 1; y >= 0; y--) {
			tabs[y].addEventListener('click', function() {
				tabManager.switch(this);
			});
		};
	}
}