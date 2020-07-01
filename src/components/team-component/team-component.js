import React, { Component } from 'react';
import './team-component.css';

class TeamComponent extends Component {

    constructor(props) {
        super(props);
        this.team = this.props.team;
        this.teamIndex = this.props.teamIndex;
        this.btncreate = React.createRef();
        
        this.state = {
            chanelName:'',
            sort:'As'
        };

        
    }

       
    componentDidMount() {
        
    }

    formValidation=(e)=> {
        this.setState({chanelName:e.target.value})
        var letras="abcdefghyjklmnñopqrstuvwxyz";

        let texto = e.target.value.toLowerCase();
        for(let i=0; i<texto.length; i++){
            if (letras.indexOf(texto.charAt(i),0)!==-1){
            this.btncreate.current.disabled= false;
                return ;
            }
        }
        this.btncreate.current.disabled= true;
        return ;

    }

    removeChannel(t) {
    let arr = this.team.channels.filter(arr => arr.index !== t)
    let narr ={
        name: this.team.name,
        channels: arr
    }
    this.setState(this.team=narr)
    }

    addChannel =(name)=> {
        if(name){
            let arr = this.team.channels       
        arr.push({
        name,
        index:arr.length +1
        } )
        this.setState({team: arr, chanelName:""})        
        }else{
            return
        }
        
    }
    
    sort=(key)=> {
        if(this.state.sort === 'As'){
            let arrsort = this.team.channels
            arrsort.sort( (a, b)=> {
                var x = a[key]; var y = b[key];
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
            this.setState({team: arrsort})
            this.setState({sort:'Ds'}) 
        }else{
            let arrsort = this.team.channels
            arrsort.sort( (a, b)=> {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            this.setState({team: arrsort})
            this.setState({sort:'As'}) 
        }
              
        
   
    }



    render() {
        return (
        <div>
            {
                this.team && 
                <div>
                    <span className="team-name">{this.team.name}</span>
                    <button 
                        className="sort"
                        onClick={()=> this.sort("name")}
                    >&#8597;</button>
                    <span className="add-channel">
                        <input 
                            placeholder="Channel name"
                            value={this.state.chanelName}
                            onChange={this.formValidation}
                        />
                        <button                            
                            onClick={()=>this.addChannel(this.state.chanelName)}
                            ref={this.btncreate}
                        >&#8853;</button>
                    </span>
                </div>
            }
            {
                this.team &&
                <ul className="one">
                    { this.team.channels && this.team.channels.map((channel, idx) => (
                        <li className="channel-name" key={channel.index}>
                            <span>{channel.name}</span>
                            <button
                                onClick={()=> this.removeChannel(channel.index)}
                            >&#8854;</button>
                        </li>
                    ))}
                </ul>
            }
        </div>
        );
    }
}

export default TeamComponent;
