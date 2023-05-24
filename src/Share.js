import { Link } from 'react-router-dom';
import './Share.css';
import { useSelector } from 'react-redux';
import { database } from './firebase';
import { ref, onValue, child, update } from 'firebase/database';

function Share () {


    const uid = useSelector((state) => state.user.uid);
    let report;
    const repref = child(ref(database), 'reports/' + uid);
    onValue(repref, (snapshot) => {
        report = snapshot.val();
    });
    if (report == null) report = JSON.parse(window.localStorage.getItem('report'));
    window.localStorage.setItem('report', JSON.stringify(report));


    function btnCli() {
        report.processText = document.getElementById('content').value;
        const updates = {};
        updates['/reports/' + report.uid] = report;
        update(ref(database), updates);

        var popup = document.getElementById('pu');
        var popd = document.getElementById('pd');
        popd.style.visibility = 'visible';
        popup.style.visibility = 'visible';
    }

    function MySha() {
        return (
            <div className='Sha-process'>
                <div className='Sha-title'>조치 사항</div>
                <div className='Sha-content'>
                    <textarea id='content' placeholder='조치 사항을 적어주세요.' className='Sha-input'>{report.processText}</textarea>
                </div>
                <button className='Sha-btn' onClick={btnCli}>저장하기</button>
                <span className='Sha-popup' id='pu'>저장이 완료되었습니다.</span>
                <Link to='/home/reportlist/report' className='Sha-popdown' id='pd'></Link>
                <Link className='Sha-bspace' to='/home/reportlist/report'>&#27;</Link>
            </div>
        );
    }

    return (
        <div className="Sha">
            <header className="Sha-header">
                <MySha/>
            </header>
        </div>
    );
}

export default Share;