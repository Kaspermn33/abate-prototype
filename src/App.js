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
              name: 'hindbærkræt-materials.csv',
              materials: [
                {
                  part_id: 'beof_roof_1',
                  build_part: 'Roof',
                  mat_name: 'Screen tiles',
                  db: 'Molio',
                  mat_id: 'IDID2222',
                  quantity: 30,
                  unit: 'm2'
                }
              ]
            },
            {
              id: 1,
              name: 'hindbærkræt-materials1.csv',
              materials: [
                {
                  part_id: 'beof_roof_2',
                  build_part: 'Roof',
                  mat_name: 'Screen tiles',
                  db: 'Molio',
                  mat_id: 'IDID2222',
                  quantity: 30,
                  unit: 'm2'
                }
              ]
            },
          ],
          standAloneMaterials : [
            {}
          ]
        }
      ],
      buildings: [
        {
          id: 0,
          name: 'Bygning 1',
          type: 'Apartment',
          levels: 5,
          area: 2600,
        },
        {
          id: 1,
          name: 'Bygning 2',
          type: 'Apartment',
          levels: 5,
          area: 6200,
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

 

  console.log("APP", projects[0])
  const [projectSelected, setProjectSelected] = useState(false);

  const [currentProject, setCurrentProject] = useState();
  const [currentTool, setCurrentTool] = useState();
  const onSetCurrentProject = (project) => {
    setCurrentProject(project)
    console.log("DASHBOARD", project)
  }

  const onSetProjectSelected = (b) => {
    console.log("should update")
    setProjectSelected(b);
  }

  const onSetCurrentTool = (tool, type) => {
    console.log("SET CURRENT TOOL", tool)
    console.log("CURRENT PROJECT", currentProject)
    setCurrentTool(tool);

    let temp = {
      id: currentProject.id,
      name: currentProject.name,
      description: currentProject.description,
      lastEdit: currentProject.lastEdit,
      contributors: currentProject.contributors,
      screenings: currentProject.screenings,
      lca: currentProject.lca,
      costs: [],
      buildings: currentProject.buildings
    }

    switch (type) {
      case "costs":
        for(let i = 0; i < currentProject.costs.length; i++) {
          let current = currentProject.costs[i];
          if(current.id = tool.id) {
            temp.costs.push(tool)
          }
          else {
            temp.costs.push(current);
          }
        }
        break;
      default:
        console.log("default")
        temp.costs = currentProject.costs;

    }


    console.log("SWITCH",temp.costs[0])
    //setCurrentProject(temp);
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
        <Navbar project={currentProject}/>
        <Routes>
          <Route path="/" element={<Dashboard onUpdate={onSetProjectSelected} projects={projects} onSetCurrentProject={onSetCurrentProject}/>} />
          <Route path="/project/:id" element={<Project projects={projects} onSetCurrentProject={onSetCurrentProject} onSetCurrentTool={onSetCurrentTool}/>} />
          <Route path="/screening/:id" element={<Screening/>}/>
          <Route path="/newproject" element={<NewProject projects={projects} onAddProject={addProject}/>}/>
          <Route path="/project/:id/update" element={<UpdateProject projects={projects} onUpdateProject={updateProject}/>}/>
          <Route path='/project/:id/cost/:costid' element={<Costs currentCost={currentTool} project={currentProject} onUpdateCost={updateCost} onSetCurrentCost={onSetCurrentTool}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
