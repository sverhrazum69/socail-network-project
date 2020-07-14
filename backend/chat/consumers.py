import json
from asgiref.sync import async_to_sync
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from channels.generic.websocket import WebsocketConsumer
from .models import Messages
from django.core import serializers

User = get_user_model()

def messages_to_json(messages):
    res = [] 
    for message in messages:
        res.append(message_to_json(message))
    return res

def message_to_json(message):
    return {
        'author':message.author.username,
        'content':message.content,
        'date':str(message.date)
    }
class ChatConsumer(WebsocketConsumer):

    #preload messages -> serialize to json -> send to webSocket
    def get_messages(self,data):
        print("get_messages_triggered")
        messages = Messages.get_last_10_messages()
        content = {
            'messages': messages_to_json(messages),
            'command':'get_messages'
        }
        self.send_message(content)

    def send_message(self,message):
        return self.send(text_data=json.dumps(message))


    # create new model instance -> serialize data -> send to webSocket

    def new_message(self,data):
        print(data)
        print("new_message_triggered")
        #get author username
        author = data['from']
        #get user object
        author_user = get_object_or_404(User,username=author)
        message = Messages.objects.create(
            author=author_user,
            content=data['message']
        )
        content = {
            'command':'new_message',
            'messages': message_to_json(message)
        }
        return self.send_messages(content)


    commands = {
        'get_messages':get_messages,
        'new_message':new_message
    }


    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        #call apropriate func to handle specific command
        self.commands[data['command']](self,data)


    def send_messages(self,message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps(message))