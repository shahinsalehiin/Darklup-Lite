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
 * DarklupLite_Enqueue class
 */
if( !class_exists( 'DarklupLite_Enqueue' ) ) {
	
	class DarklupLite_Enqueue{
		
	   /**
		* DarklupLite_Enqueue constructor
		*
		* @since  1.0.0
		* @return void
		*/
		public function __construct() {
		
			if(  \DarklupLite\Helper::getOptionData('frontend_darkmode')  == 'yes' ) {
				add_action( 'wp_enqueue_scripts', array( $this, 'frontendEnqueueScripts' ) );
			}
			
		}
	   /**
		* Front-End enqueue scripts 
		* 
		* @since  1.0.0
		* @return void
		*/
		public function frontendEnqueueScripts() {
			
			wp_enqueue_style( 'darkluplite-style', DARKLUPLITE_DIR_URL.'assets/css/darkluplite-style.css', array(), '1.0.0', false );
			
			/********************
				Js Enqueue
			********************/

			wp_enqueue_script( 'darklup-lite', DARKLUPLITE_DIR_URL.'assets/js/darklup.js', array('jquery'), '1.0', true );
			
			wp_localize_script( 'darklup-lite', 'frontendObject',
		        array(
		            'ajaxUrl' 	  	=> admin_url( 'admin-ajax.php' )
		        )
		    );		
			
		}
		
		
	}

	// Init DarklupLite_Enqueue
	$obj = new DarklupLite_Enqueue();
}
