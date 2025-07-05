(function() {
    tinymce.create('tinymce.plugins.bouton_cite', {
        init: function(ed) {
            ed.addCommand('command_bouton_cite', function() {
                const selectedText = ed.selection.getContent();
                const parentNode = ed.selection.getNode();

        
                if (parentNode.nodeName.toLowerCase() === 'cite') {
                    const innerText = parentNode.innerHTML; 
                    ed.dom.remove(parentNode, true); 
                } else {
                 
                    if (selectedText) {
                        const citeContent = `<cite>${selectedText}</cite>`;
                        ed.execCommand('mceInsertContent', false, citeContent);
                    } else {
                      
                        const exampleContent = `<cite>Titre de l'œuvre</cite>`;
                        ed.execCommand('mceInsertContent', false, exampleContent);
                    }
                }
            });

            ed.addButton('bouton_cite', {
                title: 'Titre d\'une œuvre',
                text: '✏️', 
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