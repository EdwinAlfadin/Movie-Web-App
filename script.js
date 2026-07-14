const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ec2e2950f78fee5f76532e522ffeb112";

const HOME_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ec2e2950f78fee5f76532e522ffeb112";

const NOW_PLAYING_API =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=ec2e2950f78fee5f76532e522ffeb112";

const POPULAR_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=ec2e2950f78fee5f76532e522ffeb112";

const TOP_RATED_API =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=ec2e2950f78fee5f76532e522ffeb112";

const TRENDING_API =
  "https://api.themoviedb.org/3/trending/movie/week?api_key=ec2e2950f78fee5f76532e522ffeb112";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=ec2e2950f78fee5f76532e522ffeb112&query=";

const home = document.getElementById("home");
const nowPlaying = document.getElementById("now-playing");
const popular = document.getElementById("popular");
const topRated = document.getElementById("top-rated");
const trending = document.getElementById("trending");

const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const movies = document.getElementById("movies");

const search = document.getElementById("search");

const prevHeroBtn = document.getElementById("prevHero");

const nextHeroBtn = document.getElementById("nextHero");

const GENRE_API =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=ec2e2950f78fee5f76532e522ffeb112&query=";

let genres = [];

let currentHeroId = null;
let heroMovies = [];
let currentHeroIndex = 0;

async function loadGenres() {
  const res = await fetch(GENRE_API);
  const data = await res.json();
  genres = data.genres;
}

loadGenres();

// Event Listener //
home.addEventListener("click", () => {
  getMovies(HOME_API);
});
nowPlaying.addEventListener("click", () => {
  getMovies(NOW_PLAYING_API);
});
popular.addEventListener("click", () => {
  getMovies(POPULAR_API);
});
topRated.addEventListener("click", () => {
  getMovies(TOP_RATED_API);
});
trending.addEventListener("click", () => {
  getMovies(TRENDING_API);
});

// Ambil data film saat halaman pertama kali dibuka //
getMovies(API_URL);
async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    heroMovies = data.results;
    showMovies(data.results);
    showHero(data.results[0]);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    movies.innerHTML = "<h2>Gagal memuat data film.</h2>";
  }
}

function showMovies(data) {
  movies.innerHTML = "";

  data.forEach((movie) => {
    const card = document.createElement("div");

    card.classList.add("movie");

    card.innerHTML = `
<img src="${movie.poster_path ? IMG_PATH + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Image"}" alt="${movie.title}">

<div class="movie-info">

<div>

<h3>${movie.title}</h3>

<small>Release : ${movie.release_date}</small>

</div>

<span class="rating ${getColor(movie.vote_average)}">

${movie.vote_average}

</span>

</div>

`;

    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      window.location.href = `detail.html?id=${movie.id}`;
    });

    movies.appendChild(card);
  });
}

function showHero(movie) {
  currentHeroId = movie.id;

  const hero = document.getElementById("hero");

  hero.style.backgroundImage = `url(${IMG_PATH + movie.backdrop_path})`;

  document.getElementById("hero-title").textContent = movie.title;

  document.getElementById("hero-overview").textContent = movie.overview;

  document.getElementById("hero-rating").textContent =
    `⭐ ${movie.vote_average}`;

  document.getElementById("hero-release").textContent =
    `Release : ${movie.release_date}`;

  const genreNames = movie.genre_ids
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .join(" • ");

  document.getElementById("hero-genre").textContent = genreNames;
}

function nextHero() {
  currentHeroIndex++;
  if (currentHeroIndex >= heroMovies.length) {
    currentHeroIndex = 0;
  }

  showHero(heroMovies[currentHeroIndex]);
}

function prevHero() {
  currentHeroIndex--;
  if (currentHeroIndex < 0) {
    currentHeroIndex = heroMovies.length - 1;
  }

  showHero(heroMovies[currentHeroIndex]);
}

function getColor(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 6) {
    return "orange";
  } else {
    return "red";
  }
}

search.addEventListener("keyup", (e) => {
  const keyword = e.target.value;

  if (keyword) {
    getMovies(SEARCH_API + keyword);
  } else {
    getMovies(API_URL);
  }
});

const detailBtn = document.getElementById("detailBtn");

detailBtn.addEventListener("click", () => {
  if (currentHeroId) {
    window.location.href = `detail.html?id${currentHeroId}`;
  }
});

const watchBtn = document.getElementById("watchBtn");

watchBtn.addEventListener("click", () => {
  if (currentHeroId) {
    window.location.href = `detail.html?id=${currentHeroId}`;
  }
});

setInterval(() => {
  if (heroMovies.length > 0) {
    nextHero();
  }
}, 5000);

nextHeroBtn.addEventListener("click", () => {
  nextHero();
});

prevHeroBtn.addEventListener("click", () => {
  prevHero();
});
