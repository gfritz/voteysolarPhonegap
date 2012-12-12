function plotData(intervals)
{
	var flashvars = {}; 
	var attributes = {}; 
	var params={};
	params.wmode="opaque"; 
	var so = new SWFObject("amline/amline.swf", "amline", "100%", "100%", "8", "#FFFFFF",flashvars,params,attributes);
	so.addVariable("path", "amline/");
	so.addVariable("chart_settings", encodeURIComponent("<settings><font>Tahoma</font><redraw>true</redraw><hide_bullets_count>18</hide_bullets_count><decimals_separator>.</decimals_separator><background><alpha>90</alpha><border_alpha>10</border_alpha></background><plot_area><margins><left>50</left><right>40</right><bottom>65</bottom></margins></plot_area><grid><x><alpha>10</alpha><approx_count>9</approx_count></x><y_left><alpha>10</alpha></y_left></grid><axes><x><width>1</width><color>0D8ECF</color></x><y_left><width>1</width><color>0D8ECF</color></y_left></axes><indicator><color>000000</color><x_balloon_text_color>FFFFFF</x_balloon_text_color><line_alpha>50</line_alpha><selection_color>0D8ECF</selection_color><selection_alpha>20</selection_alpha></indicator><legend><graph_on_off>0</graph_on_off></legend><zoom_out_button><text_color_hover>FF0F00</text_color_hover></zoom_out_button><help><button><color>FCD202</color><text_color>000000</text_color><text_color_hover>FF0F00</text_color_hover></button><balloon><text><![CDATA[Click on the graph to turn on/off value baloon <br/><br/>Click on legend key to show/hide graph<br/><br/>Mark the area you wish to enlarge]]></text><color>FCD202</color><text_color>000000</text_color></balloon></help><graphs><graph gid='0'><title>kiloWatts</title><color>0D8ECF</color><color_hover>FF0F00</color_hover></graph><graph gid='1'><title>kiloWatthours</title><color>B0DE09</color><color_hover>FF0F00</color_hover><line_width>2</line_width><fill_alpha>30</fill_alpha><bullet>round</bullet></graph></graphs><labels><label lid='0'><text><![CDATA[<b>Today's Static Panel Energy Production </b>]]></text><y>25</y><text_size>13</text_size><align>center</align></label></labels></settings>"));
	so.addVariable("chart_data",toXML(intervals));
	so.write("flashcontent");
}


function toXML(intervals)
{
	var xmlDates = '<series>';
	var xmlkW = "<graph gid='0'>";
	var xmlkWh = "<graph gid='1'>";
	var start = new Date();
	var date = new Date();
	date.setISO8601(intervals[0].end_date);
	// Push all data onto arrays for graphing
	for (var i = 0; i < intervals.length; i++) {
		date.setISO8601(intervals[i].end_date);
		var jDate = new Date();
		totalEnergy += intervals[i].enwh;
		xmlDates=xmlDates+"<value xid='"+i+"'>"+date.toLocaleTimeString()+'</value>';
		xmlkW=xmlkW+"<value xid='"+i+"'>"+(intervals[i].powr/1000)+'</value>';
		xmlkWh=xmlkWh+"<value xid='"+i+"'>"+(intervals[i].enwh/1000)+'</value>';
	}
	xmlDates=xmlDates+"</series>";
	xmlkW=xmlkW+"</graph>";
	xmlkWh=xmlkWh+"</graph>";
	var xmlText = encodeURIComponent("<chart>"+xmlDates+"<graphs>"+xmlkW+xmlkWh+"</graphs></chart>");
	return xmlText;
}