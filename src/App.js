import { useEffect, useState } from "react";

import EditPanel from "./components/EditPanel/edit-panel";
import Sample from "./components/sample"
import './App.css'

function App() {
  const [sections, setSections] = useState(() => {
    const savedSections = localStorage.getItem('sections')
    return savedSections ? JSON.parse(savedSections) : []
  });

  const [personal, setPersonal] = useState(() => {
    const savedPersonal = localStorage.getItem('personal')
    return savedPersonal ? JSON.parse(savedPersonal) : {}
  })

  useEffect(() => {
    localStorage.setItem('sections', JSON.stringify(sections))
  }, [sections])

  useEffect(() => {
    localStorage.setItem('personal', JSON.stringify(personal))
  }, [personal])

  return (
    <div className="App">
      <EditPanel sections={sections} setSections={setSections} personal={personal} setPersonal={setPersonal} />
      <Sample sections={sections} personal={personal}/>
    </div>
  );
}

export default App;
