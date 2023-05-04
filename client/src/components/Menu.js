function Menu(props) {
  return (
    <div>
      <img src={props.img} alt={props.alt}></img>
      <p> {props.menu}</p>
    </div>
  );
}

export default Menu;
