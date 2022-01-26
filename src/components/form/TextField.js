import React from 'react';

const TextField = ({ label, id, name, register, errors, ...props }) => {
    return (
        <>
            <label htmlFor={id} className='block mb-[5px]'>{label}</label>
            <input
                id={id}
                {...register(name)}
                {...props}
                className={`w-full border-[1px] border-gray-300 px-2 py-[5px] 
                focus:outline-sky-500 rounded-lg ${errors[name] ? 'border-red-500' : ''}`}
            />
            {errors[name] && <p className='text-red-500'>{errors[name].message}</p>}
        </>
    );
};

export default TextField;