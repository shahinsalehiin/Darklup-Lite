<?php
/**
 * Plugin Name:       Darklup Lite - WP Dark Mode
 * Plugin URI:        https://darklup.com/
 * Description:       All in one WordPress plugin to create a stunning dark version for your WordPress website and dashboard
 * Version:           1.0.9
 * Author:            Darklup
 * Author URI:        https://darklup.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       darklup-lite
 * Domain Path:       /languages
 */

// Block Direct access
if( !defined( 'ABSPATH' ) ){ die( __( 'You should not access this file directly!.', 'darklup-lite' ) ); }

/**
 * Define all constant
 *
 */

// Define Constants for direct access alert message.
if( !defined( 'DARKLUPLITE_ALERT_MSG' ) ) {
	define( 'DARKLUPLITE_ALERT_MSG', esc_html__( 'You should not access this file directly.!', 'darklup-lite' ) );
}

// Version constant
if( !defined( 'DARKLUPLITE_VERSION' ) ) {
	define( 'DARKLUPLITE_VERSION', '1.0.5' );
}

// Plugin dir path constant
if( !defined( 'DARKLUPLITE_DIR_PATH' ) ) {
	define( 'DARKLUPLITE_DIR_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
}
// Plugin dir url constant
if( !defined( 'DARKLUPLITE_DIR_URL' ) ) {
	define( 'DARKLUPLITE_DIR_URL', trailingslashit( plugin_dir_url( __FILE__ ) ) );
}
// Plugin dir admin assets url constant
if( !defined( 'DARKLUPLITE_DIR_ADMIN_ASSETS_URL' ) ) {
	define( 'DARKLUPLITE_DIR_ADMIN_ASSETS_URL', trailingslashit( DARKLUPLITE_DIR_URL . 'admin/assets' ) );
}
// Admin dir path constant
if( !defined( 'DARKLUPLITE_DIR_ADMIN' ) ) {
	define( 'DARKLUPLITE_DIR_ADMIN', trailingslashit( DARKLUPLITE_DIR_PATH.'admin' ) );
}
// Inc dir path constant
if( !defined( 'DARKLUPLITE_DIR_INC' ) ) {
	define( 'DARKLUPLITE_DIR_INC', trailingslashit( DARKLUPLITE_DIR_PATH.'inc' ) );
}
// Page builder dir path constant
if( !defined( 'DARKLUPLITE_DIR_PAGE_BUILDER' ) ) {
	define( 'DARKLUPLITE_DIR_PAGE_BUILDER', trailingslashit( DARKLUPLITE_DIR_PATH.'page-builder' ) );
}


/**
 * DarklupLite final class
 */

final class DarklupLite {

	/**
	 * Get the plugin object
	 *
	 * @since  1.0.0
	 * @var null
	 */
	private static $instance = null;

	/**
	 * DarklupLite constructor
	 *
	 * @since  1.0.0
	 * @return void
	 */

	function __construct() {

		$this->includeFiels();
		// Register Elementor New Widgets
		add_action( 'elementor/widgets/widgets_registered', [$this, 'elementorOnWidgetsRegistered'] );
		// Plugin activation hook
		register_activation_hook( __FILE__, [ $this, 'pluginActivate' ] );
		// Plugin deactivation hook
		register_deactivation_hook( __FILE__, [ $this, 'pluginDeactivate' ] );

	}

	/**
	 *
	 * @since 1.0.0
	 * @return object
	 */

	public static function getInstance() {

		if( self::$instance == null ) {
			self::$instance = new self();
		}

		return self::$instance;

	}

	/**
	 * File include
	 *
	 * @since 1.0.0
	 * @return viod
	 */

	public function includeFiels() {

		require_once DARKLUPLITE_DIR_INC.'class-helper.php';
		require_once DARKLUPLITE_DIR_INC.'class-enqueue.php';
		require_once DARKLUPLITE_DIR_INC.'class-hooks.php';
		require_once DARKLUPLITE_DIR_INC.'class-color-preset.php';
		require_once DARKLUPLITE_DIR_INC.'class-switcher-style.php';
		require_once DARKLUPLITE_DIR_INC.'class-dark-inline-css.php';
		require_once DARKLUPLITE_DIR_ADMIN.'setting-fields/class-settings-fields.php';
		require_once DARKLUPLITE_DIR_ADMIN.'admin.php';
		require_once DARKLUPLITE_DIR_ADMIN.'inc/class-admin-page.php';
		require_once DARKLUPLITE_DIR_PAGE_BUILDER.'shortcode/class-switch-shortcode.php';
		require_once DARKLUPLITE_DIR_PAGE_BUILDER.'wpbakery/darkluplite-vc-init.php';
		require_once DARKLUPLITE_DIR_PAGE_BUILDER . 'gutenberg-block/darkluplite-switch-block/src/init.php';
		require_once DARKLUPLITE_DIR_PAGE_BUILDER.'wp-widget/widget-darkmode-switch.php';
		// Elemenor custom control
		require_once DARKLUPLITE_DIR_INC.'custom-controls/elemenor-control/custom-control.php';
	}

	/**
	 * Plugin activation default settings
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function pluginActivate() {

		// Default options set
		$defaultOption = array(

			"frontend_darkmode"		=> 'yes',
			"backend_darkmode"		=> 'yes',
			"enable_os_switcher"	=> 'yes',
			"floating_switch"		=> 'yes',
			"color_preset_enabled"	=> 'yes',
			"custom_color_enabled"	=> 'no',
			"admin_color_preset_enabled"	=> 'yes',
			"admin_custom_color_enabled"	=> 'no',
			"switch_style"			=> '1',
			"color_preset"			=> '1',
			"color_admin_preset"	=> '1',
			"switch_position"		=> 'bottom_right'
		);

		update_option( 'darkluplite_settings', $defaultOption );

	}
	/**
	 * Delete settings options when plugin deactivate
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function pluginDeactivate() {
		delete_option('darkluplite_settings');
	}
	/**
	 * Elementor widgets registered
	 * @since 1.0.0
	 * @return void
	 */
	function elementorOnWidgetsRegistered() {

		require_once DARKLUPLITE_DIR_PAGE_BUILDER.'elementor-widget/elementor-darkmode-switch.php';

	    \Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \DarklupLite\Widgets\DarklupLite_Darkmode_Switch() );
	}

}

/**
 * DarklupLite Initialization
 */


function darkluplite_check_premium_activation() {
    if ( !in_array( 'darklup/darklup.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
        DarklupLite::getInstance();
    }
}
add_action( 'darkluplite_init', 'darkluplite_check_premium_activation', 10, 2 );
do_action( 'darkluplite_init');
