import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/features/productsSlice';
import { RootState } from '../../store/features/productsSlice';


interface Product {
  name: string;
  quantity: number;
  price: number;
}

function CreateProductForm( ) {
  const dispatch = useDispatch();
  const products = useSelector((state:RootState) => state.product.items);
  const[product, setProduct]=useState<Product>({
    
    name : '', 
    quantity:NaN,
    price:NaN,
    
    
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
  
      setProduct({
        ...product,
        [name]: value,
      });
    
  };
  const sendProd = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const isEmptyField = Object.values(product).some((value) => value.trim() === '');
    
    if (isEmptyField) {
      alert('Please fill in all fields');
      return;
    }
      
  
    dispatch(addProduct(product)); 
    alert('Product added successfully!'); 
    setProduct({name: '', quantity:NaN, price:NaN});
  };


  return (
    <div >
      <header>
        
        
          <div className="w-full h-full" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
            <div className="bg-white mx-auto my-15 w-full">
              
              <div className="flex justify-between">
             
              <form className="flex flex-col w-55 p-12 gap-10">
              <h2>Add Product </h2>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input className='px-2' type="text" name="name" required value={product.name} onChange={handleChange} placeholder="Product Name" />
                </div>


                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input className='px-2' type="number" name="price" required value={product.price} onChange={handleChange} placeholder="Price" />
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input className='px-2' type="number" required name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" />
                </div>

                <div style={{width:'85%'}}>
                  <button className="px-4 py-1.5 text-white h-8 text-md rounded-full border-none bg-[#36416A] mt-8 " type="submit" style={{ cursor:'pointer'}} onClick={sendProd}>{products.length>0 ?<span>Add more</span>:<span>Add</span>}</button>
                  
                </div>

              </form>
                <div className="flex flex-col w-40 text-white p-16 bg-[#36416A]">
                  <h1 className=" hidden lg:block" style={{fontSize:'xx-large'}}>Products</h1>
                  <h1 style={{fontSize:'x-large', width:'40%'}}>Add your Products......</h1>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        
      </header>
    </div>
  )
}

export default CreateProductForm