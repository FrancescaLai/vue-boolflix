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
    allshows: [],
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
          this.movies[i].vote_average = Math.ceil(this.movies[i].vote_average / 2);
        };
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
          this.series[i].vote_average = Math.ceil(this.series[i].vote_average / 2);
        };
      });
      let allshows = [...this.movies, ...this.series];
    },
  }
});
