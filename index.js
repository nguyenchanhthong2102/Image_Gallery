const imageWrapper = document.querySelector('.images');
const loadmoreButton = document.querySelector('.load-more');
const loadSearchInput = document.querySelector('.search-input input');
const apiKey = '9Hrs2MQV3OVFDpo2pXGDyxJHte5Bcvw1Pj4poMeq39RvzW2vNzEcdy5s';
const perPage = 15;
let temp = null;
let currentPage = 1;
const genarateHTML = (images) => {
  imageWrapper.innerHTML += images
    .map(
      (image) => `
    <li class="card">
          <img src="${image.src.large2x}" alt="img" />
          <div class="details">
            <div class="photographer">
              <i class="fa-solid fa-camera"></i>
              <span>${image.photographer}</span>
            </div>
            <button><i class="fa-solid fa-download"></i></button>
          </div>
        </li>
    `
    )
    .join('');
};
const getImages = (apiURL) => {
  loadmoreButton.innerText = 'Loading...';
  loadmoreButton.classList.add('disabled');
  fetch(apiURL, {
    headers: { Authorization: apiKey },
  })
    .then((res) => res.json())
    .then((data) => {
      genarateHTML(data.photos);
      loadmoreButton.innerText = 'Load More';
      loadmoreButton.classList.remove('disabled');
    });
};
const LoadMoreImage = () => {
  currentPage++;
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  getImages(apiURL);
};
const SearchInput = (e) => {
  if (e.target.value === '') return (temp = null);
  if (e.key === 'Enter') {
    currentPage = 1;
    temp = e.target.value;
    imageWrapper.innerHTML = '';
    getImages(
      `https://api.pexels.com/v1/search?query=${temp}&page=${currentPage}&per_page=${perPage}`
    );
  }
};
getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);
loadmoreButton.addEventListener('click', LoadMoreImage);
loadSearchInput.addEventListener('keyup', SearchInput);
