import {useCallback, useRef, useState} from 'react';
import {DataGrid, GridColDef, GridInputRowSelectionModel, GridRowsProp} from '@mui/x-data-grid';

const initialRows: GridRowsProp = [
    {id: 1, col1: 'Hello', col2: 'World'},
    {id: 2, col1: 'DataGridPro', col2: 'is Awesome'},
    {id: 3, col1: 'MUI', col2: 'is Amazing'},
];

const columns: GridColDef[] = [
    {field: 'col1', headerName: 'Column 1', width: 150},
    {field: 'col2', headerName: 'Column 2', width: 150},
];

export default function App() {
    const [rowSelectionModel, setRowSelectionModel] = useState<GridInputRowSelectionModel>([]);
    const [rows, setRows] = useState<GridRowsProp>(initialRows);
    const indexRef = useRef(10);

    const onAdd = useCallback(() => {
        const value = indexRef.current;
        setRows(rows => ([
            ...rows,
            {id: value, col1: value, col2: value}
        ]))
        indexRef.current += 1;
    }, [])

    const onDelete = useCallback(() => {
        setRows(rows => rows.filter(r => !(rowSelectionModel as number[]).includes(r.id)))
    }, [rowSelectionModel])


    return (
        <div style={{height: 600, width: '100%'}}>
            <button onClick={onAdd}>add</button>
            <button onClick={onDelete}>delete</button>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={(m) => setRowSelectionModel(m)}
                rowSelectionModel={rowSelectionModel}
                keepNonExistentRowsSelected={false}
            />
            {JSON.stringify(rowSelectionModel)}
        </div>
    );
}