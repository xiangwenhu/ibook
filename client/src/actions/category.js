import api from '../utils/apiProxy'

//返回一个action对象，用来关联对应的reducer，将data保存到store。
const sync = (data) => ({
  type: 'SYNCCATEGORY',
  data
})

export const getAll = () => async (dispatch, getState) => {
  api.get('/api/category/getAll').then(data => dispatch(sync(data)))
}

export const add = (category) =>  async (dispatch, getState) => {
   api.post('/api/category/add',category).then(()=>dispatch(getAll()))
}

export const deleteItem = (name) => async (dispatch, getState) => {
  api.post('/api/category/delete/' + name).then(()=>dispatch(getAll()))
}

export function clear() {
  return { type: 'CLEAR' }
}

//更新数据，同时刷新数据
export const update = (category) => async (dispatch, getState) => {
  api.post('/api/category/update',category).then(()=>dispatch(getAll()))
}

