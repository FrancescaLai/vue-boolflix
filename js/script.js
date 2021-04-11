var app = new Vue({
  el: "#root",
  data: {
    movies: [],
    searchMovie: ""
  },
  methods: {
    search: function(){
      axios.get('https://api.themoviedb.org/3/search/movie',{
        params: {
          api_key: "63adf4dc8b14837feb63c3cb75abb457",
          query: this.searchMovie,
          page: 1,
          include_adult: false,
          language: "en-US",
        }
      })
      .then((risposta) =>{
        this.movies = risposta.data.results;
        console.log(risposta);
        this.searchMovie = "";
      })
    },

  }
});
