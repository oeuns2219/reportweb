import { Link, useNavigate } from 'react-router-dom';
import './Notices.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setuid } from './reducers/user'
import { database } from './firebase';
import { ref, child, onChildAdded } from 'firebase/database';

function Bounties () {

    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function bounCli(evt) {
        dispatch(setuid(evt.target.parentElement.id));
    }

    function downCli() {
        if (page > 1) setPage(page - 1);
    }
    
    function upCli() {
        if (bounties.length > page*6) setPage(page+1);
    }

    var bounties = [];

    const bounref = child(ref(database), 'bounties');
    onChildAdded(bounref, (snapshot) => {
       bounties.unshift(snapshot.val());
    });

    useEffect(()=>window.localStorage.setItem('bounties', JSON.stringify(bounties)));
    if (bounties.length === 0) bounties = JSON.parse(window.localStorage.getItem('bounties'));

    const Bountylist = bounties.slice((page-1)*6,page*6).map(bounty =>
        <article className='Noti-noti' id={bounty.uid}>
            <section className='Noti-cont'>{(bounty.title.length > 30 ? bounty.title.substring(0,30)+'...' : bounty.title)}</section>
            <section className='Noti-date'>{bounty.date}</section>
            <section className='Bty-pos'>{bounty.pos}</section>
            <Link to='/home/bountylist/bounty' className='Bty-link' onClick={bounCli}>자세히 보기</Link>
        </article>
    )
    
    return (
        <div className='Noti'>
            <header className='Noti-header'>
                <div className='Noti-notibox'>
                    <div className='Noti-title'>수배현황</div>
                    <div className='Noti-case'>
                        {Bountylist}
                    </div>
                    <button className='Noti-down' onClick={downCli}>&lt;</button>
                    <div className='Noti-page'>{page}</div>
                    <button className='Noti-up' onClick={upCli}>&gt;</button>
                    <input type='button' className='Noti-write' onClick={()=>navigate('/home/bountylist/write')} value='수배하기'></input>
                    <Link className='Noti-bspace' to='/home'>&#27;</Link>
                </div>
            </header>
        </div>
    );
}

export default Bounties;