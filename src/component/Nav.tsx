import { FC, MouseEventHandler, useEffect, useState, useContext } from "react";
import image from '../assets/atom.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { getGoogleKey, loginAPI } from "../api/UserAPI";
import Cookies from 'js-cookie';
import { UserReturn } from "../model/UserReturn";
import { AuthContext, AuthProvider } from "../auth/AuthProvider";
import { fas } from "@fortawesome/free-solid-svg-icons";



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
  }, []); // 空数组作为依赖，表示只在组件挂载时执行一次
  const [className, setClassName] = useState<string>('modal');
  const [habitPage, setHabitPage] = useState<boolean>(false);
  const [secret, setSecret] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const handleSecretOnchange = (e: any) => {
    setSecret(e.target.value)
  }
  const handleEmailOnchange = (e: any) => {
    setEmail(e.target.value)
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

  const handleLogOut:MouseEventHandler<HTMLAnchorElement> = () =>{
    Cookies.remove('token');
    window.location.href = '/AH/home';
  }
  const handleToProfile:MouseEventHandler<HTMLAnchorElement> = () =>{
    window.location.href = '/AH/profile';
  }

  const handleBtnLogin = async () => {
    const returnDate = await loginAPI({ secret, email })
    if (returnDate.returnCode == 200) {
      const user: UserReturn = returnDate.data
      Cookies.set('token', user.token, { expires: 7 });
      Cookies.set('userName', user.userName, { expires: 7 });
      Cookies.set('userId', user.userId.toString(), { expires: 7 });
      Cookies.set('email', user.email.toString(), { expires: 7 });
      setIslogin(true);
      if (isFromHabit) {
        setIsFromHabit(false)
        window.location.href = '/AH/habit';
      } else {
        window.location.href = '/AH/home';
      }

    } else {

    }

  }


  return (
    <div>
      <nav className="navbar is-dark justify-content-space-between" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item " href="/AH/home">
            <img src={image} />
          </a>
          <a className="navbar-item pl-0" href="/AH/home">
            原子習慣
          </a>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu ">
          <div className="navbar-start">
            <a className="navbar-item has-text-weight-bold pr-6">
              首頁
            </a>

            <a className="navbar-item has-text-weight-bold pr-6">
              關於
            </a>
            {/* <a className="navbar-item has-text-weight-bold pr-6" href="/AH/habitCard">
              計分卡
            </a> */}
            <a className="navbar-item has-text-weight-bold pr-6" onClick={handleRedirectTOHabitPage} >
              習慣
            </a>
          </div>

          <div className="navbar-end mr-6">


            {
              islogin ? (<div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                <FontAwesomeIcon icon={fas.faUser} />
                </a>

                <div className="navbar-dropdown">
                  <a className="navbar-item" onClick={handleToProfile}>
                    個人資訊
                  </a>
                  <a className="navbar-item">
                    Jobs
                  </a>
                 
                  <hr className="navbar-divider" />
                  <a className="navbar-item" onClick={handleLogOut}>
                    LogOut
                  </a>
                </div>
              </div>) : (<div className="navbar-item">
                <div className="buttons">

                  <a className="button is-light has-text-weight-bold" onClick={handleOpenModal}>
                    Log in
                  </a>
                </div>
              </div>)
            }

          </div>
        </div>

        <div className={className} >
          <div className="modal-background" onClick={handleCloseModal}></div>
          <div className="modal-card ">
            <header className="modal-card-head ">
              <p className="modal-card-title ">登入</p>
              <button className="delete" aria-label="close" onClick={handleBtnCloseModal}></button>
            </header>
            <section className="modal-card-body">
              <label htmlFor="" className="has-text-black is-size-4	">帳號</label>
              <input type="text" name="" id="" className="input" onChange={handleEmailOnchange} value={email} />
              <label htmlFor="" className="has-text-black is-size-4	">密碼</label>
              <input type="text" name="" id="" className="input" onChange={handleSecretOnchange} value={secret} />

              <a href="/AH/createUser">還沒有帳號?</a>

            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={handleBtnLogin}>登入</button>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse)
                  navigate("/AH/home")
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </footer>
          </div>
        </div>

      </nav>

      <Outlet />
    </div>
  )
}




