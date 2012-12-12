/* solarPanelDBupdate.php
This file uses the enlightenAPI to get the solar panel data and 
load it into the voteySolar database in the following tables:
	static
	1D
	2D
*/

<?php header('Access-Control-Allow-Origin: *');
	
	if (isset($_POST['static']))
		{
			$str = $_POST['static'];
			$table = "static";
		}
	elseif (isset($_POST['1D'])) 
		{
			$str = $_POST['1D'];
			$table = "1D";
		}
	elseif (isset($_POST['2D'])) 
		{
			$str = $_POST['2D'];
			$table = "2D";
		}

	//connect to local mysql
	$user = "voteySolar"; //username
	$pass = "solarUser"; //password
	$name = "voteysolar"; //db name
	$host ="localhost"; //db host
	$db = mysql_connect($host,$user,$pass);
	if (!$db)
		{
			die('Could not connect: ' . mysql_error());
		}
	//connection successful, select voteySolar db
	mysql_select_db($name,$db); //Establish connection
	$query = "INSERT INTO  'static'  VALUES ' tubas are good for testing'";
	mysql_query($query OR trigger_error(mysql_error()))
?>