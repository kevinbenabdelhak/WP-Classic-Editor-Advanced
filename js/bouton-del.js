(function() {
    tinymce.create('tinymce.plugins.bouton_del', {
        init: function(ed) {
            ed.addCommand('command_bouton_del', function() {
                const selectedText = ed.selection.getContent();
                const parentNode = ed.selection.getNode();

           
                if (parentNode.nodeName.toLowerCase() === 'del') {
                    const innerText = parentNode.innerHTML; 
                    ed.dom.remove(parentNode, true); 
                } else {
                  
                    if (selectedText) {
                        const delContent = `<del>${selectedText}</del>`;
                        ed.execCommand('mceInsertContent', false, delContent);
                    }
                }
            });

            ed.addButton('bouton_del', {
                title: 'Ancienne info',
                text: '❌', 
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