import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value; // Отримання обʼєкту із написаного в пошуку
        this.setState({term});
        this.props.onUpdateSearch(term); // виклик проперті, в який маємо передати те, що отримали тут
    }

    render () {
        return (
            <input 
                type="text"
                className="form-control search-input"
                placeholder="Знайти співробітника" 
                value={this.state.term}
                onChange={this.onUpdateSearch}/>
        )
    }
}

export default SearchPanel;