import React from 'react';
import 'antd/dist/antd.css';
import MainRouter from '@/router/mainRouter.jsx'
import * as Sentry from '@sentry/react';
Sentry.init({
  dsn: "http://42d63c152d5648e3a680a700322a30ec@120.48.19.90:9000/3",
  logErrors:true,
  release: 'v1.0.5'
});
function App() {
  return (
    <MainRouter></MainRouter>
  );
}
export default App;
