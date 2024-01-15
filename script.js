const API_KEY = 'eGiFU9oI3n6viDsHc1NUxFlrQvY5LX';
const url = "https://newsapi.in/newsapi";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}/news.php?key=${API_KEY}&category=hindi&q=${query}`);
    console.log(`https://newsapi.in/newsapi/news.php?key=${API_KEY}&category=hindi&q=${query}`)
    const data = await res.json();
    console.log(data.News);
    bindData(data.News);
}

function bindData(News) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    News.forEach((news) => {
        if (!news.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, news);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, news) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = news.image;
    newsTitle.innerHTML = news.title;
    newsDesc.innerHTML = news.description;

    const date = new Date(news.published_date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(news.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});