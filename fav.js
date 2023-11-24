// Function to fetch and display favorite movies
function displayFavorites() {
  const favoritesContainer = document.querySelector(".movie");

  // Get favorites from local storage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length > 0) {
    favoritesContainer.innerHTML = ""; // Clear previous favorites

    favorites.forEach((movie) => {
      favoritesContainer.innerHTML += `
            <div class="favorite">
              <h3>${movie.title}</h3>
              <button onclick="removeFromFavorites('${movie.imdbID}')" id="btn">Remove from Favorites</button>
            </div>
          `;
    });
  } else {
    favoritesContainer.innerHTML = "<p>No favorite movies yet.</p>";
  }
}

// Call the function to display favorite movies
displayFavorites();
