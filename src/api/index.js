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

function fetch (child) {
  return new Promise((resolve, reject) => {
    api.child(child).once('value', snapshot => {
      const val = snapshot.val() // why const here?
      resolve(val)
    }, reject)
  })
}

export function fetchIDsByType (type) {
  return fetch(`${type}stories`)
}
// chekcout https://github.com/HackerNews/API on the bottoms.
// database snapshots: https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
export function fetchItemsByIds (ids) {
  return Promise.all(ids.map(id => fetch(`item/${id}`)))
}