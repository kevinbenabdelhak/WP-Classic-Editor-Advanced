(function() {
    tinymce.create('tinymce.plugins.bouton_time', {
        init: function(ed, url) {
            ed.addCommand('command_bouton_time', function() {
                const selectedText = ed.selection.getContent();

                // Récupérer la balise parente de la sélection
                const parentNode = ed.selection.getNode();

                // Vérifie si le nœud parent est une balise <time>
                if (parentNode.nodeName.toLowerCase() === 'time') {
                    // Si c'est une balise <time>, retirer la balise et insérer le contenu
                    const innerText = parentNode.innerHTML; // Contenu à l'intérieur de la balise <time>
                    ed.execCommand('mceInsertContent', false, innerText);
                } else {
                    // Vérifie si du texte est sélectionné
                    if (selectedText) {
                        // Essaye de parser la date en utilisant Date
                        try {
                            const parsedDate = new Date(selectedText);

                            if (!isNaN(parsedDate.getTime())) {
                                // Ajoute un jour à la date
                                parsedDate.setDate(parsedDate.getDate() + 1);

                                // Formate la date au format ISO 8601
                                const isoDate = parsedDate.toISOString();

                                // Prend seulement la date avec l'heure normalisée à minuit UTC
                                const normalHourDate = `${isoDate.slice(0, 10)}T00:00:00.000Z`;

                                // Insertion de la balise <time> avec le format approprié
                                ed.execCommand('mceInsertContent', false, '<time datetime="' + normalHourDate + '">' + selectedText + '</time>');
                            } else {
                                alert('Veuillez sélectionner une date valide.');
                            }
                        } catch (error) {
                            console.error("Erreur lors du parsing de la date: ", error);
                            alert('Veuillez sélectionner une date valide.');
                        }
                    } else {
                        // Si aucun texte n'est sélectionné, avertir l'utilisateur
                        alert('Veuillez sélectionner une date.');
                    }
                }
            });

            ed.addButton('bouton_time', {
                title: 'Date',
                text: '🕒', // Texte ou icône qui s'affiche sur le bouton
                icon: false, // Vous pouvez spécifier une icône ici si vous le souhaitez
                onclick: function() {
                    ed.execCommand('command_bouton_time');
                }
            });
        }
    });

    // Enregistre le plugin
    tinymce.PluginManager.add('bouton_time', tinymce.plugins.bouton_time);
})();