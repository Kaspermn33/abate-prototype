import './App.css';
import { useState } from "react"


import Header from './components/Header';
import Projects from './components/Projects';


function App() {
  const [projects, setProjects] = useState([
    {
        id: 1,
        name: 'Hindbærkrattet',
        description: 'Placeholder',
        contributors: [
            {
                id: 1,
                name: 'Kasper'
            },
            {
                id: 2,
                name: 'Rasmus'
            }
        ],
    },
])

  return (
    <div className="App">
      <Header title='Projects'/>
      <Projects projects={projects}/>
    </div>
  );
}

export default App;
