function dellModule() {

	/*========================================
		PRIVATE MEMBERS
	========================================*/
	var _args = {};
	
	// player object
	var playerObject = {};
	// flag for closed captions
	var showCaptions = true;
	// array of closed captions
	var allClosedCaptions = [];
	// list of CC languages
	var videoplayerLanguageList = [];
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
	
	/*========================================
		PUBLIC MEMBERS
	========================================*/
	this.init = init;
	
	/*========================================
		PUBLIC METHODS
	========================================*/
	// title module
	this.loadTitleModule = loadTitleModule;
	
	// module init
	function init( Args ) 
	{
		_args = Args; 
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
}