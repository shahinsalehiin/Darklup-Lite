<?php
namespace DarklupLite;
 /**
  * 
  * @package    DarklupLite - WP Dark Mode
  * @version    1.0.0
  * @author     
  * @Websites: 
  *
  */

/**
 * Dark_Inline_CSS class
 */
class Dark_Inline_CSS {

	/**
	 * Dark_Inline_CSS constructor
	 * @since  1.0.0
	 * @return void
	 */
	function __construct() {
		add_action( 'wp_enqueue_scripts', [ __CLASS__, 'enqueueStyle' ] );
		add_action( 'admin_enqueue_scripts', [ __CLASS__, 'adminEnqueueStyle' ] );
	}

	/**
	 * Admin enqueue style
	 * 
	 * @since  1.0.0
	 * @return void
	 */
	public static function adminEnqueueStyle() {
		
		$backendDarkmode = \DarklupLite\Helper::getOptionData('backend_darkmode');
		if( !$backendDarkmode ) {
			return;
		}
		wp_enqueue_style( 'darkluplite-dark-style', DARKLUPLITE_DIR_URL.'assets/css/dark-style.css' );
		self::adminAddStyle();
	}

	/**
	 * Enqueue style
	 * 
	 * @since  1.0.0
	 * @return void
	 */
	public static function enqueueStyle() {
		wp_enqueue_style( 'darkluplite-dark-style', DARKLUPLITE_DIR_URL.'assets/css/dark-style.css' );
		self::addStyle();
	}
	/**
	 * Add Front-End inline css
	 * 
	 * @since  1.0.0
	 * @return void
	 */
	public static function addStyle() {
		$css  = self::inlineCss();
        $js  = self::inlineJs();
		wp_add_inline_style( 'darkluplite-dark-style', $css );
        wp_add_inline_script( 'jquery', $js );
	}
	/**
	 * 
	 * 
	 * @since  1.0.0
	 * @return void
	 */
	public static function adminAddStyle() {
		$css  = self::adminInlineCss();
		wp_add_inline_style( 'darkluplite-dark-style', $css );
	}
	/**
	 * Front-End inline css
	 *
	 * @since  1.0.0
	 * @return void
	 */
    public static function inlineJs() {
        $enableOS  = \DarklupLite\Helper::getOptionData('enable_os_switcher');

        if( $enableOS ) {
            return "let isOSDarkModeEnabled = true;";
        }else{
            return "let isOSDarkModeEnabled = false;";
        }
    }
	public static function inlineCss() {

		$presetEnabled = \DarklupLite\Helper::getOptionData('color_preset_enabled');
		$customEnabled = \DarklupLite\Helper::getOptionData('custom_color_enabled');
		$enableOS  = \DarklupLite\Helper::getOptionData('enable_os_switcher');

		$lightText = esc_html__( 'Light', 'darklup-lite' );
		$darkText  = esc_html__( 'Dark', 'darklup-lite' );

		// Preset Color
		$colorPreset = \DarklupLite\Helper::getOptionData('color_preset');
		$presetColor =  \DarklupLite\Color_Preset::getColorPreset( $colorPreset );

		$topMargin 	  = \DarklupLite\Helper::getOptionData('switch_top_margin');
		$bottomMargin = \DarklupLite\Helper::getOptionData('switch_bottom_margin');
		$leftMargin   = \DarklupLite\Helper::getOptionData('switch_left_margin');
		$rightMargin  = \DarklupLite\Helper::getOptionData('switch_right_margin');

		$bgColor 	 = esc_html( $presetColor['background-color'] );
		$color 		 = esc_html( $presetColor['color'] );
		$anchorColor = esc_html( $presetColor['anchor-color'] );
		$anchorHoverColor = esc_html( $presetColor['anchor-hover-color'] );
		$inputBgColor = esc_html( $presetColor['input-bg-color'] );
		$borderColor  = esc_html( $presetColor['border-color'] );
		$btnBgColor   = esc_html( $presetColor['btn-bg-color'] );
		$btnColor 	  = esc_html( $presetColor['color'] );

		$inlinecss = "
		
		
		
		html.darkluplite-dark-mode-enabled :not(.darkluplite-dark-ignore):not(input):not(textarea):not(button):not(select):not(mark):not(code):not(pre):not(ins):not(option):not(img):not(progress):not(iframe):not(.mejs-iframe-overlay):not(svg):not(video):not(canvas):not(a):not(path):not(.elementor-element-overlay):not(.elementor-background-overlay):not(i):not(button *):not(a *)  {
			color: {$color} !important;
		    background-color: {$bgColor} !important;
		    border-color: {$borderColor}!important
		}
		
		/* IE10+ */
        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
            html.darkluplite-dark-mode-enabled :not(.darkluplite-dark-ignore):not(input):not(textarea):not(button):not(select):not(mark):not(code):not(pre):not(ins):not(option):not(img):not(progress):not(iframe):not(.mejs-iframe-overlay):not(svg):not(video):not(canvas):not(a):not(path):not(.elementor-element-overlay):not(.elementor-background-overlay):not(i):not(button):not(a)  {
                color: {$color} !important;
                background-color: {$bgColor} !important;
                border-color: {$borderColor}!important
            }
        }
        
        /* IE9,10 */
        @media screen and (-webkit-min-device-pixel-ratio:0) and (max-width: 1024px) {
            html.darkluplite-dark-mode-enabled :not(.darkluplite-dark-ignore):not(input):not(textarea):not(button):not(select):not(mark):not(code):not(pre):not(ins):not(option):not(img):not(progress):not(iframe):not(.mejs-iframe-overlay):not(svg):not(video):not(canvas):not(a):not(path):not(.elementor-element-overlay):not(.elementor-background-overlay):not(i):not(button):not(a)  {
                color: {$color} !important;
                background-color: {$bgColor} !important;
                border-color: {$borderColor}!important
            }
        }
		
		
		html.darkluplite-dark-mode-enabled a {
		  color: {$anchorColor} !important;
		}
		html.darkluplite-dark-mode-enabled a:hover {
			color: {$anchorHoverColor} !important;
		}
		html.darkluplite-dark-mode-enabled textarea,
		html.darkluplite-dark-mode-enabled input {
		  background: {$inputBgColor} !important;
		  border-color: {$borderColor}!important;
		  color: {$color} !important;
		}
		html.darkluplite-dark-mode-enabled button {
		  color: {$btnColor} !important;
		  background: {$btnBgColor} !important;
		}
		.button-switch-6 .on-off-toggle__input:checked + .on-off-toggle__slider:after,
		.button-switch-7 .on-off-toggle__input:checked + .on-off-toggle__slider:after,
		.button-switch-8 .on-off-toggle__input:checked + .on-off-toggle__slider:after,
		.button-switch-5 .on-off-toggle__input:checked + .on-off-toggle__slider:after {
			content: '{$darkText}';
		}
		.button-switch-6 .on-off-toggle__slider:after,
		.button-switch-7 .on-off-toggle__slider:after,
		.button-switch-8 .on-off-toggle__slider:after,
		.button-switch-5 .on-off-toggle__slider:after {
			content: '{$lightText}';
		}
		.darkluplite-mode-switcher {
			top: {$topMargin}px !important;
			bottom: {$bottomMargin}px !important;
			left: {$leftMargin}px !important;
			right: {$rightMargin}px !important;
		}
		
		";

		return $inlinecss;

	}

	/**
	 * Admin inline css
	 * 
	 * @since  1.0.0
	 * @return void
	 */
	public static function adminInlineCss() {

		$presetEnabled = \DarklupLite\Helper::getOptionData('admin_color_preset_enabled');
		$customEnabled = \DarklupLite\Helper::getOptionData('admin_custom_color_enabled');

		// Preset Color
		$colorPreset = \DarklupLite\Helper::getOptionData('color_admin_preset');
		$presetColor =  \DarklupLite\Color_Preset::getColorPreset( $colorPreset );

		$bgColor 	 = esc_html( $presetColor['background-color'] );
		$color 		 = esc_html( $presetColor['color'] );
		$anchorColor = esc_html( $presetColor['anchor-color'] );
		$anchorHoverColor = esc_html( $presetColor['anchor-hover-color'] );
		$inputBgColor = esc_html( $presetColor['input-bg-color'] );
		$borderColor  = esc_html( $presetColor['border-color'] );
		$btnBgColor   = esc_html( $presetColor['btn-bg-color'] );
		$btnColor 	  = esc_html( $presetColor['color'] );

		$inlinecss = "
		html.darkluplite-admin-dark-mode-enabled .darkluplite-main-area .darkluplite-admin-dark-ignore *:not(.wp-color-result):not(.wp-color-result-text):not(.iris-palette-container):not(.iris-palette):not(.wp-picker-clear):not(.wp-color-picker):not(.ace_scroller):not(.list):not(.option):not(input):not(.addFieldGroup):not(.darklup-pro-ribbon){
			background-color: transparent !important;
		}
		html.darkluplite-admin-dark-mode-enabled #wpcontent a {
			background-color: transparent;
		}
		html.darkluplite-admin-dark-mode-enabled .darkluplite-menu-area ul li a.active,
		html.darkluplite-admin-dark-mode-enabled .darkluplite-main-area .darkluplite-settings-area {
			background-color: #2B2B2B !important;
		}
		html.darkluplite-admin-dark-mode-enabled .nice-select .option.selected.focus:hover, 
		html.darkluplite-admin-dark-mode-enabled .nice-select .option:hover,
		html.darkluplite-admin-dark-mode-enabled .darkluplite-single-input-inner input.darkluplite_image_upload_btn,
		html.darkluplite-admin-dark-mode-enabled .img-url-repeater .addFieldGroup,
		.darkluplite-admin-dark-mode-enabled .wp-core-ui .darkluplite-section-title .button {
			background-color: {$anchorColor} !important;
		}
		html.darkluplite-admin-dark-mode-enabled .darkluplite-main-area .darkluplite-settings-area input[type='number'],
		html.darkluplite-admin-dark-mode-enabled .darkluplite-main-area .darkluplite-settings-area input[type='text'] {
			background-color: #4e4e4e !important;
		}
		html.darkluplite-admin-dark-mode-enabled #wpcontent,
		html.darkluplite-admin-dark-mode-enabled #wpbody :not(.darkluplite-admin-dark-ignore):not(span):not(.ace_gutter-cell):not(.ace_gutter):not(.ace_layer):not(mark):not(code):not(pre):not(ins):not(option):not(select):not(textarea):not(button):not(a):not(video):not(canvas):not(progress):not(iframe):not(svg):not(path) {
			background-color: {$bgColor};
			color: {$color};
			border-color: {$borderColor};
		}
		html.darkluplite-admin-dark-mode-enabled a:not(.submitdelete) {
		  color: {$anchorColor} !important;
		}
		html.darkluplite-admin-dark-mode-enabled path {
    		fill: {$color} !important;
    		stroke: {$color} !important;
		}
		html.darkluplite-admin-dark-mode-enabled .radio-img > input:checked + img {
			border-color: {$anchorColor} !important;
		}
		html.darkluplite-admin-dark-mode-enabled input[type=color], 
		html.darkluplite-admin-dark-mode-enabled input[type=date], 
		html.darkluplite-admin-dark-mode-enabled input[type=datetime-local], 
		html.darkluplite-admin-dark-mode-enabled input[type=datetime], 
		html.darkluplite-admin-dark-mode-enabled input[type=email], 
		html.darkluplite-admin-dark-mode-enabled input[type=month], 
		html.darkluplite-admin-dark-mode-enabled input[type=number], 
		html.darkluplite-admin-dark-mode-enabled input[type=password], 
		html.darkluplite-admin-dark-mode-enabled input[type=search], 
		html.darkluplite-admin-dark-mode-enabled input[type=tel], 
		html.darkluplite-admin-dark-mode-enabled input[type=text], 
		html.darkluplite-admin-dark-mode-enabled input[type=time], 
		html.darkluplite-admin-dark-mode-enabled input[type=url], 
		html.darkluplite-admin-dark-mode-enabled input[type=week],
		html.darkluplite-admin-dark-mode-enabled input[type=checkbox], 
		html.darkluplite-admin-dark-mode-enabled input[type=radio],
		html.darkluplite-admin-dark-mode-enabled select, 
		html.darkluplite-admin-dark-mode-enabled textarea {
			background: {$inputBgColor} !important;
			border-color: {$borderColor}!important;
			color: {$color} !important;
		}
		";

		return $inlinecss;

	}
	
}

// Init Dark Inline CSS obj
new Dark_Inline_CSS();