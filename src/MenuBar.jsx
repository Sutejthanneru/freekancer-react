import  { Component } from 'react';
import './MenuBar.css';
import PropTypes from 'prop-types';
import { callApi, getSession } from './api'
class MenuBar extends Component {
    constructor()
    {
        super();
        this.state={menuitems:[]};
        this.loadMenus=this.loadMenus.bind(this);

    }
    componentDidMount()
    {
   
    let csr=getSession("csrid");
    let data=JSON.stringify({csrid:csr});
    callApi("POST","http://localhost:8087/menus/getmenusbyrole",data,this.loadMenus

    );
    }
    loadMenus(response)
    {
        let data=JSON.parse(response);
        this.setState({menuitems:data});
    }
    
    render() {
        const {menuitems} =this.state;       
        return (
            <div className='menubar'>
                <div className='menuheader'><img src='/menu.png' alt=''/>MENU</div>
                <div className='menulist'>
                    <ul>
                        {menuitems.map((row=>
                        <li onClick={()=>this.props.onMenuClick(row.mid) }key={row.menu}>{row.menu} <img src={row.icon} alt=''/></li>

                        ))}
                                                
                    </ul>
                    </div>               
            </div>
        );
    }
}
MenuBar.propTypes = {
    onMenuClick: PropTypes.func.isRequired
};


export default MenuBar;