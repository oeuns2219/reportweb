import { Link, useNavigate } from 'react-router-dom';
import './Report.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { database } from './firebase';
import { ref, onValue, child, update } from 'firebase/database';
import { codelist } from './Login';

function Report() {

    const uid = useSelector((state) => state.user.uid);
    var usercode = useSelector((state) => state.user.code);
    useEffect(()=>window.localStorage.setItem('usercode', JSON.stringify(usercode)));
    if (usercode === null) usercode = JSON.parse(window.localStorage.getItem('usercode'));
    console.log(usercode);
    
    let report;

    const repref = child(ref(database), 'reports/' + uid);
    
    onValue(repref, (snapshot) => {
        report = snapshot.val();
    });

    if (report == null) report = JSON.parse(window.localStorage.getItem('report'));

    window.localStorage.setItem('report', JSON.stringify(report));
    
    const [state, setState] = useState(report.state);
    const [page, setPage] = useState(0);

    const photolist = JSON.parse(report.photo);

    if (photolist.length === 0) photolist.push('https://th.bing.com/th/id/R.923babff12c4e08cc3db9e9143305b83?rik=S71iitc3knLN5Q&riu=http%3a%2f%2fgeojecci.korcham.net%2fimages%2fno-image01.gif&ehk=ztZd4ifLqQB%2bB%2fhDnfHNxKuZekmp7BYwrWa9UJGJmes%3d&risl=&pid=ImgRaw&r=0');

    function accCli() {
        if (state === '미접수') {
            setState('처리중');
            report.state = '처리중';
            const updates = {};
            updates['/reports/' + report.uid] = report;
            update(ref(database), updates);
        }
        else {
            var popup = document.getElementById('p1');
            var popd = document.getElementById('pd');
            popd.style.visibility = 'visible';
            popup.style.visibility = 'visible';
        }
    }

    function resCli() {
        if (state === '미접수') {
            var popup1 = document.getElementById('p2');
            var popd1 = document.getElementById('pd');
            popd1.style.visibility = 'visible';
            popup1.style.visibility = 'visible';
        }
        else if (state === '처리중') {
            setState('처리완료');
            report.state = '처리완료';
            const updates = {};
            updates['/reports/' + report.uid] = report;
            update(ref(database), updates);
        }
        else {
            var popup2 = document.getElementById('p3');
            var popd2 = document.getElementById('pd');
            popd2.style.visibility = 'visible';
            popup2.style.visibility = 'visible';
        }
    }

    function downCli() {
        if (page > 0) setPage(page - 1);
    }
    
    function upCli() {
        if (page < photolist.length - 1) setPage(page+1);
    }

    function pnumCli()  {
        var pnumber = document.getElementById('pnum');
        var popd = document.getElementById('pd');
        popd.style.visibility = 'visible';
        pnumber.style.visibility = 'visible';
    }

    function pdCli() {
        var popup1 = document.getElementById('p1');
        var popup2 = document.getElementById('p2');
        var popup3 = document.getElementById('p3');
        var pnumber = document.getElementById('pnum');
        var popd = document.getElementById('pd');
        popd.style.visibility = 'hidden';
        popup1.style.visibility = 'hidden';
        popup2.style.visibility = 'hidden';
        popup3.style.visibility = 'hidden';
        pnumber.style.visibility = 'hidden';
    }

    function Mychlist() {
        
        const cbList = codelist.filter(code => code.code !== usercode).map(code => {
            return (
                <div>
                <input type="checkbox" id={code.name} className='Rep-checkbox'></input>
                <label>{code.name}</label>
                </div>
            );
        })

        return (
            <fieldset className='Rep-checklist'>
                <legend></legend>
                {cbList}
            </fieldset>
        );
    }

    function MyRep() {
        const navigate = useNavigate();

        return (
            <div className='Rep-report'>
                <div className='Rep-type'>{report.type}</div>
                <img className='Rep-photo' src={photolist[page]} id='photo' alt='report'/>
                <div className='Rep-pos'>{report.position}</div>
                <div className='Rep-detail'>{report.detail}</div>
                <div className='Rep-state'>{state}</div>
                <button className='Rep-accbtn' onClick={accCli}>접수하기</button>
                <button className='Rep-resbtn' onClick={resCli}>처리완료하기</button>
                <button className='Rep-pnumbtn' onClick={pnumCli}>전화번호</button>
                <span className='Rep-pnum' id='pnum'>{report.pnumber}</span>
                <span className='Rep-popup' id='p1'>이미 접수가 완료되었습니다.</span>
                <span className='Rep-popup' id='p2'>먼저 접수를 해주시기 바랍니다.</span>
                <span className='Rep-popup' id='p3'>이미 처리가 완료되었습니다.</span>
                <div className='Rep-popdown' id='pd' onClick={pdCli}></div>
                <div className='Rep-date'>{report.date}</div>
                <button className='Rep-down' onClick={downCli}>&lt;</button>
                <button className='Rep-up' onClick={upCli}>&gt;</button>
                <Link className='Rep-bspace' to='/home/reportlist'>&#27;</Link>
                <div className='Rep-btncase'>
                    <input id='btn1' className='Rep-btns' type='button' value='대공혐의점'></input>
                    <input className='Rep-btns' type='button' value='공유 목록'></input>
                    <input className='Rep-btns' type='button' value='조치 사항' onClick={()=>navigate('/home/reportlist/report/share')}></input>
                    <input id='btn2' className='Rep-btns' type='button' value='신고자알림' onClick={()=>navigate('/home/reportlist/report/share1')}></input>
                </div>
                <Mychlist/>
            </div>
        );
    }

    return (
        <div className="Rep">
            <header className="Rep-header">
                <MyRep/>
            </header>
        </div>
    );
}

export default Report;