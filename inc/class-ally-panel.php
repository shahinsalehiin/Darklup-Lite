<?php
/**
 * Ally Panel Class — Lite / Free edition.
 *
 * Renders a floating trigger button and slide-in Accessibility Panel
 * with 11 module cards:
 *   - 6 unlocked (functional in the free plugin)
 *   - 5 locked  (visible but display a lock badge; click opens upgrade URL)
 *
 * Activated from admin by setting switch_style = 'ally' inside
 * darkluplite_settings. When activated, it replaces the regular
 * floating dark-mode switcher so the two do not clash on the page.
 *
 * @package DarklupLite
 * @since   3.2.17
 */

namespace DarklupLite;

if ( ! defined( 'ABSPATH' ) ) {
	die( DARKLUPLITE_ALERT_MSG );
}

/**
 * Class Ally_Panel
 */
class Ally_Panel {

	/**
	 * Singleton instance.
	 *
	 * @var Ally_Panel|null
	 */
	private static $instance = null;

	/**
	 * Upgrade URL used on locked module cards.
	 *
	 * @var string
	 */
	const UPGRADE_URL = 'https://darklup.com/pricing/';

	/**
	 * Locked (Pro-only) modules in the free plugin.
	 *
	 * @var string[]
	 */
	private static $locked_modules = array(
		'monochrome',
		'fontWeight',
		'alignText',
		'readingMask',
		'hideImages',
	);

	// =========================================================================
	// SINGLETON
	// =========================================================================

