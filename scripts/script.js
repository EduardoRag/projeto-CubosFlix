const body = document.querySelector("body");

const moviesListDiv = document.querySelector(".movies");

const arrowLeft = document.querySelector(".btn-prev");
const arrowRight = document.querySelector(".btn-next");

const movie = document.createElement("div");
const movieInfo = document.createElement("div");
const movieTitle = document.createElement("span");
const movieRating = document.createElement("span");
const movieStarRating = document.createElement("img");

movie.className = "movie";
movieTitle.className = "movie__title";
movieInfo.className = "movie__info";
movieRating.className = "movie__rating";
movieInfo.appendChild(movieTitle);
movieInfo.appendChild(movieRating);
movie.appendChild(movieInfo);
moviesListDiv.appendChild(movie);
movieRating.appendChild(movieStarRating);
const cardListOfMovies = document.getElementsByClassName("movie");

const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modal__body");
const modalTitle = document.querySelector(".modal__title");
const modalImg = document.querySelector(".modal__img");
const modalDescription = document.querySelector(".modal__description");
const modalGenres = document.querySelector(".modal__genres");
const teste2 = document.getElementsByClassName(".modal__genre");
const modalAverage = document.querySelector(".modal__average");

const highlightVideo = document.querySelector(".highlight__video");
const highlightTitle = document.querySelector(".highlight__title");
const highlightRating = document.querySelector(".highlight__rating");
const highlightGenres = document.querySelector(".highlight__genres");
const highlightLaunch = document.querySelector(".highlight__launch");
const highlightDescription = document.querySelector(".highlight__description");
const highlightVideoLink = document.querySelector(".highlight__video-link");

const searchMovieInput = document.querySelector("input");

const btnTheme = document.querySelector(".btn-theme");

const root = document.querySelector(":root");

let moviesPage = 1;
const MAX_PAGE = 3;
const MIN_PAGE = 1;
let teste = 0;

let movieData = [];
let searchMovieData = [];

const darkMode = () => {
    root.style.setProperty("--background", "#1B2028");
    root.style.setProperty("--bg-secondary", "#2D3440");
    root.style.setProperty("--text-color", "#FFFFFF");

    btnTheme.src = "./assets/dark-mode.svg";
    arrowRight.src = "./assets/arrow-right-light.svg";
    arrowLeft.src = "./assets/arrow-left-light.svg";

    localStorage.setItem("theme", "dark");
}

const lightMode = () => {
    root.style.setProperty("--background", "#FFFFFF");
    root.style.setProperty("--bg-secondary", "#FFFFFF");
    root.style.setProperty("--text-color", "#1B2028");

    localStorage.setItem("theme", "ligh");

    btnTheme.src = "./assets/light-mode.svg";
    arrowRight.src = "./assets/arrow-right-dark.svg";
    arrowLeft.src = "./assets/arrow-left-dark.svg";
}

const addGenre = (movie) => {
    genres = movie.data.genres
    for (let i = 0; i < genres.length; i++) {
        const modalGenreSpan = document.createElement("span");
        modalGenreSpan.className = "modal__genre";
        modalGenreSpan.textContent = genres[i].name;
        modalGenres.appendChild(modalGenreSpan);
    }
}

const removeGenre = () => {
    while (modalGenres.firstChild) {
        modalGenres.removeChild(modalGenres.firstChild);
    }
}

const checkLocalStorageTheme = () => {
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        return darkMode();
    }

    if (!currentTheme || currentTheme === "light") {
        return lightMode();
    }
}

const fillListOfMovies = (data) => {
    moviesListDiv.innerHTML = "";
    const moviesListEnd = 6 * moviesPage;
    const moviesListStart = 6 * (moviesPage - 1);

    for (let i = moviesListStart; i < moviesListEnd; i++) {
        const movie = document.createElement("div");
        movie.className = "movie";
        movie.style.backgroundImage = `url(${data[i].poster_path})`;

        const movieInfo = document.createElement("div");
        movieInfo.className = "movie__info";

        const movieTitle = document.createElement("span");
        movieTitle.className = "movie__title";
        movieTitle.textContent = data[i].title;

        const movieRating = document.createElement("span");
        movieRating.className = "movie__rating";
        movieRating.textContent = data[i].vote_average.toFixed(1);

        const movieStarRating = document.createElement("img");
        movieStarRating.src = "./assets/estrela.svg";
        movieStarRating.alt = "Estrela";

        movieInfo.appendChild(movieTitle);
        movieInfo.appendChild(movieRating);
        movieRating.appendChild(movieStarRating);
        movie.appendChild(movieInfo);
        moviesListDiv.appendChild(movie);
    }

    for (let i = 0, o = moviesListStart; i < cardListOfMovies.length, o < moviesListEnd; i++, o++) {
        cardListOfMovies[i].addEventListener("click", async () => {
            modal.classList.remove("hidden");


            currentMovie = movieData[o].id;
            currentModalMovie = await modalMovie(currentMovie);
            fillModal(currentModalMovie);
        });
    }
}

const fillModal = (position) => {
    modalTitle.textContent = position.data.title;
    modalImg.src = position.data.backdrop_path;
    modalDescription.textContent = position.data.overview;
    modalAverage.textContent = position.data.vote_average.toFixed(1);

    addGenre(position);
}

const searchMovie = (data) => {
    moviesListDiv.innerHTML = "";
    const moviesListEnd = 6 * moviesPage;
    const moviesListStart = 6 * (moviesPage - 1);

    for (let i = moviesListStart; i < moviesListEnd; i++) {
        const movie = document.createElement("div");
        movie.className = "movie";
        movie.style.backgroundImage = `url(${data[i].poster_path})`;

        const movieInfo = document.createElement("div");
        movieInfo.className = "movie__info";

        const movieTitle = document.createElement("span");
        movieTitle.className = "movie__title";
        movieTitle.textContent = data[i].title;

        const movieRating = document.createElement("span");
        movieRating.className = "movie__rating";
        movieRating.textContent = data[i].vote_average.toFixed(1);

        const movieStarRating = document.createElement("img");
        movieStarRating.src = "./assets/estrela.svg";
        movieStarRating.alt = "Estrela";

        movieInfo.appendChild(movieTitle);
        movieInfo.appendChild(movieRating);
        movieRating.appendChild(movieStarRating);
        movie.appendChild(movieInfo);
        moviesListDiv.appendChild(movie);
    }

    for (let i = 0, o = moviesListStart; i < cardListOfMovies.length, o < moviesListEnd; i++, o++) {
        cardListOfMovies[i].addEventListener("click", async () => {
            modal.classList.remove("hidden");

            currentMovie = searchMovieData[o].id;
            currentModalMovie = await modalMovie(currentMovie);
            fillModal(currentModalMovie);
        });
    }
}

const modalMovie = async (req, res) => {
    try {
        const response = await api.get(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${req}?language=pt-BR`, {});

        return response;

    } catch (error) {
        return res.json(error.data);
    }
}

const moviesList = async (req, res) => {
    try {
        const response = await api.get("/discover/movie?language=pt-BR&include_adult=false", {});
        movieData = response.data.results;

        checkLocalStorageTheme();
        fillListOfMovies(movieData);
    } catch (error) {

    }
}

const movieOfTheDay = async (req, res) => {
    try {
        const response = await api.get("/movie/436969?language=pt-BR", {});
        dayMovie = response.data;

        genres = dayMovie.genres.map(x => x.name).join(", ");

        highlightVideo.style.backgroundImage = `url(${dayMovie.backdrop_path})`;
        highlightVideo.style.backgroundSize = "cover";
        highlightTitle.textContent = dayMovie.title;
        highlightRating.textContent = dayMovie.vote_average.toFixed(1);
        highlightGenres.textContent = genres;

        const options = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        releaseDate = new Date(dayMovie.release_date);
        highlightLaunch.textContent = releaseDate.toLocaleDateString("pt-GB", options);
        highlightDescription.textContent = dayMovie.overview;

    } catch (error) {

    }
}

const movieTrailer = async (req, res) => {
    const response = await api.get("/movie/436969/videos?language=pt-BR", {});

    trailer = response.data.results;

    highlightVideoLink.href = `https://www.youtube.com/watch?v=${trailer[1].key}`;
}

const searchForMovie = async (req, res) => {
    try {
        const response = await api.get(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${req}`, {});
        searchMovieData = response.data.results;

        searchMovie(searchMovieData);

    } catch (error) {
        return res.json(error.data);
    }
}

searchMovieInput.addEventListener("keydown", (event) => {
    query = searchMovieInput.value;

    if (event.key !== "Enter") {
        return;
    }

    if (query === "") {
        moviesPage = 1;
        searchMovieData = [];
        return moviesList();
    }


    moviesPage = 1;
    searchMovieInput.value = "";
    searchForMovie(query);


});

modal.addEventListener("click", () => {
    modal.classList.add("hidden");
    removeGenre();
});

arrowRight.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();

    moviesPage++;
    if (moviesPage > MAX_PAGE) {
        moviesPage = MIN_PAGE;
    }

    if (searchMovieData.length > 0) {
        return searchMovie(searchMovieData);
    }

    return fillListOfMovies(movieData);
});

arrowLeft.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();

    moviesPage--;
    if (moviesPage < MIN_PAGE) {
        moviesPage = MAX_PAGE;
    }

    if (searchMovieData.length > 0) {
        return searchMovie(searchMovieData);
    }
    fillListOfMovies(movieData);
});

btnTheme.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();

    const currentTheme = root.style.getPropertyValue("--background");

    if (!currentTheme || currentTheme === "#FFFFFF") {
        return darkMode();
    }

    return lightMode();
});

moviesList();
movieOfTheDay();
movieTrailer();