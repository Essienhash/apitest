import React, {Component} from 'react';
import {Button} from 'antd';
import axios from 'axios';
import './index.css'

class Search extends Component {

    search = () => {
        //获取用户输入

        /*方式一*/
        const {value} = this.keyWordElement
        console.log(value);

        /*发送请求前通知App状态变更*/
        this.props.updateAppState({isFirst:false,isLoading:true})
        //发送网络请求(注意是反单引号``),请求成功后通知APP状态变更
        axios.get(`https://api.github.com/search/users?q=${value}`).then(
            response => {this.props.updateAppState({isLoading:false,users:response.data.items})},

            /*请求失败后通知APP状态变更*/
            error=>{this.props.updateAppState({isLoading:false,err:error.message})})
    }


    render() {

        return (

            <div className="content">
                <h3>搜索Github用戶名</h3>
                <div>
                    <input ref={c => this.keyWordElement = c} placeholder="輸入英文用戶名" style={{width: '200px'}}/>&nbsp;

                    <Button type="primary" onClick={this.search}>查詢</Button>
                </div>
            </div>
        );
    }
}

export default Search;