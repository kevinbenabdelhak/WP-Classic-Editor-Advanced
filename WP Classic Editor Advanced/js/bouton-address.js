(function() {
    tinymce.create('tinymce.plugins.bouton_address', {
        init: function(ed) {
            ed.addCommand('command_bouton_address', function() {
                const parentNode = ed.selection.getNode();

                // Vérifie si le nœud parent est une balise <address>
                if (parentNode.nodeName.toLowerCase() === 'address') {
                    const innerText = parentNode.innerHTML; // Récupère le contenu à l'intérieur de la balise
                    ed.dom.remove(parentNode, true); // Supprime la balise <address> en préservant son contenu
                } else {
                    // Récupère le texte sélectionné
                    const selectedText = ed.selection.getContent();

                    if (selectedText) {
                        // Encapsule le texte sélectionné dans une balise <address>
                        const addressContent = `<address>${selectedText}</address>`;
                        ed.execCommand('mceInsertContent', false, addressContent);
                    } else {
                        // Si aucun texte n'est sélectionné, insérer un exemple de balise <address>
                        const exampleContent = `
                            <address>
                                <strong>Mon Entreprise</strong><br>
                                1234 Rue Exemple<br>
                                Ville, État, 12345
                            </address>
                        `;
                        ed.execCommand('mceInsertContent', false, exampleContent);
                    }
                }
            });

            // Gestionnaire pour gérer la touche "Entrée" et "Espace"
            ed.on('keydown', function(e) {
                const parentNode = ed.selection.getNode();

                // Vérifie si le nœud parent est une balise <address>
                if ((e.keyCode === 13 || e.keyCode === 32) && parentNode.nodeName.toLowerCase() === 'address') {
                    const currentPos = ed.selection.getRng().endOffset;
                    const withinAddress = currentPos === parentNode.textContent.length;

                    // Si au fin de contenu dans la balise <address>
                    if (withinAddress) {
                        e.preventDefault(); // Empêche le comportement par défaut (entrée ou espace à la fin de la balise <address>)
                        ed.execCommand('mceInsertContent', false, '</address><p></p>');  // Fermeture de la balise <address> et création d'un nouveau paragraphe
                    }
                }
            });

            ed.addButton('bouton_address', {
                title: 'Adresse',
                text: '📍', // Icône ou texte affiché sur le bouton
                icon: false, 
                onclick: function() {
                    ed.execCommand('command_bouton_address');
                }
            });
        }
    });

    // Enregistre le plugin
    tinymce.PluginManager.add('bouton_address', tinymce.plugins.bouton_address);
})();