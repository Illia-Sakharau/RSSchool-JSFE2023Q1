const headerMain = document.getElementsByClassName('header-main')[0];
const headerContent = document.getElementsByClassName('header-content')[0];
const burger = document.getElementsByClassName('header-main__menu-icon')[0];
const navMenu = document.getElementsByClassName('nav-main')[0];
const links = document.getElementsByClassName('link');
const linksContainer = document.querySelectorAll('.nav-main > ul')[0];
const dimmer = document.getElementsByClassName('header-main__dimmer')[0];
const body = document.querySelectorAll('body')[0];


window.addEventListener('scroll', function() {
    if (window.pageYOffset > 60) {
        headerMain.classList.add('header-main_light');
        headerContent.classList.add('header-content_light');
        navMenu.classList.add('nav-main_light');
        for (let i = 0; i < links.length; i++) {
            links[i].classList.add('link-onlight');
        };
        
    } else {
        if (!document.location.pathname.includes('our-pets.html')) {
            headerMain.classList.remove('header-main_light');
            headerContent.classList.remove('header-content_light');
            navMenu.classList.remove('nav-main_light');
            for (let i = 0; i < links.length; i++) {
                links[i].classList.remove('link-onlight');
            };
        };

    }
});


if (burger) {
    burger.addEventListener('click', function() {
        burger.classList.toggle('header-main__menu-icon_active')
        navMenu.classList.toggle('nav-main_active');
        dimmer.classList.toggle('header-main__dimmer_active');
        body.classList.toggle('_lock');
    });
    dimmer.addEventListener('click', function() {
        burger.classList.remove('header-main__menu-icon_active')
        navMenu.classList.remove('nav-main_active');
        dimmer.classList.remove('header-main__dimmer_active');
        body.classList.remove('_lock');
    });

}


linksContainer.addEventListener('click', function() {
    if (event.target.tagName != "UL") {
        burger.classList.remove('header-main__menu-icon_active')
        navMenu.classList.remove('nav-main_active');
        dimmer.classList.remove('header-main__dimmer_active');
        body.classList.remove('_lock');
    }
});