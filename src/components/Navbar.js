import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGem, FaRegFolder, FaRecycle } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { VscGraph } from 'react-icons/vsc'
import { BiCoinStack, BiLogOut } from 'react-icons/bi'
import { HiOutlineCog, HiOutlineInformationCircle } from 'react-icons/hi'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdDashboard } from 'react-icons/md'
import './Navbar.scss'
import Header from './Header';
import Logo from './Logo';
const Navbar = ({project}) => {


    

    const costNavigate = (cost) => {
        console.log(cost)
    }

    return (
        <div>
            <Logo/>
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
                            <MenuItem icon={<VscGraph />} key={screening.id}>{screening.name} <Link to={"/project/" + project.id +"/screening/" + screening.id.toString()} /> </MenuItem>
                        ))}
                    </SubMenu >
                    <SubMenu title="Cost" icon={<BiCoinStack />}>
                    {project.costs.map(cost => (
                            <MenuItem icon={<BiCoinStack />} key={cost.id}>{cost.name}  <Link to={"/project/" + project.id + "/cost/" + cost.id} onClick={costNavigate(cost)}/> </MenuItem>
                        ))}
                    </SubMenu>
                    <SubMenu title="LCA" icon={<FaRecycle />}>
                    {project.lca.map(lca => (
                            <MenuItem icon={<FaRecycle />} key={lca.id}>{lca.name} <Link to={"/project/" + project.id + "/lca/" + lca.id.toString()} /> </MenuItem>
                        ))}
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