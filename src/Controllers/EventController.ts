import { Events } from '../Models/Events'

export default class EventController extends Events {
    constructor() {
        super();
    }

    routes() {
        for(let e in this.events) {
            this.handler(e);
        }
    }

    handler(eventName: string) {
        if(eventName === 'closed')
            return () => console.log('Connection closed')
    }

    _Client() {
        
    }

    _Packet() {

    }

    _Subscription() {

    }
}