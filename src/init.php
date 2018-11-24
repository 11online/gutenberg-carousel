<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function gutenberg_carousel_cgb_block_assets() {
	// Styles.
	wp_enqueue_style(
		'gutenberg_carousel-block-bootstrap-css',
		plugins_url( '/bootstrap.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		true
	);
	wp_enqueue_script(
		'gutenberg_carousel-bootstrap-js',
		plugins_url( '/bootstrap.min.js', dirname( __FILE__ ) ),
		array( 'jquery' ),
		true,
		true
	);
} // End function gutenberg_carousel_cgb_block_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'gutenberg_carousel_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function gutenberg_carousel_cgb_editor_assets() {
	// Scripts.
	wp_enqueue_style(
		'gutenberg_carousel-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		true
	);
	wp_enqueue_script(
		'gutenberg_carousel-cgb-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		true,
		true
	);
} // End function gutenberg_carousel_cgb_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'gutenberg_carousel_cgb_editor_assets' );
