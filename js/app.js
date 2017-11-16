
const BASEURL = "http://phpmeetup-server.dev/api/";

new Vue({
  el: '#app',
  data: {
    userform: {
      email: '',
      password: ''
    },
    token: '',
    newQuote: {
      name: '',
      quote: ''
    },
    quotes: [
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
    }
  },
  methods: {
    login () {
      if (this.userform.email == 'bertlempens@gmail.com'
          && this.userform.password == 'secret') {
        this.token = 'thisisatest'
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
    }
  }
})