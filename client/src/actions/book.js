import api from '../utils/apiProxy'

//返回一个action对象，用来关联对应的reducer，将data保存到store。
const sync = (data) => ({
  type: 'SYNCBOOK',
  data
})

export const getAll = () => async (dispatch, getState) => {
  api.get('/api/book/getAll').then(data => dispatch(sync(data)))
}

export const add = (book) => async (dispatch, getState) => {
  api.post('/api/book/add', book).then(() => dispatch(getAll()))
}

export const deleteItem = (name) => async (dispatch, getState) => {
  api.post('/api/book/delete/' + name).then(() => dispatch(getAll()))
}

export function clear() {
  return { type: 'CLEAR' }
}

//更新数据，同时刷新数据
export const update = (book) => async (dispatch, getState) => {
  api.post('/api/book/update', book).then(() => dispatch(getAll()))
}

export const search = (keyWords) => async (dispatch, getState) => {
  api.get('/api/book/search/' + keyWords).then(data => dispatch(sync(data)))
}

