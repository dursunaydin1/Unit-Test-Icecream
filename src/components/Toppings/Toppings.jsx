import axios from "axios";
import React, { useEffect, useState } from "react";

const Toppings = () => {
  // tops: Soslar listesi
  // basket: Sepet
  const [tops, setTops] = useState([]);
  const [basket, setBasket] = useState([]);

  // Component ilk render edildiğinde sosları API'dan çekmek için useEffect kullanılır.
  useEffect(() => {
    axios.get("http://localhost:3040/soslar").then((res) => setTops(res.data));
  }, []);

  // Checkbox değişikliğinde sepetin güncellenmesi için kullanılan fonksiyon
  const hangleChange = (e, top) => {
    const filtred = basket.filter((i) => i.name !== top.name);

    // Checkbox işaretliyse, sosu sepete ekler. İşaret kaldırıldıysa, sosu sepetten çıkarır.
    e.target.checked ? setBasket([...basket, top]) : setBasket(filtred);
  };

  console.log("basket", basket);

  return (
    <div className="container text-light my-5">
      <h1>Sos Çeşitleri</h1>
      <p>Tanesi 2$</p>
      <h2>Soslar Ücret: {basket.length * 2} $</h2>
      <div className="row gap-5 mt-4">
        {/* Sosları listeleyen döngü */}
        {tops.map((top) => (
          <div
            key={top.name}
            className="d-flex flex-column align-items-center"
            style={{ width: "150px" }}
          >
            <img src={top.imagePath} alt="top" className="img-fluid" />
            {/* Sosun adı */}
            <label htmlFor={top.name} className="text-nowrap">
              {top.name}
            </label>
            {/* Checkbox */}
            <input
              id={top.name}
              type="checkbox"
              onChange={(e) => hangleChange(e, top)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toppings;
