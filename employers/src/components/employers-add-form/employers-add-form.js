import { Component } from 'react';

import './employers-add-form.css';

class EmployersAddForm extends Component {
    constructor (props) {
        super (props);
        this.state = {
            name: '',
            sallary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.name.length < 2 || !this.state.sallary) {
            return
        };
        this.props.onAdd(this.state.name, this.state.sallary);
        this.setState ({
            name: '',
            sallary: ''
        })
    }

    render () {

        const {name, sallary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Додайте нового співробітника</h3>
                <form 
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}>
    
                    <input type="text"
                        className='form-control new-post-label'
                        placeholder='Як його звати?'
                        name='name'
                        value={name}
                        onChange={this.onValueChange} />
    
                    <input type="number"
                        className='form-control new-post-label'
                        placeholder='З/П в $?'
                        name='sallary'
                        value={sallary}
                        onChange={this.onValueChange} />
    
                    <button type='submit'
                            className='btn btn-outline-light'>Додати</button>
                </form>
            </div>
           
        )
    }
}

export default EmployersAddForm;