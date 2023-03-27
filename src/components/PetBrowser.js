import React from "react";
import Pet from "./Pet";


function PetBrowser({ pets, onAdoptPet }) {
  const listOfPets = pets.map(pet => {
    return(
      <Pet
        key={pet.id}
        pet={pet}
        onAdoptPet={onAdoptPet}
      />
    )
  })

  return <div className="ui cards">{listOfPets}</div>;
}

export default PetBrowser;
