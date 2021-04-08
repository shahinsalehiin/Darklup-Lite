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


class General_Settings_Tab extends Settings_Fields_Base {

    public function get_option_name() {
      return 'darkluplite_settings'; // set option name it will be same or different name
    }


   public function tab_setting_fields() {

        $this->start_fields_section([

            'title' => 'GENERAL SETTINGS',
            'class' => 'darkluplite-general-settings darkluplite-d-hide',
            'icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/settings.svg' ),
            'dark_icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/settings-white-2.png' ),
            'id' => 'darkluplite_general_settings'

        ]);

        $this->switch_field([
          'title' => esc_html__( 'Enable Frontend Darkmode', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Turn ON to enable the darkmode in the frontend.', 'darklup-lite' ),
          'name' => 'frontend_darkmode'
        ]);
        $this->switch_field([
          'title' => esc_html__( 'Enable Backend Darkmode', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Enable the backend darkmode to display a darkmode switch button in the admin bar for the admins on the backend.', 'darklup-lite' ),
          'name' => 'backend_darkmode'
        ]);
        $this->switch_field([
          'title' => esc_html__( 'Enable OS Aware Dark Mode', 'darklup-lite' ),
          'sub_title' => esc_html__( 'This option will be served a dark mode of your website when their device preference is set to Dark Mode.', 'darklup-lite' ),
          'name' => 'enable_os_switcher'
        ]);
        $this->switch_field([
          'title' => esc_html__( 'Show Floating Switch', 'darklup-lite' ),
          'sub_title' => esc_html__( 'Show the floating dark mode switcher button on the frontend for the users.', 'darklup-lite' ),
          'name' => 'floating_switch'
        ]);
       
        $this->end_fields_section(); // End fields section

   }




}

new General_Settings_Tab();