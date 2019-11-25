export const getFoo = store => store && store.foo ? { foo: store.foo } : {} 
export const getBar = store => store && store.bar ? store.bar : {}
