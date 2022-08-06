// context api
import { createContext } from 'react'; 
const AuthContext = createContext({
    open: () => document.querySelector('.forms').classList.toggle('none'),
    data: [],
    setdata: () => { },
    title: 'add brind', 
})
export default AuthContext;
