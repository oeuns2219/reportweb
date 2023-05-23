import './App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setuid } from './reducers/user';
import { database } from './firebase';
import { ref, child, onChildAdded } from 'firebase/database';

let reports = [];
const reportRef = child(ref(database), "reports");

function App() {

  const [state, setState] = useState('미접수');
  const [page, setPage] = useState(1);
  const [dummy, setDummy] = useState(1);
  const dispatch = useDispatch();

  function repCli(evt) {
    dispatch(setuid(evt.target.parentElement.id));
  }

  function unaCli() {
    document.getElementById('unabtn').style.backgroundColor = '#7e53d9';
    document.getElementById('probtn').style.backgroundColor = '#AC91E6';
    document.getElementById('resbtn').style.backgroundColor = '#AC91E6';
    setState('미접수');
    setPage(1);
  }

  function proCli() {
    document.getElementById('probtn').style.backgroundColor = '#7e53d9';
    document.getElementById('unabtn').style.backgroundColor = '#AC91E6';
    document.getElementById('resbtn').style.backgroundColor = '#AC91E6';
    setState('처리중');
    setPage(1);
  }

  function resCli() {
    document.getElementById('resbtn').style.backgroundColor = '#7e53d9';
    document.getElementById('probtn').style.backgroundColor = '#AC91E6';
    document.getElementById('unabtn').style.backgroundColor = '#AC91E6';
    setState('처리완료');
    setPage(1);
  }

  function downCli() {
    if (page > 1) setPage(page - 1);
  }
  
  function upCli() {
    if (reports.filter(report => report.state === state).length > page*4) setPage(page+1);
  }

  useEffect(()=>onChildAdded(reportRef, (snapshot) => {
    reports.unshift(snapshot.val())
    setTimeout(setDummy(dummy+1), 10000);
  }), []);

  const listReports = reports.filter(report => report.state === state).slice((page-1)*4,page*4).map(report => {

    const photolist = JSON.parse(report.photo);
    if (photolist.length === 0) photolist.push('https://th.bing.com/th/id/R.923babff12c4e08cc3db9e9143305b83?rik=S71iitc3knLN5Q&riu=http%3a%2f%2fgeojecci.korcham.net%2fimages%2fno-image01.gif&ehk=ztZd4ifLqQB%2bB%2fhDnfHNxKuZekmp7BYwrWa9UJGJmes%3d&risl=&pid=ImgRaw&r=0');
    const photo = photolist[0]

    return (
      <article className="App-report" id={report.uid}>
        <img src={photo} className="App-photo" alt="신고 사진"/>
        <section className='App-state'>{report.state}</section>
        <section className='App-detail'>{(report.detail.length > 40 ? report.detail.substring(0,40)+'...' : report.detail)}</section>
        <section className='App-type'>{report.type}</section>
        <section className='App-pos'>{report.position}</section>
        <section className='App-date'>{report.date}</section>
        <Link to='/reportlist/report' onClick={repCli} className='App-link'>자세히 보기</Link>
      </article>
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className='App-reportbox'>
          <div className='App-title'>주민신고내역</div>
          <div className='App-case'>
            <div className='App-sbtn'>
              <button className='App-filter' onClick={unaCli} id='unabtn'>미접수</button>
              <button className='App-filter' onClick={proCli} id='probtn'>처리중</button>
              <button className='App-filter' onClick={resCli} id='resbtn'>처리완료</button>
              <button className='App-filter' >공유됨</button>
            </div>
            {listReports}
          </div>
          <button className='App-down' onClick={downCli}>&lt;</button>
          <div className='App-page'>{page}</div>
          <button className='App-up' onClick={upCli}>&gt;</button>
          <Link className='App-bspace' to='/'>&#27;</Link>
        </div>
      </header>
    </div>
  );
}

export default App;
