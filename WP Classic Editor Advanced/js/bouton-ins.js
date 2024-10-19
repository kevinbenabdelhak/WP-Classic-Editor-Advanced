(function() {
    tinymce.create('tinymce.plugins.bouton_ins', {
        init: function(ed) {
            ed.addCommand('command_bouton_ins', function() {
                const selectedText = ed.selection.getContent();
                const parentNode = ed.selection.getNode();

                // Vérifie si le nœud parent est une balise <ins>
                if (parentNode.nodeName.toLowerCase() === 'ins') {
                    const innerText = parentNode.innerHTML; // Récupère le contenu à l'intérieur de la balise
                    ed.dom.remove(parentNode, true); // Supprime la balise <ins> en préservant son contenu
                } else {
                    // Encapsule le texte sélectionné dans une balise <ins>
                    if (selectedText) {
                        const insContent = `<ins>${selectedText}</ins>`;
                        ed.execCommand('mceInsertContent', false, insContent);
                    }
                }
            });

            ed.addButton('bouton_ins', {
                title: 'Info MAJ',
                text: '➕', // Icône ou texte affiché sur le bouton
                icon: false,
                onclick: function() {
                    ed.execCommand('command_bouton_ins');
                }
            });
        }
    });

    // Enregistre le plugin
    tinymce.PluginManager.add('bouton_ins', tinymce.plugins.bouton_ins);
})();