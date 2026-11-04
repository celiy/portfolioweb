const contatoContainers = document.querySelectorAll('.contato');

contatoContainers.forEach(container => {
    const img = container.querySelector('img');

    container.addEventListener('mouseenter', () => {
        img.classList.add('hover');
    });

    container.addEventListener('mouseleave', () => {
        img.classList.remove('hover');
    });
});