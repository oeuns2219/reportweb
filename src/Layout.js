import { Link } from 'react-router-dom';
import './Layout.css';
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

    const report2 = {
        uid : 'none',
        state : '처리중',
        type : '미상선박',
        position : '나 지역',
        date : '2023.05.18 16:13',
        detail : '이 신고내역은 처리 중에 있습니다. 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구.',
        photo : '["https://smartseo-store-logos.s3.eu-central-1.amazonaws.com/eu.roka.com-ROKA_LOGO_2000x2000.png"]',
        pnumber : '010-1234-5678',
    }

    const report3 = {
        uid : 'none',
        state : '처리완료',
        type : '거동 수상자',
        position : '다 지역',
        date : '2023.05.18 16:13',
        detail : '처리 완료된 신고내역입니다.  어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구, 어쩌구, 저쩌구.',
        photo : '["https://smartseo-store-logos.s3.eu-central-1.amazonaws.com/eu.roka.com-ROKA_LOGO_2000x2000.png"]',
        pnumber : '010-1234-5678',
    }

    function testrep () {
        const repref = child(ref(database), 'reports');
        const newkey1 = push(repref).key;
        const newkey2 = push(repref).key;
        const newkey3 = push(repref).key;

        report1.uid = newkey1;
        report2.uid = newkey2;
        report3.uid = newkey3;

        set(ref(database, 'reports/' + newkey1), report1);
        set(ref(database, 'reports/' + newkey2), report2);
        set(ref(database, 'reports/' + newkey3), report3);
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

    return (
        <div className="Lay">
            <header className="Lay-header">
                <div className='Lay-lay'>
                    <div className='Lay-title'>육군 주민신고 사이트<br></br>&#40;관리자 모드&#41;</div>
                    <img className="Lay-img" src="https://smartseo-store-logos.s3.eu-central-1.amazonaws.com/eu.roka.com-ROKA_LOGO_2000x2000.png" alt="51"></img>
                    <Link to='/noticelist' className='Lay-notibtn'>공지사항 목록</Link>
                    <Link to='/reportlist' className='Lay-repbtn'>주민신고 목록</Link>
                </div>
            </header>
        </div>
    );
}

export default Layout;