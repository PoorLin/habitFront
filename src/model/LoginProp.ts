export interface LoginProp{
   secret:string,
   email:string,
} 
export interface LoginGoogleProp{
   token:string,
   key:string,
} 

export interface LoginByGoogleProp{
   secret:string,
   email:string,
} 
export interface ForgotPassProp{
   email:string,
} 

export interface ResetPassProp{
   email:string,
   secret:string,
} 


