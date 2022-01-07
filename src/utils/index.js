export const getStorage = key => {
  return localStorage.getItem(key)
}

export const setStorage = (key, value) => {
  return localStorage.setItem(key, value)
}

//数据延迟setTimeoutLoading
export const setTimeoutLoading = (fn, time) => {
  let timer = setTimeout(() => {
    if (timer) clearTimeout(timer)
    fn()
  }, time);
}