function dellModule() {

	/*========================================
		PRIVATE MEMBERS
	========================================*/
	var _args = {};
	var lwp = {};
	
	// player object
	var playerObject = {};
	
	// flag for closed captions
	var showCaptions = true;
	// array of closed captions
	var allClosedCaptions = [];
	// list of CC languages
	var videoplayerLanguageList = [];
	// current closed caption language
	var currentClosedCaptionLocale;
	// current set of captions
	var currentCaption = [];
	// last caption
	var lastCaption;
	// player container DIV
	var playerContainer;
	// captionsContainer DIV
	var captionsContainer;
	// captions DIV
	var captionDIV;
	// videoLanguagePopup DIV
	var videoLanguagePopup;
	
	// current id
	var currentVideoID;
	// playlist CTA object
	var playlistCTAObject;
	
	// ctaContainer div
	var ctaContainer;
	// ctaContainer width
	var ctaContainerWidth = 0;
	// ctaContainer height
	var ctaContainerHeight = 0;
	// ctaButton div
	var ctaButton;
	
	// cta start time
	/*var ctatimeStart = 0;
	// cta end time
	var ctatimeEnd = -1;
	// cta link
	var ctalinkURL = "";
	// cta button text/label
	var ctabuttonText = "Learn more";
	// cta window target
	var ctatarget = "_top"; 
	// cta button classname
	var ctaclassname = "primary";
	// cta top offset 
	var ctatopoffset = 0;
	// cta right offset
	var ctarightoffset = 0;*/
	
	/*========================================
		PUBLIC MEMBERS
	========================================*/
	this.setLWP = setLWP;
	this.init = init;
	
	/*========================================
		PUBLIC METHODS
	========================================*/
	// social module
	this.loadSocialModule = loadSocialModule;
	// title module
	this.loadTitleModule = loadTitleModule;
	// cc module
	this.loadCCModule = loadCCModule;
	// cc module using JSON
	this.loadCCModuleJSON = loadCCModuleJSON;
	// Omniture module
	this.loadOmnitureModule = loadOmnitureModule;
	// CTA module
	this.loadCTAModule = loadCTAModule;
	
	// module init
	function init( Args ) 
	{
		_args = Args; 
	}
	// set the lwp
	function setLWP( Args )
	{
		lwp = Args;
	}
	
	/*===========================================================
		loadSocialModule
	============================================================*/
	function loadSocialModule( _pageLocale, _videoTitle, _videoDescription ) 
	{
		// default locale
		var pageLocale = { "language": "en", "country": "us", "segment": "dhs" };
		var videoTitle = ( _videoTitle !== null ) ? _videoTitle : document.title;
		var videoDescription = ( _videoDescription !== null ) ? _videoDescription : "";
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
					this.mb.subscribe(OO.EVENTS.PLAYER_CREATED, 'socialUI', _.bind(this.onPlayerCreate, this));
					this.mb.subscribe(OO.EVENTS.CONTENT_TREE_FETCHED, 'socialUI', _.bind(this.onContentTreeFetched, this));
				},
				onPlayerCreate: function(event, elementId, params) {
					this.playerRoot = $j("#" + elementId);

					/* --------------- Social Media Share */
					this.playerRoot = $j("#" + elementId);
					this.playerRoot.find('.oo_controls_wrap').append('<div class="oo_share_container"></div>');
					this.playerRoot.find('.oo_share_container').append('<div class="oo_button oo_toolbar_item oo_fb_share oo_sms"></div>');
					$j('.oo_fb_share').click(function() {
						var uf = location.href;
						var tf = videoTitle;
						window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(uf) + '&t=' + encodeURIComponent(tf),'sharer','toolbar=0,status=0,width=600,height=400');return false;
					});
					this.playerRoot.find('.oo_share_container').append('<div class="oo_button oo_toolbar_item oo_tw_share oo_sms"></div>');
					$j('.oo_tw_share').click(function() {
						var ut = location.href;
						var tt = document.title;
						var maxLength = 140 - (ut.length + 1);
						if (tt.length > maxLength)
						{
							tt = tt.substr(0, (maxLength - 3)) + '...';
						}
						window.open('http://twitter.com/home?status=' + encodeURIComponent(tt + ' ' + ut),'sharer','toolbar=0,status=0,width=600,height=400');return false;
					});
					var hideTimer;
					function hideShareContainer() {$j('.oo_share_container').slideUp(1000);}
					function showShareContainer() {
						clearTimeout(hideTimer);
						$j('.oo_share_container').slideDown(500);
					}
					$j('.oo_tap_panel').hover(
						function(){showShareContainer();},
						function(){hideTimer = setTimeout( hideShareContainer,1500);}
					);
					$j('.oo_share_container').hover(
						function(){showShareContainer();},
						function(){hideTimer = setTimeout( hideShareContainer,1500);}
					);
					/* --------------- Social Media Share */
				},
				onContentTreeFetched: function(event, content) {},
				__end_marker: true
			};
			return Plugin.DellUIModule;
		});
	}

	/*===========================================================
		loadTitleModule
	============================================================*/
	function loadTitleModule() 
	{
		OO = window[_args[0]];
		OO.plugin("DellUIModule", function(OO, _, $, W) {
			var Plugin = {};
			Plugin.DellUIModule = function(mb, id) {
				this.mb = mb;
				this.id = id;
				this.init();
			};
			Plugin.DellUIModule.prototype = {
				init: function() {
					this.mb.subscribe(OO.EVENTS.PLAYER_CREATED, 'titleUI', _.bind(this.onPlayerCreate, this));
					this.mb.subscribe(OO.EVENTS.CONTENT_TREE_FETCHED, 'titleUI', _.bind(this.onContentTreeFetched, this));
				},
				onPlayerCreate: function(event, elementId, params) {
					this.playerRoot = $j("#" + elementId);

					/* --------------- Title and Description */
						this.playerRoot.find('.oo_promo').append('<div class="oo_title_container"><div class="oo_video_title"></div><div class="oo_video_description"></div></div>');
					/* --------------- Title and Description */
				},
				onContentTreeFetched: function(event, content) {},
				__end_marker: true
			};
			return Plugin.DellUIModule;
		});
	}
	
	/*=======================================================================================
		loadCCModule
		@param	ccURL					STRING	Ooyala Closed caption URL
		@param	_pageLocale		OBJECT	Language, Country, Segment
		@param	_showCaptions	BOOLEAN	Override for displaying closed captions (default = true )
	=========================================================================================*/
	function loadCCModule( ccURL, _pageLocale, _showCaptions ) 
	{
		// default CC
		var pageLocale = { "language": "en", "country": "us", "segment": "dhs" };
		// default show captions
		//var showCaptions = true;
		
		OO = window[ _args[0] ];
		
		// set the locale 		
		pageLocale.language = _pageLocale.language;
		pageLocale.country = _pageLocale.country;
		pageLocale.segment = _pageLocale.segment;
		
		currentClosedCaptionLocale = pageLocale.language + "_" + pageLocale.country;
		
		// check for showCaptions
		if( _showCaptions === false )
		{
			showCaptions = false;
		}
		else
		{
			showCaptions = true;
		}
		OO.plugin( "DellUIModule", function(OO, _, $, W) {
			
			var Plugin = {};
			
			Plugin.DellUIModule = function(mb, id) {
				this.mb = mb;
				this.id = id;
				this.init();
			};
			
			Plugin.DellUIModule.prototype = {
				
				init: function() {
					this.mb.subscribe( OO.EVENTS.PLAYER_CREATED, 'closedCaptionUI', _.bind( this.onPlayerCreate, this ));
					this.mb.subscribe( OO.EVENTS.CONTENT_TREE_FETCHED, 'closedCaptionUI', _.bind(this.onContentTreeFetched, this));
					this.mb.subscribe( OO.EVENTS.PLAYHEAD_TIME_CHANGED, "closedCaptionUI", _.bind( this.checkCurrentCaption, this ));
					this.mb.subscribe( OO.EVENTS.SIZE_CHANGED, "closedCaptionUI", _.bind( this.resizeCaptions, this ));
					this.mb.subscribe( "resizeCaptions", "closedCaptionUI", _.bind( this.resizeCaptions, this ));
					this.mb.subscribe( "initClosedCaptions", "closedCaptionUI", _.bind( this.loadClosedCaptions, this ));
					this.mb.subscribe( "showClosedCaptions", "closedCaptionUI", _.bind( this.showClosedCaptions, this, this.mb ));
					this.mb.subscribe( "hideClosedCaptions", "closedCaptionUI", _.bind( this.hideClosedCaptions, this, this.mb ));
					this.mb.subscribe( "showLanguagePopup", "closedCaptionUI", _.bind( this.showLanguagePopup, this, this.mb ));
					this.mb.subscribe( "hideLanguagePopup", "closedCaptionUI", _.bind( this.hideLanguagePopup, this, this.mb ));
					this.mb.subscribe( OO.EVENTS.CONTROLS_HIDDEN, "closedCaptionUI", _.bind( this.hideControls, this, this.mb ));
					this.mb.subscribe( OO.EVENTS.EMBED_CODE_CHANGED, "closedCaptionUI", _.bind( this.videoChanged, this ));
				},
				onPlayerCreate: function( event, elementId, params ) {
					// find the DIV
					this.playerRoot = $j("#" + elementId);
					// find the "controls" DIV and pre-prend some HTML to hold the captions
					this.playerRoot.find('.oo_controls').prepend('<div class="captionsContainer"><div class="caption"></div></div>');
					// set the main player container DIV 
					playerContainer = this.playerRoot;
					// set the main caption container DIV 
					captionsContainer = playerContainer.find( ".captionsContainer");
					// set the caption DIV
					captionDIV = captionsContainer.find( ".caption" );
					// adjust the top of the captions container
					$j( captionsContainer ).css( "top", (- captionDIV.height() - 100) + "px" );
					// hide the container
					$j( captionsContainer ).css( "opacity", "0" );
					// Check if this video is HTML5
					/*var isHTML5 = this.playerRoot.find( "video" );
					// if not HTML5, then unsubscribe 
					if( isHTML5.length === 0 )
					{
						this.mb.unsubscribe( OO.EVENTS.PLAYHEAD_TIME_CHANGED, "closedCaptionUI" ); 
						this.mb.publish( "hideClosedCaptions", "closedCaptionUI" ); 
					}
					else
					{
						// Load CC by publishing the initClosedCaptions even, 
						//	passing in the closed caption file URL and caption DIV
						this.mb.publish( "initClosedCaptions", ccURL, captionDIV );
					}*/
					
				},
				onContentTreeFetched: function(event, content) {
					//alert( "woo hoo" );
					var isHTML5 = this.playerRoot.find( "video" );
					// if not HTML5, then unsubscribe 
					if( isHTML5.length !== 0 )
					{
						$j( captionDIV )[0].innerHTML = "";
						var ccURL = content.closed_captions[0].url;
						// try to change the CC
						this.mb.publish( "initClosedCaptions", ccURL, captionDIV );
					}
					else
					{
						this.mb.unsubscribe( OO.EVENTS.PLAYHEAD_TIME_CHANGED, "closedCaptionUI" ); 
						this.mb.publish( "hideClosedCaptions", "closedCaptionUI" ); 
					}
				},
				videoChanged: function( eventName, newEmbedCode, playerOptionsObject ) {
					console.log( "videoChanged: " );
					//$j( captionDIV )[0].innerHTML = "";
				},
				resizeCaptions: function( event, width, height ) {
					var _captionHeight = captionDIV.height();
					$j( captionsContainer ).css( "top", (- _captionHeight - 5) + "px" );		
				},
				checkCurrentCaption: function( event, currentTime, duration, seekTime ) {	
					var _currentCaption;
					if( showCaptions )
					{
						for ( var caption in currentCaption ) 
						{
							var caption = currentCaption[caption];
							if ( currentTime > caption["begin"] ) 
							{
								if ( currentTime <= caption["end"] ) 
								{
									_currentCaption = caption;
								}
								else
								{
									_currentCaption = "";
								}
							} 
							else if ( _currentCaption ) 
							{
								break;
							}
						};
											
						if ( _currentCaption && ( _currentCaption != "" ) ) 
						{
							// add the text
							$j( captionDIV )[0].innerHTML = _currentCaption[ "text" ];
							// show the caption container
							//$j( captionsContainer ).css( "opacity", "1" );
							// resize the captions
							this.mb.publish( "resizeCaptions" );
						} 
						else 
						{
							// hide the caption container
							//$j( captionsContainer ).css( "opacity", "0" );\
							$j( captionDIV )[0].innerHTML = "";
						}
						if ( lastCaption !== _currentCaption ) 
						{
							$j( captionsContainer ).css( "width", "100%" );
							if ( _currentCaption !== "" ) 
							{
								this.mb.publish( "resizeCaptions" );
							}
						}
						lastCaption = _currentCaption;
					}
					else
					{
						// hide the caption container
						$j( captionsContainer ).css( "opacity", "0" );
					}
				},
				onClosedCaptionsLoad: function ( event, result ) {},
				loadClosedCaptions: function ( event, _ccURL, _captionDiv ) {
					getClosedCaptions( _ccURL, _captionDiv, this );
					this.mb.publish( "hideLanguagePopup", "closedCaptionUI" ); 
				},
				showClosedCaptions: function ( event, a, b, c, d ) {
					//showCaptions = true;
					//toggleCaptions();
					$j( captionsContainer ).css( "opacity", "1" );
				},
				hideClosedCaptions: function ( event, a, b, c, d ) {
					//showCaptions = false;
					//toggleCaptions();
					$j( captionsContainer ).css( "opacity", "0" );
				},
				showLanguagePopup: function( event, a, b, c, d ) {
					// debug
					console.log( "showLanguagePopup" );
					showVideoLanguagePopup();
				},
				hideLanguagePopup: function( event, a, b, c, d ) {
					// debug
					console.log( "hideLanguagePopup" );
					hideVideoLanguagePopup();
				},
				hideControls: function( event, a, b, c, d ) {
					// debug
					console.log( "hideControls" );
					hideVideoLanguagePopup();
				},
				__end_marker: true
			};
			return Plugin.DellUIModule;
		});
	}
	
	/*=======================================================================================
		loadCCModuleJSON
		@param	ccData				OBJECT	JSON cc object
		@param	_pageLocale		OBJECT	Language, Country, Segment
		@param	_showCaptions	BOOLEAN	Override for displaying closed captions (default = true )
	=========================================================================================*/
	function loadCCModuleJSON( ccData, _pageLocale, _showCaptions ) 
	{
		// default LWP
		var pageLocale = { "language": "en", "country": "us", "segment": "dhs" };

		// set the scope		
		OO = window[ _args[0] ];
		
		// set the locale 		
		pageLocale.language = _pageLocale.language;
		pageLocale.country = _pageLocale.country;
		pageLocale.segment = _pageLocale.segment;
		
		currentClosedCaptionLocale = pageLocale.language + "_" + pageLocale.country;
		
		// check for showCaptions
		if( _showCaptions === false )
		{
			showCaptions = false;
		}
		else
		{
			showCaptions = true;
		}
		
		// instantiate the plugin
		OO.plugin( "DellUIModule", function(OO, _, $, W) {
			
			var Plugin = {};
			
			Plugin.DellUIModule = function(mb, id) {
				this.mb = mb;
				this.id = id;
				this.init();
			};
			
			Plugin.DellUIModule.prototype = {
				
				init: function() {
					this.mb.subscribe( OO.EVENTS.PLAYER_CREATED, 'closedCaptionUI', _.bind( this.onPlayerCreate, this ));
					this.mb.subscribe( OO.EVENTS.CONTENT_TREE_FETCHED, 'closedCaptionUI', _.bind(this.onContentTreeFetched, this));
					this.mb.subscribe( OO.EVENTS.PLAYHEAD_TIME_CHANGED, "closedCaptionUI", _.bind( this.checkCurrentCaption, this ));
					this.mb.subscribe( OO.EVENTS.SIZE_CHANGED, "closedCaptionUI", _.bind( this.resizeCaptions, this ));
					this.mb.subscribe( "resizeCaptions", "closedCaptionUI", _.bind( this.resizeCaptions, this ));
					this.mb.subscribe( "initClosedCaptions", "closedCaptionUI", _.bind( this.loadClosedCaptions, this ));
					this.mb.subscribe( "showClosedCaptions", "closedCaptionUI", _.bind( this.showClosedCaptions, this, this.mb ));
					this.mb.subscribe( "hideClosedCaptions", "closedCaptionUI", _.bind( this.hideClosedCaptions, this, this.mb ));
					this.mb.subscribe( "showLanguagePopup", "closedCaptionUI", _.bind( this.showLanguagePopup, this, this.mb ));
					this.mb.subscribe( "hideLanguagePopup", "closedCaptionUI", _.bind( this.hideLanguagePopup, this, this.mb ));
					this.mb.subscribe( OO.EVENTS.CONTROLS_HIDDEN, "closedCaptionUI", _.bind( this.hideControls, this, this.mb ));
				},
				onPlayerCreate: function( event, elementId, params ) {
					// find the DIV
					this.playerRoot = $j("#" + elementId);
					// find the "controls" DIV and pre-prend some HTML to hold the captions
					this.playerRoot.find('.oo_controls').prepend('<div class="captionsContainer"><div class="caption"></div></div>');
					// set the main player container DIV 
					playerContainer = this.playerRoot;
					// set the main caption container DIV 
					captionsContainer = playerContainer.find( ".captionsContainer");
					// set the caption DIV
					captionDIV = captionsContainer.find( ".caption" );
					// adjust the top of the captions container
					$j( captionsContainer ).css( "top", (- captionDIV.height() - 100) + "px" );
					// hide the container
					$j( captionsContainer ).css( "opacity", "0" );
					// Check if this video is HTML5
					var isHTML5 = this.playerRoot.find( "video" );
					// if not HTML5, then unsubscribe 
					if( isHTML5.length === 0 )
					{
						this.mb.unsubscribe( OO.EVENTS.PLAYHEAD_TIME_CHANGED, "closedCaptionUI" ); 
						this.mb.publish( "hideClosedCaptions", "closedCaptionUI" ); 
					}
					else
					{
						// Load CC by publishing the initClosedCaptions even, 
						//	passing in the closed caption data and caption DIV
						this.mb.publish( "initClosedCaptions", ccData, captionDIV );
					}
					
				},
				onContentTreeFetched: function(event, content) {
					getClosedCaptions();	
				},
				resizeCaptions: function( event, width, height ) {
					var _captionHeight = captionDIV.height();
					$j( captionsContainer ).css( "top", (- _captionHeight - 5) + "px" );		
				},
				checkCurrentCaption: function( event, currentTime, duration, seekTime ) {	
					var _currentCaption;
					if( showCaptions )
					{
						for ( var caption in currentCaption ) 
						{
							var _caption = currentCaption[caption];
							if ( currentTime > _caption["begin"] ) 
							{
								if ( currentTime <= _caption["end"] ) 
								{
									_currentCaption = _caption;
								}
							} 
							else if ( _currentCaption ) 
							{
								break;
							}
						}
								
						if ( _currentCaption && ( _currentCaption !== "" ) ) 
						{
							// add the text
							$j( captionDIV )[0].innerHTML = _currentCaption[ "text" ];
							// resize the captions
							this.mb.publish( "resizeCaptions" );
						} 
			
						if ( lastCaption !== _currentCaption ) 
						{
							$j( captionsContainer ).css( "width", "100%" );
							if ( _currentCaption !== "" ) 
							{
								this.mb.publish( "resizeCaptions" );
							}
						}
						lastCaption = _currentCaption;
					}
					else
					{
						// hide the caption container
						$j( captionsContainer ).css( "opacity", "0" );
					}
				},
				onClosedCaptionsLoad: function ( event, result ) {},
				loadClosedCaptions: function ( event, _ccData, _captionDiv ) {
					getClosedCaptionsJSON( _ccData, _captionDiv, this );
					this.mb.publish( "hideLanguagePopup", "closedCaptionUI" ); 
				},
				showClosedCaptions: function ( event, a, b, c, d ) {
					$j( captionsContainer ).css( "opacity", "1" );
				},
				hideClosedCaptions: function ( event, a, b, c, d ) {
					$j( captionsContainer ).css( "opacity", "0" );
				},
				showLanguagePopup: function( event, a, b, c, d ) {
					toggleVideoLanguagePopup();
				},
				hideLanguagePopup: function( event, a, b, c, d ) {
					toggleVideoLanguagePopup();
				},
				hideControls: function( event, a, b, c, d ) {
					hideVideoLanguagePopup();
				},
				__end_marker: true
			};
			return Plugin.DellUIModule;
		});
	}
	
	/*==================================================================
		CLOSED CAPTIONS
		PRIVATE FUNCTIONS
	===================================================================*/
	
	// get closed cations via AJAX call to Ooyala
	// @param	_ccURL			STRING			URL of DXFP file (XML)
	// @param	_captionDiv	DOM ELEMENT	DIV that will display the captions
	// @param	playerObj		OBJECT 			Player object (contains message bus reference)
	function getClosedCaptions( _ccURL, _captionDiv, playerObj )
	{
		playerObject = playerObj;
		
		$.ajax({
			url: _ccURL,
			type: "GET",
			dataType: "xml",
			context: _captionDiv
		}).done( function ( xmldata, _aa, _bb, _cc ) {
			
			var _captionsXml = $j(xmldata);
			var _currentCaption = [];
			
			// create an array of all languages contained in the XML
			allClosedCaptions = createCaptionsCollection( _captionsXml.find("div") );
			
			// assign the current set of captions to the global currentCaption variable
			//currentCaption = findCurrentCC( pageLocale.language, pageLocale.country );
			currentCaption = findCurrentCC( currentClosedCaptionLocale );
			
			// check the showCaptions global var - if true, and there are captions, publish the "showClosedCaptions" event
			if( currentCaption.length > 0 || showCaptions )
			{
				playerObject.mb.publish( "showClosedCaptions" );
			}
			else
			{
				playerObject.mb.publish( "hideClosedCaptions" );
			}
		}).fail(function (xmldata) {
			// debug
			console.log( "No closed captions available" );
			// return empty array
			return [];
		});	
	}
	
	// get closed cations via AJAX call to Ooyala
	// @param	_ccURL			STRING			URL of DXFP file (XML)
	// @param	_captionDiv	DOM ELEMENT	DIV that will display the captions
	// @param	playerObj		OBJECT 			Player object (contains message bus reference)
	function getClosedCaptionsJSON( _ccData, _captionDiv, playerObj )
	{
		playerObject = playerObj;
		
		var _captionsJSON = _ccData;
		var _currentCaption = [];
			
		// create an array of all languages contained in the XML
		allClosedCaptions = createCaptionsCollectionJSON( _captionsJSON.tt.body.div ); 
		// assign the current set of captions to the global currentCaption variable
		currentCaption = findCurrentCCJSON( pageLocale.language, pageLocale.country );
		// check the showCaptions global var - if true, and there are captions, publish the "showClosedCaptions" event
		if( currentCaption.length > 0 || showCaptions )
		{
			playerObject.mb.publish( "showClosedCaptions" );
		}
		else
		{
			playerObject.mb.publish( "hideClosedCaptions" );
		}
		
	}
	
	// add Closed Caption button 
	function addCCButton()
	{
		// debug
		console.log( "Add CC button" );
		
		var _html = "<div id=\"cc_icon\" class=\"oo_button oo_toolbar_item oo_cc\"></div>";
	
		// add the CC button
		$j( this ).find( ".vod" ).append( _html );
		
		var _cc_icon = $j( this ).find( "#cc_icon" );
		
		// bind the click handler to the CC button
		$j( _cc_icon ).bind( "click", "", ccButtonHandler );
	}
	
	// add Closed Caption popup
	function addCCPopup()
	{
		// debug
		console.log( "Add CC popup" );
		
		// html for popup
		//var _html = '<div id="videoLanguagePopup" class="videoLanguagePopup"><div id="ccLanguageModal"><p style="margin-bottom:5px;"><a id="on-caption" href="javascript:void(0);" class="ooyala-caption">|</a><a id="off-caption" href="javascript:void(0);" class="disabled ooyala-caption">O</a></p><div id="listLanguages"></div></div></div>';
		var _html = '<div id="videoLanguagePopup" class="videoLanguagePopup"><div id="ccLanguageModal"><div id="caption-toggle" href="javascript:void(0);" class="onoff-button on"></div><div id="listLanguages"></div></div></div>';
		// add the html to the control bar
		$j( this ).find( ".vod" ).append( _html );	
		// find the caption toggle
		var _captionToggle = $j( this ).find( "#caption-toggle" );
		
		$j( _captionToggle ).bind( "click", "", toggleCaptions );
		// find the on button
		var _onCaptionButton = $j( this ).find( "#on-caption" );
		// bind the on button to the click
		$j( _onCaptionButton ).bind( "click", "", onCaptions );
		// find the off button
		var _offCaptionButton = $j( this ).find( "#off-caption" );
		// bind the on button to the click
		$j( _offCaptionButton ).bind( "click", "", offCaptions );
		// set the videoLanguagePopup div
		videoLanguagePopup = $j( this ).find( ".vod" ).find( ".videoLanguagePopup" );
		// hide the language popup
		$j( videoLanguagePopup ).hide();
		
		return $j( this ).find( ".vod" );
	}
	
	// closed caption button handler
	function ccButtonHandler( event )
	{
		console.log( "Clicked the language selector" );
		toggleVideoLanguagePopup();
	}
	
	// toggle the videoLanguagePopup
	function toggleVideoLanguagePopup()
	{
		videoLanguagePopup.fadeToggle( "slow" );
	}
	
	// hide the language popup
	function hideVideoLanguagePopup()
	{
		videoLanguagePopup.fadeOut( "slow" );
	}
	
	// hide the language popup
	function showVideoLanguagePopup()
	{
		videoLanguagePopup.fadeIn( "slow" );
	}

	// langage selector button handler
	function languageButtonHandler( event )
	{
		//var _newLanguage;
		
		// debug
		console.log( "language changed from " + currentClosedCaptionLocale + " to " + this.attributes.data.value );
		
		// get the new language code
		//_newLanguage = this.attributes.data.value;
		// use global caption locale 
		currentClosedCaptionLocale = this.attributes.data.value;
		
		// change the caption language
		currentCaption = findCurrentCC( currentClosedCaptionLocale );
		// enable CC, if they aren't already
		showCaptions = true;
		playerObject.mb.publish( "showClosedCaptions" );
		// turn on the button
		var captionToggle = $j(playerContainer).find("#caption-toggle");
		var isOff = captionToggle.hasClass("off");
		if( isOff )
		{
			$j(captionToggle).toggleClass( "on" );
			$j(captionToggle).toggleClass( "off" );
		}
		// close the language popup
		playerObject.mb.publish( "hideLanguagePopup" );
		
	}
	
	function toggleCaptions()
	{
		if( showCaptions )
		{
			console.log( "Hide captions" );
			showCaptions = false;
			playerObject.mb.publish( "hideClosedCaptions" );
		}
		else
		{
			console.log( "Show captions" );
			showCaptions = true;
			playerObject.mb.publish( "showClosedCaptions" );
		}
		$j(this).toggleClass( "on" );
		$j(this).toggleClass( "off" );
		toggleVideoLanguagePopup();
	}
	
	// make closed captions viewable
	function onCaptions()
	{
		// publish to the showClosedCaptions
		playerObject.mb.publish( "showClosedCaptions" );
		toggleVideoLanguagePopup();
	}
	
	// make closed captions hidden
	function offCaptions()
	{
		// publish to the hideClosedCaptions
		playerObject.mb.publish( "hideClosedCaptions" );
		toggleVideoLanguagePopup();
	}
	
	// process the XML into an array of objects
	function createCaptionsCollection( d )
	{
		var _numCCLanguages = d.length;
		var _allCaptions = [];
		var _lastLanguage = "xx";
		var _currentLanguage = "";
		var _ccPopupParentDiv = {};
		var _ccPopupLanguageDiv;

		// if there are any elements in the array, we have closed captions
		// Now we need to create the UI for the button and the language picker
		var _cc_icon = playerContainer.find( "#cc_icon" );
		if ( _numCCLanguages > 0) 
		{
			// add closed caption icon to bar, if not already attached
			if( _cc_icon.length === 0 )
			{
				addCCButton.call( playerContainer );
				_ccPopupParentDiv = addCCPopup.call( playerContainer );
				_ccPopupLanguageDiv = $j( _ccPopupParentDiv ).find( "#listLanguages" );
			}
		}
		else
		{
			// hide closed captions if no languages
			$j( _cc_icon ).hide();
		}
		
		// reset the listLanguages children, just in case
		var __ccPopupLanguageDiv = playerContainer.find( "#listLanguages" );
		if( __ccPopupLanguageDiv.length >  0 )
		{
			__ccPopupLanguageDiv.empty();
			_ccPopupLanguageDiv = __ccPopupLanguageDiv;
		}
		// create a quick array of language codes (assumes that these are in the same order)
		// reset the videoplayerLanguageList 
		videoplayerLanguageList = [];
		for (var _z = 0; _z < _numCCLanguages; _z++) 
		{
			var _divElement = $j(d[_z]);
			//languages
			var _langCode = _divElement.attr( "xml:lang" );
			// special case for Chinese
			/*switch ( _langCode )
			{
				case "zh-cn":
					_langCode = "zh-hans";
					break;
				case "zh-tw":
				case "zh-hk":
					_langCode = "zh-hant";
					break;
			}*/
			var _langName = mapLanguageCodes( _langCode );
			
			// Need to add the list to each individual video's CC list - this example assumes one per page
			videoplayerLanguageList.push( _langCode );
			// populate the language list modal
			_ccPopupLanguageDiv.append( "<div class=\"ccLanguage\" data=\"" + _langCode + "\" title=\"" + _langName + "\" >" + _langName + "</div>" );
			
			//process the captions
			var _caption = [];
			// grab the <p> element
			var _el = _divElement.find( "p" );
			// spin through the <p>
			for ( var _y = 0; _y < _el.length; _y++ ) 
			{
				// get parent language
				_currentLanguage = _langCode;
				if ( _currentLanguage !== _lastLanguage ) 
				{
					_caption.push({ "begin": getTime($j(_el[_y]).attr("begin")), "end": getTime($j(_el[_y]).attr("end")), "text": $j(_el[_y]).text() });
				}
			}
			_lastLanguage = _currentLanguage;
			_allCaptions.push( _caption );
		}
		// add click handler for language selector
		_ccPopupLanguageDiv.find( ".ccLanguage" ).bind( "click", this , languageButtonHandler );
		
		return _allCaptions;
	}
	
	// process the JSON into an array of objects
	function createCaptionsCollectionJSON( d )
	{
		var _numCCLanguages = d.length;
		var _allCaptions = [];
		var _lastLanguage = "xx";
		var _currentLanguage = "";
		var _ccPopupParentDiv = {};
		var _ccPopupLanguageDiv;

		// if there are any elements in the array, we have closed captions
		// Now we need to create the UI for the button and the language picker
		if ( _numCCLanguages > 0) 
		{
			// add closed caption icon to bar
			addCCButton.call( playerContainer );
			_ccPopupParentDiv = addCCPopup.call( playerContainer );
			_ccPopupLanguageDiv = $j( _ccPopupParentDiv ).find( "#listLanguages" );
		}
		
		// create a quick array of language codes (assumes that these are in the same order)
		for (var _z = 0; _z < _numCCLanguages; _z++) 
		{
			var _divElement = $j(d[_z]);
			//languages
			var _langCode = _divElement.prop("_xml:lang");
			// special case for Chinese
			/*switch ( _langCode )
			{
				case "zh-cn":
					_langCode = "zh-hans";
					break;
				case "zh-tw":
				case "zh-hk":
					_langCode = "zh-hant";
					break;
			}*/
			var _langName = mapLanguageCodes( _langCode );
			
			// Need to add the list to each individual video's CC list - this example assumes one per page
			videoplayerLanguageList.push( _langCode );
			// populate the language list modal
			_ccPopupLanguageDiv.append( "<div class=\"ccLanguage\" data=\"" + _langCode + "\" title=\"" + _langName + "\" >" + _langName + "</div>" );
			
			//process the captions
			var _caption = [];
			// grab the <p> element
			var _el = _divElement.prop( "p" );
			// spin through the <p>
			for ( var _y = 0; _y < _el.length; _y++ ) 
			{
				// get parent language
				_currentLanguage = _langCode;
				if ( _currentLanguage !== _lastLanguage ) 
				{
					_caption.push({ "begin": getTime( _el[_y]._begin ), "end": getTime( _el[_y]._end ), "text": _el[_y].__text });
				}
			}
			_lastLanguage = _currentLanguage;
			_allCaptions.push( _caption );
		}
		// add click handler for language selector
		_ccPopupLanguageDiv.find( ".ccLanguage" ).bind( "click", this , languageButtonHandler );
		
		return _allCaptions;
	}
						
	// Find the correct current CC
	function findCurrentCC( _locLanguage, _locCountry )
	{
		var _locale;
		var _localeTest;
		var _result;
		
		// see if _locLanguage is actually a full locale
		_localeTest = explodeLocale( _locLanguage );
		if( _localeTest.language !== "undefined" && _localeTest.country !== "undefined" )
		{
			_locLanguage = _localeTest.language;
			_locCountry = _localeTest.country;
		}
		
		// There should always be a language-country input from the LWP, however, there
		//	may be some use case where that's not true, so we need to test
		if( _locCountry !== "" && _locCountry !== undefined )
		{
			// first try the full locale
			_locale =  _locLanguage + "-" + _locCountry;
			// search
			_result = searchLanguageList( _locale, allClosedCaptions, videoplayerLanguageList );
			if( _result.length > 0 )
			{
				return _result;
			}
			else
			{
				// use the language only
				_locale =  _locLanguage;
				// search
				_result = searchLanguageList( _locale, allClosedCaptions, videoplayerLanguageList );
				if( _result.length > 0 )
				{
					return _result;
				}
				else
				{
					return [];
				}
			}
		}
		else if( _locLanguage !== "" && _locLanguage !== undefined )
		{
			_locale =  _locLanguage;
			// search
			_result = searchLanguageList( _locale, allClosedCaptions, videoplayerLanguageList );
			if( _result.length > 0 )
			{
				return _result;
			}
			else
			{
				return [];
			}
		}
	}
	
	// Find the correct current CC using JSON
	function findCurrentCCJSON( _locLanguage, _locCountry )
	{
		var _locale;
		var _result;
		
		// There should always be a language-country input from the LWP, however, there
		//	may be some use case where that's not true, so we need to test
		if( _locCountry !== "" && _locCountry !== undefined )
		{
			// first try the full locale
			_locale =  _locLanguage + "-" + _locCountry;
			// search
			_result = searchLanguageList( _locale, allClosedCaptions, videoplayerLanguageList );
			if( _result.length > 0 )
			{
				return _result;
			}
			else
			{
				// use the language only
				_locale =  _locLanguage;
				// search
				_result = searchLanguageList( _locale, allClosedCaptions, videoplayerLanguageList );
				if( _result.length > 0 )
				{
					return _result;
				}
				else
				{
					return [];
				}
			}
		}
		else if( _locLanguage !== "" && _locLanguage !== undefined )
		{
			_locale =  _locLanguage;
			// search
			_result = searchLanguageList( _locale, allClosedCaptions, videoplayerLanguageList );
			if( _result.length > 0 )
			{
				return _result;
			}
			else
			{
				return [];
			}
		}
	}
	
	/**
	* searchLanguageList
 	* Search function comparing the array of captions vs. the language list
 	* @param {string} _locale - The language-country or language code (ex. "en-us" or "de")
 	* @param {array} _captionList - multi-dimensional array of all closed captions
	* @param {array} _languageList - simple array of language-country or language codes
	* @returns {array} _captionList[_a] (array of objects)  or empty array
 	*/
	function searchLanguageList( _locale, _captionList, _languageList )
	{
		var __locale = _locale.toLowerCase();
		for( var _a=0; _a < _languageList.length; _a++ )
		{
			var _listLang = _languageList[_a].toLowerCase();
			
			// check for special cases
			/*if( __locale === "zh-cn" )
			{
				__locale = "zh-hans";
			}
			else if( __locale === "zh-tw" || __locale === "zh-hk" )
			{
				__locale = "zh-hant";
			}*/
			
			if( _listLang === __locale )
			{
				return _captionList[_a];
			}
		}
		return [];
	}
	
	// Get the localized language name for each locale code - these values would be used in the UI to select a new language
	//  e.g. "en-US" = "English (US)"
	/**
	* mapLanguageCodes
 	* Map the language code to the translated name
 	* @param {string} _locale - The language-country or language code (ex. "en-us" or "de")
 	*  @param {array} _captionList - multi-dimensional array of all closed captions
	* @param {array} _languageList - simple array of language-country or language codes
	* @returns {array} _captionList[_a] (array of objects)  or empty array
 	*/	
	function mapLanguageCodes( localeCode ) 
	{
		//var _languageObject = { languageName: "English", languageCode: "en", onButtonText: "On", offButtonText: "Off", ccButtonText: "Closed Captions" };
		
		switch ( localeCode.toLowerCase() ) 
		{
			case "da": 
			case "da-da":
				return "Dansk";
			case "de":
			case "de-de": 
				return "Deutsch";
			case "en": 
				return "English";
			case "en-us": 
				return "English (US)";
			case "en-uk": 
				return "English (UK)";
			case "es": 
			case "es-la":
				return "Español";
			case "fr": 
				return "Français";  
			case "fr-ca":
				return "Français (Canada)";	
			case "hi": 
				return "हिन्दी";
			case "it": 
				return "Italiano";
			case "ja":
				return "日本語"               ;
			case "ko":
				return "한국어";            
			case "nl": 
				return "Nederlands";
			case "pt":
			case "pt-pt": 
				return "Português";
			case "pt-br": 
				return "Português (Brasil)";
			case "zh-hans": 
			case "zh-cn":
				return "简体中文";                                                                                  
			case "zh-hant":
			case "zh-tw":
			case "zh-hk":
				return "繁體中文";                                                   
			case "ar":
				return "العربية";
			case "cs":
				return " Čeština ";
			case "el":
				return " Ελληνικά ";
			case "fi":
				return "Suomi";
			case "he":
				return "עברית";
			case "hu":
				return "Magyar";
			case "no":
				return "Norsk";
			case "pl":
				return "Polski";
			case "ro":
				return "Română";
			case "ru":
				return " Русский";
			case "sv":
				return "Svenska";
			case "tr":
				return "Türkçe";                                                 
		}
	}
	
	// break apart locale back into language and country
	// return pagelocale object
	function explodeLocale( locale )
	{
		var _arrLocale = [];
		var _pageLocale = { language: locale, country: undefined };
		
		// search for 
		_arrLocale = locale.split( "-" );
		if( _arrLocale.length > 1 )
		{
			_pageLocale.language = _arrLocale[0];
			_pageLocale.country = _arrLocale[1];
			
			return _pageLocale;
		}
		else
		{
			// try the underscore
			_arrLocale = locale.split( "_" );
			_pageLocale.language = _arrLocale[0];
			_pageLocale.country = _arrLocale[1];
			
			return _pageLocale;
		}
		_pageLocale.language = locale;
		_pageLocale.country = undefined;
		return _pageLocale;
	}
	
	/*===========================================================
		loadOmnitureModule
		@param	object	language, country, segment
	============================================================*/
	function loadOmnitureModule( lwp ) 
	{
		// LWP object ( language, country, segment )
		this.lwp = lwp;
		
		var videoplayereighty = false;
		var videoplayercomplete = false;
		
		OO = window[_args[0]];
		
		OO.plugin( "DellUIModule", function(OO, _, $, W) {
		
			var Plugin = {};
		
			Plugin.DellUIModule = function(mb, id) {
				this.mb = mb;
				this.id = id;
				this.init();
			};
			
			Plugin.DellUIModule.prototype = {
				
				embedCode: "",
				
				init: function() {
					
					this.mb.subscribe( OO.EVENTS.PLAYER_CREATED, "omnitureUI", _.bind( this.onPlayerCreate, this ) );
					this.mb.subscribe( OO.EVENTS.CONTENT_TREE_FETCHED, "omnitureUI", _.bind( this.onContentTreeFetched, this ) );
					this.mb.subscribe( OO.EVENTS.PLAYHEAD_TIME_CHANGED, "omnitureUI", _.bind( this.onPlayheadChanged, this ) );
					this.mb.subscribe( OO.EVENTS.INITIAL_PLAY, "omnitureUI", _.bind( this.onPlayed, this ) );
					/*this.mb.subscribe( OO.EVENTS.EMBED_CODE_CHANGED, "omnitureUI", _.bind( this.onVideoChanged, this ));*/
				},
				onPlayerCreate: function( event, elementId, params ) {	
					var isHTML5 = playerContainer.find( "video" );
					if( isHTML5.length === 0 )
					{
						this.mb.unsubscribe( OO.EVENTS.INITIAL_PLAY, "omnitureUI" );
						this.mb.unsubscribe( OO.EVENTS.PLAYHEAD_TIME_CHANGED, "omnitureUI" );
					}	
				},
				/*onVideoChanged: function( eventName, newEmbedCode, playerOptionsObject ) {
					console.log( "New video" );
					//$j( captionDIV )[0].innerHTML = "";
				},*/
				onPlayed: function( event, elementId, params ) {
					// remove the event for the video, so it isn't called again
					//this.mb.unsubscribe( OO.EVENTS.INITIAL_PLAY, "omnitureUI" );
					// Omniture event16 - start
					trackVideoStart( this.embedCode );	
				},
				onPlayheadChanged: function ( eventName, currentTime, totalTime, seekTime ) {
					// grab the decimal fraction of time / duration of video
					var percentageTime = currentTime/totalTime;
					// check for 80%
					if( videoplayereighty === false && percentageTime > .8 )
					{
						// set the flag so we do not run this code again
						videoplayereighty = true;
						// call the 80% function for SiteCatalyst
						trackVideoEighty(this.embedCode );
					}
					else if( videoplayercomplete === false && percentageTime == 1 )
					{
						// set the flag so we do not run this code again
						videoplayercomplete = true;
						// call the complete function for SiteCatalyst
						trackVideoComplete( this.embedCode );
					}
				},
				onContentTreeFetched: function(event, content) {
					this.embedCode = content.embed_code;	
				},
				__end_marker: true
			};
			return Plugin.DellUIModule;
		});
	}
	
	/*==================================================================
		CLOSED CAPTIONS
		PRIVATE FUNCTIONS
	===================================================================*/

	// TRACK PLAY (event 16)
	function trackVideoStart( videoid )
	{
		console.log( videoid + " : start" );
		if (typeof (s_dell) != 'undefined') 
		{
			s_dell.linkTrackVars = 'prop2,prop13,prop49,eVar24';
			s_dell.linkTrackEvents = 'event16';
			s_dell.events = s_dell.apl( s_dell.events, 'event16', ',', 2 );
			s_dell.eVar24 = videoid;
			s_dell.tl( true, 'o', videoid );
		}
	}
	
	// TRACK 80% (event33)
	function trackVideoEighty( videoid )
	{
		console.log( videoid + " : 80%" );
		if(typeof(s_dell)!= 'undefined'){
			s_dell.linkTrackVars='prop2,prop13,prop49,eVar24';
			s_dell.linkTrackEvents='event33';
			s_dell.events = s_dell.apl( s_dell.events,'event33',',',2 );
			s_dell.eVar24 = videoid;
			s_dell.tl( true, 'o', videoid ); 
		}
	}
	
	// TRACK COMPLETE (event34)
	function trackVideoComplete( videoid )
	{
		console.log( videoid + " : complete" );
		if(typeof(s_dell)!= 'undefined'){
			s_dell.linkTrackVars='prop2,prop13,prop49,eVar24';
			s_dell.linkTrackEvents='event34';
			s_dell.events = s_dell.apl( s_dell.events,'event34',',',2 );
			s_dell.eVar24 = videoid;
			s_dell.tl( true, 'o', videoid ); 
		}
	}	

	/*===========================================================
		Load CTA Module
		
	============================================================*/
	function loadCTAModule( _buttonText, _linkURL, _target , _timeStart, _timeEnd, _topOffset, _rightOffset, _classname, _playlistCTAObject ) 
	{
		var ctabuttonText = ( _buttonText !== undefined ) ? _buttonText : "";
		var ctalinkURL = ( _linkURL !== undefined ) ? _linkURL : "";
		var ctatimeStart = ( _timeStart !== undefined ) ? _timeStart: 0;
		var ctatimeEnd = ( _timeEnd !== undefined ) ? _timeEnd : -1;
		var ctatarget = ( _target !== undefined ) ? _target : "_self";
		var ctatopoffset = ( _topOffset !== undefined ) ? _topOffset : 0;
		var ctarightoffset = ( _rightOffset !== undefined ) ? _rightOffset : 0;
		var ctaclassname = ( _classname !== undefined ) ? _classname : "primary";
		var playlistCTAObject = ( _playlistCTAObject !== undefined ) ? _playlistCTAObject : {};
		var isVisible = false;
		var ctaMetadataArray = [];

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
					this.mb.subscribe( OO.EVENTS.METADATA_FETCHED, 'ctaUI', _.bind( this.onMetadataFetched, this ));
					this.mb.subscribe( "ctaButtonClick", "ctaUI", _.bind( this.onCTAbuttonClick, this, this.mb ));
				},
				onPlayerCreate: function(event, elementId, params) {
					playerObject = this;
					playerContainer = $j( "#" + elementId );
					console.log( "create" );
				},
				onPlayheadChanged: function( event, currentTime, duration, seekTime ) {	
					if( ctaContainer )
					{
						var _isVisible = $j( ctaContainer ).css( "visibility" );
						if( currentTime >= ctatimeStart && currentTime < ctatimeEnd )
						{
							/*if( !isVisible ) 
							{
								$j( ctaContainer ).css( "visibility", "visible" );
								//$j( ctaContainer ).animate( { "visibility" : "visible" }, 1000 );
							}
							isVisible = true;*/
							if( _isVisible !== "visible" )
							{
								$j( ctaContainer ).css( "visibility", "visible" );
							}
						}
						else
						{
							/*if( isVisible ) 
							{
								$j( ctaContainer ).css( "visibility", "hidden" );
							}
							isVisible = false;*/
							if( _isVisible === "visible" )
							{
								$j( ctaContainer ).css( "visibility", "hidden" );
							}
						}
					}
					else
					{
						//isVisible = false;
					}
				},
				onContentTreeFetched: function(event, content) {
					console.log( "content tree" );	
					var _duration = content.duration/1000;
					if( ctatimeEnd === - 1 ) 
					{
						ctatimeEnd = Math.ceil( _duration );
					}
				},
				onMetadataFetched: function(event) {
					var hasBeenSet = false;
					var isFullKey = false;
					isVisible = false;
					// reset the array
					ctaMetadataArray = [];
					// grab the Custom Metadata
					var _metadata = arguments[1].base;
					// look for the "cta_" prefix
					if( _metadata !== undefined && _metadata !== "" )
					{
						for( var _items in _metadata )
						{
							var _ctaPrefix = "cta_";
							var _position = _items.search( _ctaPrefix );
							if( _position > -1 )
							{
								var _keyLocale = _items.substring( _ctaPrefix.length, _items.length );
								var _object = { "key": _keyLocale, "value": _metadata[ _items ] };
								// add to array
								ctaMetadataArray.push( _object );
							}
						}
						
						// check if any cta key/value pairs are available to search through	
						if( ctaMetadataArray.length > 0 )
						{
							// spin through the metadata array to grab the locales and compare to the current locale
							for( var _x=0; _x<ctaMetadataArray.length; _x++ )
							{
								// get the locale/lwp from the key
								var _key = ctaMetadataArray[ _x ].key;
								var _lwpArray = _key.split( "-" );
								var _language = _lwpArray[ 0 ];
								var _country = _lwpArray[ 1 ];		
								var _segment = _lwpArray[ 2 ];
								
								// compare to lwp object
								// First, let's see if there's an exact match
								var _lwpString = "";
								if( _segment === undefined )
								{
									_lwpString = lwp.language + "-" + lwp.country;	
									isFullKey = false;
								}
								else
								{
									_lwpString = lwp.language + "-" + lwp.country + "-" + lwp.segment;
									isFullKey = true;
								}
								
								if( _lwpString === _key )
								{
									// create an array
									var _paramArray = ctaMetadataArray[ _x ].value.split( "," );
									// set the global cta parameters
									if( !hasBeenSet || ( hasBeenSet && isFullKey ) )
									{
										if( _paramArray[0] !== undefined )
										{
											ctabuttonText = _paramArray[0];
										}
										if( _paramArray[1] !== undefined )
										{
											ctalinkURL = _paramArray[1];
										}
										if( _paramArray[2] !== undefined )
										{
											ctatimeStart = _paramArray[2];
										}
										if( _paramArray[3] !== undefined )
										{
											ctatimeEnd = _paramArray[3];
										}
										if( _paramArray[4] !== undefined )
										{
											ctatarget = _paramArray[4];
										}
										if( _paramArray[5] !== undefined )
										{
											ctatopoffset = _paramArray[5];
										}
										if( _paramArray[6] !== undefined )
										{
											ctarightoffset = _paramArray[6];
										}
										if( _paramArray[7] !== undefined )
										{
											ctaclassname = _paramArray[7];
										}	
										hasBeenSet = true;
									}
									console.log( _paramArray );
								}
							}
							if( hasBeenSet )
							{
								var _endscreen = playerContainer.find('.oo_end_screen');
								_endscreen.after("<div class=\"oo_cta_container\"></div>");
								ctaContainer = playerContainer.find('.oo_cta_container');
								// add button
								//ctaButton = addCTAButton.call( ctaContainer, ctabuttonText );
								var _html = "<div class=\"oo_cta_button primary\"><a href=\"#\">" + ctabuttonText + "</a></div>";
								// add the CC button
								$j( ctaContainer ).append( _html );
								var _ctaButton = $j( ctaContainer ).find( ".oo_cta_button" );
								// bind the click handler to the CC button
								$j( _ctaButton ).bind( "click", "", function(){ playerObject.mb.publish( "ctaButtonClick", "ctaUI" ); } );
								ctaContainerWidth = ctaContainer.width();
								ctaContainerHeight = ctaContainer.height();
							}
						}
						
						console.log( "end" );
					}
				},
				onEndScreenShown: function( eventName ) {
					console.log( "end" );
					
					//$j(ctaContainer).css( "width", "auto" );
					//$j(ctaContainer).css( "height", "auto" ); 
					var _containerWidth = $j( ctaContainer ).width();
					var _containerHeight = $j( ctaContainer ).height();
					var _buttonWidth = $j( ctaButton ).width();
					var _buttonHeight = $j( ctaButton ).height();
					var _newContainerLeft = ( playerContainer.width() - _buttonWidth )/2;
					var _newContainerTop = ( playerContainer.height() - _buttonHeight )/2;
					var _time = 1000;
					$j( ctaContainer ).delay( _time ).css( "visibility", "visible" );
				},
				onEmbedCodeChanged: function( eventName, embedCode, playerConfigurationObject ) {
					console.log( embedCode);
					
					isVisible = false;
					
					// destroy the cta container
					
					if( ctaContainer !== undefined )
					{
						ctaContainer.remove();
					}
					
				},
				onCTAbuttonClick: function( x,y,z ) {
					if( ctalinkURL !== "" &&  ctalinkURL !== "undefined" )
					{
						top.location.href = ctalinkURL;
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
	// add Closed Caption button 
	function addCTAButton( buttonText )
	{
		// debug
		//console.log( "Add CTA button: " + buttonText );
		var _html = "<div class=\"oo_cta_button primary\"><a href=\"#\">" + buttonText + "</a></div>";
	
		// add the CC button
		$j( this ).append( _html );
		
		var _ctaButton = $j( this ).find( ".oo_cta_button" );
		
		// bind the click handler to the CC button
		$j( _ctaButton ).bind( "click", "", ctaButtonHandler );
		return _ctaButton;	
	}
	// closed caption button handler
	function ctaButtonHandler( event )
	{
		//console.log( "Clicked the CTA" );
		if( ctalinkURL !== "" &&  ctalinkURL !== "undefined" )
		{
			top.location.href = ctalinkURL;
		}
	}

}
// =================================================================================================
// generic video functions
// =================================================================================================
// parse runtime for display
function parseRuntime( secs ) 
{
	var sec_numb = parseInt(secs);
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
