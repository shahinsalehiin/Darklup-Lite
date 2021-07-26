<?php
namespace DarklupLite\Admin;
 /**
  * 
  * @package    DarklupLite - WP Dark Mode
  * @version    1.0.0
  * @author     
  * @Websites: 
  *
  */


class Color_Settings_Tab extends Settings_Fields_Base {

  public function get_option_name() {
    return 'darkluplite_settings'; // set option name it will be same or different name
  }

   public function tab_setting_fields() {

        $this->start_fields_section([

            'title' => esc_html__( 'COLOR SETTINGS', 'darklup-lite' ),
            'class' => 'darkluplite-color-settings darkluplite-d-hide',
            'icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/color.svg' ),
            'dark_icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/color-white.svg' ),
            'id' => 'darkluplite_color_settings'

        ]);

        $this->switch_field([
          'title' => esc_html__( 'Front-End Darkmode Color Preset Enabled', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Select the predefined darkmode background, text and link preset color.', 'darklup-lite' ),
          'name' => 'color_preset_enabled'
        ]);

        $this->color_scheme_radio_field([
          'title' => esc_html__( 'Front-End Darkmode Color Preset', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Select the front-end darkmode color.', 'darklup-lite' ),
          'class' => 'settings-color-preset',
          'name' => 'color_preset',
          'condition' => ["key" => "color_preset_enabled", "value" => "yes"],
          'options_title' => ['1' => 'Default', '2' => 'Blue', '3' => 'Orange', '4' => 'Bird Flower', '5' => 'Dim Light',
              '6' => 'Light Green', '7' => 'Bright Ube', '8' => 'Blush Pink', '9' => 'Generic Green', '10' => 'Facebook', '11' => 'Twitter Lights', '12' => 'Twitter Dim'],
          'options' => [
              '1' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Default.svg',
              '2' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Blue.svg',
              '3' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Orange.svg',
              '4' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Bird-Flower.svg',
              '5' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Dim-Light.svg',
              '6' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Light-Green.svg',
              '7' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Bright-Ube.svg',
              '8' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Blush-Pink.svg',
              '9' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Generic-Green.svg',
              '10' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Facebook.svg',
              '11' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Twitter-Lights-Out.svg',
              '12' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Twitter-Dim.svg'
          ]
        ]);

        $this->switch_field([
          'title' => esc_html__( 'Want to Front-End customize colors?', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Customize the darkmode background, text and link colors.', 'darklup-lite' ),
          'name' => 'custom_color_enabled',
          'is_pro'    => 'yes',
          'wrapper_class'     => 'pro-feature'
        ]);
        $this->switch_field([
          'title' => esc_html__( 'Admin Darkmode Color Preset Enabled', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Select the predefined admin darkmode background, text and link preset color.', 'darklup-lite' ),
          'name' => 'admin_color_preset_enabled'
        ]);
        $this->color_scheme_radio_field([
          'title' => esc_html__( 'Admin Darkmode Color Preset', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Select the admin darkmode color.', 'darklup-lite' ),
          'class' => 'settings-color-preset',
          'condition' => ["key" => "admin_color_preset_enabled", "value" => "yes"],
          'name' => 'color_admin_preset',
          'options_title' => ['1' => 'Default', '2' => 'Blue', '3' => 'Orange', '4' => 'Bird Flower', '5' => 'Dim Light',
              '6' => 'Light Green', '7' => 'Bright Ube', '8' => 'Blush Pink', '9' => 'Generic Green', '10' => 'Facebook', '11' => 'Twitter Lights', '12' => 'Twitter Dim'],
          'options' => [
              '1' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Default.svg',
              '2' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Blue.svg',
              '3' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Orange.svg',
              '4' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Bird-Flower.svg',
              '5' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Dim-Light.svg',
              '6' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Light-Green.svg',
              '7' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Bright-Ube.svg',
              '8' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Blush-Pink.svg',
              '9' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Generic-Green.svg',
              '10' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Facebook.svg',
              '11' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Twitter-Lights-Out.svg',
              '12' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL . 'img/Twitter-Dim.svg'
          ]
        ]);

        $this->switch_field([
          'title' => esc_html__( 'Want to Admin customize colors?', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Customize the admin darkmode background, text and link colors.', 'darklup-lite' ),
          'name' => 'admin_custom_color_enabled',
          'is_pro'    => 'yes',
          'wrapper_class'     => 'pro-feature'
        ]);

        $this->end_fields_section(); // End fields section

   }

}

new Color_Settings_Tab();