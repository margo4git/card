import logo from "./logo.svg";
import classes from "./App.module.css";
import { Cart } from "./components/cart/cart";

function App() {
  return (
    <div className={classes.container}>
      <Cart />
    </div>
  );
}

export default App;
