const API_KEY = "ec2e2950f78fee5f76532e522ffeb112";

const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const movie = document.getElementById("movie-detail");

const id = new URLSearchParams(window.location.search).get("id");

const DETAIL_API = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

async function getMovie() {
  const res = await fetch(DETAIL_API);
  const data = await res.json();

  showMovie(data);
}

function showMovie(data) {
  movie.innerHTML = `
        <div class="detail-container">
            <img src="${IMG_PATH + data.poster_path}" alt="${data.title}">

            <div class="detail-info">
                <h1>${data.title}</h1>

                <p><strong>Release :</strong> ${data.release_date}</p>

                <p><strong>Rating :</strong> ⭐ ${data.vote_average}</p>

                <p><strong>Overview :</strong></p>

                <p>${data.overview}</p>

                <button onclick="history.back()">⬅️ Kembali</button>
            </div>
        </div>
    `;
}

getMovie();
