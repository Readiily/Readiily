import { useState } from "react";
// Icons
import { CancelIcon, UploadIcon } from "../../../../../assets/icons";
// Toastify
import { toast } from "react-toastify";
// Redux
import { useSelector } from "react-redux";

const Post = ({ setIsPostOpen, form, setForm }) => {
  const { brands, currentBrand } = useSelector((store) => store.brand);
  const [inputKey, setInputKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { desc, imageFile, date } = form;
    const formData = new FormData();
    if (!desc) {
      toast.info("Please provide a description");
      return;
    }
    if (!date) {
      toast.error("Please provide a schedule date");
      return;
    }
    if (brands && brands.nb < 1) {
      toast.info("Please create a brand");
      return;
    }
    if (!currentBrand) {
      toast.error("No Brand selected");
      return;
    }
    formData.append("desc", desc);
    formData.append("imageFile", imageFile);
    formData.append("brand", currentBrand.id);
    formData.append("date", date);
    // Append date

    console.log({ desc, imageFile, date, currentBrand });
  };

  const handleFont = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (file.size > 3145728) {
      toast.error("Image size must not be more than 3MB");
      return;
    }
    setForm({ ...form, imageFile: file });
  };

  return (
    <div className='fixed bg-slate-200 z-40 -top-24 left-1/2 right-1/2 -translate-x-1/2 translate-y-1/2 w-full sm:w-3/4 md:w-1/2 h-4/5 border border-black'>
      <h3
        className='flex justify-end items-center w-full'
        onClick={() => setIsPostOpen(false)}
      >
        <CancelIcon className='w-6 h-6 bg-red-400 rounded-full p-1 m-2' />
      </h3>
      <form className='p-1 sm:p-2' onSubmit={handleSubmit}>
        <h1 className='text-lg font-semibold sm:text-xl sm:my-2'>
          What to you intend to post today?
        </h1>
        <textarea
          className='w-11/12 mb-4 resize-y bg-transparent border border-black rounded-md outline-none p-2'
          rows={4}
          placeholder='Description'
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          value={form.desc}
        ></textarea>

        <h2 className='text-base sm:text-lg underline underline-offset-4'>
          Additional Information
        </h2>
        <div>
          <div className='w-32 h-32 rounded-md bg-transparent border border-black cursor-pointer'>
            <input
              type='file'
              key={inputKey}
              onChange={handleFont}
              className='hidden'
              accept='image/*'
              id='addimage'
            />
            <label htmlFor='addimage' className='w-full text-center'>
              {form.imageFile ? (
                <>
                  <span className='overflow-hidden text-ellipsis flex flex-col justify-center items-center mt-2'>
                    <span>
                      {form.imageFile.name.slice(0, 10) || "Upload font (.ttf)"}
                    </span>
                    <span className='font-semibold text-black ml-2'>
                      {form.imageFile &&
                        (form.imageFile.size / (1024 * 1024)).toFixed(2) + "MB"}
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <h2>Prefered</h2>
                  <h3>Main Image</h3>
                </>
              )}

              <UploadIcon className='w-6 h-6 mx-auto mt-3' />
            </label>
            <div className='w-full flex justify-end items-center'>
              {form.imageFile && (
                <button
                  type='button'
                  onClick={(e) => {
                    let randomString = Math.random().toString(36);
                    setInputKey(randomString);
                    setForm({ ...form, imageFile: null });
                  }}
                >
                  <CancelIcon className='w-5 h-5 bg-secondary rounded-full p-0.5 font-bold text-white stroke-2' />
                </button>
              )}
            </div>
          </div>
          <div className='w-full flex justify-end items-center'>
            <button
              className='px-3 py-2 bg-sky-500 rounded-3xl font-semibold hover:opacity-50 text-white text-sm'
              type='submit'
            >
              Confirm Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Post;
