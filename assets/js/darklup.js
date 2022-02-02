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
			$this.handleOSDark();
			$this.handleKeyShortcut();
		},
		windowOnLoad: function(){

			// 
			let getStorageData = localStorage.getItem("darklupModeEnabled"),
				getTriggerCheked = localStorage.getItem("triggerCheked");
			//
			if( getStorageData && getTriggerCheked ) {
				$('html').toggleClass(this.darkEnabledClass);
				$(this.switchTrigger).prop( 'checked', true );
				$('.darkluplite-mode-switcher').addClass( 'darkluplite-dark-ignore' );
				$("html").show()
			}else{
				$("html").show()
			}

		},
		handleOSDark: function(){

			if(isOSDarkModeEnabled){
				let lightOnOSDarkCheked = localStorage.getItem("lightOnOSDarkCheked");
				if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
					if(!lightOnOSDarkCheked){
						$('html').addClass(this.darkEnabledClass);
						$(this.switchTrigger).prop( 'checked', true );
						$('.darkluplite-mode-switcher').addClass( 'darkluplite-dark-ignore' );
					}
				}

				window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
					const newColorScheme = e.matches ? "dark" : "light";
					if(newColorScheme === "dark"){
						if(!lightOnOSDarkCheked){
							$('html').addClass(this.darkEnabledClass);
							$(this.switchTrigger).prop( 'checked', true );
							$('.darkluplite-mode-switcher').addClass( 'darkluplite-dark-ignore' );
						}
					}else{
						$('html').removeClass(this.darkEnabledClass);
						$(this.switchTrigger).prop( 'checked', false );
						$('.darkluplite-mode-switcher').removeClass( 'darkluplite-dark-ignore' );
					}
				});
			}


		},
		handleKeyShortcut: function(){
			let $that = this;
			if(isKeyShortDarkModeEnabled){
				var ctrlDown = false;
				$(document).keydown(function(e) {
					if (e.which === 17) ctrlDown = true;
				})
				$(document).keyup(function(e) {
					if (e.which === 17) ctrlDown = false;
				});
				$(document).keydown(function(event) {
					if (ctrlDown && event.altKey && event.which === 68)
					{

						$('html').toggleClass($that.darkEnabledClass);

						if($($that.switchTrigger).is(':checked') ) {
							localStorage.removeItem("darklupModeEnabled");
							localStorage.removeItem("triggerCheked");
							$($that.switchTrigger).prop( 'checked', false );
							$('.darkluplite-mode-switcher').removeClass( 'darkluplite-dark-ignore' );
						}else{
							localStorage.setItem("darklupModeEnabled", $that.darkEnabledClass);
							localStorage.setItem("triggerCheked", "checked");
							$($that.switchTrigger).prop( 'checked', true );
							$('.darkluplite-mode-switcher').addClass( 'darkluplite-dark-ignore' );
						}

					}
				});

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

					if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
						localStorage.removeItem("lightOnOSDarkCheked");
					}
				} else {
					$this.closest('.darkluplite-mode-switcher').removeClass('darkluplite-dark-ignore');
					localStorage.removeItem("darklupModeEnabled");
					localStorage.removeItem("triggerCheked");

					if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
						localStorage.setItem("lightOnOSDarkCheked", true);
					}
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