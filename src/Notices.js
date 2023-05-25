import { Link, useNavigate } from 'react-router-dom';
import './Notices.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setuid } from './reducers/user'
import { database } from './firebase';
import { ref, child, onChildAdded } from 'firebase/database';

function Notices () {

    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function notiCli(evt) {
        dispatch(setuid(evt.target.parentElement.id));
    }

    function downCli() {
        if (page > 1) setPage(page - 1);
    }
    
    function upCli() {
        if (notices.length > page*6) setPage(page+1);
    }

    var notices = [];

    const notiref = child(ref(database), 'notices');
    onChildAdded(notiref, (snapshot) => {
        notices.unshift(snapshot.val());
    });

    useEffect(()=>window.localStorage.setItem('notices', JSON.stringify(notices)));
    if (notices.length === 0) notices = JSON.parse(window.localStorage.getItem('notices'));

    const Noticelist = notices.slice((page-1)*6,page*6).map(notice =>
        <article className='Noti-noti' id={notice.uid}>
            <section className='Noti-cont'>{(notice.title.length > 30 ? notice.title.substring(0,30)+'...' : notice.title)}</section>
            <section className='Noti-date'>{notice.date}</section>
            <Link to='/home/noticelist/notice' className='Noti-link' onClick={notiCli}>자세히 보기</Link>
        </article>
    )
    
    return (
        <div className='Noti'>
            <header className='Noti-header'>
                <div className='Noti-notibox'>
                    <div className='Noti-title'>공지사항</div>
                    <div className='Noti-case'>
                        {Noticelist}
                    </div>
                    <button className='Noti-down' onClick={downCli}>&lt;</button>
                    <div className='Noti-page'>{page}</div>
                    <button className='Noti-up' onClick={upCli}>&gt;</button>
                    <input type='button' className='Noti-write' onClick={()=>navigate('/home/noticelist/write')} value='공지사항 쓰기'></input>
                    <Link className='Noti-bspace' to='/home'>&#27;</Link>
                </div>
            </header>
        </div>
    );
}

export default Notices;