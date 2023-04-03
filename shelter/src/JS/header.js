const headerMain = document.getElementsByClassName('header-main')[0];
const headerContent = document.getElementsByClassName('header-content')[0];
const burger = document.getElementsByClassName('header-main__menu-icon')[0];
const navMenu = document.getElementsByClassName('nav-main')[0];
const links = document.getElementsByClassName('link');



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

    });

}