<?php 

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}


// Ajouter la page d'options au menu d'administration
function weca_add_admin_menu() {
    add_options_page('WP Classic Editor Advanced', 'WP Classic Editor Advanced', 'manage_options', 'wp_editor_options', 'weca_options_page');
}
add_action('admin_menu', 'weca_add_admin_menu');

// Créez la page d'options
function weca_options_page() {
    // Vérifie si l'utilisateur a les droits d'accès
    if (!current_user_can('manage_options')) {
        return;
    }

    // Enregistre les options
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        update_option('weca_enabled_buttons', $_POST['weca_enabled_buttons']);
    }

    // Récupère les options existantes
    $enabled_buttons = get_option('weca_enabled_buttons', array(
        'def' => true,
        'time' => true,
        'summary' => true,
        'address' => true,
        'del' => true,
        'ins' => true,
        'cite' => true,
    ));
    ?>

    <div class="wrap">
        <h1>WP Classic Editor Advanced</h1>
        <form method="post" action="">
            <h2>Sélectionnez les boutons à activer</h2>
            <label><input type="checkbox" name="weca_enabled_buttons[def]" value="1" <?php checked($enabled_buttons['def']); ?>> Bouton Définitions</label><br>
            <label><input type="checkbox" name="weca_enabled_buttons[time]" value="1" <?php checked($enabled_buttons['time']); ?>> Bouton Date</label><br>
            <label><input type="checkbox" name="weca_enabled_buttons[summary]" value="1" <?php checked($enabled_buttons['summary']); ?>> Bouton Résumé</label><br>
            <label><input type="checkbox" name="weca_enabled_buttons[address]" value="1" <?php checked($enabled_buttons['address']); ?>> Bouton Adresse</label><br>
            <label><input type="checkbox" name="weca_enabled_buttons[del]" value="1" <?php checked($enabled_buttons['del']); ?>> Bouton Supprimer</label><br>
            <label><input type="checkbox" name="weca_enabled_buttons[ins]" value="1" <?php checked($enabled_buttons['ins']); ?>> Bouton Ajouter</label><br>
            <label><input type="checkbox" name="weca_enabled_buttons[cite]" value="1" <?php checked($enabled_buttons['cite']); ?>> Bouton Citation</label><br><br>
            <input type="submit" value="Sauvegarder les changements" class="button-primary">
        </form>
    </div>

    <?php
}