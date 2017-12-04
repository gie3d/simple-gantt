var SimpleGantt = (function(HeaderPanel, BodyPanel){
	'use strict';

	var generate = function(containerId, chartConfig, data) {
		var container = document.querySelector(containerId);
		if (container) {
			container = setMainContainerStyle(container);
			var headerPanel = HeaderPanel.generate(chartConfig, data);
			var dataPanel = BodyPanel.generate(chartConfig, data);

			container.appendChild(headerPanel);
			container.appendChild(dataPanel);
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