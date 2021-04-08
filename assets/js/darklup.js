(function($) {
	"use strict";

	let d = {};

	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}

	d = {

		switchTrigger: '.switch-trigger',
		darkEnabledClass:'darkluplite-dark-mode-enabled',

		init: function() {
			let $this = this;
			$this.darkModeSwitchEvent();
			$this.darklupDarkIgnore();
			$this.windowOnLoad();
		},
		windowOnLoad: function(){

			// 
			let getStorageData = localStorage.getItem("darklupModeEnabled"),
				getTriggerCheked = localStorage.getItem("triggerCheked");
			//
			if( getStorageData && getTriggerCheked ) {
				$('html').toggleClass(this.darkEnabledClass);
				$(this.switchTrigger).attr( 'checked', true );
				$('.darkluplite-mode-switcher').addClass( 'darkluplite-dark-ignore' );
				$("html").show()
			}else{
				$("html").show()
			}

		},
		darkModeSwitchEvent: function() {

			let $that = this;

			$(this.switchTrigger).on( 'click', function(e) {

				let $this = $(this);

				$('html').toggleClass($that.darkEnabledClass);
				
				// Storage data
				if( $this.is(':checked') ) {
					localStorage.setItem("darklupModeEnabled", $that.darkEnabledClass);
					localStorage.setItem("triggerCheked", "checked");
					$this.closest('.darkluplite-mode-switcher').addClass('darkluplite-dark-ignore');

				} else {
					$this.closest('.darkluplite-mode-switcher').removeClass('darkluplite-dark-ignore');
					localStorage.removeItem("darklupModeEnabled");
					localStorage.removeItem("triggerCheked");
					
				}

			} )

		},
		darklupDarkIgnore: function() {

			document.querySelectorAll("div, section").forEach(function (e) {

				if( "none" !== window.getComputedStyle(e, null).backgroundImage ) {
					e.classList.add("darkluplite-dark-ignore");
					e.querySelectorAll("*").forEach(function (e) {
	                    return e.classList.add("darkluplite-dark-ignore");
	                })
				}

	        });

		}        

	}

	d.init();


})(jQuery);