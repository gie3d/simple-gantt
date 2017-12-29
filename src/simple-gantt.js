var SimpleGantt = (function(HeaderPanel, BodyPanel){
	'use strict';

	var generate = function(containerId, chartConfig, data) {
		var container = document.querySelector(containerId);
		if (container) {
			while (container.firstChild) {
				container.removeChild(container.firstChild);
			}
			
			container = setMainContainerStyle(container);
			var headerPanel = HeaderPanel.generate(chartConfig, data);
			var dataPanel = BodyPanel.generate(chartConfig, data, containerId);

			container.appendChild(headerPanel);
			container.appendChild(dataPanel);

			container.addEventListener('scroll', function(e) {
				console.log('scroll');
				var leftPanel = document.querySelector('.left-panel');
				leftPanel.style.left = this.scrollLeft + 'px';
			});
		}
	}

	var setMainContainerStyle = function(container) {
		container.classList.add('main-container');

		return container;
	}

	var publicAPI = {
		generate: generate
	}

	return publicAPI;
})(HeaderPanel, BodyPanel);