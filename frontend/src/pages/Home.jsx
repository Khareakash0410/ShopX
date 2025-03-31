import React, { useEffect, useState } from 'react'
import Hero from '../components/layout/Hero'
import GenderCollection from '../components/products/GenderCollection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'
import ProductGrid from '../components/products/ProductGrid'
import FeaturedColllection from '../components/products/FeaturedColllection'
import FeaturesSection from '../components/products/FeaturesSection'
import {useDispatch, useSelector} from "react-redux";
import { fetchProductsByFilters } from '../redux/slice/productSlice'
import axios from 'axios'


const Home = () => {

   const dispatch = useDispatch();

   const {products, loading, error} = useSelector((state) => state.products);

   const [bestSellerProduct, setBestSellerProduct] = useState(null);

   useEffect(() => {

    dispatch(fetchProductsByFilters({
      gender: "Women",
      category: "Top Wear",
      limit: 8,
    }));

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);

        setBestSellerProduct(response.data);   
      } catch (error) {
        console.log(error);     
      }
    };
    fetchBestSeller();
   }, [dispatch]);


  return (
    <div>

     {/* starting 3 component */}
      <Hero />
      <GenderCollection />
      <NewArrivals />


      {/* Best seller section */}
      <h2 className='text-3xl text-center text-white font-bold mb-4'>
       Best Seller
      </h2>
      {
         bestSellerProduct ? 
         (<ProductDetails productId={bestSellerProduct._id} />) 
         : 
         (<p className='text-center'>Loading Best Seller products....</p>)
      }
    

      {/* top wear for women */}
      <div className='container mx-auto'>
         <h2 className='text-3xl text-center text-white font-bold mb-8'>
            Top Wear for Women's
         </h2>
         <ProductGrid products={products} loading={loading} error={error}/>
      </div>

      {/* featured collection */}
     <FeaturedColllection />
     <FeaturesSection />


    </div>
  )
}

export default Home
