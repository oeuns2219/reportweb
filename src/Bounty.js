import './Notice.css';
import { useSelector } from 'react-redux';
import { database } from './firebase';
import { ref, onValue, child } from 'firebase/database';
import { Link } from 'react-router-dom';

function Bounty() {

    const uid = useSelector((state) => state.user.uid);

    let bounty;

    const bounref = child(ref(database), 'bounties/' + uid);
    onValue(bounref, (snapshot) => {
        bounty = snapshot.val();
    })
    
    if (bounty == null) bounty = JSON.parse(window.localStorage.getItem('bounty'));

    window.localStorage.setItem('bounty', JSON.stringify(bounty));

    function MyBty() {
        return (
            <div className='Not-notice'>
                <div className='Not-title'>수배내용</div>
                <div className='Not-tcontent'>제목: {bounty.title}</div>
                <div className='Bty-pos2'>수배 지역: {bounty.pos}</div>
                <div className='Not-date'>{bounty.date}</div>
                <div className='Not-content'>{bounty.content}</div>
                <Link className='App-bspace' to='/home/bountylist'>&#27;</Link>
            </div>
        );
    }

    return (
        <div className="Not">
            <header className="Not-header">
                <MyBty/>
            </header>
        </div>
    );
}

export default Bounty;