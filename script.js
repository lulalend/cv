const fileName = 'myCV.pdf';
const button = document.querySelector('#download-pdf');

button.addEventListener('click', () => {
    const content = document.querySelector('.container');

   const opt = {
        margin: 1,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(content).set(opt).save();
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
        newElement.classList.add('ripple');
        newElement.value = `${originalElement.innerHTML}`;
        if (originalElement.classList.contains('white-text'))
            newElement.style.color = `var(--white)`;

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