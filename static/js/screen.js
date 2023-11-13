// Main screen

let body = document.getElementById("body");
let header = document.getElementsByClassName("header")[0];
let headerHeading = header.getElementsByClassName('header-logo-label')[0];
// let navbar2 = header.getElementsByClassName('navbar')[0];
let telDiv = document.getElementsByClassName('navbar_tel')[0];

// console.log(navbar2);

let savedScrollPos;
let scrollPos;

window.addEventListener('scroll', function () {
    scrollPos = pageYOffset;

    if (scrollPos > 10 || isNavbarVisible) {
        // makeHeaderLight();
    } else {
        // makeHeaderDark();
    }
});

function saveScrollPos() {
    savedScrollPos = scrollPos;
}

function restoreScrollPos() {
    document.documentElement.scrollTop = savedScrollPos;
    document.body.scrollTop = savedScrollPos;
}

function lockMainScreen() {
    saveScrollPos();
    body.style.position = "fixed";
}

function unlockMainScreen() {
    body.style.position = "relative";
    restoreScrollPos();
}

function scrollScreenTo(hash) {
    location.hash = "#" + hash;
}


// Header

function hideHeader() {
    header.style.display = "none";
}

function showHeader() {
    header.style.display = "block";
}

function makeHeaderLight() {
    // header.style.backgroundColor = "#ffffff";
    // header.classList.remove('bg-dark');
    header.classList.add('bg-grey');
    headerHeading.classList.remove('mc-white');
    headerHeading.classList.add('mc-dark');
    navbar2.classList.remove('mc-white');
    navbar2.classList.add('mc-slightly-dark');
    telDiv.classList.remove('mc-white');
    telDiv.classList.add('mc-slightly-light');
}

function makeHeaderDark() {
    // header.style.backgroundColor = "";
    headerHeading.classList.remove('mc-dark');
    headerHeading.classList.add('mc-white');
    header.classList.remove('bg-grey');
    // header.classList.add('bg-dark');
    navbar2.classList.remove('mc-slightly-dark');
    navbar2.classList.add('mc-white');
    telDiv.classList.remove('mc-slightly-light');
    telDiv.classList.add('mc-white');
}
