const pets = [
{
    "name": "Jennifer",
    "img": "../../assets/images/jennifer.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
},
{
    "name": "Sophia",
    "img": "../../assets/images/sophia.png",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
},
{
    "name": "Woody",
    "img": "../../assets/images/woody.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
},
{
    "name": "Scarlett",
    "img": "../../assets/images/scarlett.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
},
{
    "name": "Katrine",
    "img": "../../assets/images/katrine.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
},
{
    "name": "Timmy",
    "img": "../../assets/images/timmy.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
},
{
    "name": "Freddie",
    "img": "../../assets/images/freddie.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
},
{
    "name": "Charly",
    "img": "../../assets/images/charly.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
}
];

const btnFirstPage = document.querySelector('#btn-first-page');
const btnPrevPage = document.querySelector('#btn-prev-page');
const btnCurPage = document.querySelector('#btn-cur-page');
const btnNextPage = document.querySelector('#btn-next-page');
const btnLastPage = document.querySelector('#btn-last-page');

let curPage = 0;
let itemOnPage = 8;
let arrItem = [0, 1, 2, 3, 4, 5, 6, 7, 
    0, 1, 2, 3, 4, 5, 6, 7,
    0, 1, 2, 3, 4, 5, 6, 7,
    0, 1, 2, 3, 4, 5, 6, 7,
    0, 1, 2, 3, 4, 5, 6, 7,
    0, 1, 2, 3, 4, 5, 6, 7];


function createArr(arrItem, itemOnPage) {
    let errMy = 0;

    let sliceArr;
    arrItem.sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < arrItem.length; i += itemOnPage) {
        let flag = itemOnPage - 1;
        while (flag > 0) {
            errMy++;
            sliceArr = arrItem.slice(i, i + itemOnPage)
            flag = itemOnPage - 1;
            for (let j = 0; j < sliceArr.length; j++) {
                if (sliceArr.indexOf(sliceArr[j], j + 1) > 0) {
                    arrItem.push(sliceArr[j]);
                    let index = i + sliceArr.indexOf(sliceArr[j], j + 1);
                    arrItem.splice(index, 1);
                    break;
                } else {
                    flag--;
                }
            }
            if (errMy === 1000) {
                return errMy; 
            }
        }        
    }
    return arrItem;
}


function resizeWin() {    
    if (window.innerWidth >= 1280 && itemOnPage !== 8) {
        itemOnPage = 8;
        createArr(arrItem, 8);
        openFirstPage();
    } else if (window.innerWidth < 1280 && window.innerWidth >= 592 && itemOnPage !== 6) {
        itemOnPage = 6;
        createArr(arrItem, 6);
        openFirstPage();
    } else if (window.innerWidth < 592 && itemOnPage !== 3) {
        itemOnPage = 3;
        createArr(arrItem, 3);
        openFirstPage();
    }
}

window.addEventListener('resize', resizeWin);
createArr(arrItem, itemOnPage);

function getCardItem(i) {
    let card = document.createElement('div');
    card.className = "card-mini";
    card.setAttribute('data-number', `${i}`);

    let petPhoto = document.createElement('img');
    petPhoto.src = `src/img/pets/${pets[i].name.toLowerCase()}.png`;
    petPhoto.alt = `${pets[i].name}`;

    let petName = document.createElement('h4');
    petName.append(pets[i].name);

    let button = document.createElement('div');
    button.className = `button-rectangle-secondary`;
    button.append('Learn more');

    card.append(petPhoto, petName, button);

    return card;
}

function displayItems(arrItem, itemOnPage, curPage) {
    const gridConteiner = document.querySelector('.grid-conteiner');
    gridConteiner.innerHTML = "";

    const start = itemOnPage * curPage;
    const end = start + itemOnPage;

    const paginatedArr = arrItem.slice(start, end);    

    paginatedArr.forEach((item) => {
        gridConteiner.appendChild(getCardItem(item));
    })
}

function openNextPage() {
    btnPrevPage.classList.remove("button-round_inactive");
    btnPrevPage.addEventListener('click', openPrevPage);
    btnFirstPage.classList.remove("button-round_inactive");
    btnFirstPage.addEventListener('click', openFirstPage);
    
    curPage++;
    displayItems(arrItem, itemOnPage, curPage);
    btnCurPage.innerHTML = `<p>${curPage + 1}</p>`;
    if (curPage === arrItem.length/itemOnPage - 1) {
        btnNextPage.classList.add("button-round_inactive");
        btnNextPage.removeEventListener('click', openNextPage);
        btnLastPage.classList.add("button-round_inactive");
        btnLastPage.removeEventListener('click', openLastPage);
    }
}
function openLastPage() {
    btnPrevPage.classList.remove("button-round_inactive");
    btnPrevPage.addEventListener('click', openPrevPage);
    btnFirstPage.classList.remove("button-round_inactive");
    btnFirstPage.addEventListener('click', openFirstPage);
    
    curPage = arrItem.length/itemOnPage - 1;
    displayItems(arrItem, itemOnPage, curPage);
    btnCurPage.innerHTML = `<p>${curPage + 1}</p>`;
    
    btnNextPage.classList.add("button-round_inactive");
    btnNextPage.removeEventListener('click', openNextPage);
    btnLastPage.classList.add("button-round_inactive");
    btnLastPage.removeEventListener('click', openLastPage);
}
function openPrevPage() {
    btnNextPage.classList.remove("button-round_inactive");
    btnNextPage.addEventListener('click', openNextPage);
    btnLastPage.classList.remove("button-round_inactive");
    btnLastPage.addEventListener('click', openLastPage);
    
    curPage--;
    displayItems(arrItem, itemOnPage, curPage);
    btnCurPage.innerHTML = `<p>${curPage + 1}</p>`;
    if (curPage === 0) {
        btnPrevPage.classList.add("button-round_inactive");
        btnPrevPage.removeEventListener('click', openPrevPage);
        btnFirstPage.classList.add("button-round_inactive");
        btnFirstPage.removeEventListener('click', openFirstPage);
    }
}
function openFirstPage() {
    btnNextPage.classList.remove("button-round_inactive");
    btnNextPage.addEventListener('click', openNextPage);
    btnLastPage.classList.remove("button-round_inactive");
    btnLastPage.addEventListener('click', openLastPage);
    
    curPage = 0;
    displayItems(arrItem, itemOnPage, curPage);
    btnCurPage.innerHTML = `<p>${curPage + 1}</p>`;
    
    btnPrevPage.classList.add("button-round_inactive");
    btnPrevPage.removeEventListener('click', openPrevPage);
    btnFirstPage.classList.add("button-round_inactive");
    btnFirstPage.removeEventListener('click', openFirstPage);
}

btnNextPage.addEventListener('click', openNextPage);
btnLastPage.addEventListener('click', openLastPage);
btnPrevPage.addEventListener('click', openPrevPage);
btnFirstPage.addEventListener('click', openFirstPage);


displayItems(arrItem, itemOnPage, curPage);
btnCurPage.innerHTML = `<p>${curPage + 1}</p>`;



