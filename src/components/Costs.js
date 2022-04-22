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


const Costs = ({ project, currentCost, onSetCurrentCost }) => {
    const { id, costid } = useParams() 
    const [buildingId, setBuilding] = useState(currentCost.buildingId);
    const [costsName, setCostsName] = useState(currentCost.name)
    const calculatePrice = (costs) => {
        console.log("CALCUALTE PRICE", )
        return costs.files.length * 500000;
    }
    const [totalPrice, setTotalPrice] = useState(calculatePrice(currentCost));
    let initialRowData = []
    const loadTableData = (input) => {
        let data = [];
        if(input.files.length != 0){
            for (let i = 0; i < input.files.length; i++) {
            let curFile = input.files[i];
                for (let j = 0; j < curFile.materials.length; j++) {
                    let curMat = curFile.materials[j];
                    data.push(curMat)
                }
            }
        }
        
        return data; 
    }

    
    

    initialRowData = loadTableData(currentCost);

    var [rowData, setRowData] = useState(initialRowData);


    useEffect(() => {
        
        
        //Limits the rerenders drastically
        if(currentCost.id != costid) {
            let newCosts = project.costs.find(cost => cost.id == costid)
            onSetCurrentCost(newCosts, "costs")
            console.log("UPDATE IT ALL")
            setBuilding(newCosts.buildingId)
            setCostsName(newCosts.name)
            setTotalPrice(calculatePrice(newCosts))
            setRowData(loadTableData(newCosts))
        }
    })

    


    

    const updateSelectedBuilding = (e) => {
        //SHOULD UPDATE FUIRTHER BACK
        console.log(buildingId)
        setBuilding(e);
        //currentCost.buildingId = e;
        let temp = { id: costid, name: currentCost.name, lastEdit: currentCost.lastEdit, buildingId: e, files: currentCost.files }
        onSetCurrentCost(temp, "costs")
        console.log(e)
        console.log(buildingId)
        console.log(temp.buildingId)
    }

    const updateCostsName = (e) => {
        setCostsName(e);
        let temp = { id: costid, name: e, lastEdit: currentCost.lastEdit, buildingId: currentCost.buildingId, files: currentCost.files }
        
        //UPDATE currentCost instead
        onSetCurrentCost(temp, "costs")
        project.costs.find(cost => cost.id == costid).name = e;
        console.log(currentCost)
    }

    const onUploadFile = () => {
        let temp = { id: costid, name: currentCost.name, lastEdit: currentCost.lastEdit, buildingId: currentCost.buildingId, files: currentCost.files }
        var newId = checkID(currentCost.files.length);
        temp.files.push({
            id: newId, name: 'hindbærkræt-materials' + currentCost.files.length + '.csv', materials: [{
                part_id: 'beof_roof_1',
                build_part: 'Roof',
                mat_name: 'Screen tiles',
                db: 'Molio',
                mat_id: 'IDID2222',
                quantity: 30,
                unit: 'm2'
            }]
        })
        //SHOULD UPDATE CURRENT COSTS INSTEAD
        onSetCurrentCost(temp, "costs")
        setRowData(loadTableData(currentCost));
        setTotalPrice(calculatePrice(currentCost));
    }

    const checkID = (id) => {
        for (let i = 0; i < currentCost.files.length; i++) {
            if (id == currentCost.files[i].id) {
                id++;
                return checkID(id)
            }
        }
        return id;
    }

    const deleteFile = (deletedFile) => {
        console.log(deletedFile)
        let temp = { id: costid, name: currentCost.name, lastEdit: currentCost.lastEdit, buildingId: currentCost.buildingId, files: [] }
        for (let i = 0; i < currentCost.files.length; i++) {
            let curFile = currentCost.files[i];
            if (curFile.id != deletedFile.id) {
                temp.files.push(curFile);
            }
        }

        //SHOULD UDPATE CURRENT COSTS INSTEAD
        onSetCurrentCost(temp, "costs")
        setRowData(loadTableData(temp));
        project.costs.find(cost => cost.id == costid).files = temp.files;
        setTotalPrice(calculatePrice(currentCost));
    }



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
                                <p className='costs-files-header-text'>Files uploaded:</p> <div onClick={onUploadFile}> <RiFileUploadLine className='upload-file-icon' /></div></div>
                            <div className='costs-files'>
                                {currentCost.files.map(file => (
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Costs