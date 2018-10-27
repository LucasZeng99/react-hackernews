import { Object } from 'core-js';

let itemStore = {

}

export function updateItemStore(item) {
  // console.log("updating item store")
  Object.assign(itemStore, item)
}

export function fetchItemFromStore (id) {
  // console.log("fetching from store with id ", id, "got stuff ", itemStore[id], "length is now ", Object.keys(itemStore))
  return itemStore[id]
}