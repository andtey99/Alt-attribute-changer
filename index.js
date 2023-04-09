(() => {
let images = document.querySelectorAll('img');
const wrapper = document.querySelector("body");
const button = document.querySelector('button');
const imgBlock = document.querySelector('.images_block');
let count = images.length;
let observer = new MutationObserver(() => {
    images = document.querySelectorAll('img');
    for (let i = count; i < images.length; i++) {       // handler for images that already on page
        randomAlt(images[i]);
        images[i].addEventListener('click', (e) => handler(e.target))
    }
    count = images.length;
  });

  observer.observe(wrapper, {
    childList: true,
    subtree: true,
    characterDataOldValue: true
  });

button.addEventListener('click', () => {        // handler of "Add" button and adding event listener to handle click on new images
    const image = document.createElement('img');
    image.src = 'http://placekitten.com/g/200/200';
    imgBlock.appendChild(image);
})

function randomAlt(elem) {                     // gives random words for alt attr on images
    fetch("https://random-word-api.herokuapp.com/word?number=1")
        .then(response => response.json())
        .then(result => {
            elem.style.cssText = "box-shadow: 0px 0px 0px 10px rgb(43, 255, 0);";
            elem.alt = result
        });
        
}

function handler(img) {                         // img click handler
    const inputField = document.createElement('div');
    inputField.style.cssText = "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; padding: 5px; z-index: 9999";
    const input = document.createElement('input');
    input.value = img.alt;
    const submitButton = document.createElement('button');
    submitButton.textContent = "Изменить";
    submitButton.addEventListener('click', () => {
        img.alt = input.value;
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
})();