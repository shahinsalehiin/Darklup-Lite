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


class Home_Settings_Tab extends Settings_Fields_Base {

  public function get_option_name() {
    return 'darkluplite_settings'; // set option name it will be same or different name
  }

  public function tab_setting_fields() {

      $this->start_fields_section([
        'title' => esc_html__( 'Home', 'darklup-lite' ),
        'class' => 'darkluplite-home-settings darkluplite-d-show',
        'icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/home.svg' ),
        'dark_icon'  => esc_url( DARKLUPLITE_DIR_URL. 'assets/img/home-white.png' ),
        'id'    => 'darkluplite_home_settings',
        'display' => 'block'
      ]);

      ?>
          <div class="darkluplite-single-about mb-100">
            <div class="darkluplite-row">
              <div class="darkluplite-col-md-8 darkluplite-col-12 align-self-center">
                <div class="details">
                  <h3><?php esc_html_e( 'Welcome to Dark Mode for WordPress', 'darklup-lite' ); ?></h3>
                  <p><?php esc_html_e( 'The dark mode is good for your eyes: dark mode is way less harmful to your vision in the long run than the light mode.', 'darklup-lite') ?></p>
                </div>
              </div>
              <div class="darkluplite-col-md-4 darkluplite-col-12 align-self-center">
                <div class="thumb">
                  <img src="<?php echo esc_url( DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/1.png' ); ?>" alt="img">
                </div>
              </div>
            </div>
          </div>
          <div class="darkluplite-row mb-100">
            <div class="darkluplite-col-md-6 darkluplite-col-12 align-self-center">
              <div class="darkluplite-single-about darkluplite-single-about-red">
                <div class="details">
                  <h3><?php esc_html_e( 'Documantation', 'darklup-lite') ?></h3>
                  <p><?php esc_html_e( 'We have created a well organized and detailed documentation to get familiar with DarklupLite- WP Dark Mode. You will easily understand how our plugin will work.', 'darklup-lite' )?></p>
                  <a class="darkluplite-btn darkluplite-btn-base" href="https://documentation.darklup.com/" target="_blank"><?php esc_html_e( 'Documantation', 'darklup-lite' ); ?></a>
                </div>
              </div>
            </div>
            <div class="darkluplite-col-md-6 darkluplite-col-12 align-self-center">
              <div class="darkluplite-single-about darkluplite-single-about-purple">
                <div class="details">
                  <h3><?php esc_html_e('Help and Support', 'darklup-lite'); ?></h3>
                  <p><?php esc_html_e( 'Facing any technical issue? Need consultation with an expert? Simply Take our live chat support option. We will respond to you shortly. We are ready to help you', 'darklup-lite' ); ?></p>
                  <a class="darkluplite-btn darkluplite-btn-purple" href="https://wordpress.org/support/plugin/darklup-lite-wp-dark-mode/" target="_blank"><?php esc_html_e( 'GET SUPPORT', 'darklup-lite' ); ?></a>
                </div>
              </div>
            </div>
          </div>
          <div class="darkluplite-single-about style-two darkluplite-single-about-blue mb-100">
            <div class="darkluplite-row">
              <div class="darkluplite-col-md-7 darkluplite-col-12 align-self-center">
                <div class="details">
                  <h3><?php esc_html_e( 'ARE WE MISSING ANY FEATURE?', 'darklup-lite' ); ?></h3>
                  <p><?php esc_html_e( 'Are we missing any feature that you need a lot? We are requesting you to do a feature request so we can add that feature o our next update', 'darklup-lite'); ?></p>
                  <a class="darkluplite-btn darkluplite-btn-blue" href="https://wordpress.org/support/plugin/darklup-lite-wp-dark-mode/" target="_blank"><?php esc_html_e( 'FEATURE REQUEST', 'darklup-lite' ); ?></a>
                </div>
              </div>
              <div class="darkluplite-col-md-5 darkluplite-col-12">
                <div class="thumb">
                  <img src="<?php echo esc_url( DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/4.png' ); ?>" alt="img">
                </div>
              </div>
            </div>
          </div>
          <div class="darkluplite-single-about style-three darkluplite-single-about-red">
            <div class="darkluplite-row">
              <div class="darkluplite-col-md-5 darkluplite-col-12">
                <div class="thumb">
                  <img src="<?php echo esc_url( DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/5.png' ); ?>" alt="img">
                </div>
              </div>
              <div class="darkluplite-col-md-7 darkluplite-col-12 align-self-center">
                <div class="details">
                  <h3><?php esc_html_e( 'HAPPY WITH DARKLUPLITE?', 'darklup-lite' ); ?></h3>
                  <p><?php esc_html_e( 'If you are really happy and satisfied with our plugin, We hardly request you to give us a 5* rating in WordPress Org.', 'darklup-lite' ); ?></p>
                  <a class="darkluplite-btn darkluplite-btn-base" href="https://wordpress.org/plugins/darklup-lite-wp-dark-mode/#reviews" target="_blank"><?php esc_html_e( 'GIVE A 5* RATING', 'darklup-lite' ); ?> </a>
                </div>
              </div>
            </div>
          </div>
      <?php
      $this->end_fields_section();

  }




}

new Home_Settings_Tab();