

const CartaAnimal = ({ animal }) => {

  if (!animal) {
    return null;
  }

  if (!animal.imagen || !animal.imagen2 || !animal.imagen3) {
    return (
    <>  
    <div className="carta-animal">
      <section className="animal-card" style={{ gridColumn: '2' }}>
        <span className="animal-image">
          {animal.imagen}
        </span>
      </section>
    </div>  
    <div className="animal-data" > 
      <h3>{animal.animal}</h3>
      <p>{animal.descripcion}</p>
    </div>
    </>
  );
  }

  return (
    <>  
    <div className="carta-animal">
      <section className="animal-card">
        <span className="animal-image">
          {animal.imagen}
        </span>
      </section>
      <section className="animal-card">
        <span className="animal-image">
          {animal.imagen2}
        </span>
      </section>
      <section className="animal-card">
        <span className="animal-image">
          {animal.imagen3}
        </span>
      </section>
    </div>  
    <div className="animal-data" > 
      <h3>{animal.animal}</h3>
      <p>{animal.descripcion}</p>
    </div>
    </>
  );
};

export default CartaAnimal;