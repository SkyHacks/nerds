'use strict';

const ALL_TOPICS = require('./topics');
const _sampleSize = require('lodash/sampleSize');
const _isArray = require('lodash/isArray');
const _omit = require('lodash/omit');
const _pick = require('lodash/pick');

module.exports = nerds = {
	resolve,
	fields,
	include,
	exclude,
	asArray,
	asPromise,
	asGenerator
}

let _search;

/**
 * Resolves the chosen topic and number of results
 * @param  {str}      topic       Valid topic, i.e. "Harry Potter" or "Star Wars"
 * @param  {str|num}  results     [Optional] Max results to be returned
 * @return {obj}                  Chainable nerds object
 */
function resolve (topic, results) {
	if (!topic) throw _paramException(1);
	if (typeof topic != 'string') throw _paramException(2);
	if (!ALL_TOPICS.hasOwnProperty(topic)) throw _paramException(3);
	if ( typeof results !== 'undefined' && !(typeof results === 'number' || typeof results === 'string') ) throw _paramException(4);
	if (results < 0) throw _paramException(5);

	_search = {
		results: _sampleSize(ALL_TOPICS[topic].data, results),
		topic
	}
	return nerds;
}

/**
 * Get all valid fields for a specific topic
 * @return {arr}    Array of valid fields
 */
function fields () {
	if ( !(_search  && _search.results) ) throw _funcException(1);
	_search.results = ALL_TOPICS[_search.topic].keys;
	return _getResults();
}

/**
 * Sets fields to be included in the search results
 * @param  {arr} fields    Array of strings
 * @return {obj}           Chainable nerds object
 */
function include (fields) {
	_validateFields(fields, 'include');

	_search.results = _search.results.map(result => _pick(result, fields));
	return nerds;
}

/**
 * Sets fields to be excluded from the search results
 * @param  {arr} fields    Array of strings
 * @return {obj}           Chainable nerds object
 */
function exclude (fields) {
	_validateFields(fields, 'exclude');

	_search.results = _search.results.map(result => _omit(result, fields));
	return nerds;
}

/**
 * Returns results as an Array
 * @return {arr}     Results Array
 */
function asArray () {
	return _getResults();
}

/**
 * Returns results array wrapped in a Promise
 * @return {prom}     Results Promise
 */
function asPromise () {
	let results = _getResults();
	return new Promise( resolve => resolve(results) );
}

/**
 * Returns results array as a Generator
 * @yield {gen}    Results Generator
 */
function* asGenerator () {
	let results = _getResults();
	let i = 0, len = results.length;
	while (i < len) {
		yield results[i++];
	}
}


///////////////////////////////////
//Helper Functions
///////////////////////////////////

/**
 * Returns the search results and resets the search object
 * @return {arr}    Array of search result objects
 */
function _getResults () {
	let results = _search.results;
	_search = {};
	return results;
}

/**
 * Throws an error if the include/exclude fields are not valid
 * @param  {arr} fields          Array of field strings
 * @param  {str} method          Which method called _validateFields
 */
function _validateFields (fields, method) {
	if ( !(_search  && _search.results) ) throw _funcException(2);
	if (!_isArray(fields)) throw _paramException(6, method);
	if (fields.some(x => typeof x != 'string')) throw _paramException(7, method);
	if (fields.some(x => ALL_TOPICS[_search.topic].keys.indexOf(x) == -1)) throw _paramException(8, method);
}

/**
 * Error constructor helper
 * @param  {num} errorCode    Used for ERROR_MESSAGES object property lookup
 * @param  {str} metadata     Extra data for error messages
 * @return {err}              Newly constructed Error
 */
function _paramException (errorCode, metadata) {
	const ERROR_MESSAGES = {
		1: () => new Error     (`==> Parameter missing! resolve() expects a topic like 'Harry Potter' or 'Star Wars' as the first argument.`),
		2: () => new TypeError (`==> resolve() expects a STRING like 'Harry Potter' or 'Star Wars' as the first argument.`),
		3: () => new Error     (`==> Unknown topic! Make sure you are passing in a valid topic as a STRING. Like 'Harry Potter' or 'Star Wars'.`),
		4: () => new TypeError (`==> resolve() expects a max results NUMBER or STRING as the second argument.`),
		5: () => new Error     (`==> resolve() expects the second argument to represent a positive integer.`),
		6: () => new TypeError (`==> ${metadata}() expects the first argument to be an array of fields. Like ['first name', 'last name'].`),
		7: () => new Error     (`==> Invalid field! ${metadata}() expects an ARRAY of STRINGS as the first argument.`),
		8: () => new Error     (`==> Invalid field! Double check the fields you are passing to ${metadata}(). Try nerds.resolve(<topics>).fields()`),
	};
	return ERROR_MESSAGES[errorCode]();
}

/**
 * Error constructor helper
 * @param  {num} errorCode    Used for ERROR_MESSAGES object property lookup
 * @return {err}              Newly constructed Error
 */
function _funcException (errorCode) {
	const ERROR_MESSAGES = {
		1: () => new Error (`==> Function Error! You need to call nerds.resolve(<topic>) before requesting the fields.`),
		1: () => new Error (`==> Function Error! You need to call nerds.resolve(<topic>) before specifying the fields.`),
	};
	return ERROR_MESSAGES[errorCode]();
}