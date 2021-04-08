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
 
class Admin_Page_Components {

	public static function logo() {
		?>
		<div class="darkluplite-logo">
      <img class="logo-light" src="<?php echo esc_url( DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/logo.png' ); ?>" alt="<?php esc_attr_e( 'plugin logo', 'darklup-lite' ); ?>">
      <img class="logo-dark" src="<?php echo esc_url( DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/logo-dark.png' ); ?>" alt="<?php esc_attr_e( 'plugin logo', 'darklup-lite' ); ?>">
    </div>
		<?php
	}

	public static function formArea() {
		?>
		<div class="darkluplite-admin-wrap">
      <form class="admin-darklup" method="post" action="options.php">
          <?php 
          settings_fields( 'darkluplite-settings-group' ); 
          do_settings_sections( 'darkluplite-settings-group' );
          ?>
          <div class="darkluplite-main-area darkluplite-admin-settings-area">
              <div class="darkluplite-row">
                  <div class="darkluplite-col-sm-3 darkluplite-col-md-2 darkluplite-col-12 padding-0">
                      <div class="darkluplite-menu-area">
                      	<?php
                      	self::logo();
                        // Tab menu
                        require DARKLUPLITE_DIR_ADMIN .'admin-templates/template-tabs.php';
                      	?>
                      </div>
                  </div>

                  <div class="darkluplite-col-sm-9 darkluplite-col-md-10 darkluplite-col-12 padding-0">
                    <div class="darkluplite-settings-area darkluplite-admin-dark-ignore">
                      <?php
                      require DARKLUPLITE_DIR_ADMIN .'admin-templates/template-home-settings.php';
                      require DARKLUPLITE_DIR_ADMIN .'admin-templates/template-general.php';
                      require DARKLUPLITE_DIR_ADMIN .'admin-templates/template-advance-settings.php';
                      require DARKLUPLITE_DIR_ADMIN .'admin-templates/template-style-settings.php';
                      require DARKLUPLITE_DIR_ADMIN .'admin-templates/template-color-settings.php';
                      require DARKLUPLITE_DIR_ADMIN .'admin-templates/template-image-settings.php';
                      require DARKLUPLITE_DIR_ADMIN .'admin-templates/template-custom-css.php';
                      ?>
                    </div>
                  </div>
              </div>  
          </div>
        </form>
    </div>
		<?php
	}

}