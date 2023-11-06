import { useState } from "react";
// Components
import Color from "./color";
import Website from "./website";
import Font from "./font";
import Social from "./social";
import { DarkBackground, LightBackground } from "./bkg";
import Industry from "./industry";
import Name from "./name";
// Utils
import { socials } from "./utils";
// Toastify
import { toast } from "react-toastify";

const CreateBrand = () => {
  const [form, setForm] = useState({
    name: "",
    colors: [],
    font: "",
    website: "",
    fontFile: null,
    customFont: false,
    socials,
    light: null,
    dark: null,
    industry: [],
  });

  console.log(form.dark);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, customFont, fontFile } = form;
    if (!name) {
      toast.warning("Please provide a brand name");
      return;
    }
    if (customFont && !fontFile) {
      toast.warning("Please provide custom font file");
      return;
    }
    // const formData = new FormData();
  };

  return (
    <div className='p-3' onSubmit={handleSubmit}>
      <form>
        <Name form={form} setForm={setForm} />
        <main className='grid grid-cols-12 my-4 gap-3'>
          <Color form={form} setForm={setForm} />
          <Font form={form} setForm={setForm} />
          <Website form={form} setForm={setForm} />
          <Social form={form} setForm={setForm} />
          <LightBackground form={form} setForm={setForm} />
          <DarkBackground form={form} setForm={setForm} />
          <Industry form={form} setForm={setForm} />
        </main>

        <div className='w-full flex justify-end items-center'>
          <button
            type='submit'
            className='bg-blue px-3 py-2 sm:py-5 sm:w-1/4 sm:text-lg rounded-lg text-white font-semibold'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBrand;
