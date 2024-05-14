import './employers-list-item.css';

const EmployersListItem = (props) => {
    
    const {name, sallary, onDelete, onToggleProp, increase, rise} = props;
    let classNames = 'list-group-item d-flex justify-content-between';

    if(increase){
        classNames += ' increase'; // Важливо додавати пробіл перед написанням класу, адже без нього, вони зільються в одну строку
    }
    if(rise){
        classNames += ' like';
    }

    return (
        <li className={classNames}>
            <span className="list-group-item-label" onClick={onToggleProp} data-toggle = 'rise'>{name}</span>
            <input type="text" className="list-group-item-input" defaultValue={sallary + '$'}/>
            <div className="d-flex justifu-content-center align-items-center">
                <button type='button'
                    className="btn-cookie btn-sm"
                    onClick={onToggleProp}
                    data-toggle = 'increase'>
                        <i className="fas fa-cookie"></i>
                </button>

                <button type='button'
                    className="btn-trash btn-sm"
                    onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    );
}

export default EmployersListItem;