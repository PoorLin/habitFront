import jwt from 'jsonwebtoken';

console.clear();


// const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWNrIiwiaWF0IjoxNzEwODE4NjQ4LCJleHAiOjE3MTA4MTk2NDh9.z0WSxctHTvinZXyaRB6zDtGlRs8wUT0PoEsID5Xa0AMKLe8vXMvLAdFtjYYGB8xhrm1QjTp79KdXKlxoQw53OQ';

export const test = () =>{
  jwt.verify("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWNrIiwiaWF0IjoxNzEwODE4NjQ4LCJleHAiOjE3MTA4MTk2NDh9.z0WSxctHTvinZXyaRB6zDtGlRs8wUT0PoEsID5Xa0AMKLe8vXMvLAdFtjYYGB8xhrm1QjTp79KdXKlxoQw53OQ", 'd0e8b8f11c98f369016eb2ed3c541e1f01382f9d5b3104c9ffd06b6175a46271', (err, decoded) => {
    if (err) {
      // 驗證失敗
      console.error('JWT 驗證失敗:', err);
    } else {
      // 驗證成功，decoded 中包含了 JWT Token 的有效負載
      console.log('JWT 驗證成功:', decoded);
    }
  });
  
  
}

// 驗證並解析 JWT Token



const token1 = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5YmNmODAyOGUwNjUzN2Q0ZDNhZTRkODRmNWM1YmFiY2YyYzBmMGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NzMwMTc5MDE0NzMtcXRxdDdtbTNlMTlkNWc0a2cxcGZ0NjRicmlpYmxiNTMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NzMwMTc5MDE0NzMtcXRxdDdtbTNlMTlkNWc0a2cxcGZ0NjRicmlpYmxiNTMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMxMjcxMzk4Mjg3MjY5OTk5MzciLCJlbWFpbCI6InM4MDUzMnNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcxMDk0NTE3OSwibmFtZSI6Iuael-mWjuW7uiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKMGZkSG13VE5lMEFNSHhGNWFzZU1zV1ZoWl9Bdzd0dXdFQm5YNXFLMGY9czk2LWMiLCJnaXZlbl9uYW1lIjoi6ZaO5bu6IiwiZmFtaWx5X25hbWUiOiLmnpciLCJpYXQiOjE3MTA5NDU0NzksImV4cCI6MTcxMDk0OTA3OSwianRpIjoiYjgyODhhZmNkODBkZmE1OTA0NzkzNDU1Nzg4Y2Q3MGFjNGM0M2I1YyJ9.F2hANTVnP7UGT1N5rWOh9qkuB6wNnmczIehLdwy9E0ltqWbmgGPRpDbs-oAyTQLJXAKB1FE-nNnU7Bde0500F3UWlpKnN8IFdo3XTvES3UccRTrMbTlmF3nQ09cVwSJRjjVF4CkbwHDDg58CNo6Ue12J1rA0FAw912OD6SFPy3GEn0k_TcB-2dlZDyziEKzeHsMFUpl3lGDL66On8oN1RQZSFF7ONm1fvuj4pAoaf2kx0T2iQuqgkyFCNO3Vfnn91Kb8uLAW6Kwq55cnBQwP6z9Avl4iZm3BAHCkAn28giTqLBSFAmXb4RjzFFrDd1iiZ_Bo_UhZYjGDYZPFMB9y_Q'

const decoded = jwt.decode(token1);
console.log("Decoded JWT payload:", decoded);
  
// 提取有用的信息，例如用户名、电子邮件等
// if (decoded) {
//   const { email, name } = decoded;
//   console.log("Email:", email);
//   console.log("Name:", name);
// }