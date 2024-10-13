photoCarouselDiv = document.getElementById('photo_carousel');
photoCarouselImg = photoCarouselDiv.getElementsByClassName('photo_carousel_img')[0];
baseImgUrl = photoCarouselImg.getAttribute('src');

let photoCarouselImages;

console.log(baseImgUrl);


function setImage(url = photoCarouselImages[0]) {
    photoCarouselImg.setAttribute('src', baseImgUrl + url);
}


function getPhotoCarouselImages() {
    fetch("/get_photo_carousel_images").then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        photoCarouselImages = data;
        setImage();
        addDotsToDotsContainer();
        setActiveDot()
    }).catch(function () {
        console.log("Error");
    });
}


getPhotoCarouselImages();
let currentCarouselIndex = 0;


function turnCarousel(toRight) {
    currentCarouselIndex += toRight;
    if (currentCarouselIndex >= photoCarouselImages.length)
        currentCarouselIndex = 0;
    if (currentCarouselIndex < 0)
        currentCarouselIndex = photoCarouselImages.length - 1;
    setImage(photoCarouselImages[currentCarouselIndex]);
    setActiveDot(currentCarouselIndex)
}


photoCarouselDotTemplate = document.getElementsByClassName('photo_carousel_dot')[0];
photoCarouselDotsContainer = document.getElementsByClassName('photo_carousel_dots')[0];


function addDotToDotsContainer() {
    let photoCarouselDot = photoCarouselDotTemplate.cloneNode();
    photoCarouselDot.style.display = 'block';
    photoCarouselDotsContainer.appendChild(photoCarouselDot);
}


function addDotsToDotsContainer() {
    for (let i = 0; i < photoCarouselImages.length; i++) {
        addDotToDotsContainer();
    }
}


function setActiveDot(index = 0) {
    let photoCarouselDots = photoCarouselDotsContainer.getElementsByClassName('photo_carousel_dot');
    for (let i = 0; i < photoCarouselDots.length; i++) {
        if (photoCarouselDots[i].classList.contains('active'))
            photoCarouselDots[i].classList.remove('active');
    }
    photoCarouselDots[index + 1].classList.add('active');
}
