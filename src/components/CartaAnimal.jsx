

const CartaAnimal = ({ animal }) => {

  if (!animal) {
    return null;
  }

  return (
    <div className="carta-animal">
      <div className="animal-card">
      <span className="animal-image">
        {animal.imagen}
      </span>
    </div>
    
    <div className="animal-data"> 
      <h2>{animal.animal}</h2>
      <p>{animal.descripcion}</p>

    </div>
    </div>
  );
};

export default CartaAnimal;