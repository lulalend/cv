const fileName = 'myCV.pdf';
const button = document.querySelector('#download-pdf');

button.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;

    let doc = new jsPDF('p', 'pt', 'letter');
    const content = document.querySelector('.container');

    doc.html(content, {
        callback: function(doc) {
            doc.save(fileName);
        },
        x: 12,
        y: 12
    });
});
button.addEventListener('mousedown',() => {
    button.classList.add('focus-button');
});
button.addEventListener('mouseup', () => {
    button.classList.remove('focus-button');
});

document.querySelector('.container').addEventListener('click',e => {
    const originalElement = e.target;
    
    if (!originalElement.classList.contains('not-text') && originalElement.childNodes.length === 1) {
        const changedElement = originalElement;
        const newElement = document.createElement('textarea');
        newElement.classList.add('not-text');
        newElement.value = `${originalElement.innerHTML}`;
        // newElement.style = `background-color: transparent;`;
        newElement.rows = 1;

        originalElement.replaceWith(newElement);
        newElement.focus();

        'focusout change'.split(' ').forEach((event) =>
            newElement.addEventListener(event, () => {
                changedElement.innerHTML = `${newElement.value}`;
                newElement.replaceWith(changedElement);
            })
        );
    }

});