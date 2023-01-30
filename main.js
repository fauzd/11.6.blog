let titleContainer = document.createElement('div');
let title = document.createElement('h1');
titleContainer.classList.add('mt-3','mb-5');
title.textContent = 'Список статей с GOREST';
titleContainer.append(title);
document.querySelector('.container').append(titleContainer);

function createCard (title,text,postId) {
    let card = document.createElement('div');
    card.classList.add('card','mb-3');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    
    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title;
    
    let cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = text;
    
    let readLink = document.createElement('a');
    readLink.classList.add('card-link');
    readLink.textContent = 'Читать полностью';
    readLink.setAttribute('href',`http://192.168.3.22:5500/11.6.blog/post.html?id=${postId}`)

    cardBody.append(cardTitle);
    cardBody.append(cardText);
    cardBody.append(readLink);
    card.append(cardBody);

    let container = document.querySelector('.container');
    container.append(card);
};

function createNav(numberOfPages) {
    let navContainer = document.createElement('div');
    navContainer.classList.add('d-sm-inline-flex', 'flex-wrap', 'flex-row', 'mb-3');

    let pageNumber = 1;
    while (pageNumber <= numberOfPages) {
        let pageLink = document.createElement('a');
        pageLink.textContent = pageNumber;
        if (pageNumber == 1) pageLink.setAttribute('href',`http://192.168.3.22:5500/11.6.blog/index.html`);
        else pageLink.setAttribute('href',`http://192.168.3.22:5500/11.6.blog/index.html?page=${pageNumber}`);
        pageLink.setAttribute('style', 'margin-right: 3px;');
        navContainer.append(pageLink);
        pageNumber++;
    }
    
    document.querySelector('.container').append(navContainer);
}

async function loadPosts(pageNumber) {
    if (pageNumber == 1 || pageNumber === null) var response = await fetch ('https://gorest.co.in/public/v2/posts?page=1');
    else var response = await fetch (`https://gorest.co.in/public/v2/posts?page=${pageNumber}`);
    const data = await response.json();
    console.log(data);
    data.forEach(element => {
        createCard(element.title, `${element.body.slice(0,50)}...`, element.id);
               
    });
    let totalPages = response.headers.get('x-pagination-pages');
    console.log(totalPages);
    createNav(totalPages);
    
}

let pageParams = new URLSearchParams(window.location.search);
let currentPageNumber = pageParams.get('page');
console.log(pageParams)
console.log(currentPageNumber)

loadPosts(currentPageNumber);