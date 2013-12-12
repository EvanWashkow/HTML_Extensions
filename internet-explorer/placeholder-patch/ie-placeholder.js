/* All you have to do is include this into your page. The script will take care of making IE compatible with any element that is using placeholders. */

window.onload = function () {

	// If the browser does not support placeholder, continue
	if (!('placeholder' in document.createElement('input'))) {
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