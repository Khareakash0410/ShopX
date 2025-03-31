import React from 'react'
import img1 from "../assets/1_xZsDUFNJe7oSrHa3SRTh_A.jpg"
import img2 from "../assets/2.jpg"
import img3 from "../assets/3.jpg"
import img4 from "../assets/4.jpg"
import img5 from "../assets/5.jpg"
import img6 from "../assets/6.jpeg"
import img7 from "../assets/7.jpeg"
import img8 from "../assets/8.jpg"
import img9 from "../assets/9.jpg"

const Features = () => {
  return (
    <section className="pt-4 pb-3 lg:pt-[30px] lg:pb-[24px] dark:bg-dark">
    <div className="container mx-auto">


        <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
            <div className="mx-auto mb-4 max-w-[510px] text-center lg:mb-6">
            <span className="text-primary mb-2 block text-xl text-green-400 font-semibold">
                Our Features
            </span>
            <h2 className="text-white mb-3 text-3xl leading-[1.2] font-bold sm:text-4xl md:text-[40px]">
                What We Offer
            </h2>
            </div>
        </div>
        </div>


        <div className="-mx-4 flex flex-wrap">
            {[
                { img: img1, title: "👕 Wide Collection", desc: "From casual wear to high-fashion couture, our collection has something for everyone. Browse the latest trends, seasonal styles, and exclusive designs curated by top fashion experts." },
                { img: img2, title: "🚀 Fast Delivery", desc: "With our efficient logistics partners, we ensure that your favorite outfits reach your doorstep quickly and safely. Enjoy express delivery options for last-minute fashion needs!" },
                { img: img3, title: "💳 Secure Payments", desc: "We support all major credit/debit cards, digital wallets, and secure payment gateways to make your shopping experience smooth and worry-free." },
                { img: img4, title: "📸 Virtual Try-On", desc: "Use our advanced AI-powered try-on feature to visualize how clothes fit and style on your body—making shopping easier and more fun!" },
                { img: img5, title: "🔄 Easy Returns & Exchanges", desc: "If something doesn’t fit or isn’t what you expected, return it with a simple click. Our flexible return policy ensures a seamless shopping experience." },
                { img: img6, title: "🎁 Exclusive Deals & Discounts", desc: "Sign up for our loyalty program to access member-only sales, first dibs on new arrivals, and incredible seasonal discounts." },
                { img: img7, title: "🔍 Smart Search & Filters", desc: "Our powerful search and filter options let you sort products by color, size, brand, and price—making it easier to shop for exactly what you need." },
                { img: img8, title: "⭐ Customer Reviews & Ratings", desc: "Read honest reviews, see product ratings, and get insights from other shoppers to make informed buying decisions." },
                { img: img9, title: "📦 Track Your Orders in Real-Time", desc: "With our real-time order tracking feature, you’ll receive live updates on your order status—from dispatch to doorstep." }
            ].map((card, index) => (
                <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="group perspective">
                    <div className="relative w-full h-[380px] transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                        
                    {/* Front Side */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center m-2 p-2 bg-white dark:bg-dark-2 rounded-[20px] shadow-lg backface-hidden">                  
                        <img className="w-full h-full rounded-[20px]" src={card.img} alt={card.title} />          
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 m-2 bg-gray-800 text-gray-300 rounded-[20px] shadow-lg rotate-y-180 backface-hidden">
                        <h4 className="text-yellow-300 mb-4 text-2xl font-semibold">{card.title}</h4>
                        <p className="text-center">{card.desc}</p>
                    </div>

                    </div>
                </div>
                </div>
            ))}
        </div>


    </div>
    </section>
  )
}

export default Features
