import { ProductItem } from "./ProductItem"

export const ProductList =({items,onMove})=>{
    return <div>
        <h2>Product List </h2>
        <div className="list">

{
    items.map(elm=><ProductItem key={elm.id} {...elm} onMove={onMove}/>)
}

        </div>

        </div>
}