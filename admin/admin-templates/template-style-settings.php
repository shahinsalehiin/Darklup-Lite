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


class Style_Settings_Tab extends Settings_Fields_Base {

  public function get_option_name() {
    return 'darkluplite_settings'; // set option name it will be same or different name
  }
  
   public function tab_setting_fields() {

        $this->start_fields_section([
            'title' => esc_html__( 'STYLE SETTINGS', 'darklup-lite' ),
            'class' => 'darkluplite-style-settings darkluplite-d-hide',
            'icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/style.svg' ),
            'dark_icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/settings-white-1.png' ),
            'id' => 'darkluplite_style_settings'
        ]);

        $this->image_radio_field([
          'title' => esc_html__( 'Switch Style', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Select the switcher button style for the frontend.', 'darklup-lite' ),
          'class'     => 'settings-color-preset',
          'name'      => 'switch_style',
          'options' => [
            '1' => DARKLUPLITE_DIR_URL.'assets/img/switch-1.svg',
            '2' => DARKLUPLITE_DIR_URL.'assets/img/switch-2.svg',
            '11' => DARKLUPLITE_DIR_URL.'assets/img/switch-3.svg',
            '12' => DARKLUPLITE_DIR_URL.'assets/img/switch-4.svg',
            '13' => DARKLUPLITE_DIR_URL.'assets/img/switch-5.png',
            '15' => DARKLUPLITE_DIR_URL.'assets/img/switch-6.svg',
            '16' => DARKLUPLITE_DIR_URL.'assets/img/switch-7.svg',
            '17' => DARKLUPLITE_DIR_URL.'assets/img/switch-8.svg',
            '18' => DARKLUPLITE_DIR_URL.'assets/img/switch-9.svg',
            '19' => DARKLUPLITE_DIR_URL.'assets/img/switch-10.svg',
          ]
        ]);
        $this->select_box([
          'title' => esc_html__( 'Switch Position', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Select the position of the floating dark mode switcher button on the frontend.', 'darklup-lite' ),
          'class' => 'settings-switch-position',
          'wrapper_class'     => 'pro-feature',
          'is_pro'    => 'yes',
          'name'  => 'switch_position',
          'options' => [
            '1'    => esc_html__( 'Top Right', 'darklup-lite' ),
            '2'    => esc_html__( 'Top Left', 'darklup-lite' ),
            '3'    => esc_html__( 'Bottom Right ', 'darklup-lite' ),
            '4'    => esc_html__( 'Bottom Left', 'darklup-lite' ),
          ]
        ]);
        $this->number_field([
          'title' => esc_html__( 'Switch Top Margin', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Set floating switch margin top.', 'darklup-lite' ),
          'class' => 'settings-switch-position',
          'name'  => 'switch_top_margin',
          'step'  => '1',
          'max'   => '200',
          'placeholder' => esc_html__( 'e.g 10px', 'darklup-lite' )
        ]);
        $this->number_field([
          'title' => esc_html__( 'Switch Bottom Margin', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Set floating switch margin bottom.', 'darklup-lite' ),
          'class' => 'settings-switch-position',
          'name'  => 'switch_bottom_margin',
          'step'  => '1',
          'max'   => '200',
          'placeholder' => esc_html__( 'e.g 10px', 'darklup-lite' )
        ]);
        $this->number_field([
          'title' => esc_html__( 'Switch Right Margin', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Set floating switch margin right.', 'darklup-lite' ),
          'class' => 'settings-switch-position',
          'name'  => 'switch_right_margin',
          'step'  => '1',
          'max'   => '200',
          'placeholder' => esc_html__( 'e.g 10px', 'darklup-lite' )
        ]);
        $this->number_field([
          'title' => esc_html__( 'Switch Left Margin', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Set floating switch margin left.', 'darklup-lite' ),
          'class' => 'settings-switch-position',
          'name'  => 'switch_left_margin',
          'step'  => '1',
          'max'   => '200',
          'placeholder' => esc_html__( 'e.g 10px', 'darklup-lite' )
        ]);
        $this->number_field([
          'title' => esc_html__( 'Text Font Size', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Set dark mode text font size.', 'darklup-lite' ),
          'class' => 'settings-switch-position',
          'wrapper_class'     => 'pro-feature',
          'is_pro'    => 'yes',
          'name'  => 'body_font_size',
          'step'  => '1',
          'max'   => '50',
          'placeholder' => esc_html__( '14', 'darklup-lite' ),
        ]);
        $this->text_field([
          'title' => esc_html__( 'Switch Text (Light)', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Switch light text.', 'darklup-lite' ),
          'class' => 'settings-switch-position',
          'name'  => 'switch_text_light',
          'wrapper_class'     => 'pro-feature',
          'is_pro'    => 'yes',
          'placeholder' => esc_html__( 'e.g Light', 'darklup-lite' )
        ]);
        $this->text_field([
          'title' => esc_html__( 'Switch Text (Dark)', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Switch dark text.', 'darklup-lite' ),
          'class' => 'settings-switch-position',
          'name'  => 'switch_text_dark',
          'wrapper_class'     => 'pro-feature',
          'is_pro'    => 'yes',
          'placeholder' => esc_html__( 'e.g Dark', 'darklup-lite' )
        ]);

        $this->switch_field([
          'title'     => esc_html__( 'Show Above Posts', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Show the dark mode switcher button above of all the post.', 'darklup-lite' ),
          'name'      => 'show_above_posts',
          'wrapper_class'     => 'pro-feature',
          'is_pro'    => 'yes'
        ]);
        $this->switch_field([
          'title'     => esc_html__( 'Show Above Pages', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Show the dark mode switcher button above of all the pages.', 'darklup-lite' ),
          'name'      => 'show_above_pages',
          'wrapper_class' => 'pro-feature',
          'is_pro'    => 'yes'
        ]);
        $this->Multiple_select_box([
          'title'     => esc_html__( 'Exclude Pages', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Select the pages where you don\'t want to show the dark mode switch', 'darklup-lite' ),
          'name'      => 'exclude_pages',
          'wrapper_class' => 'pro-feature',
          'is_pro'    => 'yes',
          'options' => \DarklupLite\Helper::getPages()
        ]);
       
        $this->end_fields_section(); // End fields section

   }




}

new Style_Settings_Tab();