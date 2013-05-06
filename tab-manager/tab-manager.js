// Function callbacks. These receive the object of the new tab as a parameter.
var doBeforeTabSwitch;
var doAfterTabSwitch;

$(document).ready(function () {
	$('.tab-wrapper > *').click(function () {
		switchTabTo(this);
	});
});

function switchTabTo(newTab) {
	// Perform needed actions before switching tabs
	if (typeof doBeforeTabSwitch === 'function')
		doBeforeTabSwitch(this);

	// Remove active class from all tabs and tab contents (this will remove selected tab styling and hide all content)
	$('.tab-wrapper > *').removeClass('active');
	$('.content-wrapper > *').removeClass('active');

	// Set the clicked tab as active (this will style the selected tab)
	$(newTab).addClass('active');

	// Set the tab's corresponding content to active (this will show the content)
	var contentId = $(newTab).attr('content-id');
	$('#' + contentId).addClass('active');

	// Perform needed actions after switching tabs.
	if (typeof doAfterTabSwitch === 'function')
		doAfterTabSwitch(this);
}