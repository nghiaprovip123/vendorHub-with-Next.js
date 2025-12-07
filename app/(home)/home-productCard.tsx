/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// 1. Keep the data fetching function separate and clean
// async function getProducts() {
//     const res = await fetch("http://localhost:3000/api/products");
    
//     if (!res.ok) {
//         throw new Error("Failed to fetch products");
//     }
//     return res.json();
// }

// 2. Correctly structure the Async Component
export default async function ProductCard() {
    // const { productList } = await getProducts();
    const productCards = [] as any; 

    return (
		<div className="w-full flex flex-col items-center mt-10">
		<h1 className="font-bold text-5xl mb-6">
          Popular products ({productCards.length})
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto p-4">
            {productCards.map((p:any) => (
                <div key={p.pid} className="mx-auto w-full">
                    <div className="
                        bg-white border-4 border-black rounded-none 
                        shadow-[8px_8px_0_#000000] transition-shadow duration-300
                        hover:shadow-[12px_12px_0_#000000]
                    ">
                        <a href={`/product-details/${p.id}`}>
                            <img 
                                className="rounded-none p-4 object-cover h-64 w-full border-b-4 border-black" 
                                src={p.image} 
                                
                                alt="product image"
                            />
                        </a>
                        <div className=" px-5 py-5">
                            <div className="flex items-center">
							<a href="#">
                                <h3 className="
                                    text-black font-extrabold text-2xl tracking-tighter 
                                    font-mono uppercase
                                ">
                                    {p.title}
                                </h3>
                            </a>
                            <div className="flex items-center mt-3 mb-4">
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                </svg>
                                {/* ... (rest of the 5 SVG stars) ... */}
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <span className="
                                    bg-black text-white text-xs font-bold px-2 py-0.5 rounded-none border-2 border-black ml-3
                                ">
                                    {p.rating || '5.0'}
                                </span>
                            </div>
							</div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t-4 border-black">
                                <span className="text-4xl font-extrabold text-black font-mono">{p.price}</span>
                                <a href="#"
                                    className="
                                        bg-black text-white border-4 border-black font-extrabold rounded-none
                                        text-sm px-6 py-3 uppercase tracking-wider transition-all duration-100
                                        hover:bg-white hover:text-cyan-400
                                        active:shadow-[4px_4px_0_#000000] active:translate-x-[4px] active:translate-y-[4px]
                                        shadow-[4px_4px_0_#000000]
                                    ">
                                    Add to cart
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
		</ div>
        
    );
}