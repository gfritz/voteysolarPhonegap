function EnAPI(){
	var systemID = -1;
	var intervals;
	
	
	
	var waiting = false;
	var apiUrl = "http://api.enphaseenergy.com/api/systems/";
	var apiKey='811837950565be8af0d6a96b973142de';
	
	
	this.setSystemID = function setSystemID(callback){
			var url = apiUrl;
			var args = {key: apiKey};
			new jQuery.getJSON(url + "?callback=?", args, callback);
	}
	
	this.setID = function setID(sysID){
			console.debug('setting id');
			systemID = sysID.systems[0].system_id;
			$('#sync1').change();
	}
	
	this.pushIntervals = function pushIntervals(startDate,endDate,callback){
		var url = apiUrl + systemID + "/stats";
		var day = new Date(startDate.getTime());
		var isoDay = day.toISO8601String();
		if (endDate!='undefined')
		{
			while (day.getTime()<=endDate.getTime())
			{
				var args = { start: isoDay, key: apiKey};
				new jQuery.getJSON(url + "?callback=?", args, callback);
				waiting = true;
				day = new Date(day.getTime()+86400000);
				isoDay = day.toISO8601String();
				while (!waiting)
				{
					pausecomp(50);
				}
			}
		}
		else
		{
			var args = { start: isoDay, key: apiKey};
			new jQuery.getJSON(url + "?callback=?", args, callback);
		}
		$('#sync2').change();
	}
	
	this.addToIntervals = function addToIntervals(stats){
				intervals=stats.intervals;
				waiting = false;
	}
	
	this.getIntervals = function getIntervals(){
				return intervals;
	}
}

function pausecomp(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
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