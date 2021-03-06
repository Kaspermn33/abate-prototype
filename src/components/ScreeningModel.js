import React, { useState, useEffect } from 'react'
import modelPic from './model.png';
import noModelPic from './no-model.png';


const ScreeningModel = ({ title, materialSelection, onUpdateScreening }) => {
    let [outerWallBearing, setOuterWallBearing] = useState(materialSelection.outerWallBearing)
    let [outerWallFacade, setOuterWallFacade] = useState(materialSelection.outerWallFacade)
    let [innerWall, setInnerWall] = useState(materialSelection.innerWall)
    let [roofBearing, setRoofBearing] = useState(materialSelection.roofBearing)
    let [roofingMaterial, setRoofingMaterial] = useState(materialSelection.roofingMaterial)

    const areAllSelected = () => {
        return (
            outerWallBearing != "" &&
            outerWallFacade != "" &&
            innerWall != "" &&
            roofBearing != "" &&
            roofingMaterial != ""
        )
    }

    let [allSelected, setAllSelected] = useState(areAllSelected)

    useEffect(() => {
        if (
            materialSelection.outerWallBearing != outerWallBearing ||
            materialSelection.outerWallFacade != outerWallFacade ||
            materialSelection.innerWall != innerWall ||
            materialSelection.roofBearing != roofBearing ||
            materialSelection.roofingMaterial != roofingMaterial
        ) {
            outerWallBearing = materialSelection.outerWallBearing;
            setOuterWallBearing(materialSelection.outerWallBearing)
            outerWallFacade = materialSelection.outerWallFacade;
            setOuterWallFacade(materialSelection.outerWallFacade)
            innerWall = materialSelection.innerWall;
            setInnerWall(materialSelection.innerWall)
            roofBearing = materialSelection.roofBearing;
            setRoofBearing(materialSelection.roofBearing)
            roofingMaterial = materialSelection.roofingMaterial;
            setRoofingMaterial(materialSelection.roofingMaterial)
            setAllSelected(areAllSelected);
            onUpdateScreening(title, createMaterialSelection())

        }

    })

    const createMaterialSelection = () => {
        return {
            name: title,
            materialSelection: {
                outerWallBearing: outerWallBearing,
                outerWallFacade: outerWallFacade,
                innerWall: innerWall,
                roofBearing: roofBearing,
                roofingMaterial: roofingMaterial,
            }
        }
    }

    const handleOWChange = (event) => {
        outerWallBearing = event.target.value;
        setOuterWallBearing(event.target.value)
        setAllSelected(areAllSelected);
        onUpdateScreening(title, createMaterialSelection())
    }

    const handleOFChange = (event) => {
        outerWallFacade = event.target.value;
        setOuterWallFacade(event.target.value)
        setAllSelected(areAllSelected);
        onUpdateScreening(title, createMaterialSelection())
    }

    const handleInChange = (event) => {
        innerWall = event.target.value;
        setInnerWall(event.target.value)
        setAllSelected(areAllSelected);
        onUpdateScreening(title, createMaterialSelection())
    }

    const handleRBChange = (event) => {
        roofBearing = event.target.value;
        setRoofBearing(event.target.value)
        setAllSelected(areAllSelected);
        onUpdateScreening(title, createMaterialSelection())
    }

    const handleRMChange = (event) => {
        roofingMaterial = event.target.value;
        setRoofingMaterial(event.target.value)
        setAllSelected(areAllSelected);
        onUpdateScreening(title, createMaterialSelection())
    }


    return (
        <div className='screening-model-container'>
            <h2 className='model-header'>{title}</h2>
            <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Outer walls - Bearing</h3>
                <div className="material-radio-button-group">
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={outerWallBearing === "concrete"} value="concrete" onChange={handleOWChange} name={"outerWallBearing" + title} /> <p className='radio-button-text'>Concrete</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={outerWallBearing === "aeratedConcrete"} value="aeratedConcrete" onChange={handleOWChange} name={"outerWallBearing" + title} /> <p className='radio-button-text'>Aerated concrete</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={outerWallBearing === "CLT"} value="CLT" onChange={handleOWChange} name={"outerWallBearing" + title} /> <p className='radio-button-text'>CLT</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={outerWallBearing === "wood"} value="wood" onChange={handleOWChange} name={"outerWallBearing" + title} /> <p className='radio-button-text'>Wood</p>
                    </label>
                </div>
            </div>

            <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Outer walls - Facade</h3>
                <div className="material-radio-button-group">
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={outerWallFacade === "bricks"} value="bricks" onChange={handleOFChange} name={"outerWallFacade" + title} /> <p className='radio-button-text'>Bricks</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={outerWallFacade === "screenTiles"} value="screenTiles" onChange={handleOFChange} name={"outerWallFacade" + title} /> <p className='radio-button-text'>Screen tiles</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={outerWallFacade === "metal"} value="metal" onChange={handleOFChange} name={"outerWallFacade" + title} /> <p className='radio-button-text'>Metal</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={outerWallFacade === "wood"} value="wood" onChange={handleOFChange} name={"outerWallFacade" + title} /> <p className='radio-button-text'>Wood</p>
                    </label>
                </div>
            </div>


            <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Innerwalls</h3>
                <div className="material-radio-button-group">
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={innerWall === "concrete"} value="concrete" onChange={handleInChange} name={"innerWall" + title} /> <p className='radio-button-text'>Concrete</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={innerWall === "aeratedConcrete"} value="aeratedConcrete" onChange={handleInChange} name={"innerWall" + title} /> <p className='radio-button-text'>Aerated concrete</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={innerWall === "plaster"} value="plaster" onChange={handleInChange} name={"innerWall" + title} /> <p className='radio-button-text'>Plaster</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={innerWall === "CLT"} value="CLT" onChange={handleInChange} name={"innerWall" + title} /> <p className='radio-button-text'>CLT</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={innerWall === "wood"} value="wood" onChange={handleInChange} name={"innerWall" + title} /> <p className='radio-button-text'>Wood</p>
                    </label>
                </div>
            </div>


            <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Roof - Bearing</h3>
                <div className="material-radio-button-group">
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={roofBearing === "concrete"} value="concrete" onChange={handleRBChange} name={"roofBearing" + title} /> <p className='radio-button-text'>Concrete</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={roofBearing === "CLT"} value="CLT" onChange={handleRBChange} name={"roofBearing" + title} /> <p className='radio-button-text'>CLT</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={roofBearing === "wood"} value="wood" onChange={handleRBChange} name={"roofBearing" + title} /> <p className='radio-button-text'>Wood</p>
                    </label>
                </div>
            </div>


            <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Roofing material</h3>
                <div className="material-radio-button-group">
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={roofingMaterial === "felt"} value="felt" onChange={handleRMChange} name={"roofingMaterial" + title} /> <p className='radio-button-text'>Felt</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={roofingMaterial === "screenTiles"} value="screenTiles" onChange={handleRMChange} name={"roofingMaterial" + title} /> <p className='radio-button-text'>Screen tiles</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={roofingMaterial === "metal"} value="metal" onChange={handleRMChange} name={"roofingMaterial" + title} /> <p className='radio-button-text'>Metal</p>
                    </label>
                    <label className='material-radio-button'>
                        <input className='material-radio-checkmark' type="radio" checked={roofingMaterial === "wood"} value="wood" onChange={handleRMChange} name={"roofingMaterial" + title} /> <p className='radio-button-text'>Wood</p>
                    </label>
                </div>
            </div>

            <div className='screening-model-picture'>
                {allSelected ?
                    <img className='model-image' src={modelPic} />
                    :
                    <img className='model-image' src={noModelPic} />
                }
            </div>
        </div>
    )
}

export default ScreeningModel