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


class Image_Settings_Tab extends Settings_Fields_Base {

    public function get_option_name() {
      return 'darkluplite_settings'; // set option name it will be same or different name
    }


   public function tab_setting_fields() {

        $this->start_fields_section([

            'title' => esc_html__( 'IMAGE SETTINGS', 'darklup-lite' ),
            'class' => 'darkluplite-image-settings darkluplite-d-hide',
            'icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/picture.svg' ),
            'dark_icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/picture-white.svg' ),
            'id' => 'darkluplite_image_settings'

        ]);
        $this->media_upload_field([
          'title' => esc_html__( 'Logo Light Url', 'darklup-lite' ),
          'class' => 'settings-switch-position',
          'sub_title' => esc_html__( 'Set logo light mode url.', 'darklup-lite' ),
          'name'  => 'logo_light_url',
          'is_pro'    => 'yes',
          'wrapper_class'     => 'pro-feature'
        ]);
        $this->media_upload_field([
          'title' => esc_html__( 'Logo Dark Url', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Set logo dark mode url.', 'darklup-lite' ),
          'class' => 'settings-switch-position',
          'name'  => 'logo_dark_url',
          'is_pro'    => 'yes',
          'wrapper_class'     => 'pro-feature'
        ]);
        
        $this->image_repeater_field([
          'title' => esc_html__( 'Dark Mode Image Upload', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Set darkmode image.', 'darklup-lite' ),
          'class' => 'settings-switch-position',
          'is_pro'    => 'yes',
          'name'  => 'image_darkmode',
          'wrapper_class'     => 'pro-feature'
        ]);

        
        $this->switch_field([
          'title' => esc_html__( 'Show Image Effects', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Enable/ disable the dark mode image effects.', 'darklup-lite' ),
          'name' => 'darklup_lite_image_effects',
          'is_pro'    => 'yes',
          'wrapper_class'     => 'pro-feature'
        ]);

        $this->end_fields_section(); // End fields section

   }


}

new Image_Settings_Tab();