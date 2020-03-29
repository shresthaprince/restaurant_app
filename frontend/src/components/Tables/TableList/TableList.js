import React from 'react';
import './TableList.css';

import TableItem from './TableItem/TableItem';

const tableList = props => {
    const tables = props.tables.map(table => {
        return (

            <TableItem
            key={table._id}
                tableId={table._id}
                title={table.number}
                minCapacity={table.minCapacity}
                maxCapacity={table.maxCapacity}
                userId={props.authUserId}
                creatorId={table.creator._id}
                onDetail={props.onViewDetail}
            />
        );
    });

    return (<ul className="table_list">{tables}</ul>)
};

export default tableList;