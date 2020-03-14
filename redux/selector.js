export const getFoo = state => {
    return {
        foo: state.foo
    }
} 
export const getBar = store => store && store.bar ? store.bar : {}

export const logInfo = store => store && store.isLogged ? store.isLogged : {}
