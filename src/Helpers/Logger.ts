export function Log(value: string) {
    console.log(value)
    return function(log: string) {
        console.log(log)
    }
}