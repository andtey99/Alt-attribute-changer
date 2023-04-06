const images = document.querySelectorAll('img');

for (let img of images) {
    img.addEventListener('click', (e) => {
        img.classList.toggle('active');
        console.log(e);
    })
}

