import React, { useState, useEffect, useCallback } from 'react'
import { List, Avatar, Button, Skeleton } from 'antd';
import './FriendRequests.css'
import SiderDemo from '../../containers/Layaout/Layout'
import axios from 'axios';
import Cookies from 'js-cookie'

const FriendRequests = props => {
    const [state, setState] = useState({
        initLoading: true,
        loading: false,
        
    })
    const [activeRequests,updateactiveRequests] = useState([])

    const updateInfo  = () => {
        axios.get("http://localhost:8000/api/friendRequests/?to_user__username=" + localStorage.username)
        .then(res => {
            updateactiveRequests([])
            res.data.forEach(obj => {
                console.log("fdfsdfd")    
                if (activeRequests.length !== res.data.length){
                    updateactiveRequests(activeRequests => [...activeRequests,{
                        accepted: obj.accepted,
                        avatar: obj.from_user.avatar,
                        requestorId: obj.from_user.id,
                        requestorUsername: obj.from_user.username,
                        id : obj.id
                    }])
                }            
            });
            setState({
                initLoading: false,
                loading: false,
            })
            console.log(state);
        })
        .catch(e => console.log(e.response))
    }
    
    useEffect(() => {
        updateInfo()
    }, [])


    const csrftoken = Cookies.get('csrftoken')
    const config = {
        headers: {
          'X-CSRFToken': csrftoken,
          'Content-Type': 'application/json'
        }
      }

    const handleAccept = item => {
        let url = "http://localhost:8000/api/friendRequests/" + item.id + "/"
        axios.put(url,{
            'accepted':true,
            'from_user':item.requestorId,
            'to_user':props.userID
        },config)
        .then(response => {
            console.log(response)
            deleteRequest(item.id)
        }).catch(e => console.log(e.response))
    }

    const deleteRequest = id => {
        axios.delete("http://localhost:8000/api/friendRequests/" + id + "/",config)
        .then(() => updateInfo())
        .catch(e => console.log(e.response))
    }


    const { initLoading, loading } = state;
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >

            </div>
        ) : null;

    return (
        <SiderDemo>
            <h2>
                {console.log(activeRequests[0])}
            </h2>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={activeRequests}
                renderItem={item => (
                    <List.Item
                >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={
                                    item.avatar === null
                                    ? <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    : <Avatar src={item.avatar}/>
                                }
                                title={<a href={item.requestorUsername}>{"Friend request from " + item.requestorUsername}</a>}
                                description={item.requestorUsername + " wants to be friends with you!"}
                            />
                            <button type="button" onClick={() => handleAccept(item)} key="list-loadmore-edit">accept</button>
                            <button type="button" onClick={() => deleteRequest(item.id)} key="list-loadmore-more">decline</button>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </SiderDemo>
    );
}

export default FriendRequests