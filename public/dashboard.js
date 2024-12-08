import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Table from '@editorjs/table';
import List from '@editorjs/list';

const editor = new EditorJS ({
    holderId: 'editorjs',

    tools: {
        header: {
            class: Header,
        inlineToolbar: ['link']
        },
        list: {
            class: List,
        inlineToolbar: [
            'link',
            'bold'
        ]
        }, 
        table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2, // Default number of rows
              cols: 3, // Default number of columns
            },
          },
    }
})
