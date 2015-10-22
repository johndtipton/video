// =================================================================================================
// generic video functions
// =================================================================================================

// resize video
function resizeVideo( obj ) 
{
	// debug
	console.log( "Resizing video " + obj.elementId );
	var div = $( "#" + obj.elementId );
	var _oWidth = $( div ).width();
	if( ( div ).find( "oo-playlists" ) )
	{
		var _newHeight = ( _oWidth * 9 / 16 ) + 130;
	}
	else
	{
		var _newHeight = _oWidth * 9 / 16;
	}
	$( div ).height( _newHeight );
}

// parse runtime for display
function parseRuntime( seconds ) 
{
	sec_numb = parseInt(seconds);
	var hours = Math.floor(sec_numb / 3600);
	var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
	var seconds = sec_numb - (hours * 3600) - (minutes * 60);

	if (hours < 10) {
			hours = "0" + hours;
	}
	if (minutes < 10) {
			minutes = "0" + minutes;
	}
	if (seconds < 10) {
			seconds = "0" + seconds;
	}
	var time = hours + ':' + minutes + ':' + seconds;
	return time;
}

// get the time from text
function getTime( time ) 
{
	var time = time.split(":");
	var hours = parseInt(time[0], 10);
	var minutes = parseInt(time[1], 10);
	var seconds = parseInt(time[2], 10);
	return ((hours * 3600) + (minutes * 60) + seconds);
} 