import React, { createContext } from 'react'
type IState = {
  authenticated: false
}
interface IContextProps {
  state: IState;
  dispatch: ({type}:{type:string}) => void;
}

export const LoginContext = createContext({} as IContextProps)

export const LoginProvider = ({children}:any) => {

  const defaultContext = {
    authenticated: false,
  }
  const [authenticated, setAuthenticated] = React.useState(defaultContext)
  const store ={
    authenticated: [authenticated, setAuthenticated]
  }
  return(
    <LoginContext.Provider value={store}>
      <>
        {children}
      </>
    </LoginContext.Provider>
  )
}