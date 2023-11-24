const searchIcon = document.getElementById("searchicon");
const searchInput = document.getElementById("searchmovie");
const api_url = "http://www.omdbapi.com?apikey=cc1540e7";
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
          </div>
        </div>
      `;
    });
  } else {
    moviesContainer.innerHTML = "<p>No movies found.</p>";
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
                </div>
              </div>
            `;
      });
    } else {
      moviesContainer.innerHTML = "<p>No movies found.</p>";
    }
  }
}
searchMovies();

function getMovieLink(imdbID) {
  return `https://www.imdb.com/title/${imdbID}/`;
}

getMovieLink();
