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









export const UNKNOWN_ERROR = "未知的錯誤";

export const UNKNOWN_ERROR_NUMBER = 9999;









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


export const showError = (errorStr:string) =>{
    Swal.fire({
        icon: "error",
        title: errorStr,
        text: "請稍後再試或聯絡官方人員",
      });
}




export const handleError = (error: unknown,errorStr:string) =>{
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          showError(errorStr)
        } else if (axiosError.request) {
          showError(errorStr)
        } else {
          showError(errorStr)
        }
      } else {
        showError(errorStr)
      }  

}