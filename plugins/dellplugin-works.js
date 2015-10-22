function dellModule() {

	/*========================================
		PRIVATE MEMBERS
	========================================*/
	var _args = {};
	// array of closed captions
	var allClosedCaptions = [];
	// list of CC languages
	var videoplayerLanguageList = [];
	// current set of captions
	var currentCaption = [];
	// captionsContainer DIV
	var captionsContainer;
	// captionBackground DIV
	var captionsBackground;
	// captions DIV
	var captionDIV;
	// default LWP
	var pageLocale = { 
		language: "en", 
		country: "us", 
		segment: "dhs" 
	};
	
	/*========================================
		PUBLIC MEMBERS
	========================================*/
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
	// Omniture module
	this.loadOmnitureModule = loadOmnitureModule;
	
	// module init
	function init( Args ) 
	{
		_args = Args; 
	}
	
	/*===========================================================
		loadSocialModule
	============================================================*/
	// Load the social module function
	function loadSocialModule() 
	{
		OO = window[_args[0]];
		OO.plugin("DellUIModule", function(OO, _, $, W) {
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
					this.playerRoot = $("#" + elementId);

					/* --------------- Social Media Share */
					this.playerRoot = $("#" + elementId);
					this.playerRoot.find('.oo_controls_wrap').append('<div class="oo_share_container"></div>');
					this.playerRoot.find('.oo_share_container').append('<div class="oo_button oo_toolbar_item oo_fb_share oo_sms"></div>');
					$('.oo_fb_share').click(function() {
						var uf = location.href;
						var tf = document.title;
						window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(uf) + '&t=' + encodeURIComponent(tf),'sharer','toolbar=0,status=0,width=600,height=400');return false;
					});
					this.playerRoot.find('.oo_share_container').append('<div class="oo_button oo_toolbar_item oo_tw_share oo_sms"></div>');
					$('.oo_tw_share').click(function() {
						var ut = location.href;
						var tt = document.title;
						var maxLength = 140 - (ut.length + 1);
						if (tt.length > maxLength)
							tt = tt.substr(0, (maxLength - 3)) + '...';
						window.open('http://twitter.com/home?status=' + encodeURIComponent(tt + ' ' + ut),'sharer','toolbar=0,status=0,width=600,height=400');return false;
					});
					var hideTimer;
					function hideShareContainer() {$('.oo_share_container').slideUp(1000);}
					function showShareContainer() {
						clearTimeout(hideTimer);
						$('.oo_share_container').slideDown(500);
					}
					$('.oo_tap_panel').hover(
						function(){showShareContainer();},
						function(){hideTimer = setTimeout( hideShareContainer,1500);}
					);
					$('.oo_share_container').hover(
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
					this.playerRoot = $("#" + elementId);

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
	
	/*===========================================================
		loadCCModule
	============================================================*/
	function loadCCModule( ccURL, _pageLocale ) 
	{
		OO = window[ _args[0] ];
		
		var closedCaptions;
		
		// set the locale 		
		pageLocale.language = _pageLocale.language;
		pageLocale.country = _pageLocale.country;
		pageLocale.segment = _pageLocale.segment;
		
		OO.plugin( "DellUIModule", function(OO, _, $, W) {
			
			var Plugin = {};
			
			Plugin.DellUIModule = function(mb, id) {
				this.mb = mb;
				this.id = id;
				this.init();
			
			};
			
			Plugin.DellUIModule.prototype = {
				
				init: function() {
					this.mb.subscribe( OO.EVENTS.PLAYER_CREATED, 'closedCaptionUI', _.bind(this.onPlayerCreate, this));
					this.mb.subscribe( OO.EVENTS.CONTENT_TREE_FETCHED, 'closedCaptionUI', _.bind(this.onContentTreeFetched, this));
					this.mb.subscribe( OO.EVENTS.PLAYHEAD_TIME_CHANGED, "closedCaptionUI", _.bind( this.checkCurrentCaption, this ));
					this.mb.subscribe( OO.EVENTS.SIZE_CHANGED, "closedCaptionUI", _.bind( this.resizeCaptions, this ));
					this.mb.subscribe( "initClosedCaptions", "closedCaptionUI", _.bind( this.loadClosedCaptions, this ));
				},
				onPlayerCreate: function( event, elementId, params ) {
	
					this.playerRoot = $("#" + elementId);
					this.playerRoot.find('.oo_controls').prepend('\
						<div class="captionsContainer">\
							<div class="caption">\
							</div>\
						</div>\
					');
					
					// set the main captions DIV 
					captionsContainer = this.playerRoot.find( ".captionsContainer");
					captionDIV = captionsContainer.find( ".caption" );
					$( captionsContainer ).css( "top", (- captionDIV.height() - 100) + "px" );
					$( captionsContainer ).css( "opacity", "0" );
					
					// Load CC by publishing the initClosedCaptions even, 
					//	passing in the closed caption file URL and caption DIV
					this.mb.publish( "initClosedCaptions", ccURL, captionDIV );
				},
				onContentTreeFetched: function(event, content) {},
				resizeCaptions: function( event, width, height ) {
					var _captionHeight = captionDIV.height();
					$( captionsContainer ).css( "top", (- _captionHeight - 5) + "px" );		
				},
				checkCurrentCaption: function( event, currentTime, duration, seekTime ) {
					
					// debug
					// console.log( "Check caption" );
					
					var _currentCaption;
					for ( var caption in currentCaption ) 
					{
						var caption = currentCaption[caption];
						if ( currentTime > caption["begin"] ) 
						{
							if ( currentTime <= caption["end"] ) 
							{
								_currentCaption = caption;
							}
						} 
						else if ( _currentCaption ) 
						{
							break;
						}
					};
										
					if ( _currentCaption && ( _currentCaption != "" ) ) 
					{
						$( captionsContainer ).css( "opacity", "1" );
						$( captionDIV )[0].innerHTML = _currentCaption[ "text" ];
						this.mb.publish( OO.EVENTS.SIZE_CHANGED );
					} 
					else 
					{
						$( captionsContainer ).css( "opacity", "0" );
					}
					if ( lastCaption != _currentCaption ) 
					{
						$( captionsContainer ).css( "width", "100%" );
						if ( _currentCaption != "" ) 
						{
							this.mb.publish( OO.EVENTS.SIZE_CHANGED );
						}
					}
					lastCaption = _currentCaption;
				},
				onClosedCaptionsLoad: function ( event, result ) {
					alert( "poo" );
				},
				loadClosedCaptions: function ( event, _ccURL, _captionDiv ) {
					getClosedCaptions( _ccURL, _captionDiv )
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
	function getClosedCaptions( _ccURL, _captionDiv )
	{
		$.ajax({
			url: _ccURL,
			type: "GET",
			dataType: "xml",
			context: _captionDiv
		}).done( function ( xmldata, _aa, _bb, _cc ) {
			
			var _captionsXml = $(xmldata);
			var _currentCaption = [];
			
			// debug
			//console.log( $( this ).text() );
			
			// create an array of all languages contained in the XML
			allClosedCaptions = createCaptionsCollection( _captionsXml.find("div") );
			// assign the current set of captions to the global currentCaption variable
			currentCaption = findCurrentCC( pageLocale.language, pageLocale.country, allClosedCaptions )
			
		}).fail(function (xmldata) {
			// debug
			console.log( "No closed captions available" );
			// return empty array
			return [];
		});	
	}
	
	// process the XML into an array of objects
	function createCaptionsCollection( d )
	{
		var _numCCLanguages = d.length;
		var _allCaptions = [];
		var _lastLanguage = "xx";
		var _currentLanguage = "";

		// if there are any elements in the array, we have CC 
		if ( _numCCLanguages > 0) 
		{
			//$('body').append('\
			//	<div id="ccLanguageModalVideo1" style="display:none;">\
			//	<p style="margin-bottom:10px;">Captions : \
			//	<a id="on-caption" href="javascript:void(0);" class="ooyala-caption" onClick="onCaptions();">On</a>\
			//	<a id="off-caption" href="javascript:void(0);" class="disabled ooyala-caption" onClick="offCaptions();">Off</a>\
			//	</p>\
			//	<ul id="listLanguagesVideo1"></ul>\
			//</div>');
			
		}
		// create a quick array of language codes (assumes that these are in the same order)
		for (var _z = 0; _z < _numCCLanguages; _z++) 
		{
			var _divElement = $(d[_z]);
			//languages
			var _langCode = _divElement.attr( "xml:lang" );
			var _langName = mapLanguageCodes( _langCode );
			// Need to add the list to each individual video's CC list - this example assumes one per page
			videoplayerLanguageList.push( _langCode );
			// populate the language list modal
			//$("#listLanguagesVideo1").append("<li class=\"ccLanguage\" data=\"" + _langCode + "\" >" + _langName + "</li>");

			//process the captions
			var _caption = [];
			// grab the <p> element
			var _el = _divElement.find("p");
			// spin through the <p>
			for (var _y = 0; _y < _el.length; _y++) 
			{
				// get parent language
				_currentLanguage = _langCode;
				if (_currentLanguage != _lastLanguage) 
				{
					_caption.push({ "begin": getTime($(_el[_y]).attr("begin")), "end": getTime($(_el[_y]).attr("end")), "text": $(_el[_y]).text() });
				}
			}
			_lastLanguage = _currentLanguage;
			_allCaptions.push(_caption);
		}
		// add event handler UI element
	 // $(".ccLanguage").bind("click", this, changeCC);
		return _allCaptions;
	}
						
	// Find the correct current CC
	function findCurrentCC( _locLanguage, _locCountry, _allCaptions )
	{
		var _locale;
		var _result;
		
		// There should always be a language-country input from the LWP, however, there
		//	may be some use case where that's not true, so we need to test
		if( _locCountry != "" && _locCountry != undefined )
		{
			// first try the full locale
			_locale =  _locLanguage + "-" + _locCountry;
			// search
			_result = searchLanguageList( _locale, _allCaptions, videoplayerLanguageList );
			if( _result.length > 0 )
			{
				return _result;
			}
			else
			{
				// use the language only
				_locale =  _locLanguage;
				// search
				_result = searchLanguageList( _locale, _allCaptions, videoplayerLanguageList );
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
		else if( _locLanguage != "" && _locLanguage != undefined )
		{
			_locale =  _locLanguage;
			// search
			_result = searchLanguageList( _locale, _allCaptions, videoplayerLanguageList );
			if( _result.length() > 0 )
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
		for( var _a=0; _a < _languageList.length; _a++ )
		{
			var _listLang = _languageList[_a].toLowerCase();
			
			// check for special cases
			if( _locale == "zh-cn" )
			{
				_locale = "zh-hans";
			}
			else if( _locale == "zh-tw" || _locale == "zh-hk" )
			{
				_locale = "zh-hant";
			}
			
			if( _listLang == _locale )
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
 	* @param {array} _captionList - multi-dimensional array of all closed captions
	* @param {array} _languageList - simple array of language-country or language codes
	* @returns {array} _captionList[_a] (array of objects)  or empty array
 	*/	
	function mapLanguageCodes( localeCode ) 
	{
		switch ( localeCode.toLowerCase() ) 
		{
			case "da": 
				return "Dansk";
				break;
			case "de": 
				return "Deutsch";
				break;
			case "en": 
				return "English";
				break;
			case "en-us": 
				return "English (US)";
				break;
			case "en-uk": 
				return "English (UK)";
				break;
			case "es": 
				return "Español";
				break;
			case "fr": 
				return "Français";
				break;   
			case "hi": 
				return "हिन्दी";
				break;
			case "it": 
				return "Italiano";
				break;
			case "ja":
				return "日本語"               ;
				break;
			case "ko":
				return "한국어";            
				break;
			case "nl": 
				return "Nederlands";
				break;
			case "pt":
			case "pt-pt": 
				return "Português";
				break;
			case "pt-br": 
				return "Português (Brasil)";
				break;
			case "zh-hans": 
				return "简体中文";
				break;                                                                                   
			case "zh-hant":
				return "繁體中文";
				break;                                                   
			case "ar":
				return "العربية"
				break;
			case "cs":
				return " Čeština ";
				break;
			case "el":
				return " Ελληνικά ";
				break;
			case "fi":
				return "Suomi";
				break;
			case "fr-ca":
				return "Français (Canada)";
				break;
			case "he":
				return "עברית";
				break;
			case "hu":
				return "Magyar";
				break;
			case "no":
				return "Norsk";
				break;
			case "pl":
				return "Polski";
				break;
			case "ro":
				return "Română";
				break;
			case "ru":
				return " Русский";
				break;
			case "sv":
				return "Svenska";
				break;
			case "tr":
				return "Türkçe";
				break;                                                   
		}
	}
	
	
// Omniture module
	function loadOmnitureModule( lwp ) 
	{
		// LWP object ( language, country, segment )
		this.lwp = lwp;
		
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
					
					this.mb.subscribe( OO.EVENTS.PLAYER_CREATED, 'omnitureUI', _.bind( this.onPlayerCreate, this ) );
					this.mb.subscribe( OO.EVENTS.CONTENT_TREE_FETCHED, 'omnitureUI', _.bind( this.onContentTreeFetched, this ) );
					this.mb.subscribe( OO.EVENTS.PLAYHEAD_TIME_CHANGED, 'omnitureUI', _.bind( this.onPlayheadChanged, this ) );
					this.mb.subscribe( OO.EVENTS.INITIAL_PLAY, 'omnitureUI', _.bind( this.onPlayed, this ) );
					
				},
				onPlayerCreate: function( event, elementId, params ) {
				
				},
				onPlayed: function( event, elementId, params ) {
					// remove the event for the video, so it isn't called again
						this.mb.unsubscribe( OO.EVENTS.INITIAL_PLAY, "omnitureUI" );
				
						// Omniture event16 - start
						trackVideoStart( this.embedCode );			
				},
				onPlayheadChanged: function ( eventName, currentTime, totalTime, seekTime ) {
			
					// grab the decimal fraction of time / duration of video
					//var percentageTime = currentTime/totalTime;
						
					// check for 80%
					//if( videoplayer1eighty == false && percentageTime > .8 )
					//{
						// set the flag so we do not run this code again
						//videoplayer1eighty = true;
						// call the 80% function for SiteCatalyst
						//trackVideoEighty( videoPlayer1.embedCode );
					//}
					//else if( videoplayer1complete == false && percentageTime == 1 )
					//{
						// set the flag so we do not run this code again
						//videoplayer1complete = true;
						// call the complete function for SiteCatalyst
						//trackVideoComplete( videoPlayer1.embedCode );
					//}
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
		
		// commented out Omniture/SiteCatalyst code
		/*if (typeof (s_dell) != 'undefined') 
		{
			s_dell.linkTrackVars = 'prop2,prop13,prop49,eVar24';
			s_dell.linkTrackEvents = 'event16';
			s_dell.events = s_dell.apl( s_dell.events, 'event16', ',', 2 );
			s_dell.eVar24 = videoid;
			s_dell.tl( true, 'o', videoid );
		}*/
	}
	
	// TRACK 80% (event33)
	function trackVideoEighty( videoid )
	{
		console.log( videoid + " : 80%" );
		/*if(typeof(s_dell)!= 'undefined'){
			s_dell.linkTrackVars='prop2,prop13,prop49,eVar24';
			s_dell.linkTrackEvents='event33';
			s_dell.events = s_dell.apl( s_dell.events,'event33',',',2 );
			s_dell.eVar24 = videoid;
			s_dell.tl( true, 'o', videoid ); 
		}*/
	}
	
	// TRACK COMPLETE (event34)
	function trackVideoComplete( videoid )
	{
		console.log( videoid + " : complete" );
		/*if(typeof(s_dell)!= 'undefined'){
			s_dell.linkTrackVars='prop2,prop13,prop49,eVar24';
			s_dell.linkTrackEvents='event34';
			s_dell.events = s_dell.apl( s_dell.events,'event34',',',2 );
			s_dell.eVar24 = videoid;
			s_dell.tl( true, 'o', videoid ); 
		}*/
	}	
	
	
	
}

