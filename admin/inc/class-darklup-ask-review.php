<?php
namespace DarklupLite;

/**
 * Ask user to review Darklup after they've been using it for a while.
 *
 * @package Darklup
 */

// If this file is called directly, exit.
if (!defined('WPINC')) {
    die;
}

/**
 * Class Darklup_Ask_Review
 */
if (!class_exists('DarklupLite\Darklup_Ask_Review')) {
    class Darklup_Ask_Review {

		const NOTICE_ID = 'darklup_review_plugin_notice';
	
		/**
		 * Current time (Unix timestamp).
		 *
		 * @var int
		 */
		public $current_time = 0;
	
		/**
		 * Plugin install date (Unix timestamp).
		 *
		 * @var int
		 */
		public $install_date = 0;
	
		/**
		 * Constructor.
		 */
		public function __construct() {
			$this->current_time = $this->get_current_time();
			$this->install_date = (int) get_option( 'darklup_review_install_date', 0 );
			if ( 0 === $this->install_date ) {
				$this->install_date = $this->current_time;
				update_option( 'darklup_review_install_date', $this->current_time, false );
			}
		}
	
		/**
		 * Register hooks. Call this once after instantiating.
		 */
		public function hooks() {
			add_action( 'admin_init', [ $this, 'register_hooks' ] );
		}
	
		/**
		 * Register admin and AJAX hooks.
		 */
		public function register_hooks() {
	
			if ( get_option( 'darklup_already_reviewed' ) ) {
				return;
			}
	
			add_action( 'admin_notices', [ $this, 'maybe_show_notice' ] );
			add_action( 'admin_footer', [ $this, 'review_notice_js' ], 15 );
			add_action( 'wp_ajax_darklup_already_reviewed', [ $this, 'ajax_already_reviewed' ] );
			add_action( 'wp_ajax_darklup_review_maybe_later', [ $this, 'ajax_maybe_later' ] );
		}
	
		/**
		 * Get current time as Unix timestamp (WP timezone).
		 *
		 * @return int
		 */
		protected function get_current_time() {
			return (int) strtotime( current_time( 'mysql' ) );
		}
	
		/**
		 * Whether the review notice should be shown.
		 *
		 * @return bool
		 */
		protected function should_show_notice() {
			if ( ! current_user_can( 'manage_options' ) ) {
				return false;
			}
			$review_notice_date = $this->get_review_notice_date();
			return $this->current_time > $review_notice_date;
		}
	
		/**
		 * Get the timestamp after which the notice may be shown.
		 *
		 * @return int
		 */
		public function get_review_notice_date() {
			$review_notice_date = get_option( 'darklup_review_notice_date' );
			if ( false !== $review_notice_date ) {
				return (int) $review_notice_date;
			}
	
			$delay_days = 30; // remind later after 30 days;
			if ( ! get_option( 'darklup_review_notice_delayed' ) ) {
				$delay_days = 10; // show notice after 10 days of this class is instantiated
			}
	
			$review_notice_date = $this->current_time + ( $delay_days * DAY_IN_SECONDS );
			update_option( 'darklup_review_notice_date', $review_notice_date, false );
	
			return $review_notice_date;
		}
	
		/**
		 * Show the review notice if conditions are met.
		 */
		public function maybe_show_notice() {
			if ( ! $this->should_show_notice() ) {
				return;
			}
	
			$this->render_notice();
		}
	
		/**
		 * Render the admin notice HTML.
		 */
		protected function render_notice() {
			$review_url = $this->get_review_url();
			$plugin_name = __( 'Darklup', 'darklup-lite' );
			?>
			<div id="<?php echo esc_attr( self::NOTICE_ID ); ?>" class="notice notice-info is-dismissible darklup-review-notice">
				<div class="darklup-review-notice-inner">
					<div class="darklup-review-notice-icon">
						<img src="<?php echo esc_url( DARKLUPLITE_DIR_ADMIN_ASSETS_URL.'img/darklup-icon.svg' ); ?>" alt="<?php esc_attr_e( 'Darklup Icon', 'darklup-lite' ); ?>">
					</div>
					<div class="darklup-review-notice-content">
						<p>
							<?php
							printf(
								/* translators: %s: plugin name */
								esc_html__( "Thanks for using %s.", 'darklup-lite' ),
								'<strong>' . esc_html( $plugin_name ) . '</strong>'
							);
							?>
						</p>
						<p>
							<?php esc_html_e( 'If you are finding it useful, please consider leaving a quick review. It really helps us improve and continue supporting the plugin.', 'darklup-lite' ); ?>
						</p>
						<div class="darklup-review-notice-actions">
							<a href="<?php echo esc_url( $review_url ); ?>" class="darklup-dismiss-review darklup-review-action darklup-review-out" target="_blank" rel="noopener noreferrer">
								<strong><?php esc_html_e( 'Leave a review', 'darklup-lite' ); ?></strong>
							</a>
							<a href="#" class="darklup-dismiss-review darklup-maybe-later-action"><?php esc_html_e( 'Remind me later', 'darklup-lite' ); ?></a>
							<a href="#" class="darklup-dismiss-review darklup-already-reviewed-action"><?php esc_html_e( 'I already reviewed', 'darklup-lite' ); ?></a>
						</div>
					</div>
				</div>
			</div>
			<?php
		}
	
		/**
		 * Get the review URL (WordPress.org or custom).
		 *
		 * @return string
		 */
		protected function get_review_url() {
			$url = 'https://wordpress.org/support/plugin/darklup-lite-wp-dark-mode/reviews/?filter=5#new-post';
			return (string) apply_filters( 'darklup_review_url', $url );
		}
	
		/**
		 * Inline JS for the review notice (dismiss, AJAX).
		 */
		public function review_notice_js() {
			if ( ! $this->should_show_notice() ) {
				return;
			}
			$ajax_url = esc_url( admin_url( 'admin-ajax.php' ) );
			$nonce    = wp_create_nonce( 'darklup_review_nonce' );
			?>
			<script>
				(function( $ ) {
					$( function() {
						var notice = $( '#<?php echo esc_js( self::NOTICE_ID ); ?>' );
						if ( ! notice.length ) return;
	
						$( '.darklup-dismiss-review' ).on( 'click', function( e ) {
							var $this = $( this );
							if ( ! $this.hasClass( 'darklup-review-action' ) ) {
								e.preventDefault();
							}
							if ( $this.hasClass( 'darklup-maybe-later-action' ) ) {
								$.post( '<?php echo $ajax_url; ?>', {
									action: 'darklup_review_maybe_later',
									security: '<?php echo esc_js( $nonce ); ?>'
								} );
								notice.fadeOut( function() { $( this ).remove(); } );
								return false;
							}
							$.post( '<?php echo $ajax_url; ?>', {
								action: 'darklup_already_reviewed',
								security: '<?php echo esc_js( $nonce ); ?>'
							} );
							notice.fadeOut( function() { $( this ).remove(); } );
						} );
	
						notice.on( 'click', '.notice-dismiss', function() {
							$.post( '<?php echo $ajax_url; ?>', {
								action: 'darklup_review_maybe_later',
								security: '<?php echo esc_js( $nonce ); ?>'
							} );
						} );
					} );
				})( jQuery );
			</script>
			<style>
				#<?php echo esc_attr( self::NOTICE_ID ); ?>.darklup-review-notice {
					border-left-width: 8px;
					border-left-color: #FD723B;
					padding: 30px;
				}
				.darklup-review-notice-inner {
					display: flex;
					gap: 20px;
				}
				.darklup-review-notice-icon {
					background: #fd723b;
					padding: 10px;
					border-radius: 50%;
					height: 40px;
					width: 40px;
				}
				.darklup-review-notice-icon img {
					width: inherit;
					height: inherit;
				}
				.darklup-review-notice-inner a {
					color: #de5819;
				}
				.darklup-review-notice-inner p {
					font-size: 18px;
					margin-top: 0;
				}
				.darklup-review-notice-actions {
					display: flex;
					gap: 20px;
				}
				.darklup-review-notice-actions a {
					font-size: 18px;
					text-decoration: none;
					color: #444444;
					border-bottom: 2px solid #666666;
				}
				.darklup-review-notice-actions a:hover {
					color: #DE5819;
					border-bottom-color: #DE5819;
				}
				.darklup-review-notice .notice-dismiss:before {
					border: 2px solid #666666;
					padding: 4px;
					border-radius: 100%;
					content: "\f335" !important;
				}
			</style>
			<?php
		}
	
		/**
		 * AJAX: set "already reviewed" and optionally "maybe later".
		 */
		public function ajax_already_reviewed() {
			check_ajax_referer( 'darklup_review_nonce', 'security' );
			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error( [ 'message' => __( 'Unauthorized', 'darklup-lite' ) ] );
			}
			update_option( 'darklup_already_reviewed', $this->get_current_time(), false );
			wp_send_json_success( 'success' );
		}
	
		/**
		 * AJAX: maybe later (dismiss and delay next show).
		 */
		public function ajax_maybe_later() {
			check_ajax_referer( 'darklup_review_nonce', 'security' );
			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error( [ 'message' => __( 'Unauthorized', 'darklup-lite' ) ] );
			}
			delete_option( 'darklup_review_notice_date' );
			update_option( 'darklup_review_notice_delayed', true, false );
			wp_send_json_success( 'success' );
		}
	}
}
