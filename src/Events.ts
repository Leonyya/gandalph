export class Events {
    protected static events: Array<string> = [ 
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
