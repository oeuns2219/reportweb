import './App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setuid, setcode } from './reducers/user';
import { database } from './firebase';
import { ref, child, onChildAdded, onChildRemoved, onChildChanged, get } from 'firebase/database';

let reports = [];
const repref = child(ref(database), "reports");
const statelist = ['미접수', '처리중', '처리완료'];

function App() {

  const [state, setState] = useState('미접수');
  const [page, setPage] = useState(1);
  const [dummy, setDummy] = useState(0);
  const [sdum, setSdum] = useState(0);
  const [ldum, setLdum] = useState(0);
  var usercode = useSelector((state) => state.user.code);
  const dispatch = useDispatch();
  const uclist = ['2', '4', '5'];

  useEffect(()=>window.localStorage.setItem('usercode', JSON.stringify(usercode)));
  if (usercode === null) usercode = JSON.parse(window.localStorage.getItem('usercode'));

  function repCli(evt) {
    dispatch(setuid(evt.target.parentElement.id));
    dispatch(setcode(usercode));
  }

  function btnhover(evt) {
    if (evt.target.value !== state) evt.target.style.backgroundColor = 'rgba(193, 161, 255, 1)';
  }

  function btnhout(evt) {
    if (evt.target.value === state) evt.target.style.backgroundColor = 'rgba(126, 83, 217, 1)';
    else evt.target.style.backgroundColor = 'rgba(172, 145, 230, 1)';
  }

  function unaCli() {
    document.getElementById('unabtn').style.backgroundColor = 'rgba(126, 83, 217, 1)';
    document.getElementById('probtn').style.backgroundColor = 'rgba(172, 145, 230, 1)';
    document.getElementById('resbtn').style.backgroundColor = 'rgba(172, 145, 230, 1)';
    document.getElementById('shabtn').style.backgroundColor = 'rgba(172, 145, 230, 1)';
    setState('미접수');
    setPage(1);
  }

  function proCli() {
    document.getElementById('probtn').style.backgroundColor = 'rgba(126, 83, 217, 1)';
    document.getElementById('unabtn').style.backgroundColor = 'rgba(172, 145, 230, 1)';
    document.getElementById('resbtn').style.backgroundColor = 'rgba(172, 145, 230, 1)';
    document.getElementById('shabtn').style.backgroundColor = 'rgba(172, 145, 230, 1)';
    setState('처리중');
    setPage(1);
  }

  function resCli() {
    document.getElementById('resbtn').style.backgroundColor = 'rgba(126, 83, 217, 1)';
    document.getElementById('probtn').style.backgroundColor = 'rgba(172, 145, 230, 1)';
    document.getElementById('unabtn').style.backgroundColor = 'rgba(172, 145, 230, 1)';
    document.getElementById('shabtn').style.backgroundColor = 'rgba(172, 145, 230, 1)';
    setState('처리완료');
    setPage(1);
  }

  function shaCli() {
    document.getElementById('shabtn').style.backgroundColor = 'rgba(126, 83, 217, 1)';
    document.getElementById('probtn').style.backgroundColor = 'rgba(172, 145, 230, 1)';
    document.getElementById('unabtn').style.backgroundColor = 'rgba(172, 145, 230, 1)';
    document.getElementById('resbtn').style.backgroundColor = 'rgba(172, 145, 230, 1)';
    setState('공유받음');
    setPage(1);
  }

  function downCli() {
    if (page > 1) setPage(page - 1);
  }
  
  function upCli() {
    if (reports.filter(report => report.state === state).length > page*4) setPage(page+1);
  }

  //var reports = [];

  //const repref = child(ref(database), 'reports');

/*
  onChildAdded(repref, (snapshot) => {
    reports.unshift(snapshot.val());
  });
  useEffect(() => window.localStorage.setItem('reports', JSON.stringify(reports)));
  if (reports.length === 0) reports = JSON.parse(window.localStorage.getItem('reports'));*/
  useEffect(() => {
    onChildAdded(repref, (snapshot) => {
        async function listupdate() {
          if (reports.every((report) => report.uid !== snapshot.val().uid)) reports.unshift(snapshot.val());
          return reports;
        }
        listupdate().then((result) => {
          setDummy(result.length);
        });
    });
    onChildRemoved(repref, (snapshot) => {
        async function listupdate() {
          reports = reports.filter((report) => report.uid !== snapshot.key);
          return reports;
        }
        listupdate().then((result) => {
          setDummy(result.length);
        });
    });
    onChildChanged(repref, (snapshot) => {
      async function listupdate() {
        reports.map((report) => {
          if (report.uid === snapshot.key) {
            report.state = snapshot.val().state;
            report.shareList = snapshot.val().shareList;
            return report;
          }
          return report;
        });
        return reports;
      }
      listupdate().then((result) => {
        setSdum(result.filter(report => report.state !== '처리중').length);
        setLdum(result.filter(report => JSON.parse(report.shareList).includes(usercode)).length);
      });
    });
  }, []);
  const filtered = statelist.includes(state) ? ( uclist.includes(usercode) ? reports.filter(report => report.position.indexOf('화성') !== -1).filter(report => report.state === state) : reports.filter(report => report.position.indexOf('화성') === -1).filter(report => report.state === state) ) : reports.filter(reports => JSON.parse(reports.shareList).includes(usercode));

  const listReports = filtered.slice((page-1)*4,page*4).map(report => {

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
        <Link to='/home/reportlist/report' onClick={repCli} className='App-link'>자세히 보기</Link>
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
              <input className='App-filter' onClick={unaCli} onMouseOver={btnhover} onMouseOut={btnhout} id='unabtn' type='button' value='미접수'></input>
              <input className='App-filter' onClick={proCli} onMouseOver={btnhover} onMouseOut={btnhout} id='probtn' type='button' value='처리중'></input>
              <input className='App-filter' onClick={resCli} onMouseOver={btnhover} onMouseOut={btnhout} id='resbtn' type='button' value='처리완료'></input>
              <input className='App-filter' onClick={shaCli} onMouseOver={btnhover} onMouseOut={btnhout} id='shabtn' type='button' value='공유받음'></input>
            </div>
            {listReports}
          </div>
          <input id='App-down' className='Rep-udbtn' type='button' value='<' onClick={downCli}></input>
          <div className='App-page'>{page}/{1 + ((filtered.length - 1) - (filtered.length - 1)%4)/4}</div>
          <input id='App-up' className='Rep-udbtn' type='button' value='>' onClick={upCli}></input>
          <Link className='App-bspace' to='/home'>&#27;</Link>
        </div>
      </header>
    </div>
  );
}

export default App;
