let navbar = document.getElementsByClassName("navbar")[0];
let navbarPos = document.getElementsByClassName("navbar_position")[0];

let navbarCss = navbar.style;

let isNavbarVisible = false;
let canChangeNavbarVisibility = true;
let changeNavbarVisibilityAnimationDuration = 0;  // 500

// Navbar

function hideNavbar() {
    unlockMainScreen();
    // makeHeaderDark();
    hideNavbarAnimation();

    setTimeout(() => {
        hideNavbarRaw();
        canChangeNavbarVisibility = true;
    }, changeNavbarVisibilityAnimationDuration);
}

function showNavbar() {
    showNavbarRaw();
    showNavbarAnimation();
    // makeHeaderLight();

    setTimeout(() => {
        lockMainScreen();
        canChangeNavbarVisibility = true;
    }, changeNavbarVisibilityAnimationDuration);
}

function hideNavbarRaw() {
    if (!navbarPos.classList.contains("invisible-mobile")) {
        navbarPos.classList.add('invisible-mobile');
    }
}

function showNavbarRaw() {
    if (navbarPos.classList.contains("invisible-mobile")) {
        navbarPos.classList.remove('invisible-mobile');
    }
}

function showNavbarAnimation() {
    if (navbar.classList.contains("navbar_anim_inactive"))
        navbar.classList.remove("navbar_anim_inactive");
    navbar.classList.add("navbar_anim_active");
}

function hideNavbarAnimation() {
    if (navbar.classList.contains("navbar_anim_active"))
        navbar.classList.remove("navbar_anim_active");
    navbar.classList.add("navbar_anim_inactive");
}

function changeNavbarVisibility(forced=false) {
    if (canChangeNavbarVisibility || forced) {
        canChangeNavbarVisibility = false;
        if (isNavbarVisible) {
             hideNavbar();
            // showCartButton();
        } else {
            showNavbar();
            // hideCartButton();
        }
        isNavbarVisible = !isNavbarVisible;
    }
}

function onNavbarLinkClick(index) {
    logInfo(index);
    if (isNavbarVisible)
        changeNavbarVisibility(true);

    switch (index) {
        case 0: {
            scrollScreenTo("certificates");
            break;
        }
        case 1: {
            scrollScreenTo("payment");
            break;
        }
        case 2: {
            scrollScreenTo("about");
            break;
        }
        case 3: {
            scrollScreenTo("reviews");
            break;
        }
        case 4: {
            scrollScreenTo("services");
            break;
        }
        case 5: {
            scrollScreenTo("contacts");
            break;
        }
        case 6: {
            scrollScreenTo("examples")
            break;
        }
    }
}
