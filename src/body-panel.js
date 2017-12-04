var BodyPanel = (function(GANTT_DEFAULT_CONFIG) {
	'use strict';

	var generate = function(chartConfig, data) {
		var dataPanel = document.createElement('div');
		dataPanel.classList.add('data-panel');
		dataPanel = setPanelWidth(dataPanel, chartConfig, data);
		dataPanel = setPanelHeight(dataPanel, chartConfig);

		var leftPanel = createLeftPanel(chartConfig, data);
		var chartPanel = createChartPanel(chartConfig, data);
		var chartFilled = fillChart(chartPanel, chartConfig, data);

		dataPanel.appendChild(leftPanel);
		dataPanel.appendChild(chartFilled);

		return dataPanel;
	}

	var setPanelWidth = function(dataPanel, chartConfig, data) {
		var daysDiff = GanttUtils.calculateDaysDiff(data.scope.startDate, data.scope.endDate);
		var titleWidth = GanttUtils.getTitleWidth(chartConfig);
		var boxWidth = GanttUtils.getBoxWidth(chartConfig);
		var panelWidth = (boxWidth * daysDiff) + titleWidth;
		dataPanel.style.width = panelWidth + 'px';
		return dataPanel;
	}

	var setPanelHeight = function(dataPanel, chartConfig) {
		var chartHeight = chartConfig.height || GANTT_DEFAULT_CONFIG.chartHeight;
		dataPanel.style.height = chartHeight + 'px';

		return dataPanel;
	}

	var createLeftPanel = function(chartConfig, data) {
		var panel = document.createElement('div');
		var titleWidth = GanttUtils.getTitleWidth(chartConfig);
		panel.style.width = titleWidth + 'px';
		panel.style.height = GANTT_DEFAULT_CONFIG.BOXHEIGHT * data.gantt.lenght;
		panel.classList.add('left-panel');
		
		data.gantt.forEach(function(row) {
			var boxElem = document.createElement('div');
			var titleWidth = GanttUtils.getTitleWidth(chartConfig);
			boxElem.style.width = titleWidth + 'px';
			boxElem.classList.add('data-left-box');

			var title = row.title;
			var titleElem = document.createTextNode(title);
			boxElem.appendChild(titleElem);
			panel.appendChild(boxElem);
		});

		return panel;
	}

	var createChartPanel = function(chartConfig, data) {
		var titleWidth = GanttUtils.getTitleWidth(chartConfig);
		var boxWidth = GanttUtils.getBoxWidth(chartConfig);
		var panel = document.createElement('div');
		panel.style.height = GANTT_DEFAULT_CONFIG.BOXHEIGHT * data.gantt.lenght;
		panel.style.left = titleWidth + 'px';
		panel.classList.add('chart-panel');
		var daysDiff = GanttUtils.calculateDaysDiff(data.scope.startDate, data.scope.endDate);
		var panelWidth = (boxWidth * daysDiff);
		panel.style.width = panelWidth + 'px';

		console.log(data);
		data.gantt.forEach(function(row) {
			var dayBoxes = createDayBoxes(data.scope.startDate, data.scope.endDate);
			panel.appendChild(dayBoxes);
		});

		var text = document.createTextNode('Simple-Gantt');
		panel.appendChild(text);

		return panel;
	}

	var createDayBoxes = function(startDate, endDate) {
		var daysDiff = GanttUtils.calculateDaysDiff(startDate, endDate);
		var dayBoxes = document.createElement('div');
		for (var i = 0; i < daysDiff; i++) {
			var dayBox = document.createElement('div');
			dayBox.classList.add('day-box');
			dayBoxes.appendChild(dayBox);
		}

		return dayBoxes;
	}

	var fillChart = function(chartPanel, chartConfig, data) {
		var titleWidth = GanttUtils.getTitleWidth(chartConfig);
		data.gantt.forEach(function(row, index) {
			var top = index * GANTT_DEFAULT_CONFIG.BOXHEIGHT;
			row.dates.forEach(function(date) {
				var positionStartDate = getPositionByDate(chartConfig, data.scope.startDate, date.startDate, true);
				var positionEndDate = getPositionByDate(chartConfig, data.scope.startDate, date.endDate, false);
				var barWidth = positionEndDate - positionStartDate;
				var bar = document.createElement('div');
				bar.style.position = 'absolute';
				bar.style.backgroundColor = date.color;
				bar.style.width = barWidth + 'px';
				bar.style.left = positionStartDate + 'px';
				bar.style.top = top + 'px';
				bar.classList.add('bar');
				var text = document.createTextNode(date.label);
				bar.appendChild(text);
				chartPanel.appendChild(bar);
			});
		});
		// console.log(chartPanel);
		return chartPanel;
	}

	var getPositionByDate = function(chartConfig, firstDayOfChart, date, isStartDate) {
		var boxWidth = GanttUtils.getBoxWidth(chartConfig);
		var diffDate = GanttUtils.calculateDaysDiff(firstDayOfChart, date);
		var positionDate = diffDate * boxWidth;
		if (isStartDate) {
			positionDate = positionDate - boxWidth;
		}

		return positionDate;
	}

	var publicAPI = {
		generate: generate
	};

	return publicAPI;
})(GANTT_DEFAULT_CONFIG);