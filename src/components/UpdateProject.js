import Header from "./Header"
import React, { useState, useMemo, useCallback, useRef } from "react";
import { useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useNavigate } from "react-router-dom";

const UpdateProject = ({projects, onUpdateProject}) => {
    const { id } = useParams()
    const project = projects.find(project => project.id == id)
    console.log(project)
    const initialData1 = [];
    for(let i = 0; i < project.contributors.length; i++) {
        console.log(project.contributors[i].name)
        var rowData = {name: project.contributors[i].name}
        initialData1.push(rowData)
    }
    const gridRef1 = useRef();

    var [rowData1, setRowData1] = useState(initialData1);

    const [columnDefs1] = useState([
        {
            headerName: 'Contributors',
            field: 'name',
            cellEditor: 'agRichSelectCellEditor',
            cellEditorPopup: true,
            cellEditorParams: {
                cellHeight: 50,
                values: ['Kasper Møller', 'Rasmus Albrektsen', 'Spotty Solutionist'],
            },
        }
    ]);

    const defaultColDef1 = useMemo(() => {
        return {
            flex: 1,
            minWidth: 130,
            editable: true,
            resizable: true,
        };
    }, []);


    //This is not the cleanest code I've ever made, but it works
    const addRow = useCallback(() => {
        const newRowData = [...rowData1];
        newRowData.push({ name: 'none selected' });
        setRowData1(newRowData);
        rowData1 = [...newRowData]
    }, []);

    //Definitely not that clean either, worked from a multiple row selection implementation
    const deleteRow = useCallback(() => {
        const selectedRowNodes = gridRef1.current.api.getSelectedNodes();

        const selectedIds = selectedRowNodes.map(function (rowNode) {
            return parseInt(rowNode.id);
        });

        var filteredData = [];
        for (let i = 0; i < rowData1.length; i++) {
            if (selectedIds[0] != i) {
                filteredData.push(rowData1[i]);
            }
        }

        setRowData1(filteredData);
        rowData1 = [...filteredData]
    }, []);

    const initialData2 = [];

    for(let i = 0; i < project.buildings.length; i++) {
        var building = project.buildings[i];
        console.log(building)
        var rowData = {name: building.name, type: building.type, levels: building.levels, area: building.area}
        initialData2.push(rowData)
    }

    const gridRef2 = useRef();

    var [rowData2, setRowData2] = useState(initialData2);

    const [columnDefs2] = useState([
        {
            headerName: 'Building name',
            field: 'name',
        },
        {
            headerName: 'Building type',
            field: 'type',
            cellEditor: 'agRichSelectCellEditor',
            cellEditorPopup: true,
            cellEditorParams: {
                cellHeight: 50,
                values: ['Detached', 'Apartment', 'Office'],
            },
        },
        {
            headerName: 'Number of levels',
            field: 'levels',
        },
        {
            headerName: 'Gross area',
            field: 'area',
        },

    ]);

    const defaultColDef2 = useMemo(() => {
        return {
            flex: 1,
            minWidth: 130,
            editable: true,
        };
    }, []);


    //This is not the cleanest code I've ever made, but it works
    const addRow2 = useCallback(() => {
        const newRowData = [...rowData2];
        newRowData.push({ 'name': 'Building name', 'type': 'Apartment', 'levels': 0, 'area': 0 });
        setRowData2(newRowData);
        rowData2 = [...newRowData]
    }, []);

    //Definitely not that clean either, worked from a multiple row selection implementation
    const deleteRow2 = useCallback(() => {
        const selectedRowNodes = gridRef2.current.api.getSelectedNodes();

        const selectedIds = selectedRowNodes.map(function (rowNode) {
            return parseInt(rowNode.id);
        });

        var filteredData = [];
        for (let i = 0; i < rowData2.length; i++) {
            if (selectedIds[0] != i) {
                filteredData.push(rowData2[i]);
            }
        }

        setRowData2(filteredData);
        rowData2 = [...filteredData]
    }, []);

    const [projectName, setProjectName] = useState(project.name);
    const [projectDescription, setprojectDescription] = useState(project.description);

    const navigate = useNavigate();
    const updateProject = () => {
        var today = new Date();

        const newProject = {
            id: project.id,
            name: projectName,
            description: projectDescription,
            lastEdit: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            contributors: rowData1
            ,
            screenings: [],
            lca: [],
            costs: [],
            buildings: rowData2
        }

        onUpdateProject(newProject)

        navigate("/project/" + project.id);
    }

    const checkID = (id) => {
        for (let i = 0; i < projects.length; i++) {
            if (id == projects[i]) {
                return checkID(id++)
            }
        }
        return id;
    }

    const cancel = () => {
        navigate("/");
    }

  return (
    <div className='main-body'>
    <Header title={'Header palceholder'} />
    <div className='newproject'>
        <div>
            <h1>Manage project</h1>
        </div>
        <div className='new-project-main'>
            <div className='new-project-left'>
                <div className='new-project-name'>
                    <h3>Project Name</h3>
                    <input value={projectName} onChange={(e) => setProjectName(e.target.value)} className='input-project-name' type='text' placeholder='Project name' />
                </div>
                <div className='new-project-description'>
                    <h3>Description</h3>
                    <input value={projectDescription} onChange={(e) => setprojectDescription(e.target.value)} className='input-project-description' type='text' placeholder='Project description' />
                </div>

                <div className='new-project-contributors'>
                    <button onClick={addRow}>Add contributor</button>
                    <button onClick={deleteRow}>Remove selected contributor</button>
                    <div className="ag-theme-alpine" style={{ height: 400, width: 344 }}>
                        <AgGridReact
                            ref={gridRef1}
                            rowData={rowData1}
                            columnDefs={columnDefs1}
                            defaultColDef={defaultColDef1}
                            rowSelection={'single'}
                        >
                        </AgGridReact>
                    </div>
                </div>
            </div>
            <div className='new-project-right'>
                <div className='new-project-buildings'>
                    <div>
                        <h3>Buildings</h3>
                        <button onClick={addRow2}>Add building</button>
                        <button onClick={deleteRow2}>Remove selected building</button>
                    </div>
                    <div className="ag-theme-alpine" style={{ height: 400, width: 830 }}>
                        <AgGridReact
                            ref={gridRef2}
                            rowData={rowData2}
                            columnDefs={columnDefs2}
                            defaultColDef={defaultColDef2}
                            rowSelection={'single'}
                        >
                        </AgGridReact>
                    </div>
                    <div className='creation-buttons'>
                        <div>
                            <button className='project-create-button' onClick={updateProject}>Save changes</button>
                        </div>
                        <div>
                            <button className='cancel-button' onClick={cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default UpdateProject