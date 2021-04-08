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
            'icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/color.png' ),
            'dark_icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/color-white.png' ),
            'id' => 'darkluplite_color_settings'

        ]);

        $this->switch_field([
          'title' => esc_html__( 'Front-End Darkmode Color Preset Enabled', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Select the predefined darkmode background, text and link preset color.', 'darklup-lite' ),
          'name' => 'color_preset_enabled'
        ]);

        $this->image_radio_field([
          'title' => esc_html__( 'Front-End Darkmode Color Preset', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Select the front-end darkmode color.', 'darklup-lite' ),
          'class' => 'settings-color-preset',
          'name' => 'color_preset',
          'condition' => ["key" => "color_preset_enabled", "value" => "yes"],
          'options' => [
            '1' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-1.png',
            '2' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-2.png',
            '3' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-3.png',
            '4' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-4.png',
            '5' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-5.png',
            '6' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-6.png',
            '7' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-7.png',
            '8' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-8.png',
            '9' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-9.png'
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
        $this->image_radio_field([
          'title' => esc_html__( 'Admin Darkmode Color Preset', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Select the admin darkmode color.', 'darklup-lite' ),
          'class' => 'settings-color-preset',
          'condition' => ["key" => "admin_color_preset_enabled", "value" => "yes"],
          'name' => 'color_admin_preset',
          'options' => [
            '1' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-1.png',
            '2' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-2.png',
            '3' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-3.png',
            '4' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-4.png',
            '5' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-5.png',
            '6' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-6.png',
            '7' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-7.png',
            '8' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-8.png',
            '9' => DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/color-9.png'
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