import { useEffect, useRef, useState } from "react";

function ParcelMachine() {
  const [parcelMachines, setParcelMachines] = useState([]);
  const parcelMachineRef = useRef();
  const [selectedPM, setSelectedPM] = useState(sessionStorage.getItem("parcelMachine") || "");

  useEffect(() => { 
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(data => {
        const result = data.filter(element => element.A0_NAME === "EE");
        setParcelMachines(result);
      }  ) 
  }, []);

  const pmSelected = () => {
    setSelectedPM(parcelMachineRef.current.value);
    sessionStorage.setItem("parcelMachine", parcelMachineRef.current.value);
  }

  const deleteSelectedPM = () => {
    setSelectedPM("");
    sessionStorage.removeItem("parcelMachine");
  }



  return ( 
  <div>
    {selectedPM === "" && <select onChange={pmSelected} ref={parcelMachineRef}>
      {parcelMachines.map(element => <option key={element.NAME}>{element.NAME}</option>)}
    </select>}
    {selectedPM !== "" && <div>{selectedPM}<button onClick={deleteSelectedPM}>x</button></div>}
  </div> );
}

export default ParcelMachine;