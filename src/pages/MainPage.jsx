import Scoops from "../components/Scoops/Scoops.jsx";
import Toppings from "../components/Toppings/Toppings.jsx";
import Form from "../components/Form/Form.jsx";

const MainPage = () => {
  return (
    <div>
      {/* <Kategoriler></Kategoriler> */}
      <Scoops />
      {/* Soslar */}
      <Toppings />
      {/* Form */}
      <Form />
    </div>
  );
};

export default MainPage;
