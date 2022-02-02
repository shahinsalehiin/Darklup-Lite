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
      //dashboard widget
      add_action('wp_dashboard_setup', [ $this, 'darkluplite_dashboard_widgets' ], 10);
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
        wp_enqueue_style( 'darkluplite-switch', DARKLUPLITE_DIR_URL.'assets/css/darkluplite-switch.css', array(), DARKLUPLITE_VERSION, false );
        wp_enqueue_style( 'darkluplite-responsive', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'css/responsive.css', array(), DARKLUPLITE_VERSION, false );
        wp_enqueue_style( 'darkluplite-dashboard-widget', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'css/dashboard-widget.css', array(), DARKLUPLITE_VERSION, false );

        wp_enqueue_script( 'ace-editor', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'js//ace/ace.js', array('jquery'), '1.0', true );
        wp_enqueue_script( 'magnific', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'js/magnific.min.js', array('jquery'), '1.0', true );
        wp_enqueue_script( 'select', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'js/select.min.js', array('jquery'), '1.0', true );
        wp_enqueue_script( 'select2', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'js/select2.min.js', array('jquery'), '1.0', true );
        wp_enqueue_script('darkluplite-chart-js', DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'js/darkluplite-chart.js', array('jquery'), '1.0');
        wp_enqueue_script( 'darkluplite-main', DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'js/main.js', array( 'jquery', 'wp-color-picker' ), DARKLUPLITE_VERSION, true );

    } 

    /**
     * DarklupLite  Analytics  
     * 
     * @since  1.1.3
     * @return void
     */
    public function darkluplite_dashboard_widgets() {


        wp_add_dashboard_widget('darkluplite_dark_mode', esc_html__('Darklup Dark Mode Usage', 'darklup-lite'), [
            $this,
            'darkluplite_analytics_dashboard_widget'
        ]);

        // Globalize the metaboxes array, this holds all the widgets for wp-admin.
        global $wp_meta_boxes;

        // Get the regular dashboard widgets array
        // (which already has our new widget but appended at the end).
        $default_dashboard = $wp_meta_boxes['dashboard']['normal']['core'];

        // Backup and delete our new dashboard widget from the end of the array.
        $darkluplite_widget_backup = array('darkluplite_dark_mode' => $default_dashboard['darkluplite_dark_mode']);
        unset($default_dashboard['darkluplite_dark_mode']);

        // Merge the two arrays together so our widget is at the beginning.
        $sorted_dashboard = array_merge($darkluplite_widget_backup, $default_dashboard);

        // Save the sorted array back into the original metaboxes.
        $wp_meta_boxes['dashboard']['normal']['core'] = $sorted_dashboard;
    }

    /**
     * DarklupLite  Analytics  Dashboard Widget
     * 
     * @since  1.1.3
     * @return void
     */
    public function darkluplite_analytics_dashboard_widget() {
        
        $label_data = [
            '20 Dec',
            '21 Dec',
            '22 Dec',
            '24 Dec',
            '25 Dec',
            '27 Dec',
            '29 Dec',
        ];

        $values = [ '5', '25', '20', '15', '12', '10', '3' ];
    ?>    

        <div class="darklup-chart-wrapper">
            <div class="darklup-chart-header">
                <span><?php esc_html_e("How much percentage of users use dark mode in last 7 days.", 'darklup-lite'); ?></span>
            </div>
           
            <div class="darklup-chart">
                <canvas id="darklup_analytics_Chart" style="width: 394px;height: 300px;" data-labels='<?php echo json_encode( $label_data ); ?>' data-values='<?php echo json_encode( $values ); ?>'></canvas>
            </div>
            <div class="darklup-chart-modal-wrapper">
                <div class="darklup-chart-modal">
                    <h1>Go Premium</h1>
                    <p>Purchase our premium version to unlock these features</p>
                    <a target="_blank" href="https://darklup.com/pricing/">Get Pro</a>
                </div>
            </div>
        </div>

    <?php
    }


	
}

if( is_admin() )
    $DarklupLite_Settings_Page = new DarklupLite_Settings_Page();

  