// ==UserScript==
// @name         TSR-TechData
// @namespace    https://www.topstockresearch.com/
// @version      0.1
// @description  try to take over the world!
// @author       Nayan Shah
// @match        https://www.topstockresearch.com/INDIAN_STOCKS/*/TechAnalysis_*
// @run-at       document-end
// @grant        GM_setClipboard
// @grant        none
// ==/UserScript==

// Format is TableNumber: [List of Columns]
var ValuesToSkip = {
	12: [2],	// Slow Stochastic -> %K is empty
	14: [2,3,5],
};

// Format is TableNumber: Empty cells
var EmptyCellsToAdd = {
	1: 1,
	2: 1,
	5: 2
};

// Prompt values instead of copying to clipboard
var PromptValues = true;

// Prints error on console if page is not in the expected format
var EnableChecks = true;

function parseData($)
{
	var values = getAllDailyValues($);
	console.table(values);

	var valuesCsv = values.join();
	if(PromptValues)
	{
		 prompt("Values", valuesCsv);
	}
	else
	{
		GM_setClipboard(valuesCsv);
	}
}

function createButton($)
{
	$('<button/>')
		.text("Indicator Values")
		.click(e => parseData($))
		.insertBefore('.datagrid:first');
}

function getAllDailyValues($, headers = false)
{
	var tables = getDailyTables($);
	var values = [];
	for(var i=0; i<tables.length; i++)
	{
		values.push(getDailyValues(tables[i], ValuesToSkip[i+1], EmptyCellsToAdd[i+1], headers));
	}

	return values;
}

function getDailyTables($)
{
	// Indicator tables
	var tables = $('.col-lg-10 > .datagrid > .table-responsive > #datagrid > table > tbody').toArray();

	// special case for 'Other Indicators' table
	tables = tables.concat($('.col-lg-10 > .datagrid > #datagrid > table > tbody').toArray());

	assert(tables.length == 14, "Expected 14 tables, but found " + tables.length);

	return tables;
}

function getDailyValues(table, skipCols, emptyCells, headers = false)
{
	// skip columns after 'description' if it exists
	var endCol = indexOfColumn(table, 'description');
	if(endCol == -1)
	{
		endCol = table.children[0].children.length - 1;
	}

	var row = headers ? 0 : 1;
	return getRangeAsArray(table, row, 1, row, endCol, skipCols, emptyCells);
}

function getRangeAsArray(table, startRow, startCol, endRow, endCol, skipCols = [], emptyCells = 0)
{
	if(startRow < 0 || startCol < 0 || endRow < 0 || endCol < 0)
	{
		return [];
	}

	var values = [];
	for(var i=startRow; i<=endRow; i++)
	{
		for(var j=startCol; j<=endCol; j++)
		{
			if (skipCols.indexOf(j) > -1)
			{
				continue;
			}

			// Other indicator table has link to Charts next to value
			var cellText = table.children[i].children[j].innerText.trim();
			cellText = cellText.split(' ')[0];

			values.push(cellText);
		}
	}

	for(var k=0; k<emptyCells; k++)
	{
		values.push('');
	}

	return values;
}

function indexOfColumn(table, columnText)
{
	var headers = table.children[0].children;
	for(var i=0; i<headers.length; i++)
	{
		if(headers[i].innerText.trim() == columnText)
		{
			return i - 1;
		}
	}

	return -1;
}

function assert(condition, message)
{
	if (condition == undefined || !condition)
	{
		if(EnableChecks)
		{
			console.error(message);
		}
	}
}

(function() {
    'use strict';
    createButton(window.$);
})();
