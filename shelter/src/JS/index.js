
console.log(`Shelter. week-1 100/100 \n
\n
Страница Main (60) \n
1. Проверка верстки +7 \n
2. Вёрстка соответствует макету +35 \n
3. Требования к css +6 \n
4. Интерактивность элементов +12 \n
\n
Страница Pets (40) \n
5. Проверка верстки +7 \n
6. Вёрстка соответствует макету +15 \n
7. Требования к css +4 \n
8. Интерактивность элементов +14`);



const headerStyle = function() {
    const headerMain = document.getElementsByClassName('header-main')[0];
    const headerContent = document.getElementsByClassName('header-content')[0];
    const link = document.getElementsByClassName('link');

    console.log(link);
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 60) {
            headerMain.classList.add('header-main_light');
            headerContent.classList.add('header-content_light');
            for (let i = 0; i < link.length; i++) {
                link[i].classList.add('link-onlight');
            };
            
        } else {
            headerMain.classList.remove('header-main_light');
            headerContent.classList.remove('header-content_light');
            for (let i = 0; i < link.length; i++) {
                link[i].classList.remove('link-onlight');
            };
        }
    })
}

headerStyle();






