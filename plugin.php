<?php
/**
 * Plugin Name: Carousel Block
 * Plugin URI: https://wpblock.party/
 * Description: Carousel Block for Gutenberg
 * Author: 11online, ericdebelak
 * Author URI: https://11online.us/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
