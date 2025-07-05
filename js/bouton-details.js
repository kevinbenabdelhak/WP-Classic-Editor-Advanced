(function() {
	    tinymce.create('tinymce.plugins.bouton_summary', {
        init: function(ed, url) {
            ed.addCommand('command_bouton_summary', function() {
                const selectedText = ed.selection.getContent();

                // Récupérer la balise parente de la sélection
                const parentNode = ed.selection.getNode();

                // Vérifie si le nœud parent est une balise <details>
                if (parentNode.nodeName.toLowerCase() === 'details') {
                    // Si c'est une balise <details>, retirer la balise et insérer le contenu
                    const innerText = parentNode.innerHTML; // Contenu à l'intérieur de la balise <details>
                    ed.execCommand('mceInsertContent', false, innerText);
                } else {
                    // Insérer une balise <details> contenant <summary>
                    // Si aucun texte n'est sélectionné pour <summary>, utiliser "Cliquez pour afficher"
                    const summaryText = selectedText || "Cliquez pour afficher";
                    const exampleContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum."; // Contenu d'exemple
                    const detailsContent = `<details><summary>${summaryText}</summary>${exampleContent}</details>`;
                    
                    ed.execCommand('mceInsertContent', false, detailsContent);
                }
            });

            ed.addButton('bouton_summary', {
                title: 'Détails',
                text: '📄', // Texte ou icône qui s'affiche sur le bouton
                icon: false, // Vous pouvez spécifier une icône ici si vous le souhaitez
                onclick: function() {
                    ed.execCommand('command_bouton_summary');
                }
            });
        }
    });

    // Enregistre le plugin
    tinymce.PluginManager.add('bouton_summary', tinymce.plugins.bouton_summary);
})();