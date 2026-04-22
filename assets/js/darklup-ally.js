/**
 * Darklup Ally — Accessibility Panel
 *
 * Vanilla JS only. Zero jQuery.
 * Loaded ONLY when switch_style === 'ally'.
 *
 * @package Darklup
 * @since   3.2.15
 */

(function () {
	'use strict';

	/* =========================================================================
	   SECTION 1: CONSTANTS
	   ========================================================================= */

	/** CSS body/html classes applied per module. */
	var CLASSES = {
		contrastDark:   'darklup-ally-contrast-dark',
		contrastLight:  'darklup-ally-contrast-light',
		contrastHigh:   'darklup-ally-contrast-high',
		biggerText:     'darklup-ally-bigger-text',
		readableFont:   'darklup-ally-readable-font',
		highlightLinks: 'darklup-ally-highlight-links',
		stopAnimations: 'darklup-ally-stop-animations',
		monochrome:     'darklup-ally-monochrome',
		fontWeight:     'darklup-ally-font-weight',
		alignLeft:      'darklup-ally-align-left',
		alignCenter:    'darklup-ally-align-center',
		alignRight:     'darklup-ally-align-right',
		readingMask:    'darklup-ally-reading-mask',
		hideImages:     'darklup-ally-hide-images',
	};

	/** localStorage key for persisting panel state across page loads. */
	var STORAGE_KEY = 'darklup_ally';

	/** Applied when contrast-dark is on but ally nodes sit under an inverted ancestor (filter cannot be “cleared” from inside). */
	var FILTER_COMPENSATE_CLASS = 'darklup-ally-filter-compensate';

	/** Same idea for contrast-high + contrast() on a wrapper. */
	var FILTER_COMPENSATE_HIGH_CLASS = 'darklup-ally-filter-compensate-high';

	/* =========================================================================
	   SECTION 2: STATE MANAGEMENT
	   ========================================================================= */

	/**
	 * Default state — all features off.
	 * Contrast + alignText use null (off) or a string value for the active cycle step.
	 */
	var defaultState = {
		darkMode:       false,
		contrast:       null,   // null | 'dark' | 'light' | 'high'
		biggerText:     false,
		readableFont:   false,
		highlightLinks: false,
		stopAnimations: false,
		monochrome:     false,
		fontWeight:     false,
		alignText:      null,   // null | 'left' | 'center' | 'right'
		readingMask:    false,
		hideImages:     false,
	};

	/** Live state object. Mutated by toggle functions. */
	var state = {};

	/**
	 * Persist state to localStorage.
	 *
	 * @param {Object} s State object to save.
	 */
	function saveState( s ) {
		try {
			localStorage.setItem( STORAGE_KEY, JSON.stringify( s ) );
		} catch ( e ) {
			// localStorage unavailable — silent fail.
		}
	}

	/**
	 * Load state from localStorage and apply it to the DOM.
	 * Falls back to defaultState on any parse error.
	 * Always syncs darkMode with Darklup's own html class.
	 */
	function restoreState() {
		try {
			var stored = localStorage.getItem( STORAGE_KEY );
			if ( stored ) {
				var parsed = JSON.parse( stored );
				// Merge parsed over defaults so new keys get their defaults.
				state = objectAssign( deepCopy( defaultState ), parsed );
			} else {
				state = deepCopy( defaultState );
			}
		} catch ( e ) {
			state = deepCopy( defaultState );
		}

		// Sync dark mode with Darklup's actual state — source of truth is the html class.
		state.darkMode = document.documentElement.classList.contains( 'darklup-dark-mode-enabled' );

		// Apply all restored active states to the DOM.
		applyState( state );
	}

	/**
	 * Apply a full state object to the DOM (add/remove classes).
	 *
	 * @param {Object} s State object.
	 */
	function applyState( s ) {
		var body = document.body;
		var html = document.documentElement;

		// Contrast — mutually exclusive html classes.
		html.classList.toggle( CLASSES.contrastDark,   s.contrast === 'dark' );
		html.classList.toggle( CLASSES.contrastLight,  s.contrast === 'light' );
		html.classList.toggle( CLASSES.contrastHigh,   s.contrast === 'high' );

		// Simple body-class modules.
		body.classList.toggle( CLASSES.biggerText,     !! s.biggerText );
		body.classList.toggle( CLASSES.readableFont,   !! s.readableFont );
		body.classList.toggle( CLASSES.highlightLinks, !! s.highlightLinks );
		body.classList.toggle( CLASSES.stopAnimations, !! s.stopAnimations );
		body.classList.toggle( CLASSES.fontWeight,     !! s.fontWeight );
		body.classList.toggle( CLASSES.readingMask,    !! s.readingMask );
		body.classList.toggle( CLASSES.hideImages,     !! s.hideImages );

		// Monochrome — applied to <html> (not body) so it affects the full page.
		html.classList.toggle( CLASSES.monochrome, !! s.monochrome );

		// Align text — mutually exclusive body classes.
		body.classList.toggle( CLASSES.alignLeft,   s.alignText === 'left' );
		body.classList.toggle( CLASSES.alignCenter, s.alignText === 'center' );
		body.classList.toggle( CLASSES.alignRight,  s.alignText === 'right' );

		updateFilterCompensation();
	}

	/**
	 * Walk ancestors for non-none filter; record invert / contrast() (ally wrappers).
	 */
	function getAncestorFilterFlags( el ) {
		var out = { invert: false, contrast: false };
		if ( ! el ) {
			return out;
		}
		var cur = el.parentElement;
		while ( cur ) {
			try {
				var f = window.getComputedStyle( cur ).filter;
				if ( f && f !== 'none' ) {
					if ( f.indexOf( 'invert' ) !== -1 ) {
						out.invert = true;
					}
					if ( f.indexOf( 'contrast' ) !== -1 ) {
						out.contrast = true;
					}
				}
			} catch ( e ) {
				/* ignore */
			}
			if ( cur === document.documentElement ) {
				break;
			}
			cur = cur.parentElement;
		}
		return out;
	}

	/**
	 * Toggle filter compensation on hoisted ally roots when a wrapper filter still affects them.
	 */
	function updateFilterCompensation() {
		var html           = document.documentElement;
		var contrastDark   = html.classList.contains( CLASSES.contrastDark );
		var contrastHigh   = html.classList.contains( CLASSES.contrastHigh );

		function setCompensate( el ) {
			if ( ! el ) {
				return;
			}
			var flags = getAncestorFilterFlags( el );
			el.classList.toggle( FILTER_COMPENSATE_CLASS, contrastDark && flags.invert );
			el.classList.toggle( FILTER_COMPENSATE_HIGH_CLASS, contrastHigh && flags.contrast );
		}

		var panel    = panelEl || document.getElementById( 'darklup-ally-panel' );
		var trigger  = triggerEl || document.getElementById( 'darklup-ally-trigger' );
		var backdrop = backdropEl || document.getElementById( 'darklup-ally-backdrop' );

		setCompensate( panel );
		setCompensate( trigger );
		setCompensate( backdrop );

		var masks = document.querySelectorAll( '.darklup-ally-mask-top, .darklup-ally-mask-bottom' );
		for ( var i = 0; i < masks.length; i++ ) {
			setCompensate( masks[ i ] );
		}
	}

	/* =========================================================================
	   SECTION 3: PANEL OPEN / CLOSE
	   ========================================================================= */

	var panelEl, triggerEl, backdropEl, closeEl;
	var panelOpen    = false;
	var previousFocus = null;

	/**
	 * Open the accessibility panel.
	 * Removes inert, adds open class, traps focus inside panel.
	 */
	function openPanel() {
		if ( ! panelEl || ! triggerEl ) { return; }

		panelOpen     = true;
		previousFocus = document.activeElement;

		panelEl.removeAttribute( 'inert' );
		panelEl.classList.add( 'open' );
		panelEl.setAttribute( 'aria-hidden', 'false' );
		triggerEl.setAttribute( 'aria-expanded', 'true' );

		if ( backdropEl ) {
			backdropEl.classList.add( 'darklup-ally-backdrop--open' );
		}

		// Move focus to first interactive element.
		var first = panelEl.querySelector( '#darklup-ally-close, .darklup-ally-card, #darklup-ally-reset' );
		if ( first ) {
			setTimeout( function () { first.focus(); }, 50 );
		}
	}

	/**
	 * Close the accessibility panel.
	 * Re-adds inert, removes open class, restores focus to trigger.
	 */
	function closePanel() {
		if ( ! panelEl || ! triggerEl ) { return; }

		panelOpen = false;

		panelEl.setAttribute( 'inert', '' );
		panelEl.classList.remove( 'open' );
		panelEl.setAttribute( 'aria-hidden', 'true' );
		triggerEl.setAttribute( 'aria-expanded', 'false' );

		if ( backdropEl ) {
			backdropEl.classList.remove( 'darklup-ally-backdrop--open' );
		}

		// Return focus to the element that was active before opening.
		if ( previousFocus && typeof previousFocus.focus === 'function' ) {
			previousFocus.focus();
		} else if ( triggerEl ) {
			triggerEl.focus();
		}

		previousFocus = null;
	}

	/* =========================================================================
	   SECTION 4: MODULE TOGGLE FUNCTIONS
	   ========================================================================= */

	/** Admin settings passed from PHP via wp_localize_script. */
	var settings = window.darklupAllySettings || {};

	/**
	 * Hidden ally bridge input (see class-hooks.php) or any .switch-trigger.
	 * Prefer the bridge so we do not click a menu/admin switch by mistake.
	 */
	function getEngineSwitchTrigger() {
		return document.getElementById( 'darklup-ally-engine-switch' ) ||
			document.getElementById( 'darkluplite-ally-engine-switch' ) ||
			document.querySelector( '.darklup-ally-engine-bridge .switch-trigger' ) ||
			document.querySelector( '.darkluplite-ally-engine-bridge .switch-trigger' ) ||
			document.querySelector( '.switch-trigger' );
	}

	/**
	 * Dark Mode — reuses the same path as the regular (floating / menu) switch.
	 * Clicks the real .switch-trigger so dynamic colors and localStorage stay in
	 * sync with the main engine. The MutationObserver in init() mirrors
	 * state.darkMode for the ally cards; fixStaticSvgFills is not in the observer.
	 */
	function toggleDarkMode() {
		var switchTrigger = getEngineSwitchTrigger();
		if ( switchTrigger ) {
			switchTrigger.click();
		} else {
			// Edge case: no checkbox in the DOM (ally without engineered markup).
			var html = document.documentElement;
			var isDark = html.classList.contains( 'darklup-dark-mode-enabled' );
			if ( isDark ) {
				html.classList.remove( 'darklup-dark-mode-enabled' );
				localStorage.removeItem( 'darklupModeEnabled' );
			} else {
				html.classList.add( 'darklup-dark-mode-enabled' );
				localStorage.setItem(
					'darklupModeEnabled',
					'darklup-dark-mode-enabled'
				);
			}
			html.style.setProperty( 'display', 'block', 'important' );
		}

		setTimeout( function () {
			fixStaticSvgFills();
		}, 60 );
	}

	/**
	 * Contrast — 3-state cycling card.
	 * Cycle: null → 'dark' → 'light' → 'high' → null
	 * Admin can disable individual states via settings; skipped states are omitted.
	 */
	function toggleContrast() {
		// Build available cycle from admin settings.
		var cycle = [ null ];
		if ( settings.contrastDark  === 'on' || settings.contrastDark === 'yes' ) { cycle.push( 'dark' );  }
		if ( settings.contrastLight === 'on' || settings.contrastLight === 'yes' ) { cycle.push( 'light' ); }
		if ( settings.contrastHigh  === 'on' || settings.contrastHigh === 'yes' ) { cycle.push( 'high' );  }

		var idx       = cycle.indexOf( state.contrast );
		state.contrast = cycle[ ( idx + 1 ) % cycle.length ];

		applyState( state );
		saveState( state );
		updateCards( state );
		fixStaticSvgFills();
		updateContrastLabel( state );
		updateContrastIcon( state );
		updateTick( state );
		announce( 'Contrast: ' + ( state.contrast ? state.contrast : 'off' ) );
	}

	/**
	 * Bigger Text — simple body class toggle.
	 */
	function toggleBiggerText() {
		state.biggerText = ! state.biggerText;
		applyState( state );
		saveState( state );
		updateCards( state );
		fixStaticSvgFills();
		updateTick( state );
		announce( 'Bigger Text ' + ( state.biggerText ? 'active' : 'inactive' ) );
	}

	/**
	 * Readable Font — simple body class toggle.
	 */
	function toggleReadableFont() {
		state.readableFont = ! state.readableFont;
		applyState( state );
		saveState( state );
		updateCards( state );
		fixStaticSvgFills();
		updateTick( state );
		announce( 'Readable Font ' + ( state.readableFont ? 'active' : 'inactive' ) );
	}

	/**
	 * Highlight Links — simple body class toggle.
	 */
	function toggleHighlightLinks() {
		state.highlightLinks = ! state.highlightLinks;
		applyState( state );
		saveState( state );
		updateCards( state );
		fixStaticSvgFills();
		updateTick( state );
		announce( 'Highlight Links ' + ( state.highlightLinks ? 'active' : 'inactive' ) );
	}

	/**
	 * Stop Animations — simple body class toggle.
	 */
	function toggleStopAnimations() {
		state.stopAnimations = ! state.stopAnimations;
		applyState( state );
		saveState( state );
		updateCards( state );
		fixStaticSvgFills();
		updateTick( state );
		announce( 'Stop Animations ' + ( state.stopAnimations ? 'active' : 'inactive' ) );
	}

	/**
	 * Monochrome — applied to <html> (not body). Simple toggle.
	 */
	function toggleMonochrome() {
		state.monochrome = ! state.monochrome;
		applyState( state );
		saveState( state );
		updateCards( state );
		fixStaticSvgFills();
		updateTick( state );
		announce( 'Monochrome ' + ( state.monochrome ? 'active' : 'inactive' ) );
	}

	/**
	 * Font Weight — simple body class toggle.
	 */
	function toggleFontWeight() {
		state.fontWeight = ! state.fontWeight;
		applyState( state );
		saveState( state );
		updateCards( state );
		fixStaticSvgFills();
		updateTick( state );
		announce( 'Font Weight ' + ( state.fontWeight ? 'active' : 'inactive' ) );
	}

	/**
	 * Align Text — 3-state cycling card.
	 * Cycle: null → 'left' → 'center' → 'right' → null
	 */
	function toggleAlignText() {
		var cycle     = [ null, 'left', 'center', 'right' ];
		var idx       = cycle.indexOf( state.alignText );
		state.alignText = cycle[ ( idx + 1 ) % cycle.length ];

		applyState( state );
		saveState( state );
		updateCards( state );
		fixStaticSvgFills();
		updateAlignLabel( state );
		updateAlignIcon( state );
		updateTick( state );
		announce( 'Align Text: ' + ( state.alignText ? state.alignText : 'off' ) );
	}

	/**
	 * Reading Mask — two fixed overlay divs that follow the cursor.
	 * Auto-skipped on touch devices (no mousemove available).
	 */
	function toggleReadingMask() {
		// Touch devices: reading mask is meaningless without a cursor.
		if ( 'ontouchstart' in window ) { return; }

		state.readingMask = ! state.readingMask;
		applyState( state );
		saveState( state );
		updateCards( state );
		fixStaticSvgFills();
		updateTick( state );
		announce( 'Reading Mask ' + ( state.readingMask ? 'active' : 'inactive' ) );
	}

	/**
	 * Hide Images — simple body class toggle.
	 * Uses visibility:hidden so layout is preserved.
	 */
	function toggleHideImages() {
		state.hideImages = ! state.hideImages;
		applyState( state );
		saveState( state );
		updateCards( state );
		fixStaticSvgFills();
		updateTick( state );
		announce( 'Hide Images ' + ( state.hideImages ? 'active' : 'inactive' ) );
	}

	/**
	 * Reset all active modules to off.
	 * If dark mode was on, programmatically un-toggles Darklup's engine.
	 */
	function resetAll() {
		// Turn dark mode OFF if currently active before wiping state.
		if ( state.darkMode ) {
			var switchTrigger = getEngineSwitchTrigger();
			if ( switchTrigger ) {
				switchTrigger.click();
			}
		}

		state = deepCopy( defaultState );
		applyState( state );
		saveState( state );
		updateCards( state );
		fixStaticSvgFills();
		updateContrastLabel( state );
		updateContrastIcon( state );
		updateAlignLabel( state );
		updateAlignIcon( state );
		updateTick( state );
		stampDarkIgnore();
		announce( 'All accessibility settings have been reset.' );
	}

	/* =========================================================================
	   SECTION 5: UI UPDATE FUNCTIONS
	   ========================================================================= */

	/**
	 * Sync all card aria-pressed and active class to current state.
	 *
	 * @param {Object} s State object.
	 */
	function updateCards( s ) {
		var cards = document.querySelectorAll( '.darklup-ally-card' );

		cards.forEach( function ( card ) {
			if ( card.getAttribute( 'data-locked' ) === '1' ) { return; }
			var mod    = card.getAttribute( 'data-module' );
			var active = false;

			switch ( mod ) {
				case 'darkMode':
					active = !! s.darkMode;
					break;
				case 'contrast':
					active = s.contrast !== null;
					break;
				case 'alignText':
					active = s.alignText !== null;
					break;
				default:
					active = !! s[ mod ];
					break;
			}

			card.setAttribute( 'aria-pressed', active ? 'true' : 'false' );
			card.classList.toggle( 'darklup-ally-card--active', active );

			// Update aria-label with live state description.
			var labelEl  = card.querySelector( '.darklup-ally-card-label' );
			var labelTxt = labelEl ? labelEl.textContent.trim() : ( mod || '' );
			card.setAttribute( 'aria-label', labelTxt + ', ' + ( active ? 'active' : 'inactive' ) );
		} );
	}

	/**
	 * Update the Contrast card label to reflect the active cycle step.
	 *
	 * @param {Object} s State object.
	 */
	function updateContrastLabel( s ) {
		var card = document.querySelector( '.darklup-ally-card[data-module="contrast"]' );
		if ( ! card ) { return; }

		var labelEl = card.querySelector( '.darklup-ally-card-label' );
		if ( ! labelEl ) { return; }

		// Object key null → JS coerces to string "null". Works as fallback key.
		var labels = {
			'null':   'Contrast',
			'dark':   'Dark Contrast',
			'light':  'Light Contrast',
			'high':   'High Contrast',
		};

		var key      = s.contrast === null ? 'null' : s.contrast;
		var newLabel = labels[ key ] || 'Contrast';
		labelEl.textContent = newLabel;

		card.setAttribute( 'aria-pressed', s.contrast !== null ? 'true' : 'false' );
		card.classList.toggle( 'darklup-ally-card--active', s.contrast !== null );
		card.setAttribute( 'aria-label', newLabel + ', ' + ( s.contrast !== null ? 'active' : 'inactive' ) );
	}

	/**
	 * Update the Align Text card label to reflect the active cycle step.
	 *
	 * @param {Object} s State object.
	 */
	function updateAlignLabel( s ) {
		var card = document.querySelector( '.darklup-ally-card[data-module="alignText"]' );
		if ( ! card ) { return; }

		var labelEl = card.querySelector( '.darklup-ally-card-label' );
		if ( ! labelEl ) { return; }

		var labels = {
			'null':   'Align Text',
			'left':   'Align Left',
			'center': 'Align Center',
			'right':  'Align Right',
		};

		var key      = s.alignText === null ? 'null' : s.alignText;
		var newLabel = labels[ key ] || 'Align Text';
		labelEl.textContent = newLabel;

		card.setAttribute( 'aria-pressed', s.alignText !== null ? 'true' : 'false' );
		card.classList.toggle( 'darklup-ally-card--active', s.alignText !== null );
		card.setAttribute( 'aria-label', newLabel + ', ' + ( s.alignText !== null ? 'active' : 'inactive' ) );
	}

	/**
	 * Update align text card icon based on current state.
	 * Icons swap dynamically: null → align-text, left → align-left, center → align-center, right → align-right.
	 * Gracefully handles fetch failures (old icon stays if load fails).
	 *
	 * @param {Object} s State object.
	 */
	function updateAlignIcon( s ) {
		var card = document.querySelector( '.darklup-ally-card[data-module="alignText"]' );
		if ( ! card ) { return; }

		// Map align text state to icon filename
		var iconMap = {
			'null': 'module-align-text',
			'left': 'module-align-text-left',
			'center': 'module-align-text-center',
			'right': 'module-align-text-right',
		};

		var stateKey = s.alignText === null ? 'null' : s.alignText;
		var iconName = iconMap[ stateKey ];

		if ( ! iconName ) { return; } // Invalid state, skip

		// Fetch and replace SVG
		getIconSvg( iconName ).then( function ( svgContent ) {
			if ( ! svgContent ) { return; } // Fetch failed, keep old icon

			var svgElement = card.querySelector( 'svg' );
			if ( ! svgElement ) { return; } // No SVG found, skip

			// Create temporary container and parse new SVG
			var temp = document.createElement( 'div' );
			temp.innerHTML = svgContent;
			var newSvg = temp.querySelector( 'svg' );

			if ( newSvg ) {
				// Force explicit fill attribute on all path elements to prevent
				// fill="currentColor" inheritance issues when SVG is dynamically inserted.
				// CSS rules will override this when card is active (aria-pressed='true').
				var paths = newSvg.querySelectorAll( 'path' );
				paths.forEach( function ( path ) {
					path.setAttribute( 'fill', '#374151' );
				} );

				// Replace old SVG with new one
				svgElement.parentNode.replaceChild( newSvg, svgElement );
			}
		} );
	}

	/**
	 * Safely fetch SVG icon by name from assets/img/ folder.
	 * Returns SVG content as string, or empty string if fetch fails.
	 * Used by updateContrastIcon to dynamically swap icons.
	 *
	 * @param {string} iconName Icon filename without extension (e.g. 'module-contrast-dark').
	 * @returns {Promise<string>} Promise resolving to SVG content or empty string.
	 */
	function getIconSvg( iconName ) {
		var iconPath = darklupAllySettings.iconPath ||
		               ( window.location.origin + '/wp-content/plugins/darklup/assets/img/' );
		var url = iconPath + iconName + '.svg';

		return fetch( url )
			.then( function ( response ) {
				if ( ! response.ok ) {
					throw new Error( 'Icon fetch failed: ' + iconName );
				}
				return response.text();
			} )
			.catch( function ( error ) {
				console.warn( 'Darklup Ally: Failed to load icon:', iconName, error );
				return ''; // Graceful fail: return empty, old icon stays
			} );
	}

	/**
	 * Update contrast card icon based on current state.
	 * Icons swap dynamically: null → contrast, dark → moon, light → sun, high → pulse.
	 * Gracefully handles fetch failures (old icon stays if load fails).
	 *
	 * @param {Object} s State object.
	 */
	function updateContrastIcon( s ) {
		var card = document.querySelector( '.darklup-ally-card[data-module="contrast"]' );
		if ( ! card ) { return; }

		// Map contrast state to icon filename
		var iconMap = {
			'null': 'module-contrast',
			'dark': 'module-contrast-dark',
			'light': 'module-contrast-light',
			'high': 'module-contrast-high',
		};

		var stateKey = s.contrast === null ? 'null' : s.contrast;
		var iconName = iconMap[ stateKey ];

		if ( ! iconName ) { return; } // Invalid state, skip

		// Fetch and replace SVG
		getIconSvg( iconName ).then( function ( svgContent ) {
			if ( ! svgContent ) { return; } // Fetch failed, keep old icon

			var svgElement = card.querySelector( 'svg' );
			if ( ! svgElement ) { return; } // No SVG found, skip

			// Create temporary container and parse new SVG
			var temp = document.createElement( 'div' );
			temp.innerHTML = svgContent;
			var newSvg = temp.querySelector( 'svg' );

			if ( newSvg ) {
				// Force explicit fill attribute on all path elements to prevent
				// fill="currentColor" inheritance issues when SVG is dynamically inserted.
				// CSS rules will override this when card is active (aria-pressed='true').
				var paths = newSvg.querySelectorAll( 'path' );
				paths.forEach( function ( path ) {
					path.setAttribute( 'fill', '#374151' );
				} );

				// Replace old SVG with new one
				svgElement.parentNode.replaceChild( newSvg, svgElement );
			}
		} );
	}

	/**
	 * Show or hide the trigger tick indicator.
	 * Visible when ANY module is active; hidden when all are off.
	 *
	 * @param {Object} s State object.
	 */
	function updateTick( s ) {
		var tick = document.querySelector( '.darklup-ally-tick' );
		if ( ! tick ) { return; }

		var anyActive = s.darkMode      ||
		                s.contrast      !== null ||
		                s.alignText     !== null ||
		                s.biggerText    ||
		                s.readableFont  ||
		                s.highlightLinks ||
		                s.stopAnimations ||
		                s.monochrome    ||
		                s.fontWeight    ||
		                s.readingMask   ||
		                s.hideImages;

		tick.classList.toggle( 'darklup-ally-tick--visible', !! anyActive );
	}

	/**
	 * Fix SVG fill colors on all static card icons.
	 *
	 * Explicitly sets fill="#374151" on all path elements in inactive cards.
	 * This prevents fill="currentColor" inheritance issues that cause icons
	 * to become invisible when cursor moves to other cards.
	 *
	 * Called after state changes to sync SVG colors with aria-pressed state.
	 */
	function fixStaticSvgFills() {
		var cards = document.querySelectorAll( '.darklup-ally-card' );

		cards.forEach( function ( card ) {
			var isActive = card.getAttribute( 'aria-pressed' ) === 'true';
			var svg = card.querySelector( 'svg' );
			if ( ! svg ) { return; }

			var paths = svg.querySelectorAll( 'path' );
			paths.forEach( function ( path ) {
				// For inactive cards: set explicit gray fill
				// For active cards: let CSS override (via aria-pressed rule)
				if ( ! isActive ) {
					path.setAttribute( 'fill', '#374151' );
				}
			} );
		} );
	}

	/**
	 * Move ally roots to document.body so they are not descendants of a themed
	 * wrapper that receives contrast / monochrome filters (body > * { filter }).
	 * Safe to call repeatedly; skips nodes already direct children of body.
	 */
	function hoistAllyRootsToBody() {
		if ( ! document.body ) {
			return;
		}

		var ids = [
			'darklup-ally-backdrop',
			'darklup-ally-trigger',
			'darklup-ally-panel',
		];

		ids.forEach( function ( id ) {
			var el = document.getElementById( id );
			if ( el && el.parentNode !== document.body ) {
				document.body.appendChild( el );
			}
		} );

		document.querySelectorAll( '.darklup-ally-mask-top, .darklup-ally-mask-bottom' ).forEach( function ( el ) {
			if ( el.parentNode !== document.body ) {
				document.body.appendChild( el );
			}
		} );

		updateFilterCompensation();
	}

	/**
	 * Add .darkluplite-dark-ignore to every panel-related element.
	 * Prevents Darklup's dark mode CSS (which uses :not(.darkluplite-dark-ignore))
	 * from recolouring the panel when dark mode is active.
	 * Called at boot and after every dark mode toggle.
	 */
	function stampDarkIgnore() {
		var selectors = [
			'#darklup-ally-panel',
			'#darklup-ally-panel *',
			'.darklup-ally-trigger',
			'.darklup-ally-trigger *',
			'#darklup-ally-backdrop',
			'.darklup-ally-mask-top',
			'.darklup-ally-mask-bottom',
		];

		var els = document.querySelectorAll( selectors.join( ', ' ) );
		els.forEach( function ( el ) {
			el.classList.add( 'darkluplite-dark-ignore' );
		} );
	}

	/**
	 * Announce a message to screen readers via the aria-live region.
	 *
	 * @param {string} message Text to announce.
	 */
	function announce( message ) {
		var el = document.getElementById( 'darklup-ally-announcer' );
		if ( ! el ) { return; }

		// Clear then set — ensures re-announcement even if message is identical.
		el.textContent = '';
		setTimeout( function () {
			el.textContent = message;
		}, 10 );
	}

	/* =========================================================================
	   SECTION 6: KEYBOARD ACCESSIBILITY + FOCUS TRAP
	   ========================================================================= */

	/**
	 * Get all focusable elements inside the panel.
	 *
	 * @return {Array} Focusable DOM elements.
	 */
	function getFocusableElements() {
		if ( ! panelEl ) { return []; }

		return Array.prototype.slice.call(
			panelEl.querySelectorAll(
				'button:not([disabled]),' +
				'[href],' +
				'input:not([disabled]),' +
				'select:not([disabled]),' +
				'textarea:not([disabled]),' +
				'[tabindex]:not([tabindex="-1"])'
			)
		);
	}

	/**
	 * Global keydown handler.
	 * Handles: Escape (close), Alt+A (toggle), Tab (focus trap inside panel).
	 *
	 * @param {KeyboardEvent} e
	 */
	function handleKeyDown( e ) {
		// Alt+A — toggle panel open/close regardless of panel state.
		if ( e.altKey && ( e.key === 'a' || e.key === 'A' ) ) {
			e.preventDefault();
			if ( panelOpen ) { closePanel(); } else { openPanel(); }
			return;
		}

		// Escape — close panel only when it is open.
		if ( e.key === 'Escape' && panelOpen ) {
			e.preventDefault();
			closePanel();
			return;
		}

		// Tab trap — active only while panel is open.
		if ( e.key === 'Tab' && panelOpen ) {
			var focusable = getFocusableElements();
			if ( focusable.length === 0 ) { return; }

			var first = focusable[ 0 ];
			var last  = focusable[ focusable.length - 1 ];

			if ( e.shiftKey ) {
				// Shift+Tab from first element → wrap to last.
				if ( document.activeElement === first ) {
					e.preventDefault();
					last.focus();
				}
			} else {
				// Tab from last element → wrap to first.
				if ( document.activeElement === last ) {
					e.preventDefault();
					first.focus();
				}
			}
		}
	}

	/* =========================================================================
	   SECTION 7: CONFLICT DETECTION
	   ========================================================================= */

	/**
	 * Detect common chatbot widgets and add margin to the trigger
	 * if they occupy the same corner of the screen.
	 */
	function detectChatbotConflict() {
		if ( ! triggerEl ) { return; }

		var chatbotSelectors = [
			'#intercom-container',
			'.crisp-client',
			'#hubspot-messages-iframe-container',
			'[id*="drift"]',
			'[id*="tawk"]',
			'[class*="tidio"]',
		];

		var chatbotFound = chatbotSelectors.some( function ( sel ) {
			try { return !! document.querySelector( sel ); } catch ( e ) { return false; }
		} );

		if ( chatbotFound ) {
			var pos = settings.position || 'bottom_right';
			// Only add margin when trigger is at the bottom (chatbots always sit bottom-right).
			if ( pos === 'bottom_right' || pos === 'bottom_left' ) {
				triggerEl.style.marginBottom = '70px';
			}
		}
	}

	/* =========================================================================
	   SECTION 8: INIT
	   ========================================================================= */

	/**
	 * Boot the ally panel.
	 * Caches DOM references, restores persisted state, wires all event listeners.
	 */
	function init() {
		// Abort immediately if this page is excluded from the ally panel.
		if ( typeof darklupPageExcluded !== 'undefined' && darklupPageExcluded ) {
			return;
		}

		// Cache DOM references.
		panelEl    = document.getElementById( 'darklup-ally-panel' );
		triggerEl  = document.getElementById( 'darklup-ally-trigger' );
		backdropEl = document.getElementById( 'darklup-ally-backdrop' );
		closeEl    = document.getElementById( 'darklup-ally-close' );

		// Abort if core elements are not in the DOM.
		if ( ! panelEl || ! triggerEl ) { return; }

		// 1. Hoist panel/trigger/backdrop/masks to <body> (contrast filter isolation).
		hoistAllyRootsToBody();

		// 2. Stamp dark ignore on all panel/trigger elements before anything else.
		stampDarkIgnore();

		// 3. Restore persisted state (applies classes to DOM).
		restoreState();

		// 4. Sync all UI to restored state.
		updateCards( state );
		fixStaticSvgFills();
		updateContrastLabel( state );
		updateContrastIcon( state );
		updateAlignLabel( state );
		updateAlignIcon( state );
		updateTick( state );

		// Re-hoist / re-check invert compensation after other scripts touch the DOM.
		setTimeout( function () {
			hoistAllyRootsToBody();
			updateFilterCompensation();
		}, 0 );
		setTimeout( function () {
			hoistAllyRootsToBody();
			updateFilterCompensation();
		}, 400 );

		// 5. Trigger button — open/close panel.
		triggerEl.addEventListener( 'click', function () {
			if ( panelOpen ) { closePanel(); } else { openPanel(); }
		} );

		// 6. Close (X) button.
		if ( closeEl ) {
			closeEl.addEventListener( 'click', closePanel );
		}

		// 7. Backdrop click — close panel.
		if ( backdropEl ) {
			backdropEl.addEventListener( 'click', closePanel );
		}

		// 8. Document click — close if click lands outside panel AND trigger.
		document.addEventListener('click', function(e) {
			if (!panelOpen) { return; }
			if (panelEl.contains(e.target)) { return; }
			if (triggerEl.contains(e.target)) { return; }
			if (e.target.classList.contains('switch-trigger')) {
				return;
			}
			closePanel();
		});

		// 9. Keyboard handler (Escape, Alt+A, Tab trap).
		document.addEventListener( 'keydown', handleKeyDown );

		// 10. Wire module card clicks.
		var cards = document.querySelectorAll( '.darklup-ally-card' );
		cards.forEach( function ( card ) {
			card.addEventListener( 'click', function ( e ) {
				if ( card.getAttribute( 'data-locked' ) === '1' ) {
					e.preventDefault();
					e.stopPropagation();
					var upgradeUrl = card.getAttribute( 'data-upgrade-url' ) || 'https://darklup.com/pricing/';
					window.open( upgradeUrl, '_blank', 'noopener,noreferrer' );
					return;
				}
				var mod = card.getAttribute( 'data-module' );

				switch ( mod ) {
					case 'darkMode':       toggleDarkMode();       break;
					case 'contrast':       toggleContrast();       break;
					case 'biggerText':     toggleBiggerText();     break;
					case 'readableFont':   toggleReadableFont();   break;
					case 'highlightLinks': toggleHighlightLinks(); break;
					case 'stopAnimations': toggleStopAnimations(); break;
					case 'monochrome':     toggleMonochrome();     break;
					case 'fontWeight':     toggleFontWeight();     break;
					case 'alignText':      toggleAlignText();      break;
					case 'readingMask':    toggleReadingMask();    break;
					case 'hideImages':     toggleHideImages();     break;
				}
			} );
		} );

		// 11. Reset button.
		var resetBtn = document.getElementById( 'darklup-ally-reset' );
		if ( resetBtn ) {
			resetBtn.addEventListener( 'click', resetAll );
		}

		// 12. Chatbot conflict detection.
		detectChatbotConflict();

		// 13. Touch devices — hide reading mask card (no cursor to track).
		if ( 'ontouchstart' in window ) {
			var maskCard = document.querySelector( '.darklup-ally-card[data-module="readingMask"]' );
			if ( maskCard ) {
				maskCard.style.display = 'none';
			}
		}

		// 14. Reading mask — follow cursor via mousemove.
		var MASK_HALF  = 100; // Half of the 200px focus window.

		document.addEventListener( 'mousemove', function ( e ) {
			if ( ! state.readingMask ) { return; }
			var maskTop = document.querySelector( '.darklup-ally-mask-top' );
			var maskBottom = document.querySelector( '.darklup-ally-mask-bottom' );
			if ( ! maskTop || ! maskBottom ) { return; }
			var y = e.clientY;
			maskTop.style.height = Math.max( 0, y - MASK_HALF ) + 'px';
			maskBottom.style.top = ( y + MASK_HALF ) + 'px';
		} );

		// 15. MutationObserver — keep state.darkMode in sync with Darklup's engine.
		// Darklup's own JS toggle may be triggered independently (e.g. keyboard shortcut,
		// existing switch button) — we need to mirror that change in the ally card UI.
		var darkObserver = new MutationObserver( function ( mutations ) {
			mutations.forEach( function ( m ) {
				if ( m.type !== 'attributes' || m.attributeName !== 'class' ) { return; }
				var isDark = document.documentElement.classList.contains( 'darklup-dark-mode-enabled' );
				if ( state.darkMode !== isDark ) {
					state.darkMode = isDark;
					saveState( state );
					updateCards( state );
					updateTick( state );
					stampDarkIgnore(); // Re-stamp: dark mode mutates html class list.
				}
			} );
		} );
		darkObserver.observe( document.documentElement, {
			attributes:      true,
			attributeFilter: [ 'class' ],
		} );
	}

	/* -------------------------------------------------------------------------
	   Utility helpers
	   ------------------------------------------------------------------------- */

	/**
	 * Deep-copy a plain object (no nested functions/prototypes needed here).
	 *
	 * @param  {Object} obj
	 * @return {Object}
	 */
	function deepCopy( obj ) {
		return JSON.parse( JSON.stringify( obj ) );
	}

	/**
	 * Minimal Object.assign polyfill for IE compatibility.
	 *
	 * @param  {Object} target
	 * @param  {Object} source
	 * @return {Object}
	 */
	function objectAssign( target, source ) {
		if ( Object.assign ) {
			return Object.assign( target, source );
		}
		for ( var key in source ) {
			if ( Object.prototype.hasOwnProperty.call( source, key ) ) {
				target[ key ] = source[ key ];
			}
		}
		return target;
	}

	/* -------------------------------------------------------------------------
	   Boot
	   ------------------------------------------------------------------------- */

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

}());
