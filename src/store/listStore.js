import { fetchIDsByType, fetchItemsByIds } from '../api'

/**
 * listStore: 
 *  store fetched data from api,
 *  control displayed/active items in a list view.
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
    "job": []
  },
  activeItems: [],
  page: 1,
  type: ''
}

export function initListStore(type) {
  // console.log(listStore.items[type])
  if (listStore.items[type].length > 1) {
    return new Promise((resolve, reject) => {
      updateActiveItems(1, type)
      resolve([listStore.activeItems, getMaxPage(type)])
    })
  }
  else {
    return new Promise((resolve, reject) => {
      fetchIDsByType(type)
        .then(ids => fetchItemsByIds(ids))
        .then(items => {
          // items is [Object: 500] each a story content object.
          updateListStore(type, 1, items)
          resolve([listStore.activeItems, getMaxPage(type)]) // allow component to change loacl items with then()
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
}
function getMaxPage (type) {
  return Number.parseInt(listStore.items[type].length / itemPerPage) + (listStore.items[type].length % itemPerPage > 0)
}

function updateListStore (type, page, items) {
  listStore.items[type] = items
  listStore.page = page
  listStore.type = type
  // listStore.allItems.push(...items)
  updateActiveItems(page, type) // change active items according to page.
  console.log("listStore updated: ", listStore)
}

function updateActiveItems(page, type=listStore.type) {
  // will update according to both type and page.
  listStore.type = type
  if (page < 1) page = 1
  let start = (page - 1) * itemPerPage
  let end = (page) * itemPerPage

  console.log("will slice from ", start, end, type)
  listStore.activeItems = listStore.items[type].slice(start, end).filter(_ => _)
}

export function getActiveItemsByPage(page) {
  // only called when page changes.
  updateActiveItems(page, listStore.type)
  return listStore.activeItems
}
