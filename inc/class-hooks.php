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
 * Hooks class
 */
class Hooks{

  /**
   * Hooks constructor
   *
   * @since  1.0.0
   * @return void
   */
	function __construct() {
    self::init();
	}
  
  /**
   * init action and filter hook
   *
   * @since  1.0.0
   * @return void
   */
  public static function init() {

    // 
    $switch = \DarklupLite\Helper::getOptionData('floating_switch');
    if( !empty( $switch ) && $switch == 'yes' ) {
      add_action( 'wp_footer', [__CLASS__, 'modeSwitcher'] );
    }

    //
    $switchInMenu = \DarklupLite\Helper::getOptionData('backend_darkmode');
    if( !empty( $switchInMenu ) && $switchInMenu == 'yes' ) {
      add_action( 'admin_bar_menu', [ __CLASS__, 'add_adminbar_items' ], 100 );
    }
    
    // custom css on wp head
    add_action( 'wp_head', [ __CLASS__, 'custom_css' ] );

    //
    add_action( 'admin_footer', [ __CLASS__, 'admin_pro_popup' ] );

  }

  /**
   * get settings option value
   *
   * @since  1.0.0
   * @param string $optionName 
   * @return void
   */
  public static function getOptionData( $optionName ) {
    return \DarklupLite\Helper::getOptionData($optionName);
  }
  /**
   * get switch style
   *
   * @since  1.0.0
   * @return void
   */
  public static function getSwitchStyle() {
    $switchStyle    = self::getOptionData('switch_style');
    return \DarklupLite\Switch_Style::switchStyle( $switchStyle );
  }

  /**
   * Dark mode switch floating markup
   * 
   * @since  1.0.0
   * @return void
   */
	public static function modeSwitcher() {
    
    $switchPosition = 'bottom_right';
    ?>
		<div class="darkluplite-mode-switcher <?php echo esc_attr( $switchPosition ); ?>">
      <div class="mode-switcher-inner switcher-darkmode-enabled darkluplite-dark-ignore">
        <?php echo self::getSwitchStyle(); ?>
      </div>
    </div>
    <?php

	}
  
  /**
   * Dark Mode change switch in admin bar
   *
   * @since  1.0.0
   * @param object $admin_bar
   * @return void
   */
  public static function add_adminbar_items( $admin_bar ) {

      $admin_bar->add_menu( array(
          'id'    => 'darkluplite-admin-switch',
          'title' => '<div class="on-off-toggle button-switch">
                <input class="on-off-toggle__input switch-trigger" value="yes" type="checkbox" id="darkluplite_admin_darkmode">
                <label for="darkluplite_admin_darkmode" class="on-off-toggle__slider"></label>
            </div>',
          'href'  => '#',
          'meta'  => array(
              'title' => esc_html__('Dark Mode Switch', 'darklup-lite'),            
          ),
      ));
      
  }

  /**
   * print custom css
   *
   * @since  1.0.0
   * @return void
   */
  public static function custom_css() {
    ?>
    <style>
      <?php
      echo self::getOptionData('custom_css');
      ?>
    </style>
    <?php
  }

  public static function admin_pro_popup() {
    ?>
    <!-- darklup-single-popup start  -->
    <div class="darklup-single-popup-wrapper">
      <div class="darklup-single-container">
        <div class="darklup-single-popup">
          <a class="darklup-close darklup-admin-close" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="18.243" height="18.243" viewBox="0 0 20.243 20.243">
              <g id="Group_175" data-name="Group 175" transform="translate(-1139.379 -1190.379)">
                <line id="Line_4" data-name="Line 4" x2="16" y2="16" transform="translate(1141.5 1192.5)" fill="none" stroke="#777" stroke-linecap="round" stroke-width="3"/>
                <line id="Line_5" data-name="Line 5" x1="16" y2="16" transform="translate(1141.5 1192.5)" fill="none" stroke="#777" stroke-linecap="round" stroke-width="3"/>
              </g>
            </svg>
          </a>
          <div class="offer-inner">
            <h2><?php echo esc_html( '75% OFF', 'darklup-lite' ); ?></h2>
          </div>
          <div class="details">
            <h2><?php echo esc_html( 'Go Premium', 'darklup-lite' ); ?></h2>
            <p><?php echo esc_html( 'Purchase our premium version to unlock these features', 'darklup-lite' ); ?></p>
            <a class="darklup-btn darklup-btn-red" href="https://darklup.com/pricing/" target="_blank"><?php echo esc_html( 'Get Pro', 'darklup-lite' ); ?></a>
          </div>
        </div>
      </div>
    </div>
    <div class="darklup-admin-popup-wrapper"></div>
    <!-- darklup-single-popup End  -->
    <?php
  }


}

/**
 * Initialization
 */
new Hooks();
