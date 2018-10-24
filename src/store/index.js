import { fetchIDsByType, fetchItemsByIds } from '../api'

/**
 * store: 
 *  store fetched data from api,
 *  cache them.
 *  
 *  expose API to ListView Components.
 *  expose API to ItemView components.
 * 
 *  TODO: use object to store multiple type of lists.
 */
const itemPerPage = 20
let listStore = {
  items: {
    "top": [],
    "new": [],
    "show": [],
    "ask": [],
    "jobs": []
  },
  activeItems: [],
  page: 1,
  type: ''
}

export function storeInitialItems(type) {
  // console.log(listStore.items[type])
  if (listStore.items[type].length > 1) {
    return new Promise((resolve, reject) => {
      updateActiveItems(1, type)
      console.log(listStore.activeItems)
      resolve(listStore.activeItems)
    })
  }
  else {
    return new Promise((resolve, reject) => {
      fetchIDsByType(type)
        .then(ids => fetchItemsByIds(ids))
        .then(items => {
          // items is [Object: 500] each a story content object.
          updataListStore(type, 1, items) // TODO: cache fetched types. => using items as an object
          resolve(listStore.activeItems) // allow component to change loacl items with then()
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
}

function updataListStore (type, page, items) {
  listStore.items[type] = items
  listStore.page = page
  listStore.type = type
  updateActiveItems(page, type) // change active items according to page.
  console.log("listStore updated: ", listStore)
}

function updateActiveItems(page, type) {
  // will update according to both type and page.
  if (page < 1) page = 1
  let start = (page - 1) * itemPerPage
  let end = (page) * itemPerPage
  console.log("will slice from ", start, end)
  listStore.activeItems = listStore.items[type].slice(start, end).filter(_ => _)
}

export function getActiveItemsByPage(page) {
  // only called when page changes.
  updateActiveItems(page, listStore.type)
  return listStore.activeItems
}