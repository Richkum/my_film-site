const searchIcon = document.getElementById("searchicon");
const searchInput = document.getElementById("searchmovie");
const api_url = "https://www.omdbapi.com?apikey=cc1540e7";
const moviesContainer = document.querySelector(".container");

async function fetchInitialMovies() {
  const response = await fetch(`${api_url}&s=batman`);
  const data = await response.json();

  if (data.Response === "True") {
    const movies = data.Search;
    moviesContainer.innerHTML = "";

    movies.forEach((element) => {
      moviesContainer.innerHTML += `
        <div class="movie">
          <div>
            <p>${element.Year}</p>
          </div>
          <div>
            <img src="${element.Poster}" alt="${element.Title} Poster" />
          </div>
          <div>
            <span>${element.Type}</span>
            <h3><a href="${getMovieLink(element.imdbID)}" target="_blank">${
        element.Title
      }</a></h3>
      <button onclick="addToFavorites('${element.imdbID}', '${
        element.Title
      }')" class="addToFavoritesBtn">Add to Favorites</button>
          </div>
        </div>
      `;
    });
  } else {
    moviesContainer.innerHTML = "<p id='p'>No movies found.</p>";
  }
}

fetchInitialMovies();

async function searchMovies() {
  const title = searchInput.value.trim();

  if (title !== "") {
    const response = await fetch(`${api_url}&s=${title}`);
    const data = await response.json();
    console.log(data);

    if (data.Response === "True") {
      const movies = data.Search;
      moviesContainer.innerHTML = "";

      movies.forEach((element) => {
        moviesContainer.innerHTML += `
              <div class="movie">
                <div>
                  <p>${element.Year}</p>
                </div>
                <div>
                  <img src="${element.Poster}" alt="${element.Title} Poster" />
                </div>
                <div>
                  <span>${element.Type}</span>
                  <h3><a href="${getMovieLink(
                    element.imdbID
                  )}" target="_blank">${element.Title}</a></h3>
                  <button onclick="addToFavorites('${element.imdbID}', '${
          element.Year
        }', '${element.Poster}', '${element.Title}', '${
          element.Type
        }')" class="addToFavoritesBtn">Add to Favorites</button>
                </div>
              </div>
            `;
      });
    } else {
      moviesContainer.innerHTML = "<p id='p'>No movies found.</p>";
    }
  }
}
searchMovies();

function handleSearchKeyDown(event) {
  if (event.key === "Enter") {
    searchMovies();
  }
}
searchInput.addEventListener("keydown", handleSearchKeyDown);
searchMovies();

function getMovieLink(imdbID) {
  return `https://www.imdb.com/title/${imdbID}/`;
}
getMovieLink();

function addToFavorites(imdbID, year, poster, title, type) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.some((movie) => movie.imdbID === imdbID)) {
    favorites.push({ imdbID, year, poster, title, type });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${title} added to Favorites!`);
  } else {
    alert(`${title} is already in Favorites!`);
  }
}
function viewFavorites() {
  window.location.href = "fav.html";
}
