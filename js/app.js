
const BASEURL = "http://phpmeetup-server.dev/api";

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

      axios.post(BASEURL+'/login', this.userform)
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
      axios.post(BASEURL+'/quotes', this.newQuote, this.config)
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
      axios.delete(BASEURL+'/quotes/'+quote.id, this.config)
      .then(res => {
        console.log('deleted!')
      })
      index = this.quotes.indexOf(quote);
      this.quotes.splice(index, 1);
    },
    logout () {
      this.token = '';
      this.quotes = [];
    },
    getQuotes () {
      axios.get(BASEURL+'/quotes', this.config)
      .then(res => {
        this.quotes = res.data
      })
    }
  }
})