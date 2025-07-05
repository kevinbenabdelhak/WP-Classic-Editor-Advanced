(function() {
    tinymce.create('tinymce.plugins.bouton_def', {
        init : function(ed, url) {
            ed.addCommand('command_bouton_def', function() {
                const selectedText = ed.selection.getContent();

         
                const parentNode = ed.selection.getNode();

              
                if (parentNode.nodeName.toLowerCase() === 'dfn') {
                  
                    const innerText = parentNode.innerHTML; 
                    ed.execCommand('mceInsertContent', false, innerText);
                } else {
                    
                    if (selectedText) {
                        ed.execCommand('mceInsertContent', false, '<dfn>' + selectedText + '</dfn>');
                    } else {
                      
                        ed.execCommand('mceInsertContent', false, '<dfn></dfn>');
                    }
                }
            });

            ed.addButton('bouton_def', {
                title: 'Définition',
                text: '<dfn>', 
                icon: false, 
                onclick: function() {
                    ed.execCommand('command_bouton_def');
                }
            });
        }
    });
    
 
    tinymce.PluginManager.add('bouton_def', tinymce.plugins.bouton_def);
})();