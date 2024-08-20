import { create } from "zustand";
import { User } from "../../domain/entities/entities/user";
import { AuthStatus } from "../../infrastructure/interfaces/auth.status";
import { authLogin } from "../../actions/auth/auth";



export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email:string, password:string) => Promise<boolean>;
}





export const useAuthStore = create<AuthState>()((set,get)=>({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async(email:string, password:string)=>{
        const res = await authLogin(email, password);
        if(!res) {
            set({status:'authenticated', token:undefined, user:undefined});
            return false;
        }
        console.log({res});
        set({status:'authenticated', token:res.token, user:res.user});

        return true;

    }
}));
