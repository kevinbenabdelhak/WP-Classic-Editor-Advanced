(function() {
    tinymce.create('tinymce.plugins.bouton_del', {
        init: function(ed) {
            ed.addCommand('command_bouton_del', function() {
                const selectedText = ed.selection.getContent();
                const parentNode = ed.selection.getNode();

                // Vérifie si le nœud parent est une balise <del>
                if (parentNode.nodeName.toLowerCase() === 'del') {
                    const innerText = parentNode.innerHTML; // Récupère le contenu à l'intérieur de la balise
                    ed.dom.remove(parentNode, true); // Supprime la balise <del> en préservant son contenu
                } else {
                    // Encapsule le texte sélectionné dans une balise <del>
                    if (selectedText) {
                        const delContent = `<del>${selectedText}</del>`;
                        ed.execCommand('mceInsertContent', false, delContent);
                    }
                }
            });

            ed.addButton('bouton_del', {
                title: 'Ancienne info',
                text: '❌', // Icône ou texte affiché sur le bouton
                icon: false,
                onclick: function() {
                    ed.execCommand('command_bouton_del');
                }
            });
        }
    });

    // Enregistre le plugin
    tinymce.PluginManager.add('bouton_del', tinymce.plugins.bouton_del);
})();