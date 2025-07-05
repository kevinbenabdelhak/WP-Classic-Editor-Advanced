<?php


/*
 Plugin Name: WP Classic Editor Advanced
 Plugin URI: https://kevin-benabdelhak.fr/plugins/wp-classic-editor-advanced/
 Description: WP Classic Editor Advanced est un plugin WordPress qui enrichit l'éditeur classique en ajoutant des boutons personnalisés pour insérer facilement des balises HTML sémantiques. Améliorez votre expérience d'édition avec des fonctionnalités avancées pour une meilleure gestion du contenu.
 Version: 1.0
 Author: Kevin BENABDELHAK
 Author URI: https://kevin-benabdelhak.fr
 Contributors: kevinbenabdelhak
*/



if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}





if ( !class_exists( 'YahnisElsts\\PluginUpdateChecker\\v5\\PucFactory' ) ) {
    require_once __DIR__ . '/plugin-update-checker/plugin-update-checker.php';
}
use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

$monUpdateChecker = PucFactory::buildUpdateChecker(
    'https://github.com/kevinbenabdelhak/WP-Classic-Editor-Advanced/', 
    __FILE__,
    'wp-classic-editor-advanced' 
);

$monUpdateChecker->setBranch('main');













include_once(plugin_dir_path(__FILE__) . 'options.php');


// Ajout des boutons au TinyMCE
function weca_bouton_tinymce_personnalise($buttons) {
    $enabled_buttons = get_option('weca_enabled_buttons', array());

    if (!empty($enabled_buttons['def'])) array_push($buttons, 'bouton_def');
    if (!empty($enabled_buttons['time'])) array_push($buttons, 'bouton_time');
    if (!empty($enabled_buttons['summary'])) array_push($buttons, 'bouton_summary');
    if (!empty($enabled_buttons['address'])) array_push($buttons, 'bouton_address');
    if (!empty($enabled_buttons['del'])) array_push($buttons, 'bouton_del'); 
    if (!empty($enabled_buttons['ins'])) array_push($buttons, 'bouton_ins'); 
    if (!empty($enabled_buttons['cite'])) array_push($buttons, 'bouton_cite');

    return $buttons;
}

// Ajout des plugins externes au TinyMCE
function weca_ajouter_plugin_tinymce_personnalise($plugin_array) {
    $plugin_array['bouton_def'] = plugin_dir_url(__FILE__) . 'js/bouton-def.js';
    $plugin_array['bouton_time'] = plugin_dir_url(__FILE__) . 'js/bouton-time.js';
    $plugin_array['bouton_summary'] = plugin_dir_url(__FILE__) . 'js/bouton-details.js';
    $plugin_array['bouton_address'] = plugin_dir_url(__FILE__) . 'js/bouton-address.js'; 
    $plugin_array['bouton_ins'] = plugin_dir_url(__FILE__) . 'js/bouton-ins.js'; 
    $plugin_array['bouton_del'] = plugin_dir_url(__FILE__) . 'js/bouton-del.js'; 
    $plugin_array['bouton_cite'] = plugin_dir_url(__FILE__) . 'js/bouton-cite.js'; 
    return $plugin_array;
}

// Vérifie si l'utilisateur peut éditer les posts ou les pages et configure l'éditeur TinyMCE
function weca_configuration_tinymce() {
    if (current_user_can('edit_posts') && current_user_can('edit_pages')) {
        add_filter('mce_external_plugins', 'weca_ajouter_plugin_tinymce_personnalise');
        add_filter('mce_buttons', 'weca_bouton_tinymce_personnalise');
    }
}
add_action('admin_init', 'weca_configuration_tinymce');