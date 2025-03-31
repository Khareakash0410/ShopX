import React, { useEffect, useState } from 'react';
import { FiMail, FiUser, FiPhone, FiMessageSquare } from "react-icons/fi";
import axios from "axios";
import {toast} from "sonner";


const ContactManagement = () => {

    const [contact, setContact] = useState([]);
   
    const Card = ({ title, subtitle, Icon }) => {
        return (
          <span
            className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
          >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
        
                <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />

                <Icon className="mb-2 text-2xl text-violet-600 group-hover:fill-yellow-400 transition-colors relative z-10 duration-300" />
                <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
                {title}
                </h3>
                
                <p className="text-slate-700 truncate group-hover:text-violet-200 relative z-10 duration-300">
                {subtitle}
                </p>
          </span>
        );
    };

    useEffect(() => {
       const handlefetchContacts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contact-us/get`, {headers: {
                Authorization: localStorage.getItem("userToken")
            }});
    
            setContact(response.data.contact);
        } catch (error) {
            toast.error(error.response.data.message);
        }      
       }

       handlefetchContacts();
    }, []);

    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">
          Admin &gt; Contact
        </h2>

        <div className="p-4 flex flex-col gap-4">

            {
                contact.length > 0 ? (
                    contact.map((ele) => {
                        return  <div key={ele._id} className="grid gap-4 bg-yellow-200 px-4 py-3 rounded-md grid-cols-2 lg:grid-cols-4">
                                    <Card  title="Name"     subtitle={ele.name}     Icon={FiUser} />
                    
                                    <Card  title="Email"    subtitle={ele.email}    Icon={FiMail} />
                    
                                    <Card  title="Phone"    subtitle={ele.phone}    Icon={FiPhone} />
                    
                                    <Card  title="Message"  subtitle={ele.message}  Icon={FiMessageSquare} />                    
                                </div>
                    })
                ) : (<p className='text-white'>No Data found.</p>)
            }

           
        </div>
        
      </div>
    );
};

export default ContactManagement;
