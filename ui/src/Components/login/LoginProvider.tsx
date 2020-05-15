import React, { Dispatch, createContext } from 'react'
export const LoginProvider = () => (<></>)

/*
interface Actions {
  type: string,
  value: any
}

interface LoginProviderProps {
  children: JSX.Element | null
}

interface InitContextProps {
  state: LoginProviderProps,
  dispatch: Dispatch<Actions>
}

export const LoginContext = createContext({} as InitContextProps)

export const LoginProvider:React.FunctionComponent<LoginProviderProps> = ({children}) => {

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
}*/