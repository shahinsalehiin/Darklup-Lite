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
            'class' => 'darkluplite-style-settings darkluplite-d-hide',
            'icon' => esc_url(DARKLUPLITE_DIR_URL . 'assets/img/style.svg'),
            'dark_icon' => esc_url(DARKLUPLITE_DIR_URL . 'assets/img/style-white.svg'),
            'id' => 'darkluplite_style_settings'
        ]);

        $this->image_radio_field([
            'title' => esc_html__('Switch Style', 'darklup-lite'),
            'sub_title' => esc_html__('Select the switcher button style for the frontend.', 'darklup-lite'),
            'class' => 'settings-color-preset',
            'name' => 'switch_style',
            'options' => [
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
            ]
        ]);

        
        $this->switch_field([
            'title' => esc_html__('Show tooltip?', 'darklup-lite'),
            'sub_title' => esc_html__('Choose to display tooltip on switch hover.', 'darklup-lite'),
            'name' => 'darkluplite_show_tooltip',
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
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature'
        ]);
        
        $this->switch_field([
            'title' => esc_html__('Want to Customize Switch Colors?', 'darklup-lite'),
            'sub_title' => esc_html__('Customize switch background, icon and text colors', 'darklup-lite'),
            'name' => 'label_custom_color_enabled',
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature'
        ]);
        $this->switch_field([
            'title' => esc_html__('Want to Customize Switch Size?', 'darklup-lite'),
            'sub_title' => esc_html__('Customize switch width, height', 'darklup-lite'),
            'name' => 'label_custom_size_enabled',
            'is_pro' => 'yes',
            'wrapper_class' => 'pro-feature'
        ]);

        $this->select_box([
            'title' => esc_html__('Switch Position', 'darklup-lite'),
            'sub_title' => esc_html__('Select the position of the floating dark mode switcher button on the frontend.', 'darklup-lite'),
            'class' => 'settings-switch-position',
            'wrapper_class' => 'pro-feature',
            'is_pro' => 'yes',
            'name' => 'switch_position',
            'options' => [
                '1' => esc_html__('Top Right', 'darklup-lite'),
                '2' => esc_html__('Top Left', 'darklup-lite'),
                '3' => esc_html__('Bottom Right ', 'darklup-lite'),
                '4' => esc_html__('Bottom Left', 'darklup-lite'),
            ]
        ]);

        $this->margin_field([
            'title' => esc_html__('Switch Margin (px)', 'darklup-lite'),
            'sub_title' => esc_html__('Set floating switch margin in px.', 'darklup-lite'),
            'name' => array("switch_top_margin", "switch_bottom_margin", "switch_right_margin", "switch_left_margin"),
            'step' => '1',
            'max' => '200',
            'placeholder' => array("Top Margin", "Bottom Margin", "Right Margin", "Left Margin")
        ]);

        $this->number_field([
            'title' => esc_html__('Text Font Size', 'darklup-lite'),
            'sub_title' => esc_html__('Set dark mode text font size.', 'darklup-lite'),
            'class' => 'settings-switch-position',
            'wrapper_class' => 'pro-feature',
            'is_pro' => 'yes',
            'name' => 'body_font_size',
            'step' => '1',
            'max' => '50',
            'placeholder' => esc_html__('14', 'darklup-lite'),
        ]);
        $this->text_field([
            'title' => esc_html__('Switch Text (Light)', 'darklup-lite'),
            'sub_title' => esc_html__('Switch light text.', 'darklup-lite'),
            'class' => 'settings-switch-position',
            'name' => 'switch_text_light',
            'wrapper_class' => 'pro-feature',
            'is_pro' => 'yes',
            'placeholder' => esc_html__('e.g Light', 'darklup-lite')
        ]);
        $this->text_field([
            'title' => esc_html__('Switch Text (Dark)', 'darklup-lite'),
            'sub_title' => esc_html__('Switch dark text.', 'darklup-lite'),
            'class' => 'settings-switch-position',
            'name' => 'switch_text_dark',
            'wrapper_class' => 'pro-feature',
            'is_pro' => 'yes',
            'placeholder' => esc_html__('e.g Dark', 'darklup-lite')
        ]);

        $this->switch_field([
            'title' => esc_html__('Show Above Posts', 'darklup-lite'),
            'sub_title' => esc_html__('Show the dark mode switcher button above of all the post.', 'darklup-lite'),
            'name' => 'show_above_posts',
            'wrapper_class' => 'pro-feature',
            'is_pro' => 'yes'
        ]);
        $this->switch_field([
            'title' => esc_html__('Show Above Pages', 'darklup-lite'),
            'sub_title' => esc_html__('Show the dark mode switcher button above of all the pages.', 'darklup-lite'),
            'name' => 'show_above_pages',
            'wrapper_class' => 'pro-feature',
            'is_pro' => 'yes'
        ]);

        $this->end_fields_section(); // End fields section

    }


}

new Style_Settings_Tab();