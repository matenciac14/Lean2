import React, { Component } from 'react';
import TeamComponent from '../team-component/team-component';
import './team-list.css';

class TeamList extends Component {
    constructor(props) {
        super(props);
        this.teams = [];
        this.btncreate = React.createRef();       
        this.teams.push({
            name: 'Team1',
            channels: [{
              name: 'Channel1',
              index: 1
            },
            {
              name: 'Channel2',
              index: 2
            }]
        });
        this.teams.push({
            name: 'Team2',
            channels: [{
              name: 'Channel1',
              index: 1
            },
            {
              name: 'Channel2',
              index: 2
            }]
        });

        this.state = {
            teams: this.teams,
            teamName:''
        };

        this.formValidation = this.formValidation.bind(this)
    }

    componentDidMount() {
        
    }

    formValidation =(e)=> {
        this.setState({teamName:e.target.value})
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

    addTeam =(name)=> {
        if(name){
            const arr = this.state.teams;       
            arr.push({
                name,
                channels: []
            });
            this.setState({teams: arr,teamName:""})
            
        }else{
            return
        }
        
    }



    

    render() {
        return (
            <div>
                <div className="teams-list">
                    <ul>
                        { this.teams && this.teams.map((team, idx) => (
                            <li key={idx}>
                                <TeamComponent
                                    team ={team}
                                />
                            </li>
                        ))}
                    </ul>  
                </div>
                <div className="add-team">
                    <b>Add Team</b>
                    <input 
                        placeholder="Team name"                        
                        value={this.state.teamName}
                        onChange={this.formValidation}
                    />
                    <button
                       onClick={()=>this.addTeam(this.state.teamName)}
                       ref={this.btncreate}
                    >&#8853;</button>
                </div>
            </div>
        );
    }
}

export default TeamList;
