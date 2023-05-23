import { Link } from 'react-router-dom';
import './Write.css';
import { database } from './firebase';
import { ref, push, set, child } from 'firebase/database';

function Write () {

    const notice = {};

    notice['date'] = new Date(Date.now()).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    function btnCli() {
        const notiref = child(ref(database), 'notices');
        const newkey = push(notiref).key;

        notice['uid'] = newkey;
        notice['content'] = document.getElementById('content').value;

        set(ref(database, 'notices/' + newkey), notice);

        var popup = document.getElementById('pu');
        var popd = document.getElementById('pd');
        popd.style.visibility = 'visible';
        popup.style.visibility = 'visible';
    }

    function MyWrt() {
        return (
            <div className='Wrt-notice'>
                <div className='Wrt-title'>공지사항</div>
                <div className='Wrt-date'>{notice.date}</div>
                <div className='Wrt-content'>
                    <textarea id='content' placeholder='공지할 내용을 적어주세요.' className='Wrt-input'></textarea>
                </div>
                <button className='Wrt-btn' onClick={btnCli}>등록하기</button>
                <span className='Wrt-popup' id='pu'>공지사항이 등록되었습니다.</span>
                <Link to='/noticelist' className='Wrt-popdown' id='pd'></Link>
                <Link className='Wrt-bspace' to='/noticelist'>&#27;</Link>
            </div>
        );
    }

    return (
        <div className="Wrt">
            <header className="Wrt-header">
                <MyWrt/>
            </header>
        </div>
    );
}

export default Write;