/* All you have to do is include this into your page. The script will ensure all browsers display a placeholder--even those that don't support it. */

window.onload = function () {

	// If the browser does not support placeholder, continue
	if (!('placeholder' in document.createElement('input'))) {
		var placeholderElements = document.querySelectorAll('body [placeholder]');
		for (var i = placeholderElements.length - 1; i >= 0; i--) {
			var element = placeholderElements[i];
			addPlaceholderPatch(element);
			element.addEventListener('focus', function() {
				removePlaceholderPatch(this);
			});
			element.addEventListener('blur', function() {
				addPlaceholderPatch(this);
			});
		}
	}
}

function addPlaceholderPatch(element) {
	if (!element.getAttribute('value'))
		element.setAttribute('value', element.getAttribute('placeholder'));
}
function removePlaceholderPatch(element) {
	if (element.getAttribute('value') === element.getAttribute('placeholder'))
		element.setAttribute('value', '');
}