'use client';
import { useCallback, useState } from 'react';
import FormGroup from '@/Components/UI/FormGroup';

const GettingStarted = () => {
  const [formData, setFormData] = useState({
    username: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    [],
  );

  return (
    <section className="w-full min-h-screen">
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="font-bold text-xl my-3">
          A Couple more things before you can get started...
        </h1>
        <form className="w-[400px] h-[500px] shadow-md">
          <FormGroup
            label="User Name"
            placeholder="John Doe"
            name="username"
            value={formData.username}
            handleChange={handleInputChange}
          />
          <FormGroup
            label="User Name"
            placeholder="John Doe"
            name="city"
            value={formData.city}
            handleChange={handleInputChange}
          />
          <FormGroup
            label="User Name"
            placeholder="John Doe"
            name="state"
            value={formData.state}
            handleChange={handleInputChange}
          />
          <FormGroup
            label="User Name"
            placeholder="John Doe"
            name="zipCode"
            value={formData.zipCode}
            handleChange={handleInputChange}
          />
          <FormGroup
            label="User Name"
            placeholder="John Doe"
            name="country"
            value={formData.country}
            handleChange={handleInputChange}
          />
          <div className=" w-full flex justify-center items-center mt-4">
            <button className="border py-2 px-10 w-fit cursor-pointer font-semibold hover:bg-black hover:text-white duration-75">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default GettingStarted;
