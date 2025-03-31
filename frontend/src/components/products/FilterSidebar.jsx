import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {

  const [serachParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
  });

  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
     "Red",
     "Blue",
     "Green",
     "Black",
     "Yellow",
     "Gray",
     "White", 
     "Pink",
     "Orange",
     "Brown",
     "Navy",
     "SkyBlue",
     "Silver",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyster",
    "Silk",
    "Linen",
    'Viscose',
    'Fleece',
  ];

  const brands = [
    'Urban Threads',
    'Modern Fit',
    'Street Style',
    'Beach Breeze',
    'Fashionist',
    'Levis',
    'Roadster',
    'Siyaram',
  ];

  const genders = ['Men', 'Women'];

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleFilterChange = (e) => {
    const {name, value, checked, type} = e.target
    let newFilters = {
        ...filters
    }

    if (type === "checkbox") {
        if (checked) {
            newFilters[name] = [...(newFilters[name] || []), value];
        } 
        else {
            newFilters[name] = newFilters[name].filter((item) => item !== value);
        }
    } 
    else {
        newFilters[name] = value
    }
    setFilters(newFilters);
    updateURLParams(newFilters); 
  };
  
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
        if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
            params.append(key, newFilters[key].join(","));
        } 
        else if (newFilters[key]){
          params.append(key, newFilters[key]);
        }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);

    const newFilters = {
        ...filters,
        minPrice: 0,
        maxPrice: newPrice
    };

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  useEffect(() => {
    const params = Object.fromEntries([...serachParams]);

    setFilters({
        category: params.category || "",
        gender: params.gender || "",
        color: params.color || "",
        size: params.size ? params.size.split(",") : [],
        material: params.material ? params.material.split(",") : [],
        brand: params.brand ? params.brand.split(",") : [],
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
    });
    setPriceRange([0, params.maxPrice || 1000]);
  }, [serachParams]);
    



return (
    <div className='p-4 bg-black'>
       <h3 className='text-xl font-medium text-white mb-4'>
         Filter You Like
       </h3>


       {/* category filter */}
       <div className='mb-6'>
         <label className='block text-gray-300 font-medium mb-2'>
           Category
         </label>
         {
            categories.map((ele) => (
                <div key={ele} className='flex items-center mb-1'>
                  <input 
                    type="radio" 
                    name='category' 
                    value={ele} 
                    checked={filters.category === ele}
                    onChange={handleFilterChange}
                    className='mr-2 h-4 w-4 text-blue-500 focus:text-blue-400 border-gray-300'/>
                  <span className='text-gray-400'>
                    {ele}
                  </span>
                </div>
            ))
         }
       </div>

       {/* gender filter */}
       <div className='mb-6'>
         <label className='block text-white font-medium mb-2'>
           Gender
         </label>
         {
            genders.map((ele) => (
                <div key={ele} className='flex items-center mb-1'>
                  <input
                    type="radio" 
                    name='gender' 
                    value={ele}
                    checked={filters.gender === ele}
                    onChange={handleFilterChange}
                    className='mr-2 h-4 w-4 text-blue-500 focus:text-blue-400 border-gray-300'/>
                  <span className='text-gray-300'>
                    {ele}
                  </span>
                </div>
            ))
         }
       </div>


       {/* color filter */}
       <div className='mb-6'>
         <label className='block text-white font-medium mb-2'>
           Color
         </label>
         <div className='flex flex-wrap gap-2'>
           {
            colors.map((ele) => (
                <button 
                 key={ele} 
                 name='color' 
                 value={ele}
                 onClick={handleFilterChange}
                 className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === ele ? "ring-2 ring-blue-500" : ""}`} style={{backgroundColor: ele.toLocaleLowerCase()}}>
               
                </button>
            ))
           }
         </div>
       </div>


       {/* size filter */}
       <div className='mb-6'>
         <label className='block text-white font-medium mb-2'>
           Size
         </label>
         {
            sizes.map((ele) => (
                <div key={ele} className='flex items-center mb-1'>
                    <input 
                      type="checkbox" 
                      name='size' 
                      value={ele}
                      checked={filters.size.includes(ele)}
                      onChange={handleFilterChange}
                      className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                    <span className='text-gray-400'>
                      {ele}
                    </span>
                </div>
            ))
         }
       </div>
       

       {/* materials filter */}
       <div className='mb-6'>
         <label className='block text-white font-medium mb-2'>
           Material
         </label>
         {
            materials.map((ele) => (
                <div key={ele} className='flex items-center mb-1'>
                    <input 
                      type="checkbox" 
                      name='material' 
                      value={ele}
                      checked={filters.material.includes(ele)}
                      onChange={handleFilterChange}
                      className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                    <span className='text-gray-400'>
                      {ele}
                    </span>
                </div>
            ))
         }
       </div>


       {/* brand filter */}
       <div className='mb-6'>
         <label className='block text-white font-medium mb-2'>
           Brand
         </label>
         {
            brands.map((ele) => (
                <div key={ele} className='flex items-center mb-1'>
                    <input 
                    type="checkbox" 
                    name='brand' 
                    value={ele}
                    checked={filters.brand.includes(ele)}
                    onChange={handleFilterChange}
                    className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                    <span className='text-gray-400'>
                      {ele}
                    </span>
                </div>
            ))
         }
       </div>


       {/* price range filter */}
       <div className='mb-8'>
         <label className='block text-white font-medium mb-2'>
           Price Range
         </label>
         <input 
            type="range" 
            name='priceRange'
            min={0} 
            max={1000} 
            value={priceRange[1]}
            onChange={handlePriceChange}
            className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer' />
         <div className='flex justify-between text-gray-400 mt-2'>
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
         </div>
       </div>


    </div>
  )
}

export default FilterSidebar
