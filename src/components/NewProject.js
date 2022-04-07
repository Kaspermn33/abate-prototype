import Header from "./Header"
import React, { useState } from "react";

const NewProject = () => {


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