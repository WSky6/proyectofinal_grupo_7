

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
      <h3>{animal.animal}</h3>
      <p>{animal.descripcion}</p>
    </div>
    </div>
  );
};

export default CartaAnimal;