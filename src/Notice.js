import './Notice.css';
import { useSelector } from 'react-redux';
import { database } from './firebase';
import { ref, onValue, child } from 'firebase/database';
import { Link } from 'react-router-dom';

function Notice() {

    const uid = useSelector((state) => state.user.uid);

    let notice;

    const notiref = child(ref(database), 'notices/' + uid);
    onValue(notiref, (snapshot) => {
        notice = snapshot.val();
    })
    
    if (notice == null) notice = JSON.parse(window.localStorage.getItem('notice'));

    window.localStorage.setItem('notice', JSON.stringify(notice));

    function MyNoti() {
        return (
            <div className='Not-notice'>
                <div className='Not-title'>공지사항</div>
                <div className='Not-date'>{notice.date}</div>
                <div className='Not-content'>{notice.content}</div>
                <Link className='App-bspace' to='/noticelist'>&#27;</Link>
            </div>
        );
    }

    return (
        <div className="Not">
            <header className="Not-header">
                <MyNoti/>
            </header>
        </div>
    );
}

export default Notice;