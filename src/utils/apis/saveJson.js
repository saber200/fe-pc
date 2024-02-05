import axios from "axios";

axios.defaults.baseURL = import.meta.env.DEV ? 'http://localhost:5000' : 'http://154.221.31.52:5000';

// 请求
const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})

export const query_list = (data) => {
  return axios({
    method: 'get',
    url: `/getMenus`,
    header: {
      'Content-type': 'application/json',
    }
  }).then(res => {
    return res
  })
}

export const saveMenus = (data, scrollType) => {
  return axios({
    method: 'post',
    url: `/saveMenus`,
    data: {
      data: data,
      scroll_type: scrollType
    },
    header: {
      'Content-type': 'application/json',
    }
  }).then(res => {
    return res;
  })
}

const saveJson = (data) => {
  axios({
    method: 'post',
    url: `/students`,
    data: {
      json: data,
      id: data.id
    },
    header: {
      'Content-type': 'application/json',
    }
  }).then(res => {
    return res;
  })
}

export const getJson = (id = 'index') => {
  return axios({
    method: 'get',
    url: `/students?id=${id}`,
  }).then(res => {
    return res;
  })
}

export default saveJson