import Header from "./Header"
import React, { useState, useMemo, useCallback } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const NewProject = () => {
    const initialData = [{contributors: 'Spotty Solutionist (You)' }];
    
    var [rowData, setRowData] = useState(initialData);

    const [columnDefs] = useState([
        {
            field: 'contributors',
            cellEditor: 'agRichSelectCellEditor',
            cellEditorPopup: true,
            cellEditorParams: {
                cellHeight: 50,
                values: ['Kasper Møller', 'Rasmus Albrektsen', 'Spotty Solutionist'],
            },
        }
    ]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 130,
            editable: true,
            resizable: true,
        };
    }, []);


    //This is not the cleanest code I've ever made, but it works
    const addRow = useCallback(() => {
        const newRowData = [...rowData];
        newRowData.push({contributors: 'none selected'});
        setRowData(newRowData);
        rowData = [...newRowData]
    }, []);

    return (
        <div>
            <Header title={'Header palceholder'} />
            <div className='newproject'>
                <div>
                    <h1>Project creation</h1>
                </div>
                <div className='new-project-main'>
                    <div className='new-project-left'>
                        <div className='new-project-name'>
                            <h3>Project Name</h3>
                            <input className='input-project-name' type='text' placeholder='Project name' />
                        </div>
                        <div className='new-project-description'>
                            <h3>Description</h3>
                            <input className='input-project-description' type='text' placeholder='Project description' />
                        </div>

                        <div className='new-project-contributors'>
                            <button onClick={addRow}>Add contributor</button>
                            <div className="ag-theme-alpine" style={{ height: 400, width: 344 }}>
                                <AgGridReact
                                    rowData={rowData}
                                    columnDefs={columnDefs}
                                    defaultColDef={defaultColDef}
                                >
                                </AgGridReact>
                            </div>
                        </div>
                    </div>
                    <div className='new-project-right'>
                        <div className='new-project-buildings'>
                            <h3>Buildings</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProject