import React, { useState } from 'react';
import img1 from "../assets/670d207ac8fb8329e948d25e-cartel-brunette-hd-photo-hot-babe-hq.jpg"

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How to create an account?",
      answer: "To create an account, find the 'Sign up' or 'Create account' button, fill out the registration form with your personal information, and click 'Create account' or 'Sign up.' Verify your email address if needed, and then log in to start using ShopX."
    },
    {
      question: "Have any trust issue?",
      answer: "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease."
    },
    {
      question: "How can I reset my password?",
      answer: "To reset your password, go to the accounts page, click on change profile, enter your current and new password, then log in with the new password."
    },
    {
      question: "What is the payment process?",
      answer: "You can complete your payment securely using PayPal or a debit card, ensuring a fast and hassle-free checkout process."
    },
    {
      question: "How do I place an order?",
      answer: "To place an order, browse our collection, select your preferred items, choose the size and color, add them to your cart, and proceed to checkout. You can pay using PayPal, debit/credit cards, or other available payment methods."
    },
    {
      question: "Can I cancel or modify my order after placing it?",
      answer: "Orders can be canceled or modified within 1 hour of placing them. After that, the order is processed and cannot be changed."
    },
    {
      question: "How long does shipping take?",
      answer: `Shipping time varies based on location:

Standard Shipping: 5-7 business days,

Express Shipping: 2-3 business days`
    },
  ];

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
         
          <div className="w-full lg:w-1/2">
            <img
              src={img1}
              alt="FAQ tailwind section"
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">

              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-yellow-300 mb-2 lg:text-left">
                  FAQs
                </h6>
                <h2 className="text-4xl text-center font-bold text-gray-100 leading-[3.25rem] mb-5 lg:text-left">
                  Looking for answers?
                </h2>
              </div>

              <div className="accordion-group">
                {faqs.map((faq, index) => (
                  <div key={index} className="accordion py-4 border-b border-solid border-gray-200">
                    <button
                      onClick={() => handleToggle(index)}
                      className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-300 w-full transition duration-500 hover:text-green-300"
                      aria-controls={`faq-${index}`}
                    >
                      <h5>{faq.question}</h5>
                      <svg
                        className={`text-gray-900 transition duration-500 group-hover:text-green-300 ${openIndex === index ? 'rotate-180' : ''}`}
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {openIndex === index && (
                      <div
                        id={`faq-${index}`}
                        className="accordion-content w-full px-0 overflow-hidden pr-4"
                      >
                        <p className="text-base font-normal text-yellow-100">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>


            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default FAQ;
