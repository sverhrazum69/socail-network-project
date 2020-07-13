import React, { useState, useEffect, useCallback } from 'react'
import { List, Avatar, Button, Skeleton } from 'antd';
import './FriendRequests.css'
import axios from 'axios';
const count = 3;

const FriendRequests = props => {
    const [state, setState] = useState({
        initLoading: true,
        loading: false,
        
    })
    const [activeRequests,updateactiveRequests] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/friendRequests/?to_user=" + props.userID)
        .then(res => {
            console.log(res)
            res.data.forEach(obj => {
                console.log("fdfsdfd")    
                if (activeRequests.length !== res.data.length){
                    updateactiveRequests(activeRequests => [...activeRequests,{
                        accepted: obj.accepted,
                        avatar: obj.from_user.avatar,
                        requestorId: obj.from_user.id,
                        requestorUsername: obj.from_user.username,
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
    }, [activeRequests])


    const { initLoading, loading, list } = state;
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
        <div>
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
                        actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title={<a href={item.requestorUsername}>{"Friend request from " + item.requestorUsername}</a>}
                                description={item.requestorUsername + " wants to be friends with you!"}
                            />
                            <div>{item.accepted}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
}


export default FriendRequests