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
class Style_Settings_Tab extends Settings_Fields_Base
{

    public function get_option_name()
    {
        return 'darkluplite_settings'; // set option name it will be same or different name
    }

    public function tab_setting_fields()
    {

        $this->start_fields_section([
            'title' => esc_html__('SWITCH STYLES', 'darklup-lite'),
            'class' => 'darkluplite-style-settings darkluplite-d-hide darkluplite-settings-content',
            'icon' => esc_url(DARKLUPLITE_DIR_URL . 'assets/img/style.svg'),
            'dark_icon' => esc_url(DARKLUPLITE_DIR_URL . 'assets/img/style-white.svg'),
            'id' => 'darkluplite_style_settings'
        ]);



        $switch_cases = [
            'desktop_switch' => 'Floating Switch (Desktop)',
            'mobile_switch' => 'Floating Switch (Mobile)',
            'menu_switch' => 'Menu Switch',
            'advance_style' => 'Advance Settings',
        ];
        
        $this->button_radio_field([
            'class' => 'settings-color-preset',
            'name' => 'switch_cases',
            'options' => $switch_cases,
            'default' => 'desktop_switch',
        ]);



        /******************************** Desktop Settings **********************************************/
        $this->switch_field([
            'title' => esc_html__('Display Floating Switch in Desktop', 'darklup-lite'),
            'sub_title' => esc_html__('Enable the switch to show the dark mode switch button on the Desktop screen.', 'darklup-lite'),
            'name' => 'switch_in_desktop',
            'input_classes' => 'darklup_default_checked',
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
        ]);

        $switch_styles = [
            '1' => DARKLUPLITE_DIR_URL . 'assets/img/switch-15.svg',
            '2' => DARKLUPLITE_DIR_URL . 'assets/img/switch-1.svg',
            '3' => DARKLUPLITE_DIR_URL . 'assets/img/switch-2.svg',
            '4' => DARKLUPLITE_DIR_URL . 'assets/img/switch-8.svg',
            '5' => DARKLUPLITE_DIR_URL . 'assets/img/switch-3.svg',
            '6' => DARKLUPLITE_DIR_URL . 'assets/img/switch-4.svg',
            '7' => DARKLUPLITE_DIR_URL . 'assets/img/switch-5.png',
            '8' => DARKLUPLITE_DIR_URL . 'assets/img/switch-6.svg',
            '9' => DARKLUPLITE_DIR_URL . 'assets/img/switch-7.svg',
            '10' => DARKLUPLITE_DIR_URL . 'assets/img/switch-9.svg',
            '11' => DARKLUPLITE_DIR_URL . 'assets/img/switch-10.svg',
            '12' => DARKLUPLITE_DIR_URL . 'assets/img/switch-11.png',
            '13' => DARKLUPLITE_DIR_URL . 'assets/img/switch-12.png',
            '14' => DARKLUPLITE_DIR_URL . 'assets/img/switch-13.svg',
            '15' => DARKLUPLITE_DIR_URL . 'assets/img/switch-14.svg'
        ];
        $this->image_radio_field([
            'title' => esc_html__('Switch Style', 'darklup-lite'),
            'sub_title' => esc_html__('Select the switcher button style for the frontend.', 'darklup-lite'),
            // 'class' => 'settings-color-preset',
            'class' => 'settings-switch-style desktop-switch-style',
            'name' => 'switch_style',
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'options' => $switch_styles
        ]);

        // ╔══════════════════════════════════════════════════════════════════╗
        // ║ Accessibility Switch Styles — standalone section (matches Pro).   ║
        // ║ Selecting this option reveals the full ally configuration block   ║
        // ║ below (trigger size, colors, position, 11 module toggles, texts). ║
        // ╚══════════════════════════════════════════════════════════════════╝
        ?>
        <div class="darkluplite-row darklup-ally-switch-section" data-condition='{"key":"switch_cases","value":"desktop_switch"}' style="border-top: 0px solid #e5e5e5; margin-top: 0px; padding-top: 0px;">
            <div class="darkluplite-col-lg-6 darkluplite-col-md-12">
                <div class="darkluplite-single-settings-inner radio-image-wrapper">
                    <div class="details">
                        <h5><?php esc_html_e( 'Accessibility Switch Styles', 'darklup-lite' ); ?></h5>
                        <p><?php esc_html_e( 'Select the accessibility panel option.', 'darklup-lite' ); ?></p>
                    </div>
                    <div class="button-switch">
                        <label class="radio-img">
                            <input type="radio" name="darkluplite_settings[switch_style]" value="ally" <?php checked( \DarklupLite\Helper::getOptionData( 'switch_style' ), 'ally' ); ?> />
                            <img src="<?php echo esc_url( DARKLUPLITE_DIR_URL . 'assets/img/ally-switch-thumbnail.svg' ); ?>" alt="<?php esc_attr_e( 'Accessibility Panel', 'darklup-lite' ); ?>" />
                        </label>
                    </div>
                </div>
            </div>
            <div class="darkluplite-col-lg-2 darkluplite-col-md-12"></div>
            <div class="darkluplite-col-lg-4 darkluplite-col-md-12"></div>
        </div>
        <?php

        // ╔══════════════════════════════════════════════════════════════════╗
        // ║ Ally configuration wrapper — visible only when ally is selected.  ║
        // ║ JS fieldCondition watches data-condition and toggles display.     ║
        // ╚══════════════════════════════════════════════════════════════════╝
        ?>
        <div class="darklup-ally-settings-wrapper" style="display:none;">
        <?php

        // --- Unified section: Size + BG color + Icon color + Position -----
        ?>
        <div class="darklup-ally-unified-section" data-condition='{"key":"switch_style","value":"ally"}'>
            <div class="darkluplite-presets-customization-wrap">
                <div class="darkluplite-row darkluplite-section--header">
                    <h3><?php esc_html_e( 'Accessibility Switch Styles', 'darklup-lite' ); ?></h3>
                    <p><?php esc_html_e( 'Configure the appearance and position of the floating accessibility panel trigger button.', 'darklup-lite' ); ?></p>
                </div>

                <?php
                $current_size = \DarklupLite\Helper::getOptionData( 'ally_trigger_size' );
                if ( '' === $current_size ) { $current_size = 'M'; }
                $bg_color = \DarklupLite\Helper::getOptionData( 'ally_switch_bg_color' );
                if ( '' === $bg_color ) { $bg_color = '#2563eb'; }
                $size_map = array(
                    'S'  => array( 'px' => '40', 'label' => 'S' ),
                    'M'  => array( 'px' => '50', 'label' => 'M' ),
                    'L'  => array( 'px' => '60', 'label' => 'L' ),
                    'XL' => array( 'px' => '75', 'label' => 'XL' ),
                );
                ?>
                <div class="darklup-ally-size-unified-section">
                    <div class="darklup-ally-size-header">
                        <div class="darklup-ally-size-title-area">
                            <h4><?php esc_html_e( 'Trigger Size', 'darklup-lite' ); ?></h4>
                            <p><?php esc_html_e( 'Choose the size of the trigger button. Automatically scales on tablets and phones.', 'darklup-lite' ); ?></p>
                        </div>
                    </div>
                    <div class="darklup-ally-size-preview-icons" style="--size-color: <?php echo esc_attr( $bg_color ); ?>;">
                        <?php foreach ( $size_map as $size => $data ) :
                            $is_selected   = ( $current_size === $size );
                            $selected_cls  = $is_selected ? ' selected' : '';
                            ?>
                            <div class="darklup-ally-size-icon-wrapper<?php echo esc_attr( $selected_cls ); ?>" data-size="ally-size-<?php echo esc_attr( strtolower( $size ) ); ?>">
                                <div class="darklup-ally-size-icon-circle"></div>
                                <div class="darklup-ally-size-icon-label">
                                    <span class="size-letter"><?php echo esc_html( $size ); ?></span>
                                    <span class="size-pixels"><?php echo esc_html( $data['px'] . 'px' ); ?></span>
                                </div>
                                <input type="radio" class="darklup-ally-size-radio" name="darkluplite_settings[ally_trigger_size]" value="<?php echo esc_attr( $size ); ?>" <?php checked( $current_size, $size ); ?> />
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <?php
                $this->color_field([
                    'title' => esc_html__( 'Background Color', 'darklup-lite' ),
                    'sub_title' => esc_html__( 'Set the background color of the trigger button and panel.', 'darklup-lite' ),
                    'name' => 'ally_switch_bg_color',
                ]);
                $this->color_field([
                    'title' => esc_html__( 'Icon / Text Color', 'darklup-lite' ),
                    'sub_title' => esc_html__( 'Set the color of the trigger icon and panel text.', 'darklup-lite' ),
                    'name' => 'ally_switch_icon_color',
                ]);
                $this->select_box([
                    'title' => esc_html__( 'Position', 'darklup-lite' ),
                    'sub_title' => esc_html__( 'Select the position of the trigger button on the page.', 'darklup-lite' ),
                    'class' => 'settings-switch-position',
                    'name' => 'ally_switch_position',
                    'options' => [
                        'top_right'    => esc_html__( 'Top Right', 'darklup-lite' ),
                        'top_left'     => esc_html__( 'Top Left', 'darklup-lite' ),
                        'bottom_right' => esc_html__( 'Bottom Right', 'darklup-lite' ),
                        'bottom_left'  => esc_html__( 'Bottom Left', 'darklup-lite' ),
                    ],
                ]);
                ?>
            </div>
        </div>

        <?php
        $this->margin_field([
            'title' => esc_html__( 'Switch Margin (px)', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Set the margin around the accessibility trigger button.', 'darklup-lite' ),
            'condition' => ["key" => "switch_style", "value" => "ally"],
            'name' => array( "ally_switch_margin_top", "ally_switch_margin_bottom", "ally_switch_margin_right", "ally_switch_margin_left" ),
            'step' => '1',
            'max' => '500',
            'placeholder' => array( "Top Margin", "Bottom Margin", "Right Margin", "Left Margin" ),
        ]);

        // --- 11 module toggles (6 free + 5 pro-locked) ---------------------
        ?>
        <input type="hidden" name="darkluplite_settings[ally_module_dark_mode]" value="no">
        <?php
        $this->switch_field([
            'title' => esc_html__( 'Dark Mode', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Allow users to toggle dark mode.', 'darklup-lite' ),
            'condition' => ["key" => "switch_style", "value" => "ally"],
            'name' => 'ally_module_dark_mode',
            'input_classes' => 'darklup_default_checked',
        ]);

        // Contrast unified section — master toggle + 3 sub-modes.
        ?>
        <input type="hidden" name="darkluplite_settings[ally_module_contrast]" value="no">
        <div class="darklup-contrast-unified-section" data-condition='{"key":"switch_style","value":"ally"}'>
            <div class="darkluplite-row darkluplite-switcher--field">
                <div class="darkluplite-col-lg-12 darkluplite-col-md-12">
                    <div class="darkluplite-single-settings-inner">
                        <div class="darkluplite-switcher-inner-content">
                            <div class="details">
                                <h5><?php esc_html_e( 'Contrast', 'darklup-lite' ); ?></h5>
                                <p><?php esc_html_e( 'Allow users to toggle contrast modes.', 'darklup-lite' ); ?></p>
                            </div>
                            <div class="switcher-colon">:</div>
                            <div class="on-off-toggle button-switch">
                                <input class="on-off-toggle__input ally-contrast-master" name="darkluplite_settings[ally_module_contrast]" value="yes" type="checkbox"
                                    <?php checked( \DarklupLite\Helper::getOptionData( 'ally_module_contrast' ), 'yes' ); ?>
                                    id="darkluplite_ally_module_contrast" />
                                <label for="darkluplite_ally_module_contrast" class="on-off-toggle__slider"></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="darklup-contrast-modes-section">
                <div class="darklup-contrast-modes-container" style="display: <?php echo ( 'yes' === \DarklupLite\Helper::getOptionData( 'ally_module_contrast' ) ) ? 'grid' : 'none'; ?>;">
                    <?php
                    $contrast_items = array(
                        'ally_contrast_dark'  => esc_html__( 'Dark Contrast',  'darklup-lite' ),
                        'ally_contrast_light' => esc_html__( 'Light Contrast', 'darklup-lite' ),
                        'ally_contrast_high'  => esc_html__( 'High Contrast',  'darklup-lite' ),
                    );
                    foreach ( $contrast_items as $c_key => $c_label ) :
                        $c_val = \DarklupLite\Helper::getOptionData( $c_key );
                        $c_checked = ( 'no' !== $c_val && ( '' === $c_val || 'yes' === $c_val || 'on' === $c_val ) );
                        ?>
                        <div class="darklup-contrast-mode-item">
                            <label class="darklup-contrast-mode-label">
                                <input type="hidden" name="darkluplite_settings[<?php echo esc_attr( $c_key ); ?>]" value="no">
                                <input type="checkbox" class="darklup-contrast-mode-checkbox" name="darkluplite_settings[<?php echo esc_attr( $c_key ); ?>]" value="yes" <?php echo $c_checked ? 'checked' : ''; ?> />
                                <div class="darklup-contrast-mode-content">
                                    <span class="darklup-contrast-mode-text"><?php echo esc_html( $c_label ); ?></span>
                                </div>
                            </label>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <?php

        $free_module_toggles = array(
            'ally_module_bigger_text'     => array( 'Bigger Text',     'Allow users to increase text size.' ),
            'ally_module_readable_font'   => array( 'Readable Font',   'Allow users to switch to a readable font.' ),
            'ally_module_highlight_links' => array( 'Highlight Links', 'Allow users to highlight all links on the page.' ),
            'ally_module_stop_animations' => array( 'Stop Animations', 'Allow users to disable all animations.' ),
        );
        foreach ( $free_module_toggles as $name => $meta ) :
            ?>
            <input type="hidden" name="darkluplite_settings[<?php echo esc_attr( $name ); ?>]" value="no">
            <?php
            $this->switch_field([
                'title' => esc_html__( $meta[0], 'darklup-lite' ),
                'sub_title' => esc_html__( $meta[1], 'darklup-lite' ),
                'condition' => ["key" => "switch_style", "value" => "ally"],
                'name' => $name,
                'input_classes' => 'darklup_default_checked',
            ]);
        endforeach;

        $pro_module_toggles = array(
            'ally_module_monochrome'   => array( 'Monochrome',    'Allow users to enable grayscale mode.' ),
            'ally_module_font_weight'  => array( 'Font Weight',   'Allow users to increase font weight.' ),
            'ally_module_align_text'   => array( 'Align Text',    'Allow users to change text alignment.' ),
            'ally_module_reading_mask' => array( 'Reading Mask',  'Allow users to use the reading mask feature.' ),
            'ally_module_hide_images'  => array( 'Hide Images',   'Allow users to hide all images on the page.' ),
        );
        foreach ( $pro_module_toggles as $name => $meta ) :
            ?>
            <input type="hidden" name="darkluplite_settings[<?php echo esc_attr( $name ); ?>]" value="no">
            <?php
            $this->switch_field([
                'title' => esc_html__( $meta[0], 'darklup-lite' ),
                'sub_title' => esc_html__( $meta[1], 'darklup-lite' ),
                'condition' => ["key" => "switch_style", "value" => "ally"],
                'name' => $name,
                'input_classes' => 'darklup_default_checked',
                'is_pro' => 'yes',
                'wrapper_class' => 'pro-feature',
            ]);
        endforeach;

        $this->text_field([
            'title' => esc_html__( 'Panel Title', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Set the title text displayed at the top of the accessibility panel.', 'darklup-lite' ),
            'condition' => ["key" => "switch_style", "value" => "ally"],
            'name' => 'ally_panel_title',
            'placeholder' => esc_html__( 'e.g. Accessibility', 'darklup-lite' ),
        ]);
        $this->text_field([
            'title' => esc_html__( 'Panel Subtitle', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Set the subtitle text below the title.', 'darklup-lite' ),
            'condition' => ["key" => "switch_style", "value" => "ally"],
            'name' => 'ally_panel_subtitle',
            'placeholder' => esc_html__( 'e.g. Powered by Darklup', 'darklup-lite' ),
        ]);
        $this->text_field([
            'title' => esc_html__( 'Reset Button Text', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Set the text for the reset button at the bottom of the panel.', 'darklup-lite' ),
            'condition' => ["key" => "switch_style", "value" => "ally"],
            'name' => 'ally_reset_text',
            'placeholder' => esc_html__( 'e.g. Reset Settings', 'darklup-lite' ),
        ]);
        $this->switch_field([
            'title' => esc_html__( 'Hide "Powered by Darklup"', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Hide the Darklup branding link in the accessibility panel.', 'darklup-lite' ),
            'condition' => ["key" => "switch_style", "value" => "ally"],
            'name' => 'ally_hide_branding',
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature',
        ]);
        ?>
        </div>
        <?php



        $this->select_box([
            'title' => esc_html__('Switch Position', 'darklup-lite'),
            'sub_title' => esc_html__('Select the position of the floating dark mode switcher button on the frontend.', 'darklup-lite'),
            'class' => 'settings-switch-position',
            'name' => 'desktop_switch_position',
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'options' => [
                'top_right' => esc_html__('Top Right', 'darklup-lite'),
                'top_left' => esc_html__('Top Left', 'darklup-lite'),
                'bottom_right' => esc_html__('Bottom Right ', 'darklup-lite'),
                'bottom_left' => esc_html__('Bottom Left', 'darklup-lite'),
            ]
        ]);
        
        $this->select_box([
            'title' => esc_html__('Switch Margin Unit', 'darklup-lite'),
            'sub_title' => esc_html__('Select the unit (pixel or percentage) to set Customized Switch Margin.', 'darklup-lite'),
            'class' => 'settings-switch-position',
            'name' => 'switch_margin_unit',
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'options' => [
                'pixel' => esc_html__('Pixel (px)', 'darklup-lite'),
                'percent' => esc_html__('Percent (%)', 'darklup-lite')
            ]
        ]);
        $this->margin_field([
            'title' => esc_html__('Switch Margin', 'darklup-lite'),
            'sub_title' => esc_html__('Set floating switch margin in given unit.', 'darklup-lite'),
            'name' => array("switch_top_margin", "switch_bottom_margin", "switch_right_margin", "switch_left_margin"),
            'step' => '1',
            'max' => '5000',
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'placeholder' => array("Top Margin", "Bottom Margin", "Right Margin", "Left Margin")
        ]);


        $this->number_field([
            'title' => esc_html__('Floating Switch Width (px)', 'darklup'),
            'sub_title' => esc_html__('Set the custom floating switch width.', 'darklup'),
            'class' => 'settings-switch-position',
            'name' => 'switch_size_base_width',
            'step' => '1',
            'max' => '500',
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'placeholder' => esc_html__('Width (Default 100)', 'darklup')
        ]);
        $this->number_field([
            'title' => esc_html__('Floating Switch Height (px)', 'darklup'),
            'sub_title' => esc_html__('Set the custom floating switch height.', 'darklup'),
            'class' => 'settings-switch-position',
            'name' => 'switch_size_base_height',
            'step' => '1',
            'max' => '500',
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'placeholder' => esc_html__('Height (Default 40)', 'darklup')
        ]);
        

        $this->number_field([
            'title' => esc_html__('Switch Icon Width (px)', 'darklup'),
            'sub_title' => esc_html__('Set the custom floating switch Icon Width.', 'darklup'),
            'class' => 'settings-switch-position',
            'name' => 'floating_switch_icon_width',
            'step' => '1',
            'max' => '50',
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'placeholder' => esc_html__('e.g 14', 'darklup')
        ]);
        $this->number_field([
            'title' => esc_html__('Switch Icon Height (px)', 'darklup'),
            'sub_title' => esc_html__('Set the custom floating switch Icon Width.', 'darklup'),
            'class' => 'settings-switch-position',
            'name' => 'floating_switch_icon_height',
            'step' => '1',
            'max' => '50',
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'placeholder' => esc_html__('e.g 14', 'darklup')
        ]);


        $this->number_field([
            'title' => esc_html__('Switch Border radious (px)', 'darklup'),
            'sub_title' => esc_html__('Set the custom floating switch width.', 'darklup'),
            'class' => 'settings-switch-position',
            'name' => 'floating_switch_border_radius',
            'step' => '1',
            'max' => '50',
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature',
            'placeholder' => esc_html__('e.g 14', 'darklup')
        ]);

        $this->color_field([
            'title' => esc_html__( 'Switch Background Color', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Set the switch background color', 'darklup-lite' ),
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature',
            'name' => 'custom_switch_bg_color'
          ]);
        $this->color_field([
            'title' => esc_html__( 'Switch Icon Color', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Set the switch icon color', 'darklup-lite' ),
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature',
            'name' => 'custom_switch_icon_color'
          ]);
          $this->color_field([
            'title' => esc_html__( 'Switch Border Color', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Set the switch border color', 'darklup-lite' ),
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature',
            'name' => 'custom_switch_border_color'
          ]);

          
          // Styles on Dark Mode
          $this->color_field([
            'title' => esc_html__( 'Switch Background Color on Dark Mode', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Set the base background color on dark mode', 'darklup-lite' ),
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature',
            'name' => 'custom_switch_bg_color_on_dark'
          ]);
          $this->color_field([
            'title' => esc_html__( 'Switch Icon Color on Dark Mode', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Set the icon plate color on dark mode', 'darklup-lite' ),
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature',
            'name' => 'custom_switch_icon_color_on_dark'
          ]);

          $this->color_field([
            'title' => esc_html__( 'Switch Border Color on Dark Mode', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Set the switch border color on dark mode', 'darklup-lite' ),
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature',
            'name' => 'custom_switch_border_color_on_dark'
          ]);

          $this->color_field([
            'title' => esc_html__( 'Switch Text Color', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Set the switch text color', 'darklup-lite' ),
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature',
            'name' => 'custom_switch_text_color'
          ]);

          
          $this->color_field([
            'title' => esc_html__( 'Switch Text Color on Dark Mode', 'darklup-lite' ),
            'sub_title' => esc_html__( 'Set the switch text color on dark mode', 'darklup-lite' ),
            'condition' => ["key" => "switch_cases", "value" => "desktop_switch"],
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature',
            'name' => 'custom_switch_text_color_on_dark'
          ]);


            /******************************** Mobile Settings **********************************************/

            $this->switch_field([
                'title' => esc_html__('Display Switch on Mobile', 'darklup-lite'),
                'sub_title' => esc_html__('Turn on to show switch on mobile', 'darklup-lite'),
                'name' => 'switch_in_mobile',
                'input_classes' => 'darklup_default_checked',
                'condition' => ["key" => "switch_cases", "value" => "mobile_switch"],
            ]);
            $this->image_radio_field([
                'title' => esc_html__('Switch Style', 'darklup-lite'),
                'sub_title' => esc_html__('Select the switcher button style for the frontend.', 'darklup-lite'),
                // 'class' => 'settings-color-preset',
                'class' => 'settings-switch-style mobile-switch-style',
                'name' => 'switch_style_mobile',
                'condition' => ["key" => "switch_cases", "value" => "mobile_switch"],
                'options' => $switch_styles
            ]);
            // $this->select_box([
            //     'title' => esc_html__('Switch Position', 'darklup-lite'),
            //     'sub_title' => esc_html__('Select the position of the floating dark mode switcher button on the frontend.', 'darklup-lite'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'switch_position_mobile',
            //     'condition' => ["key" => "switch_cases", "value" => "mobile_switch"],
            //     'options' => [
            //         'top_right' => esc_html__('Top Right', 'darklup-lite'),
            //         'top_left' => esc_html__('Top Left', 'darklup-lite'),
            //         'bottom_right' => esc_html__('Bottom Right ', 'darklup-lite'),
            //         'bottom_left' => esc_html__('Bottom Left', 'darklup-lite'),
            //     ]
            // ]);
            // $this->select_box([
            //     'title' => esc_html__('Switch Margin Unit', 'darklup-lite'),
            //     'sub_title' => esc_html__('Select the unit (pixel or percentage) to set Customized Switch Margin.', 'darklup-lite'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'switch_margin_unit_mobile',
            //     'condition' => ["key" => "switch_cases", "value" => "mobile_switch"],
            //     'options' => [
            //         'pixel' => esc_html__('Pixel (px)', 'darklup-lite'),
            //         'percent' => esc_html__('Percent (%)', 'darklup-lite')
            //     ]
            // ]);
            // $this->margin_field([
            //     'title' => esc_html__('Switch Margin', 'darklup-lite'),
            //     'sub_title' => esc_html__('Set floating switch margin in given unit.', 'darklup-lite'),
            //     'name' => array("switch_top_margin_mobile", "switch_bottom_margin_mobile", "switch_right_margin_mobile", "switch_left_margin_mobile"),
            //     'step' => '1',
            //     'max' => '5000',
            //     'condition' => ["key" => "switch_cases", "value" => "mobile_switch"],
            //     'placeholder' => array("Top Margin", "Bottom Margin", "Right Margin", "Left Margin")
            // ]);
            // $this->number_field([
            //     'title' => esc_html__('Floating Switch Width (px)', 'darklup'),
            //     'sub_title' => esc_html__('Set the custom floating switch width.', 'darklup'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'switch_size_base_width_mobile',
            //     'step' => '1',
            //     'max' => '500',
            //     'condition' => ["key" => "switch_cases", "value" => "mobile_switch"],
            //     'placeholder' => esc_html__('Width (Default 100)', 'darklup')
            // ]);
            // $this->number_field([
            //     'title' => esc_html__('Floating Switch Height (px)', 'darklup'),
            //     'sub_title' => esc_html__('Set the custom floating switch height.', 'darklup'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'switch_size_base_height_mobile',
            //     'step' => '1',
            //     'max' => '500',
            //     'condition' => ["key" => "switch_cases", "value" => "mobile_switch"],
            //     'placeholder' => esc_html__('Height (Default 40)', 'darklup')
            // ]);
            
            // $this->number_field([
            //     'title' => esc_html__('Switch Border radious (px)', 'darklup'),
            //     'sub_title' => esc_html__('Set the custom floating switch width.', 'darklup'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'floating_switch_border_radius_mobile',
            //     'step' => '1',
            //     'max' => '50',
            //     'condition' => ["key" => "switch_cases", "value" => "mobile_switch"],
            //     'placeholder' => esc_html__('e.g 14', 'darklup')
            // ]);
            // $this->number_field([
            //     'title' => esc_html__('Switch Icon Width (px)', 'darklup'),
            //     'sub_title' => esc_html__('Set the custom floating switch Icon Width.', 'darklup'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'floating_switch_icon_width_mobile',
            //     'step' => '1',
            //     'max' => '50',
            //     'condition' => ["key" => "switch_cases", "value" => "mobile_switch"],
            //     'placeholder' => esc_html__('e.g 14', 'darklup')
            // ]);
            // $this->number_field([
            //     'title' => esc_html__('Switch Icon Height (px)', 'darklup'),
            //     'sub_title' => esc_html__('Set the custom floating switch Icon Width.', 'darklup'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'floating_switch_icon_height_mobile',
            //     'step' => '1',
            //     'max' => '50',
            //     'condition' => ["key" => "switch_cases", "value" => "mobile_switch"],
            //     'placeholder' => esc_html__('e.g 14', 'darklup')
            // ]);



            /******************************** Menu Settings **********************************************/


            $this->switch_field([
                'title' => esc_html__('Display Switch on Menu', 'darklup-lite'),
                'sub_title' => esc_html__('Turn on to show switch on mobile', 'darklup-lite'),
                'name' => 'switch_in_menu',
                'input_classes' => 'darklup_default_checked',
                'condition' => ["key" => "switch_cases", "value" => "menu_switch"],
            ]);
            $this->image_radio_field([
                'title' => esc_html__('Switch Style', 'darklup-lite'),
                'sub_title' => esc_html__('Select the switcher button style for the frontend.', 'darklup-lite'),
                // 'class' => 'settings-color-preset',
                'class' => 'settings-switch-style menu-switch-style',
                'name' => 'switch_style_menu',
                'condition' => ["key" => "switch_cases", "value" => "menu_switch"],
                'options' => $switch_styles
            ]);

            $this->Multiple_select_box([
                'title'     => esc_html__( 'Select Menu', 'darklup' ),
                'sub_title' => esc_html__( 'Set the menu location', 'darklup' ),
                'name'      => 'menu_location',
                'condition' => ["key" => "switch_cases", "value" => "menu_switch"],
                // 'condition' => ["key" => "switch_in_menu", "value" => "yes"],
                // 'condition' => [["key" => "switch_in_menu", "value" => "yes"], ["key" => "switch_cases", "value" => "menu_switch"]],
                'options'   => \Darkluplite\Helper::getMenuLocations()
              ]);

              $this->margin_field([
                'title' => esc_html__('Switch Menu Margin (px)', 'darklup'),
                'sub_title' => esc_html__('Set switch menu margin in px.', 'darklup'),
                'condition' => ["key" => "switch_cases", "value" => "menu_switch"],
                'name' => array("switch_menu_top_margin", "switch_menu_bottom_margin", "switch_menu_right_margin", "switch_menu_left_margin"),
                'step' => '1',
                'max' => '200',
                'is_pro' => 'yes',
                'wrapper_class' => 'pro-feature',    
                'placeholder' => array("Top Margin", "Bottom Margin", "Right Margin", "Left Margin")
            ]);

            // $this->select_box([
            //     'title' => esc_html__('Switch Position', 'darklup-lite'),
            //     'sub_title' => esc_html__('Select the position of the floating dark mode switcher button on the frontend.', 'darklup-lite'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'switch_position_menu',
            //     'condition' => ["key" => "switch_cases", "value" => "menu_switch"],
            //     'options' => [
            //         'top_right' => esc_html__('Top Right', 'darklup-lite'),
            //         'top_left' => esc_html__('Top Left', 'darklup-lite'),
            //         'bottom_right' => esc_html__('Bottom Right ', 'darklup-lite'),
            //         'bottom_left' => esc_html__('Bottom Left', 'darklup-lite'),
            //     ]
            // ]);
            // $this->select_box([
            //     'title' => esc_html__('Switch Margin Unit', 'darklup-lite'),
            //     'sub_title' => esc_html__('Select the unit (pixel or percentage) to set Customized Switch Margin.', 'darklup-lite'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'switch_margin_unit_menu',
            //     'condition' => ["key" => "switch_cases", "value" => "menu_switch"],
            //     'options' => [
            //         'pixel' => esc_html__('Pixel (px)', 'darklup-lite'),
            //         'percent' => esc_html__('Percent (%)', 'darklup-lite')
            //     ]
            // ]);
            // $this->margin_field([
            //     'title' => esc_html__('Switch Margin', 'darklup-lite'),
            //     'sub_title' => esc_html__('Set floating switch margin in given unit.', 'darklup-lite'),
            //     'name' => array("switch_top_margin_menu", "switch_bottom_margin_menu", "switch_right_margin_menu", "switch_left_margin_menu"),
            //     'step' => '1',
            //     'max' => '5000',
            //     'condition' => ["key" => "switch_cases", "value" => "menu_switch"],
            //     'placeholder' => array("Top Margin", "Bottom Margin", "Right Margin", "Left Margin")
            // ]);
            // $this->number_field([
            //     'title' => esc_html__('Floating Switch Width (px)', 'darklup'),
            //     'sub_title' => esc_html__('Set the custom floating switch width.', 'darklup'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'switch_size_base_width_menu',
            //     'step' => '1',
            //     'max' => '500',
            //     'condition' => ["key" => "switch_cases", "value" => "menu_switch"],
            //     'placeholder' => esc_html__('Width (Default 100)', 'darklup')
            // ]);
            // $this->number_field([
            //     'title' => esc_html__('Floating Switch Height (px)', 'darklup'),
            //     'sub_title' => esc_html__('Set the custom floating switch height.', 'darklup'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'switch_size_base_height_menu',
            //     'step' => '1',
            //     'max' => '500',
            //     'condition' => ["key" => "switch_cases", "value" => "menu_switch"],
            //     'placeholder' => esc_html__('Height (Default 40)', 'darklup')
            // ]);
            
            // $this->number_field([
            //     'title' => esc_html__('Switch Border radious (px)', 'darklup'),
            //     'sub_title' => esc_html__('Set the custom floating switch width.', 'darklup'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'floating_switch_border_radius_menu',
            //     'step' => '1',
            //     'max' => '50',
            //     'condition' => ["key" => "switch_cases", "value" => "menu_switch"],
            //     'placeholder' => esc_html__('e.g 14', 'darklup')
            // ]);
            // $this->number_field([
            //     'title' => esc_html__('Switch Icon Width (px)', 'darklup'),
            //     'sub_title' => esc_html__('Set the custom floating switch Icon Width.', 'darklup'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'floating_switch_icon_width_menu',
            //     'step' => '1',
            //     'max' => '50',
            //     'condition' => ["key" => "switch_cases", "value" => "menu_switch"],
            //     'placeholder' => esc_html__('e.g 14', 'darklup')
            // ]);
            // $this->number_field([
            //     'title' => esc_html__('Switch Icon Height (px)', 'darklup'),
            //     'sub_title' => esc_html__('Set the custom floating switch Icon Width.', 'darklup'),
            //     'class' => 'settings-switch-position',
            //     'name' => 'floating_switch_icon_height_menu',
            //     'step' => '1',
            //     'max' => '50',
            //     'condition' => ["key" => "switch_cases", "value" => "menu_switch"],
            //     'placeholder' => esc_html__('e.g 14', 'darklup')
            // ]);











        $this->switch_field([
            'title' => esc_html__('Show tooltip?', 'darklup-lite'),
            'sub_title' => esc_html__('Choose to display tooltip on switch hover.', 'darklup-lite'),
            'name' => 'darkluplite_show_tooltip',
            'condition' => ["key" => "switch_cases", "value" => "advance_style"],
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature'
        ]);

        $this->select_box([
            'title' => esc_html__('Switch Animation', 'darklup-lite'),
            'sub_title' => esc_html__('Select an animation effect for the switch.', 'darklup-lite'),
            'name' => 'darkluplite_switcher_animate',
            'options' => [
                'none' => esc_html__('None', 'darklup-lite'),
                'animate_vibrate'   => esc_html__('Vibrate', 'darklup-lite'),
                'animate_shake'     => esc_html__('Shake', 'darklup-lite'),
                'animate_heartbeat' => esc_html__('Heartbeat', 'darklup-lite'),
                'animate_rotate'    => esc_html__('Rotate', 'darklup-lite'),
                'animate_spring'    => esc_html__(' Spring', 'darklup-lite'),
            ],
            'condition' => ["key" => "switch_cases", "value" => "advance_style"],
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature'
        ]);
        $this->switch_field([
            'title' => esc_html__('Enable Draggable Floating Switch', 'darklup-lite'),
            'sub_title' => esc_html__('This feature allow users to drag the floating toggle switch to any position on the page.', 'darklup-lite'),
            'name' => 'enable_draggable_floating_switch',
            'condition' => ["key" => "switch_cases", "value" => "advance_style"],
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature'
        ]);        
        // $this->switch_field([
        //     'title' => esc_html__('Show Above Posts', 'darklup-lite'),
        //     'sub_title' => esc_html__('Show the dark mode switcher button above of all the post.', 'darklup-lite'),
        //     'name' => 'show_above_posts',
        //     'condition' => ["key" => "switch_cases", "value" => "advance_style"],
        //     'wrapper_class' => 'pro-feature',
        //     'is_pro' => 'yes'
        // ]);
        // $this->switch_field([
        //     'title' => esc_html__('Show Above Pages', 'darklup-lite'),
        //     'sub_title' => esc_html__('Show the dark mode switcher button above of all the pages.', 'darklup-lite'),
        //     'name' => 'show_above_pages',
        //     'condition' => ["key" => "switch_cases", "value" => "advance_style"],
        //     'wrapper_class' => 'pro-feature',
        //     'is_pro' => 'yes'
        // ]);




        // $this->switch_field([
        //     'title' => esc_html__('Want to Customize Switch Colors?', 'darklup-lite'),
        //     'sub_title' => esc_html__('Customize switch background, icon and text colors', 'darklup-lite'),
        //     'name' => 'label_custom_color_enabled',
        //     'is_pro' => 'yes',
        //     'wrapper_class' => 'pro-feature'
        // ]);
        // $this->switch_field([
        //     'title' => esc_html__('Want to Customize Switch Size?', 'darklup-lite'),
        //     'sub_title' => esc_html__('Customize switch width, height', 'darklup-lite'),
        //     'name' => 'label_custom_size_enabled',
        //     'is_pro' => 'yes',
        //     'wrapper_class' => 'pro-feature'
        // ]);



        // $this->select_box([
        //     'title' => esc_html__('Switch Position', 'darklup-lite'),
        //     'sub_title' => esc_html__('Select the position of the floating dark mode switcher button on the frontend.', 'darklup-lite'),
        //     'class' => 'settings-switch-position',
        //     'wrapper_class' => 'pro-feature',
        //     'is_pro' => 'yes',
        //     'name' => 'switch_position',
        //     'options' => [
        //         '1' => esc_html__('Top Right', 'darklup-lite'),
        //         '2' => esc_html__('Top Left', 'darklup-lite'),
        //         '3' => esc_html__('Bottom Right ', 'darklup-lite'),
        //         '4' => esc_html__('Bottom Left', 'darklup-lite'),
        //     ]
        // ]);

        // $this->margin_field([
        //     'title' => esc_html__('Switch Margin (px)', 'darklup-lite'),
        //     'sub_title' => esc_html__('Set floating switch margin in px.', 'darklup-lite'),
        //     'name' => array("switch_top_margin", "switch_bottom_margin", "switch_right_margin", "switch_left_margin"),
        //     'step' => '1',
        //     'max' => '200',
        //     'placeholder' => array("Top Margin", "Bottom Margin", "Right Margin", "Left Margin")
        // ]);

        // $this->number_field([
        //     'title' => esc_html__('Text Font Size', 'darklup-lite'),
        //     'sub_title' => esc_html__('Set dark mode text font size.', 'darklup-lite'),
        //     'class' => 'settings-switch-position',
        //     'wrapper_class' => 'pro-feature',
        //     'is_pro' => 'yes',
        //     'name' => 'body_font_size',
        //     'step' => '1',
        //     'max' => '50',
        //     'placeholder' => esc_html__('14', 'darklup-lite'),
        // ]);
        // $this->text_field([
        //     'title' => esc_html__('Switch Text (Light)', 'darklup-lite'),
        //     'sub_title' => esc_html__('Switch light text.', 'darklup-lite'),
        //     'class' => 'settings-switch-position',
        //     'name' => 'switch_text_light',
        //     'wrapper_class' => 'pro-feature',
        //     'is_pro' => 'yes',
        //     'placeholder' => esc_html__('e.g Light', 'darklup-lite')
        // ]);
        // $this->text_field([
        //     'title' => esc_html__('Switch Text (Dark)', 'darklup-lite'),
        //     'sub_title' => esc_html__('Switch dark text.', 'darklup-lite'),
        //     'class' => 'settings-switch-position',
        //     'name' => 'switch_text_dark',
        //     'wrapper_class' => 'pro-feature',
        //     'is_pro' => 'yes',
        //     'placeholder' => esc_html__('e.g Dark', 'darklup-lite')
        // ]);



        $this->end_fields_section(); // End fields section

        // Ally settings visibility — show only on desktop_switch tab with ally selected.
        ?>
        <script>
        jQuery(document).ready(function($) {
            function toggleAllySections() {
                var activeTab = $('input[name="darkluplite_settings[switch_cases]"]:checked').val();
                var switchStyle = $('input[name="darkluplite_settings[switch_style]"]:checked').val();
                var isAlly = ( switchStyle === 'ally' );
                var isDesktopTab = ( activeTab === 'desktop_switch' );

                if ( isAlly && isDesktopTab ) {
                    $('.darklup-ally-settings-wrapper').show();
                } else {
                    $('.darklup-ally-settings-wrapper').hide();
                }
            }
            toggleAllySections();
            $('input[name="darkluplite_settings[switch_cases]"]').on('click', toggleAllySections);
            $('input[name="darkluplite_settings[switch_style]"]').on('click', toggleAllySections);

            // Contrast master toggle: show/hide the 3 contrast mode checkboxes.
            $(document).on('change', '.ally-contrast-master', function() {
                var $container = $('.darklup-contrast-modes-container');
                if ( $(this).is(':checked') ) {
                    $container.css({ display: 'grid', opacity: 1 });
                } else {
                    $container.animate({ opacity: 0 }, 200, function() {
                        $container.css('display', 'none');
                    });
                }
            });

            // Trigger-size visual circles: click to select, update hidden radio.
            $(document).on('click', '.darklup-ally-size-icon-wrapper', function() {
                var $this = $(this);
                $this.siblings().removeClass('selected');
                $this.addClass('selected');
                $this.find('.darklup-ally-size-radio').prop('checked', true).trigger('change');
            });
            // When BG color changes, refresh the --size-color CSS custom prop.
            $(document).on('change', 'input[name="darkluplite_settings[ally_switch_bg_color]"]', function() {
                var v = $(this).val();
                if ( v ) { $('.darklup-ally-size-preview-icons').css('--size-color', v); }
            });
        });
        </script>
        <?php

    }


}

new Style_Settings_Tab();