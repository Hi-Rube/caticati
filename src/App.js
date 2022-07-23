import React, { useState, useEffect } from 'react';
import './app.css';

//tarui
const {
  isPermissionGranted,
  requestPermission,
  sendNotification
} = require('@tauri-apps/api/notification');

export default () => {

  const [catiTime, setCatiTime] = useState('');
  const [randomNum, setRandomNum] = useState(0);

  useEffect(() => {
    setInterval(() => {
      const time = new Date().toLocaleString();
      const num = (Math.random() * 100).toFixed(0);
      setCatiTime(time);
      setRandomNum(num);

      if (+num % 5 === 0) {
        if (window.__TAURI__ && window.__TAURI__.invoke) {
          const invoke = window.__TAURI__.invoke
          invoke('custom_notice', { text: '当前数字' + num }).then(async response => {

            let permissionGranted = await isPermissionGranted();
            if (!permissionGranted) {
              const permission = await requestPermission();
              permissionGranted = permission === 'granted';
            }
            if (permissionGranted) {
              sendNotification({ title: '数字通知', body: response });
            }
          });
        }
      }
    }, 1000)
  }, [])

  return (
    <div id="App">
      <div className="time">
        北京时间: {catiTime}
      </div>
      <div className='random-num'>
        {randomNum}
      </div>
    </div>
  );
};
