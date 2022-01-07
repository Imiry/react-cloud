import axios from 'axios'




/**
 * get
 * @param url
 * @param data
 * @returns {Promise}
 */

const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then(res => {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * post
 * @param url
 * @param data
 * @returns {Promise}
 */

const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      res => {

        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      err => {
        reject(err)
      },
    )
  })
}

/**
 * put
 * @param url
 * @param data
 * @returns {Promise}
 */

const put = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      res => {

        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      err => {
        reject(err)
      },
    )
  })
}

/**
 * del
 * @param url
 * @param data
 * @returns {Promise}
 */

const del = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err)
      })
  });
}
/**
 * patch
 * @param url
 * @param data
 * @returns {Promise}
 */

const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      res => {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      err => {
        reject(err)
      },
    )
  })
}

const request = {
  get,
  post,
  put,
  del,
  patch,
  axios,
}

export default request
