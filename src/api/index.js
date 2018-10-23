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

export function fetch (child) {
  return new Promise((resolve, reject) => {
    api.child(child).once('value', snapshot => {
      const val = snapshot.val() // why const here?
      resolve(val)
    }, reject)
  })
}
