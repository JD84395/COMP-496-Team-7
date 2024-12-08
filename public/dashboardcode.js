document.addEventListener('DOMContentLoaded', () => {
    const EditorJS = window.EditorJS;
    const Header = window.Header;
    const Table = window.Table;

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

        onReady: () => {
            console.log("Editor.js is ready");
        }
    });


    const saveButton = document.getElementById('save-btn');

});
