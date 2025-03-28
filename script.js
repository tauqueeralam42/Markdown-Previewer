document.addEventListener('DOMContentLoaded', function () {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const clear = document.getElementById('clear');

    // Configure Marked.js to support GitHub Flavored Markdown (GFM) and line breaks
    marked.setOptions({
        breaks: true,
        gfm: true
    });

    /**
     * Updates the preview section by converting markdown input
     * from the editor into HTML using Marked.js.
     * It also adds copy buttons for code blocks after rendering.
     */
    function updatePreview() {
        preview.innerHTML = marked.parse(editor.value);
        addCopyButtons(); // Ensure copy buttons are added to code blocks
    }

    /**
     * Clears the editor and preview.
     * This function is exposed globally to be called when the "Clear" button is clicked.
     */
    function clearEditor() {
        editor.value = '';
        preview.innerHTML = '';
    }

    /**
     * Adds a "Copy" button to each <pre> block containing code.
     * This allows users to easily copy code snippets.
     */
    function addCopyButtons() {
        document.querySelectorAll('pre').forEach((pre) => {
            // Avoid adding multiple buttons inside the same <pre> block
            if (!pre.querySelector('.copy-btn')) { 
                const button = document.createElement('button');
                button.innerText = 'Copy';
                button.classList.add('copy-btn');

                // Copy the code inside the <pre> block to clipboard when clicked
                button.onclick = function () {
                    const code = pre.querySelector('code').innerText;
                    navigator.clipboard.writeText(code).then(() => {
                        button.innerText = 'Copied!';
                        setTimeout(() => (button.innerText = 'Copy'), 2000);
                    });
                };

                // Ensure the <pre> block is relatively positioned for absolute placement of the button
                pre.style.position = 'relative';

                // Append the "Copy" button to the top-right corner of the <pre> block
                pre.appendChild(button);
            }
        });
    }

    // Set an initial markdown text for better user experience
    editor.value = `# Welcome to the Markdown Previewer 🚀  
Type your markdown in the editor, and see the preview in real time!  

## Features  
- **Live Preview** of your markdown  
- **Syntax Highlighting** for code blocks  
- **Copy Button** for easy code copying  
- **Responsive Design**  

### Example Usage  
You can write inline code like \`const x = 10;\`.  

Or add multi-line code blocks:  

\`\`\`
// JavaScript Example
function greet(name) {
    return \`Hello, \${name}!\`;
}
console.log(greet("World"));
\`\`\`

Happy coding! 🎉`;

    // Update preview whenever user types in the editor
    editor.addEventListener('input', updatePreview);
    clear.addEventListener('click', clearEditor);

    // Render the initial markdown preview
    updatePreview();


});
