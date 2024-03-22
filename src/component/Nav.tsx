import { FC, MouseEventHandler, useEffect, useState, useContext } from "react";
import image from '../assets/atom.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { forgotPassAPI, loginAPI, resetPassAPI } from "../api/UserAPI";
import Cookies from 'js-cookie';
import { UserReturn } from "../model/UserReturn";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';


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
  const handleBtnForgotPass  = () => {
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
      
       const res=await forgotPassAPI({email});
       if(res.returnCode === 200){
        Swal.fire({
          title: "驗證信已寄出!",
          text: "若還沒收到請您大概再稍等30秒~1分鐘，謝謝!",
          icon: "success"
        }).then(()=>{
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
          if(secret !==authForgot){
            return Swal.showValidationMessage(`   驗證碼錯誤  `);
          }else{
     Swal.fire({
            title: '修改密碼',
            html:
              '<label>第一次輸入<label/> <input id="input1" type="password" class="swal2-input" placeholder="輸入密碼">' +
              '<label>第一次輸入<label/><input id="input2" type="password" class="swal2-input" placeholder="再次輸入密碼">',
            showCancelButton: true,
            confirmButtonText: '送出',
            cancelButtonText: '取消',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
              const input1 = document.getElementById('input1') as HTMLInputElement;
              const input2 = document.getElementById('input2') as HTMLInputElement;
          
              const secret = input1.value;
              const secret2 = input2.value;
             if(secret !== secret2){
              return Swal.showValidationMessage(`   密碼不一致  `);
             }else{

             const res=await resetPassAPI({secret,email});
             if(res.returnCode === 200){
              Swal.fire({
                title: "修改密碼成功!",
                text: " ",
                icon: "success"
              });
             }else{
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
      

       



       }else{
        Swal.fire({
          icon: "error",
          title: "此信箱不存在",
          text: "請輸入正確信箱",
        });
       }
    

      }
    })
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
      <nav className="navbar is-dark justify-content-space-between" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item " href="/AH/home">
            <img src={image} className="is-48x48" />
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
            <a className="navbar-item has-text-weight-bold pr-6" href="/AH/home">
              首頁
            </a>

            <a className="navbar-item has-text-weight-bold pr-6" href="/AH/home">
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
                  {/* <a className="navbar-item" onClick={handleToProfile}>
                    個人資訊
                  </a> */}
                  {/* <a className="navbar-item">
                    Jobs
                  </a> */}
                 
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
              <input type="password" name="" id="" className="input" onChange={handleSecretOnchange} value={secret} />

              <a href="/AH/createUser" className="m-2">還沒有帳號?</a>
              <a onClick={handleBtnForgotPass} className="ml-4">忘記密碼?</a>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={handleBtnLogin}>登入</button>
              <GoogleLogin
                onSuccess={credentialResponse => {
                }}
                onError={() => {
                 
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




