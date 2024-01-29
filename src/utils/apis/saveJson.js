import axios from "axios";

// 请求
const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})

export const query_list = (data) => {
  return axios({
    method: 'get',
    url: 'http://154.221.31.52:5000/getMenus',
    header: {
      'Content-type': 'application/json',
    }
  }).then(res => {
    return res
  })
}

export const saveMenus = (data) => {
  axios({
    method: 'post',
    url: 'http://154.221.31.52:5000/saveMenus',
    data: {
      data: data
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
    url: 'http://154.221.31.52:5000/students',
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
    url: `http://154.221.31.52:5000/students?id=${id}`,
  }).then(res => {
    return res;
  })
}

export default saveJson