import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./foo.module.scss";

const FileRow = ({ file, onDeleteFile }) => {


    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a href="/" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
            {children}
            <BiDotsVerticalRounded />
        </a>
    ));

    const deleteFile = (file) => {
        onDeleteFile(file)
    };

    return (
        <div className='file-row'>
            <p className='costs-file'>{file.name}</p>
            <div className='file-row-dots'>
            <Dropdown className={styles.bootstrap}>
                <Dropdown.Toggle as={CustomToggle} />
                <Dropdown.Menu size="sm" title="bla">
                    <Dropdown.Item onClick={() => deleteFile(file)}>Delete file</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
        </div>
    )
}

export default FileRow