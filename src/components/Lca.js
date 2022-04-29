import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react'
import { RiFileUploadLine } from 'react-icons/ri'
import { GrPowerReset } from 'react-icons/gr'
import { BiCog } from 'react-icons/bi'
import Header from './Header'
import { useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import BPPic from './building-part.png'
import MatPic from './material-price.png'
import FileRow from './FileRow';
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./foo.module.scss";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import Changelog from './Changelog'

const Lca = ({projects, onSetCurrentProject}) => {
    const { id, lcaid } = useParams()
    const project = projects.find(project => project.id == id)
    const [lca, setLca] = useState(project.lca.find(lca => lca.id == lcaid));
    const [buildingId, setBuilding] = useState(lca.buildingId);
    const [lcaName, setLcaName] = useState(lca.name)


    //TODO CALCUALTE THIS
    const calculateGWP = () => {
        if (project.lca.find(lca => lca.id == lcaid).materials.length != (0 || undefined)) {
            return project.lca.find(lca => lca.id == lcaid).materials.length * 500000;
        }
        else {
            return 0; 
        }
    }
    const [GWP, setGWP] = useState(calculateGWP());
    let initialRowData = []
    const loadTableData = (input) => {
        let data = [];

        if (input.materials.length != 0) {
            for (let i = 0; i < input.materials.length; i++) {
                let curMat = input.materials[i];
                data.push(curMat);
            }
        }
        return data;
    }

    initialRowData = loadTableData(lca);

    var [rowData, setRowData] = useState(initialRowData);


    //This is a mess, somehow costs was one behind, but this works
    useEffect(() => {
        setLca(project.lca.find(lca => lca.id == lcaid))
        if (lca.id != project.lca.find(lca => lca.id == lcaid).id) {

            setLcaName(project.lca.find(lca => lca.id == lcaid).name)
            setBuilding(project.lca.find(lca => lca.id == lcaid).buildingId)
            setGWP(calculateGWP())
            setRowData(loadTableData(project.lca.find(lca => lca.id == lcaid)))
        }
    })



    const getDate = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var today = new Date();
        return months[today.getMonth()] + " " + today.getDate();
    }


    const updateSelectedBuilding = (e) => {
        setBuilding(e);
        lca.buildingId = e;
    }

    const updateLcaName = (e) => {
        setLcaName(e);
        let temp = { id: lcaid, name: e, lastEdit: getDate(), buildingId: lca.buildingId, files: lca.files, materials: lca.materials }
        setLca(temp)
        project.lca.find(lca => lca.id == lcaid).name = e;

        let tempProject = {
            id: project.id,
            name: project.name,
            description: project.description,
            lastEdit: getDate(),
            contributors: project.contributors,
            screenings: project.screenings,
            lca: project.lca,
            costs: project.costs,
            buildings: project.buildings
        }
        onSetCurrentProject(tempProject);
    }

    const onUploadFile = () => {
        let temp = { id: lcaid, name: lca.name, lastEdit: getDate(), buildingId: lca.buildingId, files: lca.files, materials: lca.materials }
        var newId = checkID(lca.files.length);
        temp.files.push({
            id: newId, name: 'hindbærkræt-materials' + lca.files.length + '.csv'
        })


        let matId = checkMaterialID(lca.materials.length);
        temp.materials.push({
            id: matId,
            part_id: 'beof_roof_1',
            file_id: newId,
            build_part: 'Roof',
            mat_name: 'Screen tiles',
            db: 'AECdat',
            mat_id: 'IDID2222',
            quantity: 30,
            unit: 'm2'
        })
        setLca(temp);

        setRowData(loadTableData(lca));
        setGWP(calculateGWP());
    }

    const checkID = (id) => {
        for (let i = 0; i < lca.files.length; i++) {
            if (id == lca.files[i].id) {
                id++;
                return checkID(id)
            }
        }
        return id;
    }

    const checkMaterialID = (id) => {
        for (let i = 0; i < lca.materials.length; i++) {
            if (id == lca.materials[i].id) {
                id++;
                return checkID(id)
            }
        }
        return id;
    }

    const deleteFile = (deletedFile) => {
        let temp = { id: lcaid, name: lca.name, lastEdit: getDate(), buildingId: lca.buildingId, files: [], materials: [] }
        for (let i = 0; i < lca.files.length; i++) {
            let curFile = lca.files[i];
            if (curFile.id != deletedFile.id) {
                temp.files.push(curFile);
            }
        }

        for (let i = 0; i < lca.materials.length; i++) {
            let curMat = lca.materials[i];
            if (curMat.file_id != deletedFile.id) {
                temp.materials.push(curMat);
            }
        }

        setLca(temp);
        setRowData(loadTableData(temp));
        project.lca.find(lca => lca.id == lcaid).files = temp.files;
        project.lca.find(lca => lca.id == lcaid).materials = temp.materials;
        setGWP(calculateGWP());
    }

    const addRow = () => {
        let temp = { id: lcaid, name: lca.name, lastEdit: getDate(), buildingId: lca.buildingId, files: lca.files, materials: lca.materials }


        let matId = checkMaterialID(lca.materials.length);
        temp.materials.push({
            id: matId,
            part_id: 'beof_roof_1',
            file_id: null,
            build_part: 'Roof',
            mat_name: 'screen tiles',
            db: 'AECdat',
            mat_id: 'IDID2222',
            quantity: 30,
            unit: 'm2'
        })
        setLca(temp);
        console.log(loadTableData(lca))
        setRowData(loadTableData(lca));
        setGWP(calculateGWP());
    };

    const deleteRow = () => {
        const selectedRowNodes = gridRef.current.api.getSelectedNodes();

        const selectedIds = selectedRowNodes.map(function (rowNode) {
            console.log(selectedRowNodes)
            return parseInt(rowNode.data.id);
        });

        console.log(selectedIds)

        var filteredData = [];
        for (let i = 0; i < lca.materials.length; i++) {
            console.log(selectedIds[0], lca.materials[i].id)
            if (selectedIds[0] != lca.materials[i].id) {
                filteredData.push(lca.materials[i]);
            }
        }

        let temp = { id: lcaid, name: lca.name, lastEdit: getDate(), buildingId: lca.buildingId, files: lca.files, materials: filteredData }

        setLca(temp);
        setRowData(loadTableData(temp));
        project.lca.find(lca => lca.id == lcaid).materials = temp.materials;
        setGWP(calculateGWP());
    };



    const gridRef = useRef();
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 130,
            editable: true,
            resizable: true,
            menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
        };
    }, []);

    const [columnDefs] = useState([
        {
            headerName: 'Part id',
            field: 'part_id',
            filter: 'agTextColumnFilter'
        },
        {
            headerName: 'Building part',
            field: 'build_part',
            filter: 'agTextColumnFilter'
        },
        {
            headerName: 'Material name',
            field: 'mat_name',
            filter: 'agTextColumnFilter'
        },
        {
            headerName: 'Database',
            field: 'db',
            filter: 'agTextColumnFilter'
        },
        {
            headerName: 'Material ID',
            field: 'mat_id',
            filter: 'agTextColumnFilter'
        },
        {
            headerName: 'Quantity',
            field: 'quantity',
            filter: 'agTextColumnFilter'
        },
        {
            headerName: 'Unit of Measure',
            field: 'unit',
            filter: 'agTextColumnFilter'
        },
    ]);

    const clearFilters = useCallback(() => {
        gridRef.current.api.setFilterModel(null);
    }, []);









    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

        <a href="/" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
            {children}
            <BiCog className='costs-settings-cog' />
        </a>
    ));

    const exportEstimation = () => {
        console.log("MOCKING EXPORT OF ESTIMATION")
    }

    const deleteEstimation = () => {
        console.log("MOCKING DELETE ESTIMATION")
    }

    const renameEstimation = () => {
        console.log("RENAME MOCK")
    }
  return (
    <div className='main-body'>
            <Header title={project.name} />
            <div className='costs-container'>
                <div className='costs'>
                    <div className='costs-header'>
                        <input className='costs-header-name' type='text' value={lcaName} onChange={(e) => updateLcaName(e.target.value)} />
                        <div className='costs-header-right'>
                            <div>
                                <Dropdown className={styles.bootstrap}>
                                    <Dropdown.Toggle as={CustomToggle} />
                                    <Dropdown.Menu size="sm" title="bla">
                                        <Dropdown.Item onClick={() => exportEstimation()}>Export</Dropdown.Item>
                                        <Dropdown.Item onClick={() => deleteEstimation()}>Delete</Dropdown.Item>
                                        <Dropdown.Item onClick={() => renameEstimation()}>Rename</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                        </div>
                    </div>
                    <div className='costs-body'>
                        <div className='costs-row-one'>
                            <div>
                                <select className='building-select' value={buildingId} onChange={(e) => updateSelectedBuilding(e.target.value)}>
                                    {project.buildings.map(building => (
                                        <option value={building.id}>{building.name}</option>
                                    ))}
                                </select>
                                <div className='costs-building-details'>
                                    <div>
                                        <p className='building-details-text'>Area: {project.buildings.find(b => b.id == buildingId).area}</p>
                                        <p className='building-details-text'>Floors: {project.buildings.find(b => b.id == buildingId).levels}</p>
                                        <p className='building-details-text'>Type: {project.buildings.find(b => b.id == buildingId).type}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='costs-files-container'>
                                <div className='costs-files-header'>
                                    <p className='costs-files-header-text'>Files uploaded:</p> <div className='upload-file-icon-container' onClick={onUploadFile}> <RiFileUploadLine className='upload-file-icon' /></div></div>
                                <div className='costs-files'>
                                    {lca.files.map(file => (
                                        <FileRow file={file} onDeleteFile={deleteFile} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='costs-results'>
                            <div className='costs-number-results'>
                                <div className='lca-kg-year'>
                                    <p className='price-excl-vat'>{(GWP/project.buildings.find(b => b.id == buildingId).area/50).toPrecision(3)}</p>
                                    <p className='price-excl-vat-text'>kg CO2 eq. pr. m2 pr. year</p>
                                </div>
                                <div className='lca-kg-m2'>
                                    <p className='price-excl-vat'>{Math.round(GWP/project.buildings.find(b => b.id == buildingId).area)}</p>
                                    <p className='price-excl-vat-text'>kg CO2 eq. pr. m2</p>
                                </div>
                                <div className='lca-kg-ton'>
                                    <p className='price-excl-vat'>{Math.round((GWP/project.buildings.find(b => b.id == buildingId).area)/1.2)}</p>
                                    <p className='price-excl-vat-text'>kg CO2 eq. pr. ton</p>
                                </div>
                            </div>
                            <div className='costs-dist-building-parts'>
                                <p className='graph-header'>GWP distribution for building parts</p>
                                {GWP != 0 ? <img className='graph-image' src={BPPic} />
                                    : <div></div>
                                }
                                <p className='price-excl-vat-text'>kg. CO2 eq.</p>
                            </div>
                            <div className='costs-dist-materials'>
                                <p className='graph-header'>GWP distribution for materials</p>
                                {GWP != 0 ? <img className='graph-image' src={MatPic} />
                                    : <div></div>
                                }
                                <p className='price-excl-vat-text'>kg. CO2 eq.</p>
                            </div>
                        </div>
                        <div className='costs-materials'>
                            <div className='materials-header'>
                                <div>
                                    <p className='materials-header-text'>Materials used in estimation:</p>
                                </div>
                                <div className='reset-filters-icon'>
                                    <GrPowerReset className='smaller-reset-filters-icon' onClick={clearFilters} />
                                </div>
                            </div>
                            <div className="ag-theme-alpine" style={{ height: 261, width: 1192 }}>
                                <AgGridReact
                                    ref={gridRef}
                                    rowData={rowData}
                                    columnDefs={columnDefs}
                                    defaultColDef={defaultColDef}
                                    rowSelection={'single'}
                                >
                                </AgGridReact>
                            </div>
                            <div className='contributor-icons-container'>
                                <div className='add-material-icon'>
                                    <AiOutlinePlusCircle onClick={addRow} />
                                </div>
                                <div className='remove-material-icon'>
                                    <AiOutlineMinusCircle onClick={deleteRow} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Changelog />
            </div>
        </div>
  )
}

export default Lca