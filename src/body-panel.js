var BodyPanel = (function(GANTT_DEFAULT_CONFIG) {
	'use strict';

	var generate = function(chartConfig, data) {
		var dataPanel = document.createElement('div');
		dataPanel.classList.add('data-panel');
		dataPanel = setPanelWidth(dataPanel, chartConfig, data);
		dataPanel = setPanelHeight(dataPanel, chartConfig, data);

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
		var chartHeight = (chartConfig.height || GANTT_DEFAULT_CONFIG.chartHeight) - 60;
		dataPanel.style.height = chartHeight + 'px';

		return dataPanel;
	}

	var createLeftPanel = function(chartConfig, data) {
		var panel = document.createElement('div');
		var titleWidth = GanttUtils.getTitleWidth(chartConfig);
		panel.style.width = titleWidth + 'px';
		panel.style.height = GANTT_DEFAULT_CONFIG.BOXHEIGHT * data.gantt.length;
		panel.classList.add('left-panel');
		
		data.gantt.forEach(function(row) {
			var boxElem = document.createElement('div');
			var titleWidth = GanttUtils.getTitleWidth(chartConfig);
			boxElem.style.width = (titleWidth - 6) + 'px';
			boxElem.classList.add('data-left-box');

			var title = row.title;
			var titleElem = document.createTextNode(title);
			boxElem.appendChild(titleElem);
			panel.appendChild(boxElem);
		});

		return panel;
	}

	var createChartPanel = function(chartConfig, data) {
		console.log(data);
		var titleWidth = GanttUtils.getTitleWidth(chartConfig);
		var boxWidth = GanttUtils.getBoxWidth(chartConfig);
		var panel = document.createElement('div');
		panel.style.left = titleWidth + 'px';
		panel.classList.add('chart-panel');
		var daysDiff = GanttUtils.calculateDaysDiff(data.scope.startDate, data.scope.endDate);
		var panelWidth = (boxWidth * daysDiff);
		panel.style.width = panelWidth + 'px';
		panel.style.height = ((GANTT_DEFAULT_CONFIG.BOXHEIGHT + 1) * data.gantt.length) + 'px';
		return panel;
	}

	var fillChart = function(chartPanel, chartConfig, data) {
		var titleWidth = GanttUtils.getTitleWidth(chartConfig);
		data.gantt.forEach(function(row, index) {
			var top = index * (GANTT_DEFAULT_CONFIG.BOXHEIGHT + 1);
			top = top + 3;
			row.dates.forEach(function(bar) {
				var barElem = generateGanttBar(chartConfig, bar, top, data.scope.startDate);
				chartPanel.appendChild(barElem);
				if (bar.desc) {
					var descBox = generateDescBox(chartConfig, bar, top, data.scope.startDate);
					chartPanel.appendChild(descBox);
				}
			});
		});
		// console.log(chartPanel);
		return chartPanel;
	}

	var generateGanttBar = function(chartConfig, bar, top, firstDayOfChart) {
		var positionDate = getPositionByDate(chartConfig, bar, firstDayOfChart);
		var barWidth = positionDate.end - positionDate.start - 9; // 6 is set for margin right
		var barElem = document.createElement('div');
		barElem.classList.add('bar');
		barElem.classList.add('wrap-text-with-dots');
		barElem.style.backgroundColor = bar.color;
		barElem.style.width = barWidth + 'px';
		barElem.style.left = positionDate.start + 'px';
		barElem.style.top = top + 'px';
		var text = document.createTextNode(bar.label);
		barElem.appendChild(text);
		if (bar.onClick) {
			barElem.addEventListener('click', bar.onClick);
		}

		return barElem;
	}

	var generateDescBox = function(chartConfig, bar, top, firstDayOfChart) {
		var positionDate = getPositionByDate(chartConfig, bar, firstDayOfChart);
		var elem = document.createElement('div');
		elem.classList.add('desc-box');
		elem.style.top = (top + GANTT_DEFAULT_CONFIG.BOXHEIGHT) + 'px';
		elem.innerHTML = bar.desc;
		elem.style.left = (positionDate.start + 10) + 'px';

		return elem;
	}

	var getPositionByDate = function(chartConfig, bar, firstDayOfChart) {
		var boxWidth = GanttUtils.getBoxWidth(chartConfig);
		var diffDateStart = GanttUtils.calculateDaysDiff(firstDayOfChart, bar.startDate);
		var diffDateEnd = GanttUtils.calculateDaysDiff(firstDayOfChart, bar.endDate) + 1;
		var positionStartDate = (diffDateStart * boxWidth) + 2;
		var positionEndDate = (diffDateEnd * boxWidth);
		var result = {
			start: positionStartDate,
			end: positionEndDate
		};

		return result;
	}

	var publicAPI = {
		generate: generate
	};

	return publicAPI;
})(GANTT_DEFAULT_CONFIG);