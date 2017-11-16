
const BASEURL = "http://phpmeetup-server.dev/api/";

new Vue({
  el: '#app',
  data: {
    loading: false,
    userform: {
      email: '',
      password: ''
    },
    token: '',
    newQuote: {
      name: '',
      quote: ''
    },
    quotes: []
  },
  computed: {
    canLogin () {
      if (this.userform.email.length > 0 && this.userform.password.length > 0) {
        return true;
      }
      
      return false;
    },
    canAddQuote () {
      if (this.newQuote.name.length > 0 && this.newQuote.quote.length > 0) {
        return true;
      }

      return false;
    },
    config () {}
  },
  methods: {
    login () {
      this.loading = true
      if (this.userform.email == 'bertlempens@gmail.com'
          && this.userform.password == 'secret') {
        this.userform = { email: '', password: '' }
        this.token = 'thisisatest'
        this.loading = false
        this.getQuotes();
      }
    },
    addQuote () {
      this.quotes.unshift(this.newQuote);
      this.newQuote = {
        name: '',
        quote: ''
      }
    },
    deleteQuote (quote) {
      index = this.quotes.indexOf(quote);
      this.quotes.splice(index, 1);
    },
    logout () {
      this.token = '';
      this.quotes = [];
    },
    getQuotes () {
      this.loading = true
      this.quotes = [
        {
          name: 'Jeff Atwood',
          quote: 'There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.'
        },
        {
          name: 'Jeff Atwood',
          quote: 'There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.'
        },
        {
          name: 'Jeff Atwood',
          quote: 'There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.'
        },
        {
          name: 'Jeff Atwood',
          quote: 'There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.'
        },
        {
          name: 'Jeff Atwood',
          quote: 'There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.'
        }
      ]
      this.loading = false
    }
  }
})