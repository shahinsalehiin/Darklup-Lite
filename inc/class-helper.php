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
 * Helper class
 */
class Helper{

  /**
   * Switch style and demo image list
   * @return array
   */
	public static function switchDemoImage() {

    $images = [
        '1' => [ 
            'name' => 'Switch 1',
            'url' => DARKLUPLITE_DIR_URL.'assets/img/switch-1.svg'
        ],
        '2' => [ 
            'name' => 'Switch 2',
            'url' => DARKLUPLITE_DIR_URL.'assets/img/switch-2.svg'
        ],
        '3' => [ 
            'name' => 'Switch 3',
            'url' => DARKLUPLITE_DIR_URL.'assets/img/switch-3.svg'
        ],
        '4' => [
            'name' => 'Switch 4',
            'url' => DARKLUPLITE_DIR_URL.'assets/img/switch-4.png'
        ],
        '5' => [
            'name' => 'Switch 5',
            'url' => DARKLUPLITE_DIR_URL.'assets/img/switch-5.png'
        ],
        '6' => [
            'name' => 'Switch 6',
            'url' => DARKLUPLITE_DIR_URL.'assets/img/switch-6.svg'
        ],
        '7' => [
            'name' => 'Switch 7',
            'url' => DARKLUPLITE_DIR_URL.'assets/img/switch-7.svg'
        ],
        '8' => [
            'name' => 'Switch 8',
            'url' => DARKLUPLITE_DIR_URL.'assets/img/switch-8.svg'
        ],
        '9' => [
            'name' => 'Switch 9',
            'url' => DARKLUPLITE_DIR_URL.'assets/img/switch-9.svg'
        ],
        '10' => [
            'name' => 'Switch 10',
            'url' => DARKLUPLITE_DIR_URL.'assets/img/switch-10.svg'
        ]

    ];

    return $images;

	}

  /**
   * get settings option value
   * @param  string $optionKey
   * @return void
   */
  public static function getOptionData( $optionKey ) {

      $options = get_option( 'darkluplite_settings' );

      $value = '';

      if( !empty( $options[$optionKey] ) ) {
          $value = $options[$optionKey];
      }

      return $value;

  }
  /**
   * get time list
   * 
   * @return array
   */
  public static function getTimes() {

    return [
        '00:00' => '12:00 AM',
        '01:00' => '01:00 AM',
        '02:00' => '02:00 AM',
        '03:00' => '03:00 AM',
        '04:00' => '04:00 AM',
        '05:00' => '05:00 AM',
        '06:00' => '06:00 AM',
        '07:00' => '07:00 AM',
        '08:00' => '08:00 AM',
        '09:00' => '09:00 AM',
        '10:00' => '10:00 AM',
        '11:00' => '11:00 AM',
        '12:00' => '12:00 PM',
        '13:00' => '01:00 PM',
        '14:00' => '02:00 PM',
        '15:00' => '03:00 PM',
        '16:00' => '04:00 PM',
        '17:00' => '05:00 PM',
        '18:00' => '06:00 PM',
        '19:00' => '07:00 PM',
        '20:00' => '08:00 PM',
        '21:00' => '09:00 PM',
        '22:00' => '10:00 PM',
        '23:00' => '11:00 PM'
    ];

  }
  
  /**
   * Set dark mode switch text light/dark
   * 
   * @return array
   */
  public static function switchText() {

    $light  = self::getOptionData('switch_text_light');
    $dark   = self::getOptionData('switch_text_dark');

    return [
      'light' => !empty( $light ) ? esc_html( $light ) : 'Light',
      'dark'  => !empty( $dark ) ? esc_html( $dark ) : 'Dark'
    ];

  }
  /**
   * Get pages list 
   * 
   * @return array
   */
  public static function getPages() {

    $pages = [];
    foreach( get_pages() as $page ) {
      $pages[$page->post_name] = $page->post_title;
    }
    return $pages;

  }
    
}
