import Swal from 'sweetalert2';

export const loginSuccess = () => {
    Swal.fire({
      title: 'Message',
      text: 'Login Success!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'OK',
    }).then((result) => {
   
    });
  };

