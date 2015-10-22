/*===========================================================
		Load CTA Module
	============================================================*/
	function loadCTAModule( _timeStart, _timeEnd, _linkURL, _buttonText, _target , _position, _videoID, _playlistCTAObject ) 
	{
		// default locale
		timeStart = ( _timeStart !== undefined ) ? timeStart = _timeStart: 0;
		timeEnd = ( _timeEnd !== undefined ) ? timeEnd = _timeEnd : -1;
		linkURL = ( _linkURL !== undefined ) ? linkURL = _linkURL : "";
		buttonText = ( _buttonText !== undefined ) ? buttonText = _buttonText : "Learn more";
		target = ( _target !== undefined ) ? target = _target : "_self";
		var _positionValidated = positionValidated( _position );
		position = _positionValidated;
		currentVideoID = _videoID;
		playlistCTAObject = _playlistCTAObject;
		
		// set the Player object
		OO = window[_args[0]];
		// instantiate the plugin
		OO.plugin( "DellUIModule", function( OO, _, $, W ) {
			var Plugin = {};
			Plugin.DellUIModule = function(mb, id) {
				this.mb = mb;
				this.id = id;
				this.init();
			};
			Plugin.DellUIModule.prototype = 
			{
				init: function() {
					this.mb.subscribe( OO.EVENTS.PLAYER_CREATED, 'ctaUI', _.bind( this.onPlayerCreate, this ));
					this.mb.subscribe( OO.EVENTS.CONTENT_TREE_FETCHED, 'ctaUI', _.bind( this.onContentTreeFetched, this ));
					this.mb.subscribe( OO.EVENTS.PLAYHEAD_TIME_CHANGED, 'ctaUI', _.bind( this.onPlayheadChanged, this ));
					this.mb.subscribe( "endScreenShown", 'ctaUI', _.bind( this.onEndScreenShown, this ));
					this.mb.subscribe( OO.EVENTS.EMBED_CODE_CHANGED, 'ctaUI', _.bind( this.onEmbedCodeChanged, this ));
					this.mb.subscribe( OO.EVENTS.METADATA_FETCHED, 'ctaUI', function(event) {
						//console.log( JSON.stringify( arguments[1] ) );
						var _metadata = arguments[1].base;
						linkURL = ( _metadata["cta-link"] !== undefined ) ? _metadata["cta-link"] : "" ;
							
						console.log( "link: " + linkURL );
						//console.log( JSON.stringify(arguments[1].base) ); // "base" is the custom metadata
	
					}); 
				},
				onPlayerCreate: function(event, elementId, params) {
					playerContainer = $("#" + elementId);
				
					var _endscreen = playerContainer.find('.oo_end_screen');
					_endscreen.after("<div class=\"oo_cta_container " + position + "\"></div>");
					ctaContainer = playerContainer.find('.oo_cta_container');
					// add button
					ctaButton = addCTAButton.call( ctaContainer );
					ctaContainerWidth = ctaContainer.width();
					ctaContainerHeight = ctaContainer.height();
					console.log( "create" );
				},
				onPlayheadChanged: function( event, currentTime, duration, seekTime ) {	
					
					console.log( "current: " + currentTime );
					console.log( "after start?: " + ( currentTime >= timeStart ) );
					console.log( "before end?: " + ( currentTime < timeEnd ) );
					console.log( "" );
					if( timeStart < 1 && timeEnd === -1 )
					{
						this.mb.unsubscribe( OO.EVENTS.PLAYHEAD_TIME_CHANGED, "ctaUI" ); 
					}
					else if( currentTime >= timeStart && currentTime < timeEnd )
					{
						if( !isVisible ) 
						{
							$( ctaContainer ).css( "visibility", "visible" );
							//$( ctaContainer ).animate( { "visibility" : "visible" }, 1000 );
						}
						isVisible = true;
					}
					else
					{
						if( isVisible ) 
						{
							$( ctaContainer ).css( "visibility", "hidden" );
						}
						isVisible = false;
					}
				},
				onContentTreeFetched: function(event, content) {
					console.log( "content tree" );	
					var _duration = content.duration/1000;
					if( timeEnd === - 1 ) 
					{
						timeEnd = _duration;
					}
				},
				onEndScreenShown: function( eventName ) {
					console.log( "end" );
					
					//$(ctaContainer).css( "width", "auto" );
					//$(ctaContainer).css( "height", "auto" ); 
					var _containerWidth = $( ctaContainer ).width();
					var _containerHeight = $( ctaContainer ).height();
					var _buttonWidth = $( ctaButton ).width();
					var _buttonHeight = $( ctaButton ).height();
					var _newContainerLeft = ( playerContainer.width() - _buttonWidth )/2;
					var _newContainerTop = ( playerContainer.height() - _buttonHeight )/2;
					var _time = 1000;
					if( isVisible )
					{
						//$( ctaContainer ).hide( _time );
						//$( ctaContainer ).css( "visibility", "hidden" );
					}
					//$( ctaContainer ).animate( { left:_newContainerLeft, top: _newContainerTop } );
					$( ctaContainer ).delay( _time ).css( "visibility", "visible" );
				},
				onEmbedCodeChanged: function( eventName, embedCode, playerConfigurationObject ) {
					console.log( embedCode);
					
					if( currentVideoID !== embedCode )
					{
						buttonText = playlistCTAObject[1].buttonText;
						//update button
						if( $( ".oo_cta_button" ) )
						{
							$( ".oo_cta_button" ).find( "a" ).text( buttonText );
						}		
					}
				},
				__end_marker: true
			};
			return Plugin.DellUIModule;
		});
	}
	
	/*==================================================================
			CTA
			PRIVATE FUNCTIONS
	===================================================================*/
	// validate the position variable
	function positionValidated( pos )
	{
		var POSITION_OPTIONS = { 
			TOPRIGHT: "tr", 
			TOPLEFT: "tl",
			TOPCENTER: "tc"	
		};
		var _pos = ( pos !== undefined ) ? pos.toLowerCase() : "";
		for( var state in POSITION_OPTIONS )
		{
			if( _pos === POSITION_OPTIONS[state] )
			{
				return _pos;
			}
		}
		return POSITION_OPTIONS.TOPRIGHT;
	}
	
	// add Closed Caption button 
	function addCTAButton()
	{
		// debug
		console.log( "Add CTA button" );
		var _html = "<div class=\"oo_cta_button " + position +"\"><a href=\"#\">" + buttonText + "</a></div>";
	
		// add the CC button
		$( this ).append( _html );
		
		var _ctaButton = $( this ).find( ".oo_cta_button" );
		
		// bind the click handler to the CC button
		$( _ctaButton ).bind( "click", "", ctaButtonHandler );
		return _ctaButton;	
	}
	
	// closed caption button handler
	function ctaButtonHandler( event )
	{
		console.log( "Clicked the CTA" );
		if( linkURL !== "" ||  linkURL !== "undefined" )
		{
			location.href = linkURL;
		}
		//toggleVideoLanguagePopup();
	}

}