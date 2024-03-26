import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";


export const BASE_URL = "http://192.168.56.1:8081";

export const SUCCESS_NUMBER = 200;

export const TIMEOUT_NUMBER = 3000;

export const SERVERERROR = "伺服器出了問題";

export const USER_NOT_EXIST = "帳號或密碼錯誤";

export const USER_NOT_EXIST_NUMBER = 2002;

export const EMAIL_NOT_EXIST = "此信箱已存在";

export const EMAIL_NOT_EXIST_NUMBER = 2003;




export const HABIT_ALREADY_EXIST = "此建立相同名稱的習慣";

export const HABIT_ALREADY_EXIST_NUMBER = 3001;





export const UNKNOWN_ERROR = "未知的錯誤";

export const UNKNOWN_ERROR_NUMBER = 9999;

export const SERVERERRORSTR = "請稍後再試或聯絡官方人員";






export const showSuccess = (str:string) =>{
  Swal.fire({
    title: str,
    icon: 'success',
    showCancelButton: false,
    confirmButtonText: 'OK',
  })
}
 
export const showloadingForFetch = () =>{
  Swal.fire({
      title: "讀取中",
      text: "請稍後",
      didOpen: () => {
        Swal.showLoading();
      },
    });
}


export const showloading = () =>{
    Swal.fire({
        title: "處理中",
        text: "請稍後",
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
}



export const showError = (errorTitle:string,errorText:string) =>{
  Swal.fire({
      icon: "error",
      title: errorTitle,
      text: errorText,
    });
}
export const showErrorNoText = (errorTitle:string) =>{
  Swal.fire({
      icon: "error",
      title: errorTitle
    });
}




export const handleError = (error: unknown,errorStr:string) =>{
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          showError(errorStr,SERVERERRORSTR)
        } else if (axiosError.request) {
          showError(errorStr,SERVERERRORSTR)
        } else {
          showError(errorStr,SERVERERRORSTR)
        }
      } else {
        showError(errorStr,SERVERERRORSTR)
      }  

}