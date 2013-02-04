$(document).ready(function () {
	$('.tab-wrapper > *').click(function () {
		// Hide all content containers
		$('.content-wrapper > *').removeClass('active');

		// Shaw the corresponding content
		var contentId = $(this).attr('content-id');
		$('#' + contentId).addClass('active');
	});
});