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
 * Hooks class
 */
class Color_Preset {

	/**
	 * Get color preset
	 * 
	 * @since 1.0.0
	 * @param string $preset
	 * @return array
	 */
	public static function getColorPreset( $preset = '1' ) {

		switch( $preset ) {

			case '1' :
				return self::color_preset_1();
				break;
			case '2' :
				return self::color_preset_2();
				break;
			default :
				return self::color_preset_1();
				
		}

	}
	/**
	 * color preset style 1
	 * 
	 * @since 1.0.0
	 * @return array
	 */
	public static function color_preset_1() {

		return [

			'background-color' 	=> '#212121',
			'color' 			=> '#fff',
			'anchor-color' 		=> '#1DDECB',
			'anchor-hover-color' => '#1DDECB',
			'input-bg-color' 	=> '#353535',
			'border-color' 		=> '#455465',
			'btn-bg-color' 		=> '#141414',
			'btn-color' 		=> '#fff',

		];

	}
	/**
	 * color preset style 2
	 * 
	 * @since 1.0.0
	 * @return array
	 */
	public static function color_preset_2() {

		return [

			'background-color' 	=> '#1f1f1f',
			'color' 			=> '#fff',
			'anchor-color' 		=> '#C495FB',
			'anchor-hover-color' => '#C495FB',
			'input-bg-color' 	=> '#353535',
			'border-color' 		=> '#455465',
			'btn-bg-color' 		=> '#141414',
			'btn-color' 		=> '#fff',

		];
	}

}

