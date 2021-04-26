
const inputs = document.querySelectorAll('input[type="range"]');
const outputs = document.querySelectorAll('output');
const buttonreset = document.querySelector('.btn-reset');
const fileInput = document.querySelector('input[type="file"]');
const imageContainer = document.querySelector('.img_wrapper');
const full = document.querySelector('.fullscreen');
const imgfirst = document.querySelector('img');



function update() {
    this.nextElementSibling.value = this.value;
    const suffix = this.dataset.sizing;
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}
function reset() {
    inputs.forEach(input => {
        let suffix = input.dataset.sizing || '';
        input.nextElementSibling.value = input.defaultValue;
        document.documentElement.style.setProperty(`--${input.name}`, input.defaultValue + suffix)
        input.value = input.defaultValue
    })

}
buttonreset.addEventListener("click", reset);
inputs.forEach(inputs => inputs.addEventListener("input", update));

let imgsrcupload = '';
fileInput.addEventListener('change', function (e) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        imgsrcupload = img.src = reader.result;
        imageContainer.innerHTML = "";
        imageContainer.append(img);
        imageSrc = '1';
    }
    reader.readAsDataURL(file);
    fileInput.value = null;
});

function fullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
full.addEventListener('click', fullscreen);


const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

let imageSrc = '';
let i = 0;
const btn = document.querySelector('.btn-next');


function viewBgImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        imageContainer.innerHTML = "";
        imageContainer.append(img);
    };
}

function getImage() {
    let date = new Date();
    let hours = date.getHours();
    let time = '';
    if (hours >= 6 && hours < 12) {
        time = 'morning/';
    }
    else if (hours >= 12 && hours < 18) {
        time = 'day/';
    }
    else if (hours >= 18 && hours < 24) {
        time = 'evening/';
    }
    else if (hours >= 0 && hours < 6) {
        time = 'night/';
    }
    imageSrc = base + time + images[i];
    viewBgImage(imageSrc);
    i++;
    if (i > 19) {
        i = 0;
    }
}
btn.addEventListener('click', getImage);


const canvas = document.querySelector('canvas');
const download = document.querySelector('.btn-save')


download.addEventListener('click', () => {
    let blur = document.querySelector('#blur');
    let invert = document.querySelector('#invert');
    let sepia = document.querySelector('#sepia');
    let saturate = document.querySelector('#saturate');
    let hue = document.querySelector('#hue');
    const img = new Image();
    if (imageSrc === '') {
        img.src = 'assets/img/img.jpg';
        img.setAttribute('crossOrigin', 'anonymous');
    } else if (imageSrc === '1') {
        img.src = imgsrcupload;
        img.setAttribute('crossOrigin', 'anonymous');
    }
    else {
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = imageSrc;
    }

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.filter = `blur(${(blur.value * canvas.height / 420).toFixed(2)}${blur.dataset.sizing}) invert(${invert.value}${invert.dataset.sizing}) sepia(${sepia.value}${sepia.dataset.sizing}) 
        saturate(${saturate.value}${saturate.dataset.sizing}) hue-rotate(${hue.value}${hue.dataset.sizing})`;
        ctx.drawImage(img, 0, 0);
        var link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL();
        link.click();
        link.delete;

    };

})

