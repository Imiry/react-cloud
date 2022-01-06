import React, { useEffect, useState } from 'react'
import IndexRouter from './router/IndexRouter'
import './App.css'
import intl from 'react-intl-universal';

const locales = {
  en: require('./locales/en.json'),
  zh: require('./locales/zh.json')
}

function App(){
  const [initDone,setInitDone] = useState(false)
  useEffect(() => {
      intl.init({
        currentLocale: localStorage.getItem('lang_type') || 'zh',
        locales,
      }).then(() => {
        setInitDone(true)
      })
  }, [])
  return initDone && <IndexRouter></IndexRouter>
}
export default App

