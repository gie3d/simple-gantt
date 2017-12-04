var HeaderPanel = (function(GANTT_DEFAULT_CONFIG) {
	'use strict';

	var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	
	var generate = function(chartConfig, data) {
		var headerPanel = document.createElement('div');
		headerPanel.classList.add('header-panel');
		headerPanel = setHeaderPanelWidth(headerPanel, chartConfig, data);
		
		var titlePanel = createTitleHeader(chartConfig);
		var dateRangePanel = createDateRangeHeader(chartConfig, data.scope.startDate, data.scope.endDate);
		headerPanel.appendChild(titlePanel);
		headerPanel.appendChild(dateRangePanel);
		
		return headerPanel;
	}

	var setHeaderPanelWidth = function(headerPanel, chartConfig, data) {
		var daysDiff = GanttUtils.calculateDaysDiff(data.scope.startDate, data.scope.endDate);
		var titleWidth = GanttUtils.getTitleWidth(chartConfig);
		var boxWidth = GanttUtils.getBoxWidth(chartConfig);
		var panelWidth = (boxWidth * daysDiff) + titleWidth;
		headerPanel.style.width = panelWidth + 2 + 'px';
		return headerPanel;
	}

	var createTitleHeader = function(chartConfig) {
		var panel = document.createElement('div');
		var titleWidth = GanttUtils.getTitleWidth(chartConfig);
		panel.style.width = titleWidth + 'px';
		panel.classList.add('title-container');
		
		var title = chartConfig.title || GANTT_DEFAULT_CONFIG.title;
		var titleElem = document.createTextNode(title);
		panel.appendChild(titleElem);

		return panel;
	}

	var createDateRangeHeader = function(chartConfig, startDate, endDate) {
		var dayMonthRangePanel = document.createElement('div');
		var titleWidth = GanttUtils.getTitleWidth(chartConfig);
		dayMonthRangePanel.classList.add('header-daterange-panel');
		dayMonthRangePanel.style.left = titleWidth + 'px';

		var clearBothElem = document.createElement('div');
		clearBothElem.classList.add('clear-both');
		var dayMonth = createHeaderDayMonthElement(startDate, endDate);

		dayMonthRangePanel.appendChild(dayMonth.monthRangePanel);
		dayMonthRangePanel.appendChild(clearBothElem);
		dayMonthRangePanel.appendChild(dayMonth.dayRangePanel);

		return dayMonthRangePanel;
	}

	var createHeaderDayMonthElement = function(startDate, endDate) {
		var monthRangePanel = document.createElement('div');
		var dayRangePanel = document.createElement('div');
		dayRangePanel.style.marginLeft = '1px'; // TODO: Revise this. It shouldn't patch 1px like this
		var daysDiff = GanttUtils.calculateDaysDiff(startDate, endDate);
		var previousMonthIndex = startDate.getMonth();
		var previousDate;
		var monthWidth = 0;
		for (var i = 0; i < daysDiff; i++) {
			var currentDate = GanttUtils.addDays(startDate, i);
			var currentMonthIndex = currentDate.getMonth();
			var dayBox = createDayElement(currentDate);
			dayRangePanel.appendChild(dayBox);
			var boxWidth = GanttUtils.getBoxWidth(chartConfig);
			if (currentMonthIndex !== previousMonthIndex) {
				var monthBox = createMonthYearElement(previousDate, monthWidth);
				monthRangePanel.appendChild(monthBox);
				monthWidth = boxWidth;
			} else {
				monthWidth = monthWidth + boxWidth;
			}

			previousMonthIndex = currentMonthIndex;
			previousDate = currentDate;
		}

		// last month
		var monthBox = createMonthYearElement(endDate, monthWidth);
		monthRangePanel.appendChild(monthBox);

		var result = {
			monthRangePanel: monthRangePanel,
			dayRangePanel: dayRangePanel
		}

		return result;
	}

	var createDayElement = function(date) {
		var elem = document.createElement('div');
		elem.classList.add('day-box');

		var textDay = document.createTextNode(date.getDate());
		elem.appendChild(textDay);

		return elem;
	}

	var createMonthYearElement = function(date, width) {
		var monthBox = document.createElement('div');
		monthBox.classList.add('monthyear-box');
		var textMonthYear = document.createTextNode(MONTHS[date.getMonth()] + ' ' + date.getFullYear());
		monthBox.appendChild(textMonthYear);
		monthBox.style.width = width + 'px';

		return monthBox;
	}

	var publicAPI = {
		generate: generate
	};

	return publicAPI;
})(GANTT_DEFAULT_CONFIG);