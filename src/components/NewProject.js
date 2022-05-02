import Header from "./Header"
import React, { useState, useMemo, useCallback, useRef } from "react";
import { AgGridReact } from 'ag-grid-react';
import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useNavigate } from "react-router-dom";

const NewProject = ({ projects, onAddProject }) => {
    const initialData1 = [{ name: 'Spotty Solutionist (You)' }];
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

    const initialData2 = [{ 'id': 0, 'name': 'Building name', 'type': '', 'levels': 0, 'area': 0 }];
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

    const checkBuildingID = (id) => {
        for (let i = 0; i < rowData2.length; i++) {
            if (id == rowData2[i].id) {
                id++;
                return checkBuildingID(id)
            }
        }
        return id;
    }

    //This is not the cleanest code I've ever made, but it works
    const addRow2 = useCallback(() => {
        const newRowData = [...rowData2];
        newRowData.push({ 'id': checkBuildingID(rowData2.length), 'name': 'Building name', 'type': 'Apartment', 'levels': 0, 'area': 0 });
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

    const [projectName, setProjectName] = useState(" ");
    const [projectDescription, setprojectDescription] = useState("");

    const navigate = useNavigate();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const createProject = () => {
        console.log(projects.length)
        var newId = checkID(projects.length);



        var today = new Date();

        const newProject = {
            id: newId,
            name: projectName,
            description: projectDescription,
            lastEdit: months[today.getMonth()] + " " + today.getDate(),
            contributors: rowData1
            ,
            screenings: [],
            lca: [],
            costs: [],
            buildings: rowData2
        }


        //projects.push(newProject);

        onAddProject(newProject)

        navigate("/project/" + newId);
    }

    const checkID = (id) => {
        for (let i = 0; i < projects.length; i++) {
            if (id == projects[i].id) {
                id++
                return checkID(id)
            }
        }
        return id;
    }

    const cancel = () => {
        navigate("/");
    }


    return (
        <div className='main-body'>
            <Header title={projectName} />
            <div className='newproject'>
                <div>
                    <h1 className='page-sub-header'>Project creation</h1>
                </div>
                <div className='new-project-main'>
                    <div className='new-project-left'>
                        <div className='new-project-name'>
                            <h3>Name</h3>

                            <textarea value={projectName} onChange={(e) => setProjectName(e.target.value)} className='input-project-name' />
                        </div>
                        <div className='new-project-description'>
                            <h3>Description</h3>
                            <textarea value={projectDescription} onChange={(e) => setprojectDescription(e.target.value)} className='input-project-description' />
                        </div>

                        <div className='new-project-contributors'>

                            <div className="ag-theme-alpine" style={{ height: 260, width: 344 }}>
                                <AgGridReact
                                    ref={gridRef1}
                                    rowData={rowData1}
                                    columnDefs={columnDefs1}
                                    defaultColDef={defaultColDef1}
                                    rowSelection={'single'}
                                >
                                </AgGridReact>
                            </div>
                            <div className='contributor-icons-container'>
                                <div className='add-contributor-icon'>
                                    <AiOutlineUserAdd onClick={addRow} />
                                </div>
                                <div className='remove-contributor-icon'>
                                    <AiOutlineUserDelete onClick={deleteRow} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='new-project-right'>
                        <div className='new-project-buildings'>
                            <div>
                                <h3>Buildings</h3>
                            </div>
                            <div className="ag-theme-alpine" style={{ height: 345, width: 830 }}>
                                <AgGridReact
                                    ref={gridRef2}
                                    rowData={rowData2}
                                    columnDefs={columnDefs2}
                                    defaultColDef={defaultColDef2}
                                    rowSelection={'single'}
                                >
                                </AgGridReact>
                            </div>
                            <div className='building-icons-container'>
                                <div className='add-building-icon'>
                                    <AiOutlinePlusCircle onClick={addRow2} />
                                </div>
                                <div className='remove-building-icon'>
                                    <AiOutlineMinusCircle onClick={deleteRow2} />
                                </div>
                            </div>
                            <div className='creation-buttons'>
                                <div>
                                    <button className='project-create-button' onClick={createProject}>Create project</button>
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

export default NewProject