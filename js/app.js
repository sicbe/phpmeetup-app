
const BASE_URL = "http://phpmeetup-server.dev/api/"
const LOGIN_URL = BASE_URL + 'login/'
const QUOTE_URL = BASE_URL + 'quotes/'


new Vue({
  el: '#app',
  created () {
    if (localStorage.getItem('token') === null) {
      localStorage.setItem('token', '')
    } else if (localStorage.getItem('token') != '') {
      this.token = localStorage.getItem('token')
      this.getQuotes()
    }
  },
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
    config () {
      return {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }
    }
  },
  methods: {
    login () {
      this.loading = true

      axios.post(LOGIN_URL, this.userform)
      .then(res=>{
        this.token = res.data.token
        this.userform = { email: '', password: '' } 
        this.loading = false
        this.getQuotes();
      })
      .catch(res => {
        this.loading = false
        this.userform.password = ''
      })
    },
    addQuote () {
      axios.post(QUOTE_URL, this.newQuote, this.config)
      .then(res => {
        console.log('added!')
      })
      this.quotes.unshift(this.newQuote);
      this.newQuote = {
        name: '',
        quote: ''
      }
    },
    deleteQuote (quote) {
      axios.delete(QUOTE_URL+quote.id, this.config)
      .then(res => {
        console.log('deleted!')
      })
      index = this.quotes.indexOf(quote);
      this.quotes.splice(index, 1);
    },
    logout () {
      this.token = ''
      this.quotes = [];
    },
    getQuotes () {
      axios.get(QUOTE_URL, this.config)
      .then(res => {
        this.quotes = res.data
      })
    }
  },
  watch: {
    token: function (newToken) {
      localStorage.setItem('token', newToken)
    }
  }
})