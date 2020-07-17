class WebSockets{
    static instance = null
    callbacks = {}

    static getInstance(){
        if(!WebSockets.instance){
            WebSockets.instance = new WebSockets()
        }
        return WebSockets.instance
    }

    constructor(){
        this.socketRef = null
    }

    connect(chatUrl){
        const path = `ws://
        + localhost:8000
        + /ws/chat/
        + ${chatUrl}
        + /`
        console.log(path)
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {
            console.log("Open socket")
        }
        this.socketRef.onmessage = e =>{
            console.log("new message: ",e)
        }
        this.socketRef.onerror = e => {
            console.log(e.message)
        }
        this.socketRef.onclose = () => {
            console.log("closed, reopening");
            this.connect()
        }
    }

    disconnect(){
        this.socketRef.close()
    }

    socketNewMessage(data){
        const parsedData = JSON.parse(data)
        const command = parsedData.command
        if (Object.keys(this.callbacks).length === 0){
            return
        }
        if(command === 'new_message'){
            this.callbacks[command](parsedData.message)
        }
        if(command === 'messages'){
            this.callbacks[command](parsedData.messages)
        }
    }

    getMessages(username,chatCode){
        this.sendMessage({
            command:'get_messages',
            username:username,
            chatCode:chatCode
        })
    }

    newChatMessage(message){
        this.sendMessage({
            command:'new_message',
            from:message.from,
            message:message.content,
            chatCode:message.chatCode
        })
    }

    addCallbacks(messagesCallback,newMessageCallback){
        this.callbacks['messages'] = messagesCallback
        this.callbacks['new_message'] = newMessageCallback
    }

    sendMessage(data){
        try{
            this.socketRef.send(JSON.stringify({...data}))
        }
        catch (err){
            console.log(err);
        }
    }

    waitForConnection(callback){
        const socket = this.socketRef
        const recursion = this.waitForConnection;
        setTimeout(
            () => {
                if(socket.readyState === 1){
                    console.log("secure connection");
                    if (callback != null){
                        callback()
                    }
                    return;
                }
                else{
                    console.log("waiting for conn");
                    recursion(callback)
                }
            },1)
    }
}

const WebSocketInstance = WebSockets.getInstance()
export default WebSocketInstance