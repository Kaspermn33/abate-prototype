import './App.css';
import { useState } from "react"
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {FaGem, FaHeart} from 'react-icons/fa'
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import Screening from './components/Screening';
import Header from './components/Header';
import Project from './components/Project';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import NewProject from './components/NewProject';

function App() {
  const [projects, setProjects] = useState([
    {
      id: 0,
      name: 'Hindbærkrattet 1',
      description: 'Placeholder description',
      lastEdit: 'April 4th',
      contributors: [
        {
          id: 0,
          name: 'Kasper'
        },
        {
          id: 1,
          name: 'Rasmus'
        }
      ],
      screenings: [
        {
          id: 0,
          name: 'Screening 1',
          lastEdit: 'April 6th',
        }
      ],
      lca: [
        {
          id: 0,
          name: 'lca 1',
          lastEdit: 'April 6th',
        }
      ],
      costs: [
        {
          id: 0,
          name: 'cost 1',
          lastEdit: 'April 6th',
        }
      ],
    },
    {
      id: 1,
      name: 'Hindbærkrattet 2',
      description: 'Placeholder description',
      lastEdit: 'April 4th',
      contributors: [
        {
          id: 0,
          name: 'Kasper'
        },
        {
          id: 1,
          name: 'Rasmus'
        }
      ],
      screenings: [
        {
          id: 0,
          name: 'Screening 1',
          lastEdit: 'April 6th',
        }
      ],
      lca: [
        {
          id: 0,
          name: 'lca 1',
          lastEdit: 'April 6th',
        }
      ],
      costs: [
        
      ],
    },
  ]);

  const [projectSelected, setProjectSelected] = useState(false);

  const onSetProjectSelected = (b) => {
    console.log("should update")
    setProjectSelected(b);
  }

  return (
    <div className='app'>
      <Router>
        <Navbar projectSelected={projectSelected} onUpdate={onSetProjectSelected}/>
        <Routes>
          <Route path="/" element={<Dashboard onUpdate={onSetProjectSelected} projects={projects}/>} />
          <Route path="/project/:id" element={<Project projects={projects}/>} />
          <Route path="/screening/:id" element={<Screening/>}/>
          <Route path="/newproject" element={<NewProject projects={projects}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
