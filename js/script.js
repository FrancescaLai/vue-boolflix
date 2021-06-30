var app = new Vue({
  el: "#root",
  data: {
    apiKey: "63adf4dc8b14837feb63c3cb75abb457",
    url: 'https://api.themoviedb.org/3/search/',
    languages: [
      "en-US",
      "it-IT",
      "fr-FR",
      "de-DE",
      "es-ES"
    ],
    languageIndex: 0,
    movies: [],
    searchMovie: "",
    series: [],
    allShows: [],
  },
  methods: {
    search: function(){
      axios.get( this.url + 'movie', {
        params: {
          api_key: this.apiKey,
          query: this.searchMovie,
          language: this.languages[this.languageIndex],
          page: 1,
          include_adult: false
        }
      })
      .then((risposta) =>{
        this.movies = risposta.data.results;
        for (var i = 0; i < this.movies.length; i++) {
          // qui ho provato ho rendere il numero intero con ParseInt (entrambi i metodi funzionano)
          this.movies[i].vote_average = parseInt(this.movies[i].vote_average / 2);
        }
        this.allShows = [...this.allShows, ...this.movies];
        this.allShows.sort((a, b) => {
          return a.vote_average - b.vote_average;
        });
      });

      axios.get( this.url + 'tv', {
        params: {
          api_key: this.apiKey,
          query: this.searchMovie,
          language: this.languages[this.languageIndex],
          page: 1,
          include_adult: false
        }
      })
      .then((risposta) =>{
        this.series = risposta.data.results;
        for (var i = 0; i < this.series.length; i++) {
          // qui ho provato ho rendere il numero intero con Math.Ceil (entrambi i metodi funzionano)
          this.series[i].vote_average = Math.ceil(this.series[i].vote_average / 2);
        }
        this.allShows = [...this.allShows, ...this.series];
        this.allShows.sort((a, b) => {
          return a.vote_average - b.vote_average;
        });
      });
    },
  }
});
