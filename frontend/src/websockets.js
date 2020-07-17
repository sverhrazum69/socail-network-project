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
        console.log(chatUrl)
        const path = `ws://localhost:8000/ws/chat/${chatUrl}/`
        console.log(path)
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {
            console.log("Open socket")
        }
        this.socketNewMessage(JSON.stringify({
            command:'get_messages'
        }))
        this.socketRef.onmessage = e =>{
            this.socketNewMessage(e.data)
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
        console.log(chatCode)
        this.sendMessage({
            command:'get_messages',
            username:username,
            chatCode:chatCode
        })
    }

    newChatMessage(message,chatCode){
        this.sendMessage({
            command:'new_message',
            from:message.from,
            message:message.content,
            chatCode:chatCode
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


    state(){
        return this.socketRef.readyState
    }
}

const WebSocketInstance = WebSockets.getInstance()
export default WebSocketInstance