import React, { useState } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";
function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleTypeChange(petType) {
    console.log(petType, filters)
    setFilters({...filters, type: petType })
    const filteredPets = pets.filter(pet => (
      pet.type === petType
    ))
    setPets(filteredPets)
  }

  function handleFindClick() {
    console.log(filters)
    let url
    const baseURL = 'http://localhost:3001/pets'
    if (filters.type === "all") {
      url = baseURL
    } else {
      url = baseURL + `?type=${filters.type}`
    }
    fetch(`${url}`)
    .then(response => response.json())
    .then(data => {
      setPets(data)
      console.log(data)
    })
  }

  function handlePetAdoption(id) {
    const foundPet = pets.find(pet => pet.id === id)
    console.log("adopted pet", foundPet, foundPet.isAdopted)
    const updatedPets = pets.map(pet => {
      if (pet.id === id) {pet.isAdopted = true}
      return pet
    })
    setPets(() => updatedPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters 
              onChangeType={handleTypeChange}
              onFindPetsClick={handleFindClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser 
              pets={pets}
              onAdoptPet={handlePetAdoption}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;