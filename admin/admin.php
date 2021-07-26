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

if( ! defined( 'ABSPATH' ) ) {
    die( DARKLUPLITE_ALERT_MSG );
}

/**
 * DarklupLite_Settings_Page class
 */
 class DarklupLite_Settings_Page {

  /**
    * DarklupLite_Settings_Page constructor
    *
    * @since  1.0.0
    * @return void
    */
    public function __construct()
    {

      $darkluplite_options = get_option( 'darkluplite_options' );

      add_action( 'admin_menu', array( $this, 'addPluginPage' ) );
      add_action( 'admin_init', array( $this, 'pageInit' ) );
      add_action( 'admin_enqueue_scripts', array( $this, 'enqueueScripts' ) );
      add_action( 'plugin_action_links_' . DARKLUPLITE_BASE_PATH, array( $this, 'darkluplite_action_links') );
    }

     /* action links on plugin page */
    public function darkluplite_action_links($links) {
        $settings_url = add_query_arg( 'page', 'darkluplite-setting-admin', get_admin_url() . 'admin.php' );
        $pro_url = 'https://darklup.com';

        $setting_arr = array('<a href="' . esc_url( $settings_url ) . '">' . __( 'Settings', 'darklup-lite' ) . '</a>');
        $pro_arr = array('<a target="_blank" href="' . esc_url( $pro_url ) . '">' . __( 'Get Pro', 'darklup-lite' ) . '</a>');

        $links = array_merge($pro_arr, $setting_arr, $links);

        return $links;
    }

   /**
    * Admin menu page
    * 
    * @since  1.0.0
    * @return void
    */
    public function addPluginPage()
    {
		add_menu_page(
			esc_html__( 'Darklup Lite', 'darklup-lite' ),
			esc_html__( 'Darklup Lite', 'darklup-lite' ),
			'manage_options',
			'darkluplite-setting-admin',
			array( $this, 'adminPage' ),
			esc_url( DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/darkluplite-icon.svg' ),
			6
		);

        add_submenu_page( 'darkluplite-setting-admin',
            esc_html__( 'Darklup Lite', 'darklup-lite' ),
            esc_html__( 'Settings', 'darklup-lite' ),
            'manage_options',
            'darkluplite-setting-admin',
            array( $this, 'adminPage' )
        );

        add_submenu_page( 'darkluplite-setting-admin',
            esc_html__( 'Get Pro', 'darklup-lite' ),
            esc_html__( 'Get Pro', 'darklup-lite' ),
            'manage_options',
            'darkluplite-get-pro',
            array( $this, 'darkluplite_get_pro' )
        );
    }

	 /**
    * register setting
    * 
    * @since  1.0.0
    * @return void
    */
    function pageInit() {
        //register our settings
        register_setting( 'darkluplite-settings-group', 'darkluplite_settings' );
    }

   /**
    * DarklupLite settings page
    * 
    * @since  1.0.0
    * @return void
    */
    public function adminPage()
    {

        // check if the user have submitted the settings
        if ( isset( $_GET['settings-updated'] ) ) {
        // add settings saved message with the class of "updated"
        add_settings_error( 'darkluplite_messages', 'darkluplite_message', esc_html__( 'Settings Saved', 'darklup-lite' ), 'updated' );
        }
        // show error/update messages
        settings_errors( 'darkluplite_messages' );

        // Admin page form
        Admin_Page_Components::formArea();

    }

     public function darkluplite_get_pro(){?>
         <script>window.open("https://darklup.com", "_blank");</script>
         <?php $this->adminPage();
     }

   /**
    * Admin enqueue scripts 
    * 
    * @since  1.0.0
    * @return void
    */
    public function enqueueScripts() {

        wp_enqueue_style( 'wp-color-picker' );

        wp_enqueue_style( 'darkluplite-grid', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'css/darkluplite-grid.css', array(), DARKLUPLITE_VERSION, false );
        wp_enqueue_style( 'magnific', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'css/magnific.min.css', array(), DARKLUPLITE_VERSION, false );
        wp_enqueue_style( 'nice-select', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'css/nice-select.css', array(), DARKLUPLITE_VERSION, false );
        wp_enqueue_style( 'select2', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'css/select2.min.css', array(), DARKLUPLITE_VERSION, false );
        wp_enqueue_style( 'darkluplite-style', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'css/style.css', array(), DARKLUPLITE_VERSION, false );
        wp_enqueue_style( 'darkluplite-responsive', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'css/responsive.css', array(), DARKLUPLITE_VERSION, false );

        wp_enqueue_script( 'ace-editor', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'js//ace/ace.js', array('jquery'), '1.0', true );
        wp_enqueue_script( 'magnific', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'js/magnific.min.js', array('jquery'), '1.0', true );
        wp_enqueue_script( 'select', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'js/select.min.js', array('jquery'), '1.0', true );
        wp_enqueue_script( 'select2', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'js/select2.min.js', array('jquery'), '1.0', true );
        wp_enqueue_script( 'darkluplite-main', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'js/main.js', array( 'jquery', 'wp-color-picker' ), DARKLUPLITE_VERSION, true );

    }


	
}

if( is_admin() )
    $DarklupLite_Settings_Page = new DarklupLite_Settings_Page();

  