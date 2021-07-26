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
            'url' => DARKLUPLITE_DIR_URL.'assets/img/switch-8.svg'
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
    public static function getPages()
    {
        $pages = [];
        foreach (get_pages() as $page) {
            $pages[$page->ID] = $page->post_title;
        }
        return $pages;
    }


    /**
     * Get Posts List
     * @return array
     */
    public static function getPosts() {
        $posts = [];

        $posts_arg = array('orderby' => 'date', 'order'   => 'DESC', 'numberposts'   => -1);
        foreach( get_posts($posts_arg) as $post ) {
            $posts[$post->ID] = $post->post_title;
        }
        return $posts;
    }


    /**
     * Get Category List
     * @return array
     */
    public static function getCategories()
    {
        $categories = [];

        $category_arg = array('orderby' => 'name', 'order' => 'ASC', 'hide_empty' => 0);
        foreach (get_categories($category_arg) as $category) {
            $categories[$category->term_id] = $category->name;
        }
        return $categories;
    }

    /**
     * Get Woocommerce product list
     *
     * @return array
     */
    public static function getWooProducts()
    {
        $products = [];
        if (class_exists('woocommerce')) {
            $args = array('post_type' => 'product', 'posts_per_page' => -1);
            foreach (get_posts($args) as $product) {
                $products[$product->ID] = $product->post_title;
            }
        }
        return $products;
    }

    /**
     * Get Woocommerce category list
     *
     * @return array
     */
    public static function getWooCategories()
    {
        $categories = [];
        if (class_exists('woocommerce')) {

            $cat_args = array('taxonomy' => "product_cat", 'orderby' => 'name', 'order' => 'asc', 'hide_empty' => false);
            $product_categories = get_terms($cat_args);
            foreach ($product_categories as $category) {
                $categories[$category->term_id] = $category->name;
            }
        }
        return $categories;
    }
    
}
