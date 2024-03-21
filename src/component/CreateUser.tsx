import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";
import { createUserAPI } from "../api/UserAPI";
import { BackEndReturn } from "../model/BackEndReturn";
import { useNavigate } from "react-router-dom";

export const CreateUser:FC = () =>{
    const navigate = useNavigate();

    const [email,setEmail] = useState<string>('');
    const [secret,setSecret] = useState<string>('');
    const [userName,setUserName] = useState<string>('');
    const [sex,setSex] = useState<number>();
    
    const handleEmailChange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        setEmail(e.target.value);
    }
    const handlePassChange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        setSecret(e.target.value);
    }
    const handleUserChange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        setUserName(e.target.value);
    }
    const handleSexChange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        setSex(parseInt(e.target.value));
    }


    const handleSubmit = async () =>{
        console.log({email,secret,userName,sex})
        if(sex !== undefined){
             const result=await createUserAPI({email,secret,userName,sex})
            if(result.returnCode == 200){
                navigate("/atomicHabit")
            }
   
            
        }
       
    }
    

    
    return(
   <div className="mt-5">
   <label htmlFor=""> 信箱: </label>
  <p className="control has-icons-left has-icons-right">
   
    <input className="input" type="email" placeholder="Email" onChange={handleEmailChange}/>
    <span className="icon is-small is-left">
        <FontAwesomeIcon icon={fas.faEnvelope} />
    </span>
  </p>

  <label htmlFor=""> 密碼: </label>
  <p className="control has-icons-left">
 
    <input className="input" type="Secret" placeholder="Secret" onChange={handlePassChange}/>
    <span className="icon is-small is-left">
    <FontAwesomeIcon icon={fas.faLock} />
    </span>
  </p>

  <label htmlFor=""> 使用者名稱: </label>
  <p className="control has-icons-left">
 
    <input className="input" type="text" placeholder="UserName" onChange={handleUserChange}/>
    <span className="icon is-small is-left">
    <FontAwesomeIcon icon={fas.faUser} />
    </span>
  </p>
  <div>
  <label className="radio">
  <input type="radio" name="sex" onChange={handleSexChange} value="1"/>
  男
</label>
  <label className="radio">
  <input type="radio" name="sex" onChange={handleSexChange} value="0"/>
  女
</label>

  </div>
  <button className="button" onClick={handleSubmit}>送出</button>
 

</div>
   
    )
}