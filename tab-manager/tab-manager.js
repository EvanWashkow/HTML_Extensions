var tabManager = new Object();

// *Function* callbacks. When called, these functions receive the new tab as a parameter.
tabManager.doBeforeSwitch;
tabManager.doAfterSwitch;

// Switch tabs
tabManager.switch = function(newTab) {
	// Variables
	var newTabContent = $('#' + $(newTab).attr('content-id'));

	// Perform needed actions before switching tabs
	if (typeof this.doBeforeSwitch === 'function')
		this.doBeforeSwitch(newTab);

	// Remove active class from the sibling tabs and their contents (this will remove selected tab styling and hide all content)
	$(newTab).siblings().removeClass('active');
	$(newTabContent).siblings().removeClass('active');

	// Set the new tab and its content to active (this will show selected tab styling and show all content)
	// and store the new tab in the URL hash
	location.hash = $(newTab).addClass('active').attr('content-id');
	$(newTabContent).addClass('active');

	// Perform needed actions after switching tabs.
	if (typeof this.doAfterSwitch === 'function')
		this.doAfterSwitch(newTab);
};

$(document).ready(function () {
	// On page load, scroll to, and open the hashed tab
	if (location.hash) {
		var newTab = $('[content-id="' + location.hash.replace('#', '') + '"]');
		window.scrollTo(window.scrollX, $(newTab).parent().offset().top);
		tabManager.switch(newTab);
	}

	$('.tab-wrapper > *').click(function () {
		tabManager.switch(this);
	});
});