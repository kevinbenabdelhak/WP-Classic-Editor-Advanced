(function() {
    tinymce.create('tinymce.plugins.bouton_cite', {
        init: function(ed) {
            ed.addCommand('command_bouton_cite', function() {
                const selectedText = ed.selection.getContent();
                const parentNode = ed.selection.getNode();

                // Vérifie si le nœud parent est une balise <cite>
                if (parentNode.nodeName.toLowerCase() === 'cite') {
                    const innerText = parentNode.innerHTML; // Récupère le contenu à l'intérieur de la balise
                    ed.dom.remove(parentNode, true); // Supprime la balise <cite> en préservant son contenu
                } else {
                    // Encapsule le texte sélectionné dans une balise <cite>
                    if (selectedText) {
                        const citeContent = `<cite>${selectedText}</cite>`;
                        ed.execCommand('mceInsertContent', false, citeContent);
                    } else {
                        // Si aucun texte n'est sélectionné, insérer un exemple
                        const exampleContent = `<cite>Titre de l'œuvre</cite>`;
                        ed.execCommand('mceInsertContent', false, exampleContent);
                    }
                }
            });

            ed.addButton('bouton_cite', {
                title: 'Titre d\'une œuvre',
                text: '✏️', // Icône ou texte affiché sur le bouton
                icon: false,
                onclick: function() {
                    ed.execCommand('command_bouton_cite');
                }
            });
        }
    });

    // Enregistre le plugin
    tinymce.PluginManager.add('bouton_cite', tinymce.plugins.bouton_cite);
})();