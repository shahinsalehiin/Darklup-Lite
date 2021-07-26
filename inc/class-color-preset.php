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

	public static function getColorPreset( $preset = '1' ) {

		switch( $preset ) {

			case '1' :
				return self::color_preset_1();
				break;
			case '2' :
				return self::color_preset_2();
				break;
            case '3' :
                return self::color_preset_3();
                break;
			default :
				return self::color_preset_1();
				
		}

	}

    public static function color_preset_1() {

        return [
            'background-color' => '#0d1117',
            'color' => '#fff',
            'anchor-color' => '#3fb950',
            'anchor-hover-color' => '#3fb950',
            'input-bg-color' => '#353535',
            'border-color' => '#455465',
            'btn-bg-color' => '#141414',
            'btn-color' => '#fff',
        ];
    }

    public static function color_preset_2() {

        return [
            'background-color' => '#121212',
            'color' => '#fff',
            'anchor-color' => '#70A0FF',
            'anchor-hover-color' => '#70A0FF',
            'input-bg-color' => '#353535',
            'border-color' => '#455465',
            'btn-bg-color' => '#141414',
            'btn-color' => '#fff',
        ];
    }

    public static function color_preset_3() {

        return [
            'background-color' => '#0d1117',
            'color' => '#fff',
            'anchor-color' => '#ff8200',
            'anchor-hover-color' => '#ff8200',
            'input-bg-color' => '#353535',
            'border-color' => '#455465',
            'btn-bg-color' => '#141414',
            'btn-color' => '#fff',
        ];
    }

}

