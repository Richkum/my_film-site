async function getMoviePoster(imdbID) {
  const apiKey = "cc1540e7";
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Poster && data.Poster !== "N/A") {
      return data.Poster;
    } else {
      return "https://via.placeholder.com/100x150?text=No+Image";
    }
  } catch (error) {
    console.error("Error fetching movie poster:", error);
    return "https://via.placeholder.com/100x150?text=Error";
  }
}

async function displayFavorites() {
  const favoritesContainer = document.querySelector(".container");

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length > 0) {
    favoritesContainer.innerHTML = "";

    for (const movie of favorites) {
      const posterUrl = await getMoviePoster(movie.imdbID);

      favoritesContainer.innerHTML += `
      <div class="movie">
      <div>
        <p>{movie.Year}</p>
      </div>
      <div>
      <img src="${posterUrl}" alt="${movie.title} Poster" />
      </div>
      <div>
        <span>{movie.Type}</span>
        <h3><a href="${getMovieLink(movie.imdbID)}" target="_blank">${
        movie.title
      }</a></h3>
        <button onclick="removeFromFavorites('${
          movie.imdbID
        }')" class="addToFavoritesBtn">remove from favorites</button>
      </div>
    </div>
      `;
    }
  } else {
    favoritesContainer.innerHTML = "<p id='p'>No favorite movies yet.</p>";
  }
}

displayFavorites();

function getMovieLink(imdbID) {
  return `https://www.imdb.com/title/${imdbID}/`;
}
getMovieLink();

function removeFromFavorites(imdbID) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);

  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  displayFavorites();
}

function clearFavorites() {
  localStorage.removeItem("favorites");
  displayFavorites();
}
