import firebase from 'firebase/app'
import 'firebase/database'

function createAPI ({config, version}) {
  firebase.initializeApp(config)
  return firebase.database().ref(version)
}

const api = createAPI({
  version: '/v0',
  config: {
    databaseURL: 'https://hacker-news.firebaseio.com'
  }
})