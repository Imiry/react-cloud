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


//逗号隔开的数字格式化
export const format_number = (n) => {
  var b = parseInt(n).toString();
  var len = b.length;
  if (len <= 3) { return b; }
  var r = len % 3;
  // b.slice(r,len).match(/\d{3}/g).join(",") 每三位数加一个逗号。
  return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",")
    : b.slice(r, len).match(/\d{3}/g).join(",");


  // if (textValue === '') return '';
  // var textValueFormat = Number(textValue);
  // if (!isNaN(textValueFormat)) {
  //   return textValueFormat.toLocaleString('en-US');
  // } else {
  //   return textValue;
  // }
}
console.log(format_number(100000))

