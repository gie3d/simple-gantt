var GanttUtils = (function() {
	'use strict';

	var addDays = function(date, days) {
		var newDate = new Date(date);
		newDate.setDate(newDate.getDate() + days);
		return newDate;
	}

	var calculateDaysDiff = function(startDate, endDate) {
		var oneDay = 24*60*60*1000;
		var startDateMs = startDate.getTime();
		var endDateMs = endDate.getTime();
		var diffMs = Math.abs(startDateMs - endDateMs);
		var diffDays = Math.ceil(diffMs/oneDay);
		return diffDays;
	}

	var calculateDiffMonth = function(startDate, endDate) {
		var startMonth = startDate.getMonth();
		var startYear = startDate.getFullYear();
		var endMonth = endDate.getMonth();
		var endYear = endDate.getFullYear();

		var diffYears = Math.abs(endYear - startYear);
		var diffMonths = (diffYears * 12) + Math.abs(endMonth - startMonth);

		return diffMonths;
	}

	var getTitleWidth = function(chartConfig) {
		var titleWidth = chartConfig.titleWidth || GANTT_DEFAULT_CONFIG.titleWidth;
		return titleWidth;
	}

	var getBoxWidth = function(chartConfig) {
		var boxWidth = chartConfig.boxWidth || GANTT_DEFAULT_CONFIG.BOXWIDTH;
		boxWidth = boxWidth + 1; //border size
		return boxWidth;
	}

	var publicAPI = {
		addDays: addDays,
		calculateDaysDiff: calculateDaysDiff,
		calculateDiffMonth: calculateDiffMonth,
		getTitleWidth: getTitleWidth,
		getBoxWidth: getBoxWidth
	}

	return publicAPI;
})();