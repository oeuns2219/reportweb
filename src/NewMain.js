import { Link, useNavigate, Outlet } from 'react-router-dom';
import './Layout.css';
import './NewMain.css'
import { codelist } from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { setcode } from './reducers/user';
import { buttonGreen, deco, lightGreen } from './colors';
//import { database } from './firebase';
//import { ref, push, set, child } from 'firebase/database';

function NewMain () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedMenu,setSelectedMenu]=useState("notice")
    const usercode = useSelector((state) => state.user.code);
    var codeobj = codelist.filter((code) => code.code === usercode);
    useEffect(()=>window.localStorage.setItem('codeobj', JSON.stringify(codeobj)));
    if (codeobj.length === 0) codeobj = JSON.parse(window.localStorage.getItem('codeobj'));

    function repCli() {
        dispatch(setcode(codeobj[0].code));
        navigate('/home/reportlist');
    }

    return (
      <div className="NewMain">
        <div className="headerDiv">
            <Link className="backButton" to='/'>&#27;</Link>
          <div className="Ara">ARA</div>
        </div>
        <div className="bodyDiv">
          <div className="NavBar">
            <input
              type="button"
              className="navButton"
              style={{
                backgroundColor:
                  selectedMenu === "notice" ? buttonGreen : "transparent",
                color: selectedMenu === "notice" ? "white" : buttonGreen,
              }}
              onClick={() => {
                setSelectedMenu("notice");
                navigate("/home/noticelist");
              }}
              defaultValue="공지사항 목록"
            ></input>
            <input
              type="button"
              className="navButton"
              style={{
                backgroundColor:
                  selectedMenu === "report" ? buttonGreen : "transparent",
                color: selectedMenu === "report" ? "white" : buttonGreen,
              }}
              onClick={() => {
                repCli();
                setSelectedMenu("report");
              }}
              defaultValue="주민신고 목록"
            ></input>
            <input
              type="button"
              className="navButton"
              style={{
                backgroundColor:
                  selectedMenu === "bounty" ? buttonGreen : "transparent",
                color: selectedMenu === "bounty" ? "white" : buttonGreen,
              }}
              onClick={() => {
                setSelectedMenu("bounty");
                navigate("/home/bountylist");
              }}
              defaultValue="수배 현황"
            ></input>
          </div>
          <div className="OutletContainer">
            <Outlet />
          </div>
        </div>
      </div>
    );
}

export default NewMain;

//   <Link className='Lay-bspace' to='/'>&#27;</Link>
{/* 
</div> */}

