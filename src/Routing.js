import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import App from './App';
import Report from './Report';
import Layout from './Layout';
import Notices from './Notices';
import Notice from './Notice';
import Write from './Write';
import Login from './Login';
import Share from './Share';
import Share1 from './Share2';

class Routing extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route index element={<Login />}/>
          <Route exact path='/home' element={<Layout />}/>
          <Route exact path='/home/noticelist' element={<Notices />}/>
          <Route exact path='/home/noticelist/notice' element={<Notice />}/>
          <Route exact path='/home/noticeList/write' element={<Write />}/>
          <Route exact path='/home/reportlist' element={<App />}/>
          <Route exact path='/home/reportlist/report' element={<Report />}/>
          <Route exact path='/home/reportlist/report/share' element={<Share />}/>
          <Route exact path='/home/reportlist/report/share1' element={<Share1 />}/>
        </Routes>
      </Router>
    )
  }
}
export default Routing;