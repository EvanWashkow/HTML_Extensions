/* All you have to do is include this into your page. The script will take care of making IE compatible with any element that is using placeholders. */

window.onload = function () {

	// Check for IE
	var iePrefixOffset = navigator.appVersion.indexOf('MSIE');
	if (iePrefixOffset) {

		// Check IE version
		var ieVersion = navigator.appVersion.substring(iePrefixOffset + 5);
		ieVersion = ieVersion.substring(0, ieVersion.indexOf(';'));

		// If IE version is 9 or lower, continue
		if (ieVersion < 10) {
			var placeholderElements = document.querySelectorAll('body [placeholder]');
			for (var i = placeholderElements.length - 1; i >= 0; i--) {
				var element = placeholderElements[i];
				element.setAttribute('value', placeholderElements[i].getAttribute('placeholder'));
				element.addEventListener('focus', function() {
					if (this.getAttribute('value') === this.getAttribute('placeholder'))
						this.setAttribute('value', '');
				});
				element.addEventListener('blur', function() {
					if (this.getAttribute('value') === '')
						this.setAttribute('value', this.getAttribute('placeholder'));
				});
			}
		}
	}
}