import logo from './assets/logo.png'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setcode } from './reducers/user';
import './Layout.css';

export const codelist = [
    {
        code: '0',
        name: '지상작전사령부'
    },
    {
        code: '1',
        name: '수도군단'
    },
    {
        code: '2',
        name: '51사단'
    },
    {
        code: '3',
        name: '167여단'
    },
    {
        code: '4',
        name: '168여단'
    },
    {
        code: '5',
        name: '169여단'
    }
    
]

function Login () {

    const dispatch = useDispatch();

    function ekeydown(e) {
        if (e.key === 'Enter') btnCli();
    }

    function btnCli () {
        const inputcode = document.getElementById('code').value;
        const usercode = codelist.filter((code) => code.code === inputcode);

        if (usercode.length === 0) {
            var popup1 = document.getElementById('pu1');
            var popd1 = document.getElementById('pd1');
            popup1.style.visibility = 'visible';
            popd1.style.visibility = 'visible';
        }
        else {
            dispatch(setcode(usercode[0].code));
            var popup2 = document.getElementById('pu2');
            var popd2 = document.getElementById('pd2');
            popup2.innerHTML = usercode[0].name + '<br><br>환영합니다.';
            popup2.style.visibility = 'visible';
            popd2.style.visibility = 'visible';
        }
    }

    function pdCli() {
        var popup = document.getElementById('pu1');
        var popd = document.getElementById('pd1');
        popd.style.visibility = 'hidden';
        popup.style.visibility = 'hidden';
    }
    
    return (
        <div className="Lay">
            <header className="Lay-header">
                <div className='Lay-lay'>
                    <div className='Lay-title'>육군 주민신고 사이트<br></br>&#40;관리자 모드&#41;</div>
                    <img className="Lay-img" src={logo} alt="51"></img>
                    <input type='number' id='code' min='0' max='5' placeholder='관리자 코드를 입력해주세요.' className='Log-input' onKeyDown={ekeydown}></input>
                    <input type='button' id='Log-btn' className='Lay-btns' onClick={btnCli} value='로그인하기'></input>
                    <span className='Log-popup' id='pu1'>유효하지 않은<br></br>관리자 코드입니다.</span>
                    <span className='Log-popup' id='pu2'></span>
                    <div className='Log-popdown' id='pd1' onClick={pdCli}></div>
                    <Link to='/home' className='Log-popdown' id='pd2'></Link>
                </div>
            </header>
        </div>
    );
}

export default Login;
