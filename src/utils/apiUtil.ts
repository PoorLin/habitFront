import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

export const showloading = () =>{
    Swal.fire({
        title: "正在登入",
        text: "請稍後",
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
}


export const showError = () =>{
    Swal.fire({
        icon: "error",
        title: "伺服器出了問題",
        text: "請稍後再試",
      });
}


export const handleError = (error: unknown) =>{
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          showError()
        } else if (axiosError.request) {
          showError()
        } else {
          showError()
        }
      } else {
        showError()
      }  

}