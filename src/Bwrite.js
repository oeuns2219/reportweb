import { Link } from 'react-router-dom';
import './Write.css';
import { database } from './firebase';
import { ref, push, set, child } from 'firebase/database';

function Bwrite () {

    const bounty = {};
    const date = new Date(Date.now())

    bounty['date'] = date.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' }) + ' ' + date.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' });

    function btnCli() {
        const btyref = child(ref(database), 'bounties');
        const newkey = push(btyref).key;

        bounty['uid'] = newkey;
        bounty['title'] = document.getElementById('title').value;
        bounty['pos'] = document.getElementById('position').value;
        bounty['content'] = document.getElementById('content').value;

        set(ref(database, 'bounties/' + newkey), bounty);

        var popup = document.getElementById('pu');
        var popd = document.getElementById('pd');
        popd.style.visibility = 'visible';
        popup.style.visibility = 'visible';
    }

    function MyWrt() {
        return (
            <div className='Wrt-notice'>
                <div className='Wrt-title'>수배내용</div>
                <input type="text" id="title" placeholder='수배 제목을 적어주세요.' className='Wrt-tinput'></input>
                <input type="text" id="position" placeholder='수배 지역을 적어주세요.' className='Wrt-tinput'></input>
                <div className='Wrt-date'>{bounty.date}</div>
                <div className='Wrt-content'>
                    <textarea id='content' placeholder='수배할 내용을 적어주세요.' className='Wrt-input'></textarea>
                </div>
                <button className='Wrt-btn' onClick={btnCli}>등록하기</button>
                <span className='Wrt-popup' id='pu'>수배가 등록되었습니다.</span>
                <Link to='/home/bountylist' className='Wrt-popdown' id='pd'></Link>
                <Link className='App-bspace' to='/home/bountylist'>&#27;</Link>
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

export default Bwrite;