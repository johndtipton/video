function myModule() {

	var _args = {};
	this.init = init;
	this.loadSocialModule = loadSocialModule;
	this.loadTitleModule = loadTitleModule;

	function init(Args) {
		_args = Args;
	}

	function loadSocialModule() {
		OO = window[_args[0]];
		OO.plugin("SampleUIModule", function(OO, _, $, W) {
			var Plugin = {};
			Plugin.SampleUIModule = function(mb, id) {
				this.mb = mb;
				this.id = id;
				this.init();
			};
			Plugin.SampleUIModule.prototype = {
				init: function() {
					this.mb.subscribe(OO.EVENTS.PLAYER_CREATED, 'customerUi', _.bind(this.onPlayerCreate, this));
					this.mb.subscribe(OO.EVENTS.CONTENT_TREE_FETCHED, 'customerUi', _.bind(this.onContentTreeFetched, this));
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
			return Plugin.SampleUIModule;
		});
	}

	function loadTitleModule() {
		OO = window[_args[0]];
		OO.plugin("SampleUIModule", function(OO, _, $, W) {
			var Plugin = {};
			Plugin.SampleUIModule = function(mb, id) {
				this.mb = mb;
				this.id = id;
				this.init();
			};
			Plugin.SampleUIModule.prototype = {
				init: function() {
					this.mb.subscribe(OO.EVENTS.PLAYER_CREATED, 'customerUi', _.bind(this.onPlayerCreate, this));
					this.mb.subscribe(OO.EVENTS.CONTENT_TREE_FETCHED, 'customerUi', _.bind(this.onContentTreeFetched, this));
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
			return Plugin.SampleUIModule;
		});
	}
}

