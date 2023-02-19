import './App.css';
import Search from "./components/Search";
import List from "./components/List";
import React, {Component} from "react";
import UploadTable from "./components/Upload";
class App extends Component {
state = {
    users:[],
    isFirst:true,
    isLoading:false,
    err:''
};
updateAppState = (stateObj)=>{
        this.setState(stateObj)
    }


    render() {
        return (
            <UploadTable />
        )
    }

}

export default App;