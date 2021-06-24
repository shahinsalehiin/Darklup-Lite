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
    public static function getColorPreset($preset = '1') {

        switch ($preset) {

            case 'Default' :
                return self::color_preset_1();
                break;
            case 'Blue' :
                return self::color_preset_2();
                break;
            case 'Orange' :
                return self::color_preset_3();
                break;
            case 'Bird Flower' :
                return self::color_preset_4();
                break;
            case 'Dim Light' :
                return self::color_preset_5();
                break;
            case 'Light Green' :
                return self::color_preset_6();
                break;
            case 'Bright Ube' :
                return self::color_preset_7();
                break;
            case 'Blush Pink' :
                return self::color_preset_8();
                break;
            case 'Generic Green' :
                return self::color_preset_9();
                break;
            case 'Facebook' :
                return self::color_preset_10();
                break;
            case 'Twitter Lights Out' :
                return self::color_preset_11();
                break;
            case 'Twitter Dim' :
                return self::color_preset_12();
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

    /**
     * color preset style 2
     * 
     * @since 1.0.0
     * @return array
     */
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

    /**
     * color preset style 3
     * 
     * @since 1.0.0
     * @return array
     */
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

    
    
    /**
     * color preset style 4
     * 
     * @since 1.0.0
     * @return array
     */
    public static function color_preset_4() {

        return [
            'background-color' => '#0f172a',
            'color' => '#fff',
            'anchor-color' => '#ccae05',
            'anchor-hover-color' => '#ccae05',
            'input-bg-color' => '#353535',
            'border-color' => '#455465',
            'btn-bg-color' => '#141414',
            'btn-color' => '#fff',
        ];
    }

    /**
     * color preset style 5
     * 
     * @since 1.0.0
     * @return array
     */
    public static function color_preset_5() {

        return [
            'background-color' => '#32373c',
            'color' => '#fff',
            'anchor-color' => '#30ceff',
            'anchor-hover-color' => '#30ceff',
            'input-bg-color' => '#353535',
            'border-color' => '#455465',
            'btn-bg-color' => '#141414',
            'btn-color' => '#fff',
        ];
    }

    /**
     * color preset style 6
     * 
     * @since 1.0.0
     * @return array
     */
    public static function color_preset_6() {

        return [
            'background-color' => '#071639',
            'color' => '#fff',
            'anchor-color' => '#03dac5',
            'anchor-hover-color' => '#03dac5',
            'input-bg-color' => '#353535',
            'border-color' => '#455465',
            'btn-bg-color' => '#141414',
            'btn-color' => '#fff',
        ];
    }

    
    /**
     * color preset style 7
     * 
     * @since 1.0.0
     * @return array
     */
    public static function color_preset_7() {

        return [
            'background-color' => '#090809',
            'color' => '#fff',
            'anchor-color' => '#d19fe8',
            'anchor-hover-color' => '#d19fe8',
            'input-bg-color' => '#353535',
            'border-color' => '#455465',
            'btn-bg-color' => '#141414',
            'btn-color' => '#fff',
        ];
    }

    /**
     * color preset style 8
     * 
     * @since 1.0.0
     * @return array
     */
    public static function color_preset_8() {

        return [
            'background-color' => '#000000',
            'color' => '#fff',
            'anchor-color' => '#f976e8',
            'anchor-hover-color' => '#f976e8',
            'input-bg-color' => '#353535',
            'border-color' => '#455465',
            'btn-bg-color' => '#141414',
            'btn-color' => '#fff',
        ];
    }
    
    /**
     * color preset style 9
     * 
     * @since 1.0.0
     * @return array
     */
    public static function color_preset_9() {

        return [
            'background-color' => '#181818',
            'color' => '#fff',
            'anchor-color' => '#00d577',
            'anchor-hover-color' => '#00d577',
            'input-bg-color' => '#353535',
            'border-color' => '#455465',
            'btn-bg-color' => '#141414',
            'btn-color' => '#fff',
        ];
    }
    
    /**
     * color preset style 10
     * 
     * @since 1.0.0
     * @return array
     */
    public static function color_preset_10() {

        return [
            'background-color' => '#18191a',
            'color' => '#fff',
            'anchor-color' => '#2e89ff',
            'anchor-hover-color' => '#2e89ff',
            'input-bg-color' => '#353535',
            'border-color' => '#455465',
            'btn-bg-color' => '#141414',
            'btn-color' => '#fff',
        ];
    }
    /**
     * color preset style 11
     * 
     * @since 1.0.0
     * @return array
     */
    public static function color_preset_11() {

        return [
            'background-color' => '#000000',
            'color' => '#fff',
            'anchor-color' => '#1da1f2',
            'anchor-hover-color' => '#1da1f2',
            'input-bg-color' => '#353535',
            'border-color' => '#455465',
            'btn-bg-color' => '#141414',
            'btn-color' => '#fff',
        ];
    }
    
    /**
     * color preset style 12
     * 
     * @since 1.0.0
     * @return array
     */
    public static function color_preset_12() {

        return [
            'background-color' => '#15202b',
            'color' => '#fff',
            'anchor-color' => '#1da1f2',
            'anchor-hover-color' => '#1da1f2',
            'input-bg-color' => '#353535',
            'border-color' => '#455465',
            'btn-bg-color' => '#141414',
            'btn-color' => '#fff',
        ];
    }

}
