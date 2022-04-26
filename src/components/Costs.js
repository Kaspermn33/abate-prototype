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
import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'


const Costs = ({ projects, onSetCurrentProject }) => {
    const { id, costid } = useParams()
    const project = projects.find(project => project.id == id)
    const [costs, setCosts] = useState(project.costs.find(cost => cost.id == costid));
    const [buildingId, setBuilding] = useState(costs.buildingId);
    const [costsName, setCostsName] = useState(costs.name)
    const calculatePrice = () => {
        if(project.costs.find(cost => cost.id == costid).materials.length != (0 || undefined)) {
            return project.costs.find(cost => cost.id == costid).materials.length * 500000;
        }
        else {
            return 0;
        }
        
    }
    const [totalPrice, setTotalPrice] = useState(calculatePrice());
    let initialRowData = []
    const loadTableData = (input) => {
        let data = [];

        if(input.materials.length != 0) {
            for(let i = 0; i< input.materials.length; i++) {
                let curMat = input.materials[i];
                data.push(curMat);
            }
        }
        return data; 
    }

    initialRowData = loadTableData(costs);

    var [rowData, setRowData] = useState(initialRowData);


    //This is a mess, somehow costs was one behind, but this works
    useEffect(() => {
        setCosts(project.costs.find(cost => cost.id == costid))
        if(costs.id != project.costs.find(cost => cost.id == costid).id ) {
            
            setCostsName(project.costs.find(cost => cost.id == costid).name)
            setBuilding(project.costs.find(cost => cost.id == costid).buildingId)
            setTotalPrice(calculatePrice())
            setRowData(loadTableData(project.costs.find(cost => cost.id == costid)))
        }   
    }) 

    

    const getDate = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var today = new Date();
        return months[today.getMonth()] + " " + today.getDate();
    }
    

    const updateSelectedBuilding = (e) => {
        setBuilding(e);
        costs.buildingId = e;
    }

    const updateCostsName = (e) => {
        setCostsName(e);
        let temp = { id: costid, name: e, lastEdit: getDate(), buildingId: costs.buildingId, files: costs.files, materials: costs.materials }
        setCosts(temp)
        project.costs.find(cost => cost.id == costid).name = e;

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
        let temp = { id: costid, name: costs.name, lastEdit: getDate(), buildingId: costs.buildingId, files: costs.files, materials: costs.materials }
        var newId = checkID(costs.files.length);
        temp.files.push({
            id: newId, name: 'hindbærkræt-materials' + costs.files.length + '.csv'
        })
        

        let matId = checkMaterialID(costs.materials.length);
        temp.materials.push({
            id: matId,
            part_id: 'beof_roof_1',
            file_id: newId,
            build_part: 'Roof',
            mat_name: 'Screen tiles',
            db: 'Molio',
            mat_id: 'IDID2222',
            quantity: 30,
            unit: 'm2'
        })
        setCosts(temp);

        setRowData(loadTableData(costs));
        setTotalPrice(calculatePrice());
    }

    const checkID = (id) => {
        for (let i = 0; i < costs.files.length; i++) {
            if (id == costs.files[i].id) {
                id++;
                return checkID(id)
            }
        }
        return id;
    }

    const checkMaterialID = (id) => {
        for (let i = 0; i < costs.materials.length; i++) {
            if (id == costs.materials[i].id) {
                id++;
                return checkID(id)
            }
        }
        return id;
    }

    const deleteFile = (deletedFile) => {
        let temp = { id: costid, name: costs.name, lastEdit: getDate(), buildingId: costs.buildingId, files: [], materials: [] }
        for (let i = 0; i < costs.files.length; i++) {
            let curFile = costs.files[i];
            if (curFile.id != deletedFile.id) {
                temp.files.push(curFile);
            }
        }

        for(let i = 0; i < costs.materials.length; i++) {
            let curMat = costs.materials[i];
            if(curMat.file_id != deletedFile.id) {
                temp.materials.push(curMat);
            }
        }

        setCosts(temp);
        setRowData(loadTableData(temp));
        project.costs.find(cost => cost.id == costid).files = temp.files;
        project.costs.find(cost => cost.id == costid).materials = temp.materials;
        setTotalPrice(calculatePrice());
    }

    const addRow = () => {
        let temp = { id: costid, name: costs.name, lastEdit: getDate(), buildingId: costs.buildingId, files: costs.files, materials: costs.materials }
        

        let matId = checkMaterialID(costs.materials.length);
        temp.materials.push({
            id: matId,
            part_id: 'beof_roof_1',
            file_id: null,
            build_part: 'Roof',
            mat_name: 'screen tiles',
            db: 'Molio',
            mat_id: 'IDID2222',
            quantity: 30,
            unit: 'm2'
        })
        setCosts(temp);
        console.log(loadTableData(costs))
        setRowData(loadTableData(costs));
        setTotalPrice(calculatePrice());
    };

    const deleteRow =() => {
        const selectedRowNodes = gridRef.current.api.getSelectedNodes();

        const selectedIds = selectedRowNodes.map(function (rowNode) {
            console.log(selectedRowNodes)
            return parseInt(rowNode.data.id);
        });

        console.log(selectedIds)

        var filteredData = [];
        for (let i = 0; i < costs.materials.length; i++) {
            console.log(selectedIds[0], costs.materials[i].id)
            if (selectedIds[0] != costs.materials[i].id) {
                filteredData.push(costs.materials[i]);
            }
        }

        let temp = { id: costid, name: costs.name, lastEdit: getDate(), buildingId: costs.buildingId, files: costs.files, materials: filteredData }

        setCosts(temp);
        setRowData(loadTableData(temp));
        project.costs.find(cost => cost.id == costid).materials = temp.materials;
        setTotalPrice(calculatePrice());
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
        <div>
            <Header title={project.name} />
            <div className='costs'>
                <div className='costs-header'>
                    <input className='costs-header-name' type='text' value={costsName} onChange={(e) => updateCostsName(e.target.value)} />
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
                                {costs.files.map(file => (
                                    <FileRow file={file} onDeleteFile={deleteFile} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='costs-results'>
                        <div className='costs-number-results'>
                            <div className='costs-price-m2'>
                                <p className='price-excl-vat'>{Math.round(totalPrice / parseInt(project.buildings.find(b => b.id == buildingId).area))}</p>
                                <p className='price-excl-vat-text'>price pr. m2 in dkk excl. vat</p>
                                <p className='price-incl-vat'>{Math.round(totalPrice / project.buildings.find(b => b.id == buildingId).area * 1.25)}</p>
                                <p className='price-incl-vat-text'>price pr. m2 in dkk incl. vat</p>
                            </div>
                            <div className='costs-price-total'>
                                <p className='price-excl-vat'>{totalPrice}</p>
                                <p className='price-excl-vat-text'>total price in dkk excl. vat</p>
                                <p className='price-incl-vat'>{totalPrice * 1.25}</p>
                                <p className='price-incl-vat-text'>total price in dkk incl. vat</p>
                            </div>
                        </div>
                        <div className='costs-dist-building-parts'>
                            <p className='graph-header'>Cost distribution for building parts</p>
                            {totalPrice != 0 ? <img className='graph-image' src={BPPic} />
                                : <div></div>
                            }
                            <p className='price-excl-vat-text'>price in dkk excl. vat</p>
                        </div>
                        <div className='costs-dist-materials'>
                            <p className='graph-header'>Cost distribution for materials</p>
                            {totalPrice != 0 ? <img className='graph-image' src={MatPic} />
                                : <div></div>
                            }
                            <p className='price-excl-vat-text'>price in dkk excl. vat</p>
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
                        <div className="ag-theme-alpine" style={{ height: 350, width: 1192 }}>
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
        </div>
    )
}

export default Costs