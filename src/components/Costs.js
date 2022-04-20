import React, { useRef, useMemo, useState } from 'react'
import { RiFileUploadLine } from 'react-icons/ri'
import Header from './Header'
import { useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import BPPic from './building-part.png'
import MatPic from './material-price.png'
import FileRow from './FileRow';

const Costs = ({ projects }) => {
    const { id, costid } = useParams()
    const project = projects.find(project => project.id == id)
    const [costs, setCosts] = useState(project.costs.find(cost => cost.id == costid));
    const [buildingId, setBuilding] = useState(costs.buildingId);
    const [costsName, setCostsName] = useState(costs.name)
    
    console.log(project)
    const updateSelectedBuilding = (e) => {
        setBuilding(e);
        costs.buildingId = e;
    }

    const updateCostsName = (e) => {
        setCostsName(e);
        let temp = { id: costid, name: e, lastEdit: costs.lastEdit, buildingId: costs.buildingId, files: costs.files }
        setCosts(temp)
        project.costs.find(cost => cost.id == costid).name = e;
        console.log(costs)
    }
    
    const onUploadFile = () => {
        let temp = { id: costid, name: costs.name, lastEdit: costs.lastEdit, buildingId: costs.buildingId, files: costs.files }
        var newId = checkID(costs.files.length);
        temp.files.push({
            id: newId, name: 'hindbærkræt-materials' + costs.files.length + '.csv', materials: [{
                part_id: 'beof_roof_1',
                build_part: 'Roof',
                mat_name: 'Screen tiles',
                db: 'Molio',
                mat_id: 'IDID2222',
                quantity: 30,
                unit: 'm2'
            }]
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

    const deleteFile = (deletedFile) => {
        console.log(deletedFile)
        let temp = { id: costid, name: costs.name, lastEdit: costs.lastEdit, buildingId: costs.buildingId, files: []}
        for(let i = 0; i < costs.files.length; i++) {
            let curFile = costs.files[i];
            if(curFile.id != deletedFile.id) {
                temp.files.push(curFile);
            }
        }

        setCosts(temp);
        setRowData(loadTableData(temp));
        project.costs.find(cost => cost.id == costid).files = temp.files;
        setTotalPrice(calculatePrice());
    }



    const gridRef = useRef();
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 130,
            editable: true,
            resizable: true,
        };
    }, []);

    const [columnDefs] = useState([
        {
            headerName: 'Part id',
            field: 'part_id',
        },
        {
            headerName: 'Building part',
            field: 'build_part',
        },
        {
            headerName: 'Material name',
            field: 'mat_name',
        },
        {
            headerName: 'Database',
            field: 'db',
        },
        {
            headerName: 'Material ID',
            field: 'mat_id',
        },
        {
            headerName: 'Quantity',
            field: 'quantity',
        },
        {
            headerName: 'Unit of Measure',
            field: 'unit',
        },
    ]);

    const loadTableData = (input) => {
        let data = [];
        for (let i = 0; i < input.files.length; i++) {
            let curFile = input.files[i];
            for (let j = 0; j < curFile.materials.length; j++) {
                let curMat = curFile.materials[j];
                data.push(curMat)
            }
        }
        return data;
    }

    let initialRowData = loadTableData(costs);

    var [rowData, setRowData] = useState(initialRowData);

    const calculatePrice = () => {
        return project.costs.find(cost => cost.id == costid).files.length*500000;
    }
    const [totalPrice, setTotalPrice]= useState(calculatePrice());

    return (
        <div>
            <Header title={project.name} />
            <div className='costs'>
                <div className='costs-header'>
                    <input className='costs-header-name' type='text' value={costsName} onChange={(e) => updateCostsName(e.target.value)}/>
                    
                    <select className='building-select' value={buildingId} onChange={(e) => updateSelectedBuilding(e.target.value)}>
                        {project.buildings.map(building => (
                            <option value={building.id}>{building.name}</option>
                        ))}
                    </select>
                </div>
                <div className='costs-body'>
                    <div className='costs-files-container'>
                        <div className='costs-files-header'>
                            <p className='costs-files-header-text'>Files uploaded:</p> <div onClick={onUploadFile}> <RiFileUploadLine className='upload-file-icon' /></div></div>
                        <div className='costs-files'>
                            {costs.files.map(file => (
                                <FileRow file={file} onDeleteFile={deleteFile}/>
                            ))}
                        </div>
                    </div>
                    <div className='costs-results'>
                        <div className='costs-number-results'>
                            <div className='costs-price-m2'>
                                <p className='price-excl-vat'>{Math.round(totalPrice/parseInt(project.buildings.find(b => b.id == buildingId).area))}</p>
                                <p className='price-excl-vat-text'>price pr. m2 in dkk excl. vat</p>
                                <p className='price-incl-vat'>{Math.round(totalPrice/project.buildings.find(b => b.id == buildingId).area*1.25)}</p>
                                <p className='price-incl-vat-text'>price pr. m2 in dkk incl. vat</p>
                            </div>
                            <div className='costs-price-total'>
                                <p className='price-excl-vat'>{totalPrice}</p>
                                <p className='price-excl-vat-text'>total price in dkk excl. vat</p>
                                <p className='price-incl-vat'>{totalPrice*1.25}</p>
                                <p className='price-incl-vat-text'>total price in dkk incl. vat</p>
                            </div>
                        </div>
                        <div className='costs-dist-building-parts'>
                            <p className='graph-header'>Cost distribution for building parts</p>
                            {totalPrice != 0 ? <img className='graph-image' src={BPPic} />
                            :<div></div>
                            }
                            <p className='price-excl-vat-text'>price in dkk excl. vat</p>
                        </div>
                        <div className='costs-dist-materials'>
                            <p className='graph-header'>Cost distribution for materials</p>
                            {totalPrice != 0 ? <img className='graph-image' src={MatPic} />
                            :<div></div>
                            }
                            <p className='price-excl-vat-text'>price in dkk excl. vat</p>
                        </div>
                    </div>
                    <div className='costs-materials'>
                        <p className='materials-header-text'>Materials used in estimation:</p>
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