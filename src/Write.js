import { Link } from 'react-router-dom';
import './Write.css';
import { database } from './firebase';
import { ref, push, set, child } from 'firebase/database';

function Write () {

    const notice = {};
    const date = new Date(Date.now())

    notice['date'] = date.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' }) + ' ' + date.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' });

    function btnCli() {
        const notiref = child(ref(database), 'notices');
        const newkey = push(notiref).key;

        notice['uid'] = newkey;
        notice['title'] = document.getElementById('title').value;
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
                <Link className='Not-bspace' to='/home/noticelist'>&#27;</Link>
                <div className='Wrt-title'>공지사항</div>
                <input type="text" id="title" placeholder='공지제목을 적어주세요.' className='Wrt-tinput'></input>
                <div className='Wrt-date'>{notice.date}</div>
                <div className='Wrt-content'>
                    <textarea id='content' placeholder='공지할 내용을 적어주세요.' className='Wrt-input'></textarea>
                </div>
                <button className='Wrt-btn' onClick={btnCli}>등록하기</button>
                
                <div className="pop-container">
                <span className='Wrt-popup' id='pu'>공지사항이 등록되었습니다.</span>
                <Link to='/home/noticelist' className='Wrt-popdown' id='pd'></Link>
                </div>
              
                
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