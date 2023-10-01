const main = document.querySelector('.main');
const search = document.querySelector('#search');
const searchIcon = document.querySelector('#search-icon');
const url = 'https://api.unsplash.com/search/photos?';
const apiKey = '&client_id=iDbk8AAYKSbp9qKdS9y3m108tZ611hCKnVjgfHNczx8';
let query = 'random';
let queryResult = `query=${query}&per_page=30&orientation=landscape`;
let fullUrl = `${url}${queryResult}${apiKey}`;

async function getResSearch(url) {
  const res = await fetch(url);
  const value = await res.json();
  showImages(value);
}

function showImages(value) {
  for (let key = 0; key < value.results.length; key++) {
    const img = document.createElement('div');
    img.classList.add('img');
    img.style.backgroundImage = `url(${value.results[key].urls.regular})`;
    main.append(img);
  }
};

function updateSearch() {
  main.innerHTML = '';
  query = search.value;
  queryResult = `query=${query}&per_page=30&orientation=landscape`;
  fullUrl = `${url}${queryResult}${apiKey}`;
  getResSearch(fullUrl);
}

getResSearch(fullUrl);

search.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    updateSearch();
  }
})

searchIcon.addEventListener('click', () => {
    updateSearch();
})
