import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGem, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
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

            <p>MENU</p>
                <Menu iconShape="square">
                    <MenuItem icon={<FaGem />}>Dashboard  <Link to="/" /></MenuItem>
                    {project == undefined ? <div></div>
                    :
                    <div>
                    <MenuItem icon={<FaGem />}>{project.name} <Link to={"/project/" + project.id} /></MenuItem>
                    <SubMenu title="Screening" icon={<FaHeart />}>
                        {project.screenings.map(screening => (
                            <MenuItem key={screening.id}>{screening.name} <Link to={"/project/" + project.id +"/screening/" + screening.id.toString()} /> </MenuItem>
                        ))}
                    </SubMenu >
                    <SubMenu title="Cost" icon={<FaHeart />}>
                    {project.costs.map(cost => (
                            <MenuItem key={cost.id}>{cost.name}  <Link to={"/project/" + project.id + "/cost/" + cost.id} onClick={costNavigate(cost)}/> </MenuItem>
                        ))}
                    </SubMenu>
                    <SubMenu title="LCA" icon={<FaHeart />}>
                    {project.lca.map(lca => (
                            <MenuItem key={lca.id}>{lca.name} <Link to={"/project/" + project.id + "/lca/" + lca.id.toString()} /> </MenuItem>
                        ))}
                    </SubMenu>
                    </div>
                    }
                </Menu>
            <p>OTHERS</p>
            <Menu iconShape="square">
                <MenuItem icon={<FaGem />}>Settings <Link to="/" /></MenuItem>
                <MenuItem icon={<FaGem />}>Account <Link to="/" /></MenuItem>
                <MenuItem icon={<FaGem />}>Help <Link to="/" /></MenuItem>
                <MenuItem icon={<FaGem />}>Sign out <Link to="/" /></MenuItem>
            </Menu>
            <SidebarFooter>
                {<p>Copyright</p>}
            </SidebarFooter>
        </ProSidebar></div>
    )
}

export default Navbar