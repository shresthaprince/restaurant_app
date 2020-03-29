import React from 'react';

import './TableItem.css';

const tableItem = props => (
    <li key={props.tableId} className="tables_list-item">
        <div>
            <h1>
                Table #{props.title}
            </h1>
            <h2>
                {props.minCapacity} - {props.maxCapacity} patrons
            </h2>
        </div>
        <div>
            <button className="btn" onClick={props.onDetail.bind(this, props.tableId)}>View Details</button>
            {props.userId === props.creatorId ? <p>You created the table</p> :
                <p></p>
            }
        </div>
    </li>
);

export default tableItem;