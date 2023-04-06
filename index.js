const images = document.querySelectorAll('img');
const wrapper = document.querySelector("body");
const button = document.querySelector('button');
const imgBlock = document.querySelector('.images_block');

button.addEventListener('click', () => {        // handler of "Add" button and adding event listener to handle click on new images
    const image = document.createElement('img');
    image.src = 'http://placekitten.com/g/200/200';
    randomAlt(image);
    image.addEventListener('click', (e) => handler(e.target));
    imgBlock.appendChild(image);
})

function randomAlt(elem) {                     // gives random words for alt attr on images
    fetch("https://random-word-api.herokuapp.com/word?number=1")
        .then(response => response.json())
        .then(result => elem.alt = result);
}

function handler(img) {                         // img click handler
    const inputField = document.createElement('div');
    inputField.style.cssText = "position: absolute; top: 0; display: flex; flex-direction: column; padding: 5px; z-index: 9999";
    const input = document.createElement('input');
    input.value = img.alt;
    const submitButton = document.createElement('button');
    submitButton.textContent = "Изменить";
    submitButton.addEventListener('click', () => {
        img.alt = input.value;
        img.classList.add('edited');
        inputField.remove();
    })
    const cancelButton = document.createElement('button');
    cancelButton.textContent = "Отменить";
    cancelButton.addEventListener('click', () => inputField.remove())
    inputField.appendChild(input);
    inputField.appendChild(submitButton);
    inputField.appendChild(cancelButton);
    wrapper.appendChild(inputField);
}

for (let img of images) {       // random alt attr for images that already on page
    randomAlt(img);
}

for (let img of images) {       // handler for images that already on page
    img.addEventListener('click', (e) => handler(e.target))
    
}