var tabManager = new Object();

// *Function* callbacks. These receive the object of the new tab as a parameter.
tabManager.doBeforeSwitch;
tabManager.doAfterSwitch;

// Switch tabs
tabManager.switch = function(newTab) {
	// Perform needed actions before switching tabs
	if (typeof this.doBeforeSwitch === 'function')
		this.doBeforeSwitch(newTab);

	// Remove active class from all tabs and tab contents (this will remove selected tab styling and hide all content)
	$('.tab-wrapper > *').removeClass('active');
	$('.content-wrapper > *').removeClass('active');

	// Set the tab and tab content to active (this will show selected tab styling and show all content)
	$('#' + $(newTab).addClass('active').attr('content-id')).addClass('active');

	// Perform needed actions after switching tabs.
	if (typeof this.doAfterSwitch === 'function')
		this.doAfterSwitch(newTab);
};

$(document).ready(function () {
	$('.tab-wrapper > *').click(function () {
		tabManager.switch(this);
	});
});