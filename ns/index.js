//Require general modules
const request = require('request-promise')
const parseString = require('xml2js').parseString;

//Require local modules
const ns = require('./ns.js');

/*
ns.getStationslijst(function (err, res) {
	if(err){
		console.log(err)
	} else {
		console.log(res)
	}
})
*/

let options = {
	fromStation: 'Utrecht',
	toStation: 'Dordrecht',
	previousAdvices: '3',
	nextAdvices: '3',
	dateTime: '2019-01-19T22:00'
}

ns.getReisMogelijkheid(options, function (err, res) {
	if(err){
		console.log(err)
	} else {
		console.dir(res)
	}
})
