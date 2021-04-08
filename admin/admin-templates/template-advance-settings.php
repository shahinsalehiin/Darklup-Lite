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


class Advance_Settings_Tab extends Settings_Fields_Base {

  public function get_option_name() {
    return 'darkluplite_settings'; // set option name it will be same or different name
  }

   public function tab_setting_fields() {

        $this->start_fields_section([
            'title' => esc_html__( 'ADVANCE SETTINGS', 'darklup-lite' ),
            'class' => 'darkluplite-advance-settings darkluplite-d-hide',
            'icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/advance.svg' ),
            'dark_icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/color-white.png' ),
            'id'    => 'darkluplite_advance_settings'
        ]);

        $this->switch_field([
          'title'     => esc_html__( 'Display Switch in Menu', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Darkmode switch display in the menu.', 'darklup-lite' ),
          'name'      => 'switch_in_menu',
          'is_pro'    => 'yes',
          'wrapper_class'     => 'pro-feature'
        ]);
        $this->switch_field([
          'title'     => esc_html__( 'Time Based Dark Mode', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Automatically turn on the dark mode between a given time range.', 'darklup-lite' ),
          'name'      => 'time_based_darkmode',
          'is_pro'    => 'yes',
          'wrapper_class'     => 'pro-feature'
        ]);
        $this->select_box([
          'title'     => esc_html__( 'Dark Mode Start Time', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Time to start dark mode.', 'darklup-lite' ),
          'name'      => 'mode_start_time',
          'condition' => ["key" => "time_based_darkmode", "value" => "yes"],
          'options'   => \DarklupLite\Helper::getTimes()
        ]);
        $this->select_box([
          'title'     => esc_html__( 'Dark Mode End Time', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Time to end dark mode.', 'darklup-lite' ),
          'condition' => ["key" => "time_based_darkmode", "value" => "yes"],
          'name'      => 'mode_end_time',
          'options'   => \DarklupLite\Helper::getTimes()
        ]);

        $this->end_fields_section();

   }


}

new Advance_Settings_Tab();