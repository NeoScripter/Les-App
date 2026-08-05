export function insertAtCursor(textarea: HTMLTextAreaElement, currentText: string, textToInsert: string) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newText = currentText.slice(0, start) + textToInsert + currentText.slice(end);

    requestAnimationFrame(() => {
        const pos = start + textToInsert.length;
        textarea.selectionStart = textarea.selectionEnd = pos;
    });

    return newText;
}
