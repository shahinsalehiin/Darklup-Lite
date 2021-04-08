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

/**
 * Switch Style class
 */
class Switch_Style {

	/**
	 * 
	 * @since 1.0.0
	 * @param number $style 
	 * @return void
	 */
	public static function switchStyle( $style ) {

		$getStyle = '';

		switch( $style ) {

			case '1' :
				$getStyle = self::style_1();
				break;
			case '2' :
				$getStyle = self::style_2();
				break;
			default :
				$getStyle = self::style_1();
				break;
				
		}

		return $getStyle;

	}
	/**
	 * Switch style 1
	 * 
	 * @since 1.0.0
	 * @return void
	 */
	public static function style_1() {
		ob_start();
		?>
		<div class="darkluplite-btn-area darkluplite-dark-ignore">
			<div class="on-off-toggle button-switch-1 darkluplite-dark-ignore">
				<input class="on-off-toggle__input switch-trigger" type="checkbox" id="one" />
				<label for="one" class="on-off-toggle__slider darkluplite-dark-ignore"></label>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
	/**
	 * Switch style 2
	 * 
	 * @since 1.0.0
	 * @return void
	 */
	public static function style_2() {
		ob_start();
		?>
		<div class="darkluplite-btn-area darkluplite-dark-ignore">
			<div class="on-off-toggle button-switch-3 darkluplite-dark-ignore">
				<input class="on-off-toggle__input switch-trigger" type="checkbox" id="three" />
				<label for="three" class="on-off-toggle__slider darkluplite-dark-ignore"></label>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
	
}

