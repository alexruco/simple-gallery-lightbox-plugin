<?php
/*
Plugin Name: Simple Gallery Lightbox
Description: Just set your native WP gallery to link="none" and activate this plugin, and a lightbox will be shown on image click.
Version: 1.1
Author: Alex Ruco
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Prevent direct access
}

// Enqueue scripts and styles
function sgl_enqueue_scripts() {
    wp_enqueue_script( 'sgl-lightbox-js', plugin_dir_url( __FILE__ ) . 'lightbox.js', array( 'jquery' ), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'sgl_enqueue_scripts' );

// Filter gallery shortcode output
function sgl_filter_gallery_shortcode($output, $atts) {
    if ( isset($atts['link']) && $atts['link'] === 'none' ) {
        return str_replace('link="none"', '', $output); // Remove link="none"
    }
    return $output;
}
add_filter('post_gallery', 'sgl_filter_gallery_shortcode', 10, 2);