	/**
	 * Get or create the singleton instance.
	 *
	 * @return Ally_Panel
	 */
	public static function getInstance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor — registers WordPress hooks.
	 */
	private function __construct() {
		add_action( 'wp_footer',          array( $this, 'renderPanel' ),    99 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueueScripts' ), 99999 );
		add_action( 'init',               array( $this, 'writeDefaults' )      );
	}

	// =========================================================================
	// GATE CHECK
	// =========================================================================

	/**
	 * True when admin has selected the "ally" switch style.
	 *
	 * @return bool
	 */
	private function isAllySelected() {
		$style = Helper::getOptionData( 'switch_style' );
		return 'ally' === $style;
	}

	// =========================================================================
	// SETTINGS READ
	// =========================================================================

	/**
	 * Read a single ally setting from the darkluplite_settings option.
	 *
	 * @param string $key     Ally setting key (without the ally_ prefix).
	 * @param mixed  $default Default when setting is empty/missing.
	 * @return mixed
	 */
	private function getAllySetting( $key, $default = '' ) {
		$root_key = 'ally_' . $key;
		$options  = get_option( 'darkluplite_settings', array() );

		if ( is_array( $options ) && array_key_exists( $root_key, $options ) ) {
			$value = $options[ $root_key ];

			// Module toggles: always return as-is ('no' means hidden).
			if ( strpos( $key, 'module_' ) === 0 ) {
				return $value;
			}

			if ( '' !== $value ) {
				return $value;
			}
		}

		return $default;
	}

	/**
	 * Validated trigger size (S/M/L/XL).
	 *
	 * @return string
	 */
	private function getSizeSafely() {
		$valid_sizes = array( 'S', 'M', 'L', 'XL' );
		$size = $this->getAllySetting( 'trigger_size', 'M' );

		if ( ! in_array( $size, $valid_sizes, true ) ) {
			$size = 'M';
		}
		return $size;
	}

	// =========================================================================
	// DEFAULTS — write once
	// =========================================================================

	/**
	 * Seed default ally settings for new installs and existing sites that
	 * do not have any ally_* keys yet. Never overwrites existing values.
	 *
	 * @return void
	 */
	public function writeDefaults() {
		$options = get_option( 'darkluplite_settings', array() );
		if ( ! is_array( $options ) ) {
			$options = array();
		}

		if ( array_key_exists( 'ally_switch_bg_color', $options ) ) {
			return; // Already seeded.
		}

		$defaults = array(
			'ally_trigger_size'           => 'M',
			'ally_switch_bg_color'        => '#2563eb',
			'ally_switch_icon_color'      => '#ffffff',
			'ally_switch_position'        => 'bottom_right',
			'ally_contrast_dark'          => 'yes',
			'ally_contrast_light'         => 'yes',
			'ally_contrast_high'          => 'yes',
			'ally_module_dark_mode'       => 'yes',
			'ally_module_contrast'        => 'yes',
			'ally_module_bigger_text'     => 'yes',
			'ally_module_readable_font'   => 'yes',
			'ally_module_highlight_links' => 'yes',
			'ally_module_stop_animations' => 'yes',
			// Locked modules — visible with lock overlay.
			'ally_module_monochrome'      => 'yes',
			'ally_module_font_weight'     => 'yes',
			'ally_module_align_text'      => 'yes',
			'ally_module_reading_mask'    => 'yes',
			'ally_module_hide_images'     => 'yes',
			'ally_panel_title'            => 'Accessibility',
			'ally_panel_subtitle'         => 'Powered by Darklup',
			'ally_reset_text'             => 'Reset Settings',
			'ally_hide_branding'          => 'off',
		);

		foreach ( $defaults as $k => $v ) {
			if ( ! array_key_exists( $k, $options ) ) {
				$options[ $k ] = $v;
			}
		}

		update_option( 'darkluplite_settings', $options );
	}

	// =========================================================================
	// ASSET LOADING — conditional
	// =========================================================================

	/**
	 * Enqueue ally panel CSS + JS, but only when switch_style = 'ally'.
	 *
	 * @return void
	 */
	public function enqueueScripts() {
		if ( ! $this->isAllySelected() ) {
			return;
		}

		// Cache-bust on file edit.
		$css_path = DARKLUPLITE_DIR_PATH . 'assets/css/darklup-ally.css';
		$js_path  = DARKLUPLITE_DIR_PATH . 'assets/js/darklup-ally.js';
		$css_ver  = DARKLUPLITE_VERSION . '.' . ( file_exists( $css_path ) ? filemtime( $css_path ) : '0' );
		$js_ver   = DARKLUPLITE_VERSION . '.' . ( file_exists( $js_path ) ? filemtime( $js_path ) : '0' );

		wp_enqueue_style(
			'darkluplite-ally',
			DARKLUPLITE_DIR_URL . 'assets/css/darklup-ally.css',
			array(),
			$css_ver
		);

		wp_enqueue_script(
			'darkluplite-ally',
			DARKLUPLITE_DIR_URL . 'assets/js/darklup-ally.js',
			array(),
			$js_ver,
			true
		);

		// JS settings. The ally JS reads the global `darklupAllySettings`.
		wp_localize_script(
			'darkluplite-ally',
			'darklupAllySettings',
			array(
				'iconPath'      => esc_url( DARKLUPLITE_DIR_URL . 'assets/img/' ),
				'accentColor'   => $this->getAllySetting( 'switch_bg_color',   '#2563eb' ),
				'iconColor'     => $this->getAllySetting( 'switch_icon_color', '#ffffff' ),
				'position'      => $this->getAllySetting( 'switch_position',   'bottom_right' ),
				'panelTitle'    => $this->getAllySetting( 'panel_title',        'Accessibility' ),
				'panelSubtitle' => $this->getAllySetting( 'panel_subtitle',     'Powered by Darklup' ),
				'resetText'     => $this->getAllySetting( 'reset_text',         'Reset Settings' ),
				'hideBranding'  => $this->getAllySetting( 'hide_branding',      'off' ),
				'contrastDark'  => $this->getAllySetting( 'contrast_dark',      'yes' ),
				'contrastLight' => $this->getAllySetting( 'contrast_light',     'yes' ),
				'contrastHigh'  => $this->getAllySetting( 'contrast_high',      'yes' ),
				'modules'       => array(
					'darkMode'       => $this->getAllySetting( 'module_dark_mode',       'yes' ),
					'contrast'       => $this->getAllySetting( 'module_contrast',        'yes' ),
					'biggerText'     => $this->getAllySetting( 'module_bigger_text',     'yes' ),
					'readableFont'   => $this->getAllySetting( 'module_readable_font',   'yes' ),
					'highlightLinks' => $this->getAllySetting( 'module_highlight_links', 'yes' ),
					'stopAnimations' => $this->getAllySetting( 'module_stop_animations', 'yes' ),
					'monochrome'     => $this->getAllySetting( 'module_monochrome',      'yes' ),
					'fontWeight'     => $this->getAllySetting( 'module_font_weight',     'yes' ),
					'alignText'      => $this->getAllySetting( 'module_align_text',      'yes' ),
					'readingMask'    => $this->getAllySetting( 'module_reading_mask',    'yes' ),
					'hideImages'     => $this->getAllySetting( 'module_hide_images',     'yes' ),
				),
				'isPro'         => false,
				'upgradeUrl'    => self::UPGRADE_URL,
			)
		);
	}

	// =========================================================================
	// FRONTEND RENDER
	// =========================================================================

	/**
	 * Render the accessibility panel + trigger in wp_footer.
	 *
	 * @return void
	 */
	public function renderPanel() {
		if ( ! $this->isAllySelected() ) {
			return;
		}
		if ( ! $this->shouldDisplay() ) {
			return;
		}

		$accent_color = sanitize_hex_color( $this->getAllySetting( 'switch_bg_color',   '#2563eb' ) );
		$icon_color   = sanitize_hex_color( $this->getAllySetting( 'switch_icon_color', '#ffffff' ) );
		$position     = sanitize_text_field( $this->getAllySetting( 'switch_position',   'bottom_right' ) );
		$panel_title  = sanitize_text_field( $this->getAllySetting( 'panel_title',       'Accessibility' ) );
		$panel_sub    = sanitize_text_field( $this->getAllySetting( 'panel_subtitle',    'Powered by Darklup' ) );
		$reset_text   = sanitize_text_field( $this->getAllySetting( 'reset_text',        'Reset Settings' ) );
		$hide_brand   = $this->getAllySetting( 'hide_branding', 'off' );

		$css_vars = '--ally-accent:' . esc_attr( $accent_color ) . ';'
				  . '--ally-icon-color:' . esc_attr( $icon_color ) . ';';

		$this->renderTrigger( $position, $css_vars );
		?>
		<div id="darklup-ally-backdrop"
			class="darklup-ally-backdrop darkluplite-dark-ignore"
			aria-hidden="true"></div>

		<div id="darklup-ally-panel"
			class="darklup-ally-panel darkluplite-dark-ignore <?php echo esc_attr( $position ); ?>"
			style="<?php echo esc_attr( $css_vars ); ?>"
			role="dialog"
			aria-modal="true"
			aria-label="<?php esc_attr_e( 'Accessibility Settings', 'darklup-lite' ); ?>"
			aria-labelledby="darklup-ally-title"
			inert>

			<div class="darklup-ally-header darkluplite-dark-ignore">
				<div class="darklup-ally-header-text">
					<span id="darklup-ally-title" class="darklup-ally-title">
						<?php echo esc_html( $panel_title ); ?>
					</span>
					<span class="darklup-ally-subtitle">
						<?php echo esc_html( $panel_sub ); ?>
					</span>
				</div>
				<button id="darklup-ally-close"
					class="darklup-ally-close darkluplite-dark-ignore"
					aria-label="<?php esc_attr_e( 'Close accessibility panel', 'darklup-lite' ); ?>">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
						viewBox="0 0 24 24" fill="none" stroke="currentColor"
						stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						aria-hidden="true">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
			</div>

			<div class="darklup-ally-body darkluplite-dark-ignore">
				<div class="darklup-ally-grid" role="list">
					<?php $this->renderCards(); ?>
				</div>
			</div>

			<div class="darklup-ally-footer darkluplite-dark-ignore">
				<button id="darklup-ally-reset"
					class="darklup-ally-reset darkluplite-dark-ignore"
					aria-label="<?php esc_attr_e( 'Reset all accessibility settings', 'darklup-lite' ); ?>">
					<?php echo esc_html( $reset_text ); ?>
				</button>

				<?php if ( 'on' !== $hide_brand ) : ?>
				<p class="darklup-ally-branding darkluplite-dark-ignore">
					<?php
					printf(
						/* translators: %s: Darklup website link */
						esc_html__( 'Powered by %s', 'darklup-lite' ),
						'<a href="https://darklup.com" target="_blank" rel="noopener noreferrer">Darklup</a>'
					);
					?>
				</p>
				<?php endif; ?>
			</div>
		</div>

		<div class="darklup-ally-mask-top darkluplite-dark-ignore" aria-hidden="true"></div>
		<div class="darklup-ally-mask-bottom darkluplite-dark-ignore" aria-hidden="true"></div>
		<?php
	}

	/**
	 * Render the floating trigger button.
	 *
	 * @param string $position Position class (e.g. bottom_right).
	 * @param string $css_vars Inline custom properties string.
	 * @return void
	 */
	private function renderTrigger( $position, $css_vars ) {
		$size       = $this->getSizeSafely();
		$size_class = 'ally-size-' . strtolower( $size );
		?>
		<button id="darklup-ally-trigger"
			class="darklup-ally-trigger darkluplite-dark-ignore <?php echo esc_attr( $position ); ?> <?php echo esc_attr( $size_class ); ?>"
			style="<?php echo esc_attr( $css_vars ); ?>"
			role="button"
			aria-expanded="false"
			aria-controls="darklup-ally-panel"
			aria-label="<?php esc_attr_e( 'Open accessibility panel', 'darklup-lite' ); ?>">
			<?php
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- sanitized inside getIcon().
			echo $this->getIcon( 'ally-trigger' );
			?>
			<span class="darklup-ally-tick" aria-hidden="true"></span>
		</button>
		<?php
	}

	/**
	 * Render the 11 module cards (6 unlocked, 5 locked).
	 *
	 * @return void
	 */
	private function renderCards() {
		$modules = array(
			'darkMode'       => array( 'icon' => 'module-dark-mode',       'label' => __( 'Dark Mode',        'darklup-lite' ), 'key' => 'module_dark_mode' ),
			'contrast'       => array( 'icon' => 'module-contrast',        'label' => __( 'Contrast',         'darklup-lite' ), 'key' => 'module_contrast' ),
			'biggerText'     => array( 'icon' => 'module-bigger-text',     'label' => __( 'Bigger Text',      'darklup-lite' ), 'key' => 'module_bigger_text' ),
			'readableFont'   => array( 'icon' => 'module-readable-font',   'label' => __( 'Readable Font',    'darklup-lite' ), 'key' => 'module_readable_font' ),
			'highlightLinks' => array( 'icon' => 'module-highlight-links', 'label' => __( 'Highlight Links',  'darklup-lite' ), 'key' => 'module_highlight_links' ),
			'stopAnimations' => array( 'icon' => 'module-stop-animations', 'label' => __( 'Stop Animations',  'darklup-lite' ), 'key' => 'module_stop_animations' ),
			'monochrome'     => array( 'icon' => 'module-monochrome',      'label' => __( 'Monochrome',       'darklup-lite' ), 'key' => 'module_monochrome' ),
			'fontWeight'     => array( 'icon' => 'module-font-weight',     'label' => __( 'Font Weight',      'darklup-lite' ), 'key' => 'module_font_weight' ),
			'alignText'      => array( 'icon' => 'module-align-text',      'label' => __( 'Align Text',       'darklup-lite' ), 'key' => 'module_align_text' ),
			'readingMask'    => array( 'icon' => 'module-reading-mask',    'label' => __( 'Reading Mask',     'darklup-lite' ), 'key' => 'module_reading_mask' ),
			'hideImages'     => array( 'icon' => 'module-hide-images',     'label' => __( 'Hide Images',      'darklup-lite' ), 'key' => 'module_hide_images' ),
		);

		$options = get_option( 'darkluplite_settings', array() );

		foreach ( $modules as $js_key => $module ) {
			$root_key = 'ally_' . $module['key'];
			// Admin-hidden module (explicit 'no').
			if ( is_array( $options ) && array_key_exists( $root_key, $options ) && 'no' === $options[ $root_key ] ) {
				continue;
			}

			$is_locked  = in_array( $js_key, self::$locked_modules, true );
			$aria_label = $is_locked
				? sprintf( /* translators: %s: module name */ __( '%s, Pro feature. Opens upgrade page.', 'darklup-lite' ), $module['label'] )
				: sprintf( /* translators: %s: module name */ __( '%s, inactive', 'darklup-lite' ), $module['label'] );

			$classes = 'darklup-ally-card darkluplite-dark-ignore';
			if ( $is_locked ) {
				$classes .= ' darklup-ally-card--locked';
			}
			?>
			<button class="<?php echo esc_attr( $classes ); ?>"
				data-module="<?php echo esc_attr( $js_key ); ?>"
				<?php if ( $is_locked ) : ?>
				data-locked="1"
				data-upgrade-url="<?php echo esc_url( self::UPGRADE_URL ); ?>"
				<?php endif; ?>
				role="listitem"
				aria-pressed="false"
				aria-label="<?php echo esc_attr( $aria_label ); ?>">
				<?php
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- sanitized inside getIcon().
				echo $this->getIcon( $module['icon'] );
				?>
				<span class="darklup-ally-card-label"><?php echo esc_html( $module['label'] ); ?></span>
			</button>
			<?php
		}
	}

	// =========================================================================
	// ICON HELPER
	// =========================================================================

	/**
	 * Read and return sanitized SVG content from the plugin img folder.
	 *
	 * @param string $name Icon basename without extension.
	 * @return string Sanitized SVG markup, or empty string if missing.
	 */
	private function getIcon( $name ) {
		$icon_path = DARKLUPLITE_DIR_PATH . 'assets/img/' . sanitize_file_name( $name ) . '.svg';

		if ( ! file_exists( $icon_path ) ) {
			return '';
		}

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$svg = file_get_contents( $icon_path );
		if ( false === $svg ) {
			return '';
		}

		return wp_kses( $svg, $this->getAllowedSvgTags() );
	}

	/**
	 * SVG allowlist for wp_kses.
	 *
	 * @return array
	 */
	private function getAllowedSvgTags() {
		return array(
			'svg'      => array(
				'xmlns' => true, 'width' => true, 'height' => true, 'viewbox' => true,
				'fill' => true, 'stroke' => true, 'stroke-width' => true,
				'stroke-linecap' => true, 'stroke-linejoin' => true,
				'aria-hidden' => true, 'role' => true, 'class' => true,
			),
			'path'     => array( 'd' => true, 'fill' => true, 'stroke' => true, 'style' => true, 'opacity' => true ),
			'circle'   => array( 'cx' => true, 'cy' => true, 'r' => true, 'fill' => true, 'stroke' => true, 'style' => true, 'opacity' => true ),
			'line'     => array( 'x1' => true, 'y1' => true, 'x2' => true, 'y2' => true, 'stroke' => true, 'style' => true ),
			'polyline' => array( 'points' => true, 'fill' => true, 'stroke' => true ),
			'polygon'  => array( 'points' => true, 'fill' => true, 'stroke' => true ),
			'rect'     => array( 'x' => true, 'y' => true, 'width' => true, 'height' => true, 'rx' => true, 'ry' => true, 'fill' => true, 'stroke' => true ),
			'g'        => array( 'id' => true, 'fill' => true, 'stroke' => true, 'transform' => true ),
		);
	}

	// =========================================================================
	// DEVICE VISIBILITY
	// =========================================================================

	/**
	 * True when the ally panel should render on the current request.
	 * Respects switch_in_desktop / switch_in_mobile admin flags and
	 * skips known page-builder editors.
	 *
	 * @return bool
	 */
	private function shouldDisplay() {
		if ( 'yes' !== Helper::getOptionData( 'frontend_darkmode' ) ) {
			return false;
		}

		$is_mobile         = wp_is_mobile();
		$switch_in_desktop = Helper::getOptionData( 'switch_in_desktop' );
		$switch_in_mobile  = Helper::getOptionData( 'switch_in_mobile' );

		if ( ! $is_mobile && 'yes' !== $switch_in_desktop ) {
			return false;
		}
		if ( $is_mobile && 'yes' !== $switch_in_mobile ) {
			return false;
		}

		// phpcs:disable WordPress.Security.NonceVerification.Recommended
		if ( isset( $_GET['elementor-preview'] ) ) { return false; }
		if ( isset( $_GET['et_fb'] ) && '1' === sanitize_text_field( wp_unslash( $_GET['et_fb'] ) ) ) { return false; }
		if ( isset( $_GET['action'] ) && 'elementor' === sanitize_text_field( wp_unslash( $_GET['action'] ) ) ) { return false; }
		if ( isset( $_GET['fl_builder'] ) ) { return false; }
		if ( isset( $_GET['bricks'] ) && 'run' === sanitize_text_field( wp_unslash( $_GET['bricks'] ) ) ) { return false; }
		// phpcs:enable WordPress.Security.NonceVerification.Recommended

		return true;
	}
}

\DarklupLite\Ally_Panel::getInstance();
