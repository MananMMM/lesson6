import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ProductList } from "./components/ProductList";
import { Basket } from "./components/Basket";
import { BasketItem } from "./components/BasketItem";

function App() {
  const [count, setCount] = useState(0);
  const [total,setTotal]=useState(0)
  const [basket, setBasket] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:3004/products")
    .then(res=>res.json())
    .then(res=>{
     console.log(res)
      setProducts(res) 
    })
     },[])

     useEffect(() => {
      const total = basket.reduce((sum, item) => sum + item.price * item.count, 0);
      setTotal(total);
  }, [basket]);

  const moveToCart = (id) => {
    let found = products.find((x) => x.id == id);
    let basketItem = basket.find((x) => x.id == id);

    if (basketItem) {
      setBasket(
        basket.map((x) => (x.id == id ? { ...x, count: x.count + 1 } : x))
      );
    } else {
      setBasket([...basket, { ...found, count: 1 }]);
    }
  };

  const decItem=(id)=>{
    let found = products.find((x) => x.id == id);
    let basketItem = basket.find((x) => x.id == id);
    setBasket(
      basket.map((x=>
        x.id===id && x.count>1 ? {...x,count:x.count-1}:x))
    );

  }
  const delItem=id=>{
    setBasket(basket.filter(item => item.id !== id));
   }
  
  return (
    <>
      <div className="row">
        <ProductList items={products} onMove={moveToCart} />
    <Basket items={basket} onAdd={moveToCart} onDecrease={decItem} onDelete={delItem} total={total} />
        
      </div>
    </>
  );
}

export default App;
