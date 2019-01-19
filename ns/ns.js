//Require general modules
const request = require('request-promise')
const parseString = require('xml2js').parseString;

const auth = {
	'user': 'hunink.ivo@gmail.com',
	'pass': '-A09Q5Vwv43_kOD-vkGnRN1vw9rqfRN8VOUCN0lcwxr2ugULTV34mQ'
}

/**
 * This function returns all train stations.
 *
 * More information here: https://www.ns.nl/reisinformatie/ns-api/documentatie-stationslijst.html 
 * 
 * @returns {Array} An array containing all train stations.
 */
exports.getStationslijst = function(callback) {
	let requestOptions = {
		uri: "http://webservices.ns.nl/ns-api-stations-v2",
		auth: auth
	}

	request(requestOptions)
		.then (function (response) {
			parseString(response, function (err, result) {
				callback(err, result)
			})
		})
		.catch (function (err) {
			callback(err)
		})
}

/**
 * This function returns all possible travel options.
 *
 * More information here: https://www.ns.nl/reisinformatie/ns-api/documentatie-reisadviezen.html 
 * 
 * @returns {Array} An array containing all travel options.
 */
exports.getReisMogelijkheden = function(options, callback) {
	let requestOptions = {
		uri: "http://webservices.ns.nl/ns-api-treinplanner",
		auth: auth,
		qs: options
	}

	request(requestOptions)
		.then (function (response) {
			parseString(response, function (err, result) {
				//callback(err, result.ReisMogelijkheden.Reismogelijkheid)
				callback(err, result.ReisMogelijkheden.ReisMogelijkheid)
			})
		})
		.catch (function (err) {
			callback(err)
		})
}


/**
 * This function returns the best matchign travel option.
 * 
 * More information here: https://www.ns.nl/reisinformatie/ns-api/documentatie-reisadviezen.html
 *
 * @returns {Object} The best possible travel options.
 */
exports.getReisMogelijkheid = function(options, callback) {
	exports.getReisMogelijkheden(options, function (err, result) {
		if(err){
			callback(err)	
		} else {
			let optimaleReisMogelijkheid = false;
			result.forEach( function(element) { 
				if(element.Optimaal[0] == 'true') {
					optimaleReisMogelijkheid = element
				}
			})

			if(optimaleReisMogelijkheid == false){
				optimaleReisMogelijkheid = result[0]
			}
			callback(false, optimaleReisMogelijkheid)
		}
	})
}
