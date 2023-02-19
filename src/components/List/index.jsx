import React, {Component} from 'react';
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';

import './index.css'

class List extends Component {
    render() {
        const {users, isFirst, isLoading, err} = this.props

        return (
            <div className="row">
                {
                    isFirst ? <h2>欢迎使用</h2> :
                        isLoading ? <h2>Loading...</h2> :
                            err ? <h2 style={{color: "red"}}>{err}</h2> :
                                this.props.users.map((usersObj) => {
                                    return (
                                        <div className="card" key={usersObj.id}>
                                            <a rel="noreferrer" href={usersObj.html_url} target="_blank">
                                                {/*<img className="card" alt="" src={usersObj.avatar_url} style={{width: '200px'}}/>*/}
                                                <Avatar size={150} src={usersObj.avatar_url}/>
                                            </a>
                                            <p className="card-text">{usersObj.login}</p>
                                        </div>
                                    )
                                })
                }
            </div>
        );
    }
}

export default List;