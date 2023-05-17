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

if (!defined('ABSPATH')) {
    die(DARKLUPLITE_ALERT_MSG);
}

/**
 * This is DarklupLite_Enqueue class
 */
if (!class_exists('DarklupLite_Enqueue')) {

    class DarklupLite_Enqueue
    {

        /**
         * DarklupLite_Enqueue constructor
         *
         * @since  1.0.0
         * @return void
         */
        public function __construct()
        {

            if (\DarklupLite\Helper::getOptionData('frontend_darkmode') == 'yes') {
                add_action('wp_enqueue_scripts', array($this, 'frontendEnqueueScripts'));
                // add_filter('script_loader_tag', array($this, 'deferScriptInHead'), 10, 3);
            }
        }
        /**
         * Front-End enqueue scripts
         *
         * @since  1.0.0
         * @return void
         */
        public function frontendEnqueueScripts()
        {

            wp_enqueue_style('darkluplite-style', DARKLUPLITE_DIR_URL . 'assets/css/darkluplite-style.css', array(), DARKLUPLITE_VERSION, false);
            wp_enqueue_style('darkluplite-switch', DARKLUPLITE_DIR_URL . 'assets/css/darkluplite-switch.css', array(), DARKLUPLITE_VERSION, false);

            /********************
            Js Enqueue
             ********************/

             $colorMode = 'darklup_dynamic';
             // $getMode = 'darklup_presets';
             $getMode = Helper::getOptionData('full_color_settings');
 
             if($getMode !== 'darklup_dynamic'){
                 $colorMode = 'darklup_presets';
                 $this->addDarklupJSWithDynamicVersion('darklup_presets', $src = 'assets/es-js/presets.js', $dep = NULL, $js_footer = false);
                 wp_enqueue_style('darkluplite-variables', DARKLUPLITE_DIR_URL . 'assets/css/darkluplite-variables.css', array(), DARKLUPLITE_VERSION, false);
             }else{
                 $this->addDarklupJSWithDynamicVersion();
             }
 
             $darkenLevel = 80;

			$frontendObject = array(
				'ajaxUrl' 	  	=> admin_url( 'admin-ajax.php' ),
				'sitelogo' 		=> '',
				'lightlogo' 	=> '',
				'darklogo' 		=> '',
				'darkenLevel' 	=> $darkenLevel,
				'darkimages' 	=> [],
				'timeBasedMode' => Helper::darkmodeTimeMaping(),
				'security' => wp_create_nonce('darklup_analytics_hashkey'),
				'time_based_mode_active' => Helper::getOptionData('time_based_darkmode'),
				'time_based_mode_start_time' => Helper::getOptionData('mode_start_time'),
				'time_based_mode_end_time' => Helper::getOptionData('mode_end_time'),
			);

			wp_localize_script( $colorMode, 'frontendObject', $frontendObject);

            $colorPreset = \DarklupLite\Helper::getOptionData('color_preset');
            $presetColor = \DarklupLite\Color_Preset::getColorPreset($colorPreset);

            $customBg = \DarklupLite\Helper::getOptionData('custom_bg_color');
            $customBg = \DarklupLite\Helper::is_real_color($customBg);
    
            // Custom colors
            $customSecondaryBg = \DarklupLite\Helper::getOptionData('custom_secondary_bg_color');
            $customSecondaryBg = \DarklupLite\Helper::is_real_color($customSecondaryBg);
    
            $customTertiaryBg = \DarklupLite\Helper::getOptionData('custom_tertiary_bg_color');
            $customTertiaryBg = \DarklupLite\Helper::is_real_color($customTertiaryBg);
    
            $bgColor = esc_html($presetColor['background-color']);
            if($customBg) $bgColor = $customBg;
            $bgColor = \DarklupLite\Helper::hex_to_color($bgColor);

            $bgSecondaryColor = esc_html($presetColor['secondary_bg']);
            if($customSecondaryBg) $bgSecondaryColor = $customSecondaryBg;
            $bgSecondaryColor = \DarklupLite\Helper::hex_to_color($bgSecondaryColor);

            $bgTertiary = esc_html($presetColor['tertiary_bg']);
            if($customTertiaryBg) $bgTertiary = $customTertiaryBg;
            $bgTertiary = \DarklupLite\Helper::hex_to_color($bgTertiary);

            $ifBgOverlay  = Helper::getOptionData('apply_bg_overlay');
			$darklup_js = [
                'primary_bg' => $bgColor,
                'secondary_bg' => $bgSecondaryColor,
                'tertiary_bg' => $bgTertiary,
                'bg_image_dark_opacity' => '0.5',
				'exclude_element' => '',
				'apply_bg_overlay' => $ifBgOverlay,
				'exclude_bg_overlay' => '',
            ];
            wp_localize_script($colorMode, 'DarklupJs', $darklup_js);

        }
        public function deferScriptInHead($tag, $handle)
        {
            if (!is_admin()) {
                if ($handle == 'darklup-lite' || $handle == 'darklup-dynamic') {
                    $tag = str_replace('></script>', ' defer></script>', $tag);
                }
            }
            return $tag;
        }
        public static function addDarklupJSWithDynamicVersion($handle = 'darklup_dynamic', $src = 'assets/es-js/index.js', $dep = null, $js_footer = false)
        {
            $dirFull = DARKLUPLITE_DIR_PATH . $src;
            $uriFull = DARKLUPLITE_DIR_URL . $src;
            $version = date("3.0.ymdGis", filemtime( $dirFull ));
            wp_enqueue_script( $handle, $uriFull, $dep , $version , $js_footer );	
        }
    }

    // Init DarklupLite_Enqueue
    $obj = new DarklupLite_Enqueue();
}