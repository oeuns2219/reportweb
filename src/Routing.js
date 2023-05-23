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

class Routing extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route index element={<Layout />}/>
          <Route exact path='/noticelist' element={<Notices />}/>
          <Route exact path='/noticelist/notice' element={<Notice />}/>
          <Route exact path='/noticeList/write' element={<Write />}/>
          <Route exact path='/reportlist' element={<App />}/>
          <Route exact path='/reportlist/report'element={<Report />}/>
        </Routes>
      </Router>
    )
  }
}
export default Routing;