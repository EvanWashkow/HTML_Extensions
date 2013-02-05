$(document).ready(function () {

	$('.tab-wrapper > *').click(function () {

		// Remove active class from all tabs and tab contents (this will remove selected tab styling and hide all content)
		$('.tab-wrapper > *').removeClass('active');
		$('.content-wrapper > *').removeClass('active');

		// Set the clicked tab as active (this will style the selected tab)
		$(this).addClass('active');

		// Set the tab's corresponding content to active (this will show the content)
		var contentId = $(this).attr('content-id');
		$('#' + contentId).addClass('active');
	});
});