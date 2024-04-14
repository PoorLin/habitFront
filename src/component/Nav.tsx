import { FC, MouseEventHandler, useEffect, useState, useContext } from "react";
import image from '../assets/wtsWhiteFont.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate } from "react-router-dom";
import { forgotPassAPI, loginAPI, resetPassAPI } from "../api/UserAPI";
import Cookies from 'js-cookie';
import { UserReturn } from "../model/UserReturn";
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import { HABITHR_URL, HABIT_URL } from "../const/commonConst";



export const Nav: FC = () => {

  const navigate = useNavigate();
  const [islogin, setIslogin] = useState<boolean>(false);
  const [isFromHabit, setIsFromHabit] = useState<boolean>(false);
  useEffect(() => {
    if (Cookies.get('token') == undefined) {
      setIslogin(false);
    } else {
      setIslogin(true);
    }
  }, []); // 空字串使此component在組件render只有執行一次 
  const [className, setClassName] = useState<string>('modal');
  const [secret, setSecret] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const handleSecretOnchange = (e: any) => {
    setSecret(e.target.value)
  }
  const handleEmailOnchange = (e: any) => {
    setEmail(e.target.value)
  }

  const handleClickhabit = () => {
        navigate(HABIT_URL)
}

const handleClickHabitList = () => {
      navigate(HABITHR_URL)
  }


  const handleOpenModal: MouseEventHandler<HTMLAnchorElement> = () => {
    setClassName("modal is-active")
  }
  const handleCloseModal: MouseEventHandler<HTMLDivElement> = () => {
    setClassName("modal")
  }
  const handleBtnCloseModal: MouseEventHandler<HTMLButtonElement> = () => {
    setClassName("modal")
  }
  const handleRedirectTOHabitPage: MouseEventHandler<HTMLAnchorElement> = () => {
    setIsFromHabit(true);
    if (islogin) {
      navigate("/AH/habitHome/habit")
    } else {
      setClassName("modal is-active")
    }
  }
  const handleBtnForgotPass = () => {
    setClassName("modal")

    Swal.fire({
      title: "輸入信箱",
      input: "text",
      inputValue: '',
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "送出",
      cancelButtonText: "取消",
      showLoaderOnConfirm: true,
      preConfirm: async (email) => {

        const res = await forgotPassAPI({ email });
        if (res.returnCode === 200) {
          Swal.fire({
            title: "驗證信已寄出!",
            text: "若還沒收到請您大概再稍等30秒~1分鐘，謝謝!",
            icon: "success"
          }).then(() => {
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (15 * 60 * 1000));
            Cookies.set('authForgot', res.data, { expires: expirationDate });
            Swal.fire({
              title: "輸入驗證碼",
              input: "text",
              inputValue: "",
              inputAttributes: {
                autocapitalize: "off"
              },
              showCancelButton: true,
              confirmButtonText: "送出",
              cancelButtonText: "取消",
              showLoaderOnConfirm: true,
              preConfirm: async (authForgot) => {
                const secret = Cookies.get('authForgot')
                if (secret !== authForgot) {
                  return Swal.showValidationMessage(`   驗證碼錯誤  `);
                } else {
                  Swal.fire({
                    title: '修改密碼',
                    html:
                      '<label>第一次輸入<label/> <input id="input1" type="password" class="swal2-input" placeholder="輸入密碼">' +
                      '<label>第二次輸入<label/><input id="input2" type="password" class="swal2-input" placeholder="再次輸入密碼">',
                    showCancelButton: true,
                    confirmButtonText: '送出',
                    cancelButtonText: '取消',
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                      const input1 = document.getElementById('input1') as HTMLInputElement;
                      const input2 = document.getElementById('input2') as HTMLInputElement;

                      const secret = input1.value;
                      const secret2 = input2.value;
                      if (secret !== secret2) {
                        return Swal.showValidationMessage(`   密碼不一致  `);
                      } else {

                        const res = await resetPassAPI({ secret, email });
                        if (res.returnCode === 200) {
                          Swal.fire({
                            title: "修改密碼成功!",
                            text: " ",
                            icon: "success"
                          });
                        } else {
                          Swal.fire({
                            icon: "error",
                            title: "發生錯誤",
                            text: "請稍後再試",
                          });
                        }

                      }

                    }
                  });
                }


              },
            })
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "此信箱不存在",
            text: "請輸入正確信箱",
          });
        }
      }
    })
  }


  const handleLogOut: MouseEventHandler<HTMLAnchorElement> = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    Cookies.remove('email');
    Cookies.remove('userName');
    window.location.href = '/AH/home';
  }
  const handleToProfile: MouseEventHandler<HTMLAnchorElement> = () => {
    window.location.href = '/AH/profile';
  }



  const handleBtnLogin = async () => {
    const res = await loginAPI({ secret, email })


    if (res.returnCode == 200) {
      const user: UserReturn = res.data
      Cookies.set('token', user.token, { expires: 7 });
      Cookies.set('userName', user.userName, { expires: 7 });
      Cookies.set('userId', user.userId.toString(), { expires: 7 });
      Cookies.set('email', user.email.toString(), { expires: 7 });
      setClassName("modal ")

      Swal.fire({
        title: 'Login Success!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
      }).then(() => {
        setIslogin(true);
        if (isFromHabit) {
          setIsFromHabit(false)
          window.location.href = '/AH/habitHome/habit';
        } else {
          window.location.href = '/AH/home';
        }
      });


    } else {
      Swal.fire({
        icon: "error",
        title: "帳號密碼錯誤",
        text: "請輸入正確的帳號密碼",
      });
    }

  }


  return (
    <div>





      <div className="header-container">
        <nav className="left-nav col-6">
          <div>
            <a >Home</a></div>
          <div>
            <a >About</a>
            </div>

        </nav>
        <div className="logo col-1">

          <img src={image} alt="" />


        </div>

        <nav className="right-nav col-3">

        <ul>
  <li className="dropdown">
      <a  className="dropbtn">Form a Habit</a>
      <div className="dropdown-content">
          <a onClick={handleClickhabit}>Habit List</a>
          <a onClick={handleClickHabitList}>Habit Record</a>
        
      </div>
      
  </li>
</ul>

        </nav>
{
  islogin ? (    <div className="col-2 navbar">
  <ul>
  <li className="dropdown">
      <a  className="dropbtn">Profile</a>
      <div className="dropdown-content">
          <a onClick={handleLogOut}>LogOut</a>
        
      </div>
  </li>
</ul>
  </div>) :(
    <div className="col-2 navbar">
      <ul>
        <li className="dropdown">
          <a className="logindd" onClick={handleOpenModal}>login</a>

        </li>
      </ul>
    </div>)
}




    




      </div>





      <div>

        <div className={className}>
          <div className="modal-content">
            <div className="modal-header">


              <h2>Login</h2>

              <span className="close" onClick={handleCloseModal}>&times;</span>
            </div>

            <div className="modal-body">
              <label >帳號</label>
              <input type="text" name=""  className="text" onChange={handleEmailOnchange} value={email} />
              <label  >密碼</label>
          <input type="password" name="" className="password" onChange={handleSecretOnchange} value={secret} />

          <div className="modal-society">
            <a >
              
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a >
              
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          
          </div>
               <div className="bottom">
               <a href="/AH/createUser" className="">還沒有帳號?</a>
              <a onClick={handleBtnForgotPass} className="">忘記密碼?</a>
               </div>
            

            </div>
            <div className="modal-footer">
              <button className="button" onClick={handleBtnLogin}>登入</button>
              <button className="button" onClick={handleBtnCloseModal}>取消</button>
            </div>
          </div>
        </div>
      </div>









      <div>
        <Outlet />
      </div>
    </div>
  )
}




