import { FC, MouseEventHandler, useState } from "react";
import image from '../assets/atom.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Habit } from "./Habit";


export const Nav:FC = () =>{
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
       
        <nav className="navbar is-dark justify-content-space-between" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item " >
      <img src={image} />
    </a>
    <a className="navbar-item pl-0" >
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
          <a className="button is-primary has-text-weight-bold" onClick={handleOpenModal}>
            <strong>Sign up</strong>
          </a>
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
                        <div className="column is-6">    <a href=""><FontAwesomeIcon icon={faGoogle}/>登入</a></div>
                    
                        
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success">登入</button>
                    </footer>
                </div>
            </div>

</nav>

    )
}