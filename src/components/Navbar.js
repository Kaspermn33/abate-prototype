import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGem, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import './Navbar.scss'
import Header from './Header';
import Logo from './Logo';
const Navbar = (projectSelected, onUpdate) => {


    //NOT THE PROPER WAY
    const screenings = [
        {
            id: 1,
            name: 'Screening 1',
        },
        {
            id: 2,
            name: 'Screening 2',
        },
    ];

    console.log(projectSelected)

    return (
        <div>
            <Logo/>
        <ProSidebar>

            <p>MENU</p>
                <Menu iconShape="square">
                    <MenuItem icon={<FaGem />}>Dashboard  <Link to="/" /></MenuItem>
                    <MenuItem icon={<FaGem />}>Project <Link to="/project/" /></MenuItem>
                    <SubMenu title="Screening" icon={<FaHeart />}>
                        {screenings.map(screening => (
                            <MenuItem>{screening.name} <Link to={"/screening/" + screening.id.toString()} /> </MenuItem>
                        ))}
                    </SubMenu>
                    <SubMenu title="Cost" icon={<FaHeart />}>
                        <MenuItem>Component 1<Link to="/projects" /></MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                    <SubMenu title="LCA" icon={<FaHeart />}>
                        <MenuItem>Component 1<Link to="/projects" /></MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
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