export const getFoo = state => {
    return {
        foo: state.foo
    }
} 
export const getBar = store => store && store.bar ? store.bar : {}
