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

	// Switch tabs
	$(newTab)
		.addClass('active')
		.siblings()
			.removeClass('active');
	$(newTabContent)
		.addClass('active')
		.siblings()
			.removeClass('active');

	// Save the new tab in the URL hash
	location.hash = $(newTab).attr('content-id');

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