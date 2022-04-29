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
import Lca from './components/Lca';
function App() {
  const [projects, setProjects] = useState([
    {
      id: 0,
      name: 'Hindbærkrattet 1',
      description: 'Placeholder description',
      lastEdit: 'April 4',
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
          name: 'Screening',
          lastEdit: 'April 6',
          buildingId: 0,
          model1: {
            name: "Model 1",
            materialSelection: {
              outerWallBearing: "CLT",
              outerWallFacade: "metal",
              innerWall: "plaster",
              roofBearing: "CLT",
              roofingMaterial: "wood",
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
      ],
      lca: [
        {
          id: 0,
          name: 'Lca 1',
          lastEdit: 'April 6',
          buildingId: 0, 
          files: [
            {
              id: 0,
              name: 'hindbærkræt-materials.csv',
            },
            {
              id: 1,
              name: 'hindbærkræt-materials1.csv',
            },
          ],
          materials : [
            {
              id: 0,
              part_id: 'beof_roof_1',
              file_id: 0,
              build_part: 'Roof',
              mat_name: 'Screen tiles',
              db: 'AECdat',
              mat_id: 'IDID2222',
              quantity: 30,
              unit: 'm2'
            },
            {
              id: 1,
              part_id: 'beof_roof_2',
              file_id: 1,
              build_part: 'Roof',
              mat_name: 'Screen tiles',
              db: 'AECdat',
              mat_id: 'IDID2222',
              quantity: 30,
              unit: 'm2'
            },

          ]
        }
      ],
      costs: [
        {
          id: 0,
          name: 'cost 1',
          lastEdit: 'April 6',
          buildingId: 1, 
          files: [
            {
              id: 0,
              name: 'hindbærkræt-materials.csv',
            },
            {
              id: 1,
              name: 'hindbærkræt-materials1.csv',
            },
          ],
          materials : [
            {
              id: 0,
              part_id: 'beof_roof_1',
              file_id: 0,
              build_part: 'Roof',
              mat_name: 'Screen tiles',
              db: 'Molio',
              mat_id: 'IDID2222',
              quantity: 30,
              unit: 'm2'
            },
            {
              id: 1,
              part_id: 'beof_roof_2',
              file_id: 1,
              build_part: 'Roof',
              mat_name: 'Screen tiles',
              db: 'Molio',
              mat_id: 'IDID2222',
              quantity: 30,
              unit: 'm2'
            },

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
      lastEdit: 'April 4',
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
          lastEdit: 'April 6',
        }
      ],
      lca: [
        {
          id: 0,
          name: 'lca 1',
          lastEdit: 'April 6',
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

  const [currentProject, setCurrentProject] = useState();

  const onSetCurrentProject = (project) => {
    setCurrentProject(project)
  }

  const onSetProjectSelected = (b) => {
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

  return (
    <div className='app'>
      <Router>
        <Navbar project={currentProject}/>
        <Routes>
          <Route path="/" element={<Dashboard onUpdate={onSetProjectSelected} projects={projects} onSetCurrentProject={onSetCurrentProject}/>} />
          <Route path="/project/:id" element={<Project projects={projects} onSetCurrentProject={onSetCurrentProject}/>} />
          <Route path="/newproject" element={<NewProject projects={projects} onAddProject={addProject}/>}/>
          <Route path="/project/:id/update" element={<UpdateProject projects={projects} onUpdateProject={updateProject}/>}/>
          <Route path='/project/:id/cost/:costid' element={<Costs projects={projects} onSetCurrentProject={onSetCurrentProject}/>}/>
          <Route path='project/:id/screening/:screeningid' element={<Screening projects={projects} onSetCurrentProject={onSetCurrentProject}/>}/>
          <Route path='project/:id/lca/:lcaid' element={<Lca projects={projects} onSetCurrentProject={onSetCurrentProject}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
