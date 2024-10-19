(function() {
    tinymce.create('tinymce.plugins.bouton_def', {
        init : function(ed, url) {
            ed.addCommand('command_bouton_def', function() {
                const selectedText = ed.selection.getContent();

                // Récupérer la balise parente de la sélection
                const parentNode = ed.selection.getNode();

                // Vérifie si le nœud parent est une balise <dfn>
                if (parentNode.nodeName.toLowerCase() === 'dfn') {
                    // Si c'est une balise <dfn>, retirer la balise et insérer le contenu
                    const innerText = parentNode.innerHTML; // Contenu à l'intérieur de la balise <dfn>
                    ed.execCommand('mceInsertContent', false, innerText);
                } else {
                    // Si du texte est sélectionné, l'entourer de balises <dfn>
                    if (selectedText) {
                        ed.execCommand('mceInsertContent', false, '<dfn>' + selectedText + '</dfn>');
                    } else {
                        // Si aucun texte n'est sélectionné, insérer une balise <dfn> vide
                        ed.execCommand('mceInsertContent', false, '<dfn></dfn>');
                    }
                }
            });

            ed.addButton('bouton_def', {
                title: 'Définition',
                text: '<dfn>', // Texte qui s'affiche sur le bouton
                icon: false, // Vous pouvez spécifier une icône ici si vous souhaitez
                onclick: function() {
                    ed.execCommand('command_bouton_def');
                }
            });
        }
    });
    
    // Enregistre le plugin
    tinymce.PluginManager.add('bouton_def', tinymce.plugins.bouton_def);
})();