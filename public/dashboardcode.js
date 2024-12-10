document.addEventListener('DOMContentLoaded', () => {
    const EditorJS = window.EditorJS;
    const Header = window.Header;
    const Table = window.Table;

    const contentElement = document.getElementById('existing-content');
    let existingContent = [];

    try {
        existingContent = JSON.parse(contentElement.getAttribute('data-content')) || [];
    } catch (error) {
        console.error('Error parsing existing content:', error);
    }

    console.log("Parsed Existing Content:", existingContent);

    const editor = new EditorJS({
        holder: 'editorjs',

        tools: {
            header: {
                class: Header,
                inlineToolbar: ['link'],
            },
            table: {
                class: Table,
                inlineToolbar: true,
                config: {
                    rows: 2,
                    cols: 3,
                },
            },
        },

        data: existingContent.length > 0 ? existingContent[existingContent.length - 1] : {},
    });

    const saveButton = document.getElementById('save-btn');

    saveButton.addEventListener('click', async () => {
        try {
            const outputData = await editor.save();
            console.log("Saved Data:", outputData);

            const noteData = {
                userId: userId,
                title: 'Untitled Note',
                content: JSON.stringify(outputData),
            };

            fetch('/save-note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Note saved!');
            })
            .catch(err => {
                console.error('Error saving note:', err);
                alert('Error saving note.');
            });
        } catch (error) {
            console.error('Error saving note:', error);
            alert('Error saving note.');
        }
    });
});
