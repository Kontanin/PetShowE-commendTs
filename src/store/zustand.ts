import axios from "axios";
import {create} from "zustand";
import {persist} from "zustand/middleware";




type HeaderStore={
  goBackUrl:string
  setGoBackUrl:(url:string)=>void;
  setHeader:(header:string)=>void;
  setWidth:(width:string)=>void;
  widthWindow:number;
}

export enum headerType{
  NORMAL_STATE,
  OPEN_FILLTER,
  GOBACK_STATE
}



type UserTypes={
  email:string;
  password:string;
  id:string;
  username:string;
}

type USerstrore={
  id:string;
  token:string; 
  role:string;
  setUSer:(user:UserTypes)=>void;
}


export const useUserStore = create(
  persist<USerstrore>(
    
    (set,get)=>({
      id:"",
        token:"",
        role:"",
      setUSer:(user:UserTypes)=>{
        
        
        
        set({id:user.id,token:user.id,role:user.id})}


    }),
    {getStorage:()=>
      localStorage,
      name:"userStore",
    }
    

))