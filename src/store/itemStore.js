import { fetchItemById } from '../api'

export function initItemStore (id) {
  return fetchItemById(id)
}


