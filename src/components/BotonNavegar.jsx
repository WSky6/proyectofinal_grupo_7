const BotonNavegar = ({ ruta, texto }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ruta);
  };

  return (
    <button onClick={handleClick}>
      {texto}
    </button>
  );

};

export default BotonNavegar;