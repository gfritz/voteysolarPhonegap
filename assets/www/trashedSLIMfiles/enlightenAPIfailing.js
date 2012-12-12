

function EApi(){

	var intervals = [];
	var systemID = 58229;
	var apiUrl = "http://api.enphaseenergy.com/api/systems/";
	var apiKey='811837950565be8af0d6a96b973142de';
	
	
	this.setAPIkey = function setAPIkey(apik){
			console.debug(apiKey);
			apiKey = apik;
	}
	this.printAPIkey = function setAPIkey(){
			console.debug(apiKey);
	}
	
	this.setSystemID = function setSystemID(callback){
			var url = apiUrl;
			var args = {key: apiKey};
			new jQuery.getJSON(apiUrl + "?callback=?", args, callback);
	}
	
	this.setID = function setID(sysID){
			systemID = sysID.systems[0].system_id;
			console.debug('setid called');
	}
	
	this.pushIntervalsrange = function pushIntervalsrange(startDate,endDate,callback){
	var url = apiUrl + systemID + "/stats";
	var day = new Date(startDate.getTime());
	var isoDay = day.toISO8601String();
	console.debug('pushing Intervals for a range');
	while (day.getTime()<=endDate.getTime())
		{
			var args = { start: isoDay, key: apiKey};
			new jQuery.getJSON(url + "?callback=?", args, callback);
			day = new Date(day.getTime+86400000);
			isoDay = day.toISO8601String();
		}
	console.debug('intervals pushed');
	}
	
	this.pushIntervalsday = function pushIntervalsday(startDate,callback){
	var url = apiUrl + systemID + "/stats";
	var day = new Date(startDate.getTime());
	var isoDay = day.toISO8601String();
	console.debug(isoDay);
	var args = { start: isoDay, key: apiKey};
	new jQuery.getJSON(url + "?callback=?", args, console.debug);
	console.debug('intervals pushed');
	}
	
	this.addToIntervals = function addToIntervals(stats){
				console.debug(stats.intervals);
				console.debug('addingtointervals');
				intervals+=stats.intervals;
				console.debug(intervals);
	}
	
	this.addToIntervalsfirst = function addToIntervalsfirst(stats){
				console.debug(stats.intervals);
				console.debug('addingtointervalsfirst');
				intervals=stats.intervals;
				console.debug(intervals);
	}
	
	this.printIntervals = function printIntervals(){
				console.debug(intervals);
	}
	
	this.getIntervals = function getIntervals(){
				console.debug(intervals);
				return intervals;
	}
}

Date.prototype.toISO8601String = function (offset) {
    if (!offset) {
        var offset = 'Z';
        var date = this;
    } else {
        var d = offset.match(/([-+])([0-9]{2}):([0-9]{2})/);
        var offsetnum = (Number(d[2]) * 60) + Number(d[3]);
        offsetnum *= ((d[1] == '-') ? -1 : 1);
        var date = new Date(Number(Number(this) + (offsetnum * 60000)));
    }

    var zeropad = function (num) { return ((num < 10) ? '0' : '') + num; }

    var str = "";
    str += date.getUTCFullYear();
    str += "-" + zeropad(date.getUTCMonth() + 1);
    str += "-" + zeropad(date.getUTCDate());
    str += "T" + zeropad(date.getUTCHours()) +
           ":" + zeropad(date.getUTCMinutes());
    str += ":" + zeropad(date.getUTCSeconds());
    str += offset;
    
    return str;
}