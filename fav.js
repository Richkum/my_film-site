function displayFavorites() {
  const favoritesContainer = document.querySelector(".container");

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length > 0) {
    favoritesContainer.innerHTML = "";

    favorites.forEach((movie) => {
      favoritesContainer.innerHTML += `
      <div class="movie">
      <div>
        <p>${movie.year}</p>
      </div>
      <div>
        <img src="${movie.poster}" />
      </div>
      <div>
        <span>${movie.type}</span>
        <h3><a href="${getMovieLink(movie.imdbID)}" target="_blank">${
        movie.title
      }</a></h3>
        <button onclick="removeFromFavorites('${
          movie.imdbID
        }')" class="addToFavoritesBtn">remove from favorites</button>
      </div>
    </div>
          `;
    });
  } else {
    favoritesContainer.innerHTML = "<p id='p'>No favorite movies yet.</p>";
  }
}
displayFavorites();

function getMovieLink(imdbID) {
  return `https://www.imdb.com/title/${imdbID}/`;
}
getMovieLink();

// function getMoviePoster(imdbID) {
//   // You might need to fetch the poster using IMDb ID from another source
//   // For simplicity, this function returns a placeholder image
//   return `https://via.placeholder.com/100x150?text=No+Image`;
// }

function removeFromFavorites(imdbID) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);

  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  displayFavorites();
}

// const removeButton = document.getElementById(`remove-${movie.imdbID}`);
// removeButton.addEventListener("click", () => removeFromFavorites(movie.imdbID));
