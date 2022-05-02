import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGem, FaRegFolder, FaRecycle } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { VscGraph } from 'react-icons/vsc'
import { BiCoinStack, BiLogOut } from 'react-icons/bi'
import { HiOutlineCog, HiOutlineInformationCircle } from 'react-icons/hi'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdDashboard } from 'react-icons/md'
import { MdAdd } from 'react-icons/md'
import './Navbar.scss'
import Logo from './Logo';
import { useNavigate, generatePath } from "react-router-dom";
const Navbar = ({ project, onSetCurrentProject }) => {
    const navigate = useNavigate();

    const checkCostID = (id) => {
        for (let i = 0; i < project.costs.length; i++) {
            if (id == project.costs[i].id) {
                id++;
                return checkCostID(id)
            }
        }
        return id;
    }

    const checkLcaID = (id) => {
        for (let i = 0; i < project.lca.length; i++) {
            if (id == project.lca[i].id) {
                id++;
                return checkLcaID(id)
            }
        }
        return id;
    }

    const checkScreeningID = (id) => {
        for (let i = 0; i < project.screenings.length; i++) {
            if (id == project.screenings[i].id) {
                id++;
                return checkScreeningID(id)
            }
        }
        return id;
    }

    const getDate = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var today = new Date();
        return months[today.getMonth()] + " " + today.getDate();
    }

    const newScreening = () => {
        let newId = checkScreeningID(project.screenings.length)

        let temp = {
            id: newId,
            name: 'Screening ' + newId,
            lastEdit: getDate(),
            buildingId: 0,
            model1: {
                name: "Model 1",
                materialSelection: {
                    outerWallBearing: "",
                    outerWallFacade: "",
                    innerWall: "",
                    roofBearing: "",
                    roofingMaterial: "",
                }
            },
            model2: {
                name: "Model 2",
                materialSelection: {
                    outerWallBearing: "",
                    outerWallFacade: "",
                    innerWall: "",
                    roofBearing: "",
                    roofingMaterial: "",
                }
            },
            model3: {
                name: "Model 3",
                materialSelection: {
                    outerWallBearing: "",
                    outerWallFacade: "",
                    innerWall: "",
                    roofBearing: "",
                    roofingMaterial: "",
                }
            },
        }
        project.screenings.push(temp)

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
        project = tempProject;
        onSetCurrentProject(tempProject);
        navigate(generatePath('/project/' + project.id + '/screening/' + newId))
    }

    const newCosts = () => {
        let newId = checkCostID(project.costs.length)
        let temp = {
            id: newId,
            name: 'Cost estimation' + newId,
            lastEdit: getDate(),
            buildingId: 0,
            files: [],
            materials: []
        }
        project.costs.push(temp)

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
        project = tempProject;
        onSetCurrentProject(tempProject);
        navigate(generatePath('/project/' + project.id + '/cost/' + newId))
    }

    const newLCA = () => {
        let newId = checkLcaID(project.lca.length)
        let temp = {
            id: newId,
            name: 'Lca estimation' + newId,
            lastEdit: getDate(),
            buildingId: 0,
            files: [],
            materials: []
        }
        project.lca.push(temp)

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
        project = tempProject;
        onSetCurrentProject(tempProject);
        navigate(generatePath('/project/' + project.id + '/lca/' + newId))
    }

    return (
        <div>
            <Logo />
            <ProSidebar>

                <p className='navbar-section-text'>MENU</p>
                <Menu iconShape="square">
                    <MenuItem icon={<MdDashboard />}>Dashboard  <Link to="/" /></MenuItem>
                    {project == undefined ? <div></div>
                        :
                        <div>
                            <MenuItem icon={<FaRegFolder />}>{project.name} <Link to={"/project/" + project.id} /></MenuItem>
                            <SubMenu title="Screening" icon={<VscGraph />}>
                                {project.screenings.map(screening => (
                                    <MenuItem icon={<VscGraph />} key={screening.id}>{screening.name} <Link to={"/project/" + project.id + "/screening/" + screening.id.toString()} /> </MenuItem>
                                ))}
                                <div onClick={newScreening}>
                                    <MenuItem icon={<MdAdd />}>New Screening</MenuItem>
                                </div>

                            </SubMenu >
                            <SubMenu title="Cost" icon={<BiCoinStack />}>
                                {project.costs.map(cost => (
                                    <MenuItem icon={<BiCoinStack />} key={cost.id}>{cost.name}  <Link to={"/project/" + project.id + "/cost/" + cost.id}/> </MenuItem>
                                ))}
                                <div onClick={newCosts}>
                                    <MenuItem icon={<MdAdd />}>New Screening</MenuItem>
                                </div>

                            </SubMenu>
                            <SubMenu title="LCA" icon={<FaRecycle />}>
                                {project.lca.map(lca => (
                                    <MenuItem icon={<FaRecycle />} key={lca.id}>{lca.name} <Link to={"/project/" + project.id + "/lca/" + lca.id.toString()} /> </MenuItem>
                                ))}
                                <div onClick={newLCA}>
                                    <MenuItem icon={<MdAdd />}>New Screening</MenuItem>
                                </div>
                            </SubMenu>
                        </div>
                    }
                </Menu>
                <p className='navbar-section-text-others'>OTHERS</p>
                <Menu iconShape="square">
                    <MenuItem icon={<HiOutlineCog />}>Settings </MenuItem>
                    <MenuItem icon={<BsFillPersonFill />}>Account </MenuItem>
                    <MenuItem icon={<HiOutlineInformationCircle />}>Help </MenuItem>
                    <MenuItem icon={<BiLogOut />}>Sign out </MenuItem>
                </Menu>
            </ProSidebar></div>
    )
}

export default Navbar