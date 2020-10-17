export class Events {
    protected events: Array<string> = [ 
        "closed",
        "client",
        "clientReady",
        "clientDisconnect",
        "keepaliveTimeout",
        "connackSent",
        "clientError",
        "connectionError",
        "ping",
        "publish",
        "ack",
        "subscribe",
        "unsubscribe" 
    ];
}
