import { FC, MouseEventHandler, useState } from "react";
import image from '../assets/atom.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, Outlet } from "react-router-dom";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { test } from "../utils/jwt";
import { getGoogleKey, loginAPI } from "../api/UserAPI";
import { verify } from "jsonwebtoken";
import { useMyContext } from "../auth/AuthProvider";


export const Nav:FC = () =>{

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(456);
      console.log(credentialResponse);
      // if(credentialResponse !== undefined){
      //   const credential = credentialResponse?.credential;
         //parseToken(credentialResponse.credential!);
      // }
        
     // test(credentialResponse.credential!);
          // test();
        loginAPI({secret:"123456",email:"jack@gmail.com"})
    },
    onError: () => {

    },
  });


    const [className, setClassName] = useState<string>('modal');
    const [habitPage, setHabitPage] = useState<boolean>(false);
    const handleOpenModal:MouseEventHandler<HTMLAnchorElement> = () => {
        setClassName("modal is-active")
    }
    const handleCloseModal:MouseEventHandler<HTMLDivElement> = () => {
        setClassName("modal")
    }
    const handleRedirectTOHabitPage:MouseEventHandler<HTMLAnchorElement> = ()=>{
        setHabitPage(true);
    }
    
    
    return(
       <div>
        <nav className="navbar is-dark justify-content-space-between" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item " href="../atomicHabit">
      <img src={image} />
    </a>
    <a className="navbar-item pl-0" href="../atomicHabit">
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
      <a className="navbar-item has-text-weight-bold pr-6">
        計分卡
      </a>
      <a className="navbar-item has-text-weight-bold pr-6" onClick={handleRedirectTOHabitPage}>
        習慣
      </a>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
       
          <a className="button is-light has-text-weight-bold" onClick={handleOpenModal}>
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>

  <div className={className} >
                <div className="modal-background" onClick={handleCloseModal}></div>
                <div className="modal-card ">
                    <header className="modal-card-head ">
                        <p className="modal-card-title ">登入</p>
                        <button className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <label htmlFor="" className="has-text-black is-size-4	">帳號</label>
                        <input type="text" name="" id="" className="input"/>
                        <label htmlFor="" className="has-text-black is-size-4	">密碼</label>
                        <input type="text" name="" id="" className="input"/>
                       
                        <a href="createUser">還沒有帳號?</a>
                        
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success">登入</button>
                        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    console.log(123);
    
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
                    </footer>
                </div>
            </div>

</nav>

<Outlet/>
</div>
    )
}

function parseToken(arg0: any) {
  throw new Error("Function not implemented.");
}
