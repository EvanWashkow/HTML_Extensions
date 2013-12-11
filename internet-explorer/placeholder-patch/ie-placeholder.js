/* All you have to do is include this into your page. The script will take care of making IE compatible with any element that is using placeholders. */

window.onload = function () {
	if (navigator.appName === 'Microsoft Internet Explorer') {
		$('body [placeholder]').each(function (index) {
			$(this)
				.attr('value', $(this).attr('placeholder'))
				.focusin(function () {
					if ($(this).attr('value') === $(this).attr('placeholder'))
						$(this).attr('value', '');
				})
				.focusout(function () {
					if ($(this).attr('value') === '')
						$(this).attr('value', $(this).attr('placeholder'));
				});
		});
	}
}