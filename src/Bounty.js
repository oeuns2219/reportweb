import './Notice.css';
import { useSelector } from 'react-redux';
import { database } from './firebase';
import { ref, onValue, child, update } from 'firebase/database';
import { Link } from 'react-router-dom';

function Bounty() {

    var uid = useSelector((state) => state.user.uid);
    if (uid == null) uid = JSON.parse(window.localStorage.getItem('uid'));
    window.localStorage.setItem('uid', JSON.stringify(uid));

    let bounty;

    const bounref = child(ref(database), 'bounties/' + uid);
    onValue(bounref, (snapshot) => {
        bounty = snapshot.val();
    })
    
    if (bounty == null) bounty = JSON.parse(window.localStorage.getItem('bounty'));
    window.localStorage.setItem('bounty', JSON.stringify(bounty));

    function btnCli() {
        if (uid == null) uid = JSON.parse(window.localStorage.getItem('uid'));
        const updates = {};
        updates['/bounties/' + uid] = null;
        update(ref(database), updates);

        var popup = document.getElementById('pu');
        var popd = document.getElementById('pd');
        var popdiv=document.getElementById('popdiv')
        popd.style.visibility = 'visible';
        popup.style.visibility = 'visible';
        popdiv.style.visibility = 'visible'
    }

    function MyBty() {
        return (
          <div className="Not-notice">
            <Link className="Not-bspace" to="/home/bountylist">
              &#27;
            </Link>
           
            <div className="Not-title">수배내용</div>
            <div className="Not-tcontent">제목: {bounty.title}</div>
            <div className="Bty-pos2">수배 지역: {bounty.pos}</div>
            <div className="Not-date">{bounty.date}</div>
            <div className="Not-content">{bounty.content}</div>
            <button className="Wrt-btn" onClick={btnCli}>
              삭제하기
            </button>
            <div className="pop-container" id="popdiv">
            <span className="Wrt-popup" id="pu">
                  수배가 삭제되었습니다.
                </span>
              <Link to="/home/bountylist" className="Wrt-popdown" id="pd">
               
              </Link>
            </div>
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