$(document).ready(function () {
	$('.tab-wrapper > div').click(function () {
		// Hide all content containers
		$('.content-wrapper > div').removeClass('active');

		// Shaw the corresponding content
		var contentId = $(this).attr('content-id');
		$('#' + contentId).addClass('active');
	});
});