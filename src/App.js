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
import UpdateProject from './components/UpdateProject';
import Costs from './components/Costs';
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
          buildingId: 1, 
          files: [
            {
              id: 0,
              name: 'hindbærkræt-materials.csv'
            },
            {
              id: 1,
              name: 'hindbærkræt-materials1.csv'
            },
          ]
        }
      ],
      buildings: [
        {
          id: 0,
          name: 'bygning 1',
          type: 'Apartment',
          levels: 5,
          area: 2600,
        },
        {
          id: 1,
          name: 'bygning 2',
          type: 'Apartment',
          levels: 5,
          area: 2600,
        }
      ]
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
      buildings: [
        {
          id: 0,
          name: 'bygning 1',
          type: 'Apartment',
          levels: 5,
          area: 2600,
        }
      ]
    },
  ]);


  const [projectSelected, setProjectSelected] = useState(false);

  const onSetProjectSelected = (b) => {
    console.log("should update")
    setProjectSelected(b);
  }

  const addProject = (newProject) => {
    
    console.log(newProject)
    var newProjects = [...projects];
    newProjects.push(newProject);
    setProjects(newProjects);
  }

  const updateProject = (updatedProject) => {
    var temp = [...projects]
    console.log(temp)
    const newProjects = [];
    for(let i = 0; i < temp.length; i++) {
      let p = temp[i]
      if(p.id != updatedProject.id) {
        newProjects.push(temp[i]);
      } else {
        console.log(true)
        newProjects.push(updatedProject);
      }
    }
    setProjects(newProjects)

    console.log(newProjects)
  }

  const updateCost = (updatedCost, projectId, costId) => {
    
  }

  return (
    <div className='app'>
      <Router>
        <Navbar projectSelected={projectSelected} onUpdate={onSetProjectSelected}/>
        <Routes>
          <Route path="/" element={<Dashboard onUpdate={onSetProjectSelected} projects={projects}/>} />
          <Route path="/project/:id" element={<Project projects={projects}/>} />
          <Route path="/screening/:id" element={<Screening/>}/>
          <Route path="/newproject" element={<NewProject projects={projects} onAddProject={addProject}/>}/>
          <Route path="/project/:id/update" element={<UpdateProject projects={projects} onUpdateProject={updateProject}/>}/>
          <Route path='/project/:id/cost/:costid' element={<Costs projects={projects} onUpdateCost={updateCost}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
