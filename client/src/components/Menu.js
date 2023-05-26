function Menu(props) {
  //function to show each image and name of menu
  return (
    <div>
      <img src={props.img} alt={props.alt}></img>
      <p> {props.menu}</p>
    </div>
  );
}

export default Menu;