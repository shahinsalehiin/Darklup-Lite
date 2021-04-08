<?php
namespace DarklupLite\Admin\Field;
 /**
  * 
  * @package    DarklupLite - WP Dark Mode
  * @version    1.0.0
  * @author     
  * @Websites: 
  *
  */
 


trait Image_Radio_Button {

  public static $args;


  public function image_radio_field( $args ) {

    $default = [

      'title'     => esc_html__( 'Image Radio Field', 'darklup-lite' ),
      'sub_title' => esc_html__( 'This is image radio Field', 'darklup-lite' ),
      'name'      => '',
      'condition' => '',
      'class'     => '',
      'wrapper_class'  => '',
      'is_pro'    => 'no',
      'options' => []

    ];

    $args = wp_parse_args( $args, $default );

    self::$args = $args;

    self::image_radio_markup();

  }

	public static function image_radio_markup() {

    $optionName = self::$optionName;
    $args = self::$args;
    $getData = self::$getOptionData;
    $fieldName  = $args['name'];
    $value = !empty( $getData[$fieldName] ) ? $getData[$fieldName] : '';

    $conditionData = '';
    if( !empty( $args['condition'] ) ) {
      $conditionData = json_encode( $args['condition'] );
    }

		?>
    <div class="darkluplite-row <?php echo esc_html( $args['wrapper_class'].' '.$args['class'] ); ?>" data-condition="<?php echo esc_html($conditionData); ?>">
      <div class="darkluplite-col-lg-6 darkluplite-col-md-12">
    		<div class="darkluplite-single-settings-inner radio-image-wrapper">
          <?php 
          if( $args['is_pro'] == 'yes' ) {
            echo '<div class="darklup-pro-ribbon">'.esc_html__( 'Pro', 'darklup' ).'</div>';
          }
          ?>
              <div class="details">
                <h5><?php echo esc_html( $args['title'] ); ?></h5>
                <?php
                if( !empty( $args['sub_title'] ) ) {
                  echo '<p>'.esc_html( $args['sub_title'] ).'</p>';
                }
                ?>
              </div>
              <div class="button-switch">
                <?php 
                foreach( $args['options'] as $key => $option ) {

                  if( $key > 2 ) {
                    echo '<label class="radio-img darkluplite-pro-item pro-feature"><img src="'.esc_url( $option ).'"></label>';
                  } else {
                    echo '<label class="radio-img"><input type="radio" name="'.esc_attr( $optionName ).'['.$fieldName.']" '.checked(  $value,$key,false ).' value="'.esc_attr( $key ).'" /><img src="'.esc_url( $option ).'"></label>';
                  }

                }
                ?>
              </div>
          </div>
        </div>
      </div>
		<?php
	}

}  
