import PIc from './assets/PIc.png'
import { Link } from 'react-router-dom';
import './Layout.css';
import { codelist } from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setcode } from './reducers/user';
//import { database } from './firebase';
//import { ref, push, set, child } from 'firebase/database';

function Layout () {
    /*
    const report1 = {
        uid : "none",
        state : '미접수',
        type : '탄 / 포탄',
        position : '가 지역',
        date : '2023.05.18 16:13',
        detail : '이것은 아직 접수되지 않은 신고내역입니다. 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구.',
        photo : '["https://smartseo-store-logos.s3.eu-central-1.amazonaws.com/eu.roka.com-ROKA_LOGO_2000x2000.png"]',
        pnumber : '010-1234-5678',
    }

    function testrep () {
        const repref = child(ref(database), 'reports');
        const newkey1 = push(repref).key;

        report1.uid = newkey1;

        set(ref(database, 'reports/' + newkey1), report1);
    }


    const notices = [
        {
            uid : 'none',
            date : '2023.05.18 18:39',
            content : '이것은 공지사항입니다. 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구.',
        },
        {
            uid : 'none',
            date : '2023.05.18 18:39',
            content : '이것은 공지사항입니다. 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구.',
        },
        {
            uid : 'none',
            date : '2023.05.18 18:39',
            content : '이것은 공지사항입니다. 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구.',
        },
        {
            uid : 'none',
            date : '2023.05.18 18:39',
            content : '이것은 공지사항입니다. 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구.',
        },
        {
            uid : 'none',
            date : '2023.05.18 18:39',
            content : '이것은 공지사항입니다. 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구.',
        },
        {
            uid : 'none',
            date : '2023.05.18 18:39',
            content : '이것은 공지사항입니다. 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구.',
        },
    ];

    const iter = notices.values();

    function testnoti () {
        const notiref = child(ref(database), 'notices');

        for (const notice of iter) {
            const newkey = push(notiref).key;

            notice.uid = newkey;

            set(ref(database, 'notices/' + newkey), notice);
        }
    }
    */
    const dispatch = useDispatch();

    const usercode = useSelector((state) => state.user.code);
    var codeobj = codelist.filter((code) => code.code === usercode);
    useEffect(()=>window.localStorage.setItem('codeobj', JSON.stringify(codeobj)));
    if (codeobj.length === 0) codeobj = JSON.parse(window.localStorage.getItem('codeobj'));

    function repCli() {
        dispatch(setcode(codeobj[0].code));
    }

    return (
        <div className="Lay">
            <header className="Lay-header">
                <div className='Lay-lay'>
                    <div className='Lay-title'>육군 주민신고 사이트<br></br>&#40;{codeobj[0].name}&#41;</div>
                    <img className="Lay-img" src={PIc} alt="51"></img>
                    <Link to='/home/noticelist' className='Lay-notibtn'>공지사항 목록</Link>
                    <Link to='/home/reportlist' className='Lay-repbtn' onClick={repCli}>주민신고 목록</Link>
                </div>
            </header>
        </div>
    );
}

export default Layout;