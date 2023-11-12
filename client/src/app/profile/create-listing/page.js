'use client';
import { ButtonSubmit, InputField, TextArea, Title } from '@/components';
import customFetch, {
  checkForUnauthorizedResponse,
  domainUrl,
} from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function CreateListing() {
  const [formData, setFormData] = useState({
    images: [],
  });
  const [files, setFiles] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const {
    isLoading: isLoadingUploadImages,
    data,
    mutate: uploadImages,
  } = useMutation({
    mutationFn: async (tempImages) => {
      const { data } = await customFetch.post(
        '/listing/uploadListingImages',
        tempImages
      );
      return data;
    },
    onSuccess: (data) => {
      setFormData({
        ...formData,
        images: [...formData.images, ...data.images],
      });
      setFiles({});
    },
    onError: (error) => {
      checkForUnauthorizedResponse({ error, dispatch, router });
    },
  });

  const handleUploadImages = (e) => {
    if (
      Object.keys(files).length > 0 &&
      Object.keys(files).length + formData.images.length < 7
    ) {
      const data = new FormData();
      [...files].forEach((file, i) => {
        data.append(`file-${i}`, file, file.name);
      });
      uploadImages(data);
    } else {
      toast.error('images must be less than 7 images');
    }
  };

  return (
    <div className='align-element mt-10 sm:mt-24 '>
      <Title title='Create Listing' center='text-center' />
      <form className='grid md:grid-cols-2 gap-4 md:gap-6'>
        <div className='flex flex-col gap-y-4 sm:gap-y-6'>
          <InputField
            placeHolder='Name'
            type='text'
            name='name'
            handleChange={handleChange}
            minLength='3'
            maxLength='50'
          />
          <TextArea
            placeHolder='Description'
            name='description'
            handleChange={handleChange}
            minLength='3'
            maxLength='500'
          />
          <InputField
            placeHolder='Address'
            type='text'
            name='address'
            handleChange={handleChange}
            minLength='3'
            maxLength='500'
          />
          <input type='checkbox' className='checkbox' name='type' />
          <input type='checkbox' className='checkbox' name='type' />

          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-2'>
              <InputField
                type='number'
                name='beds'
                handleChange={handleChange}
                defaultValue='1'
                min='1'
                max='10'
              />
              <span>Beds</span>
            </div>
            <div className='flex items-center gap-2'>
              <InputField
                type='number'
                name='baths'
                handleChange={handleChange}
                defaultValue='1'
                min='1'
                max='10'
              />
              <span>Baths</span>
            </div>
          </div>
          <div className='flex flex-col items-start gap-4 md:gap-6'>
            <div className='flex  items-center flex-wrap sm:flex-nowrap gap-2 '>
              <InputField
                type='number'
                name='regularPrice'
                handleChange={handleChange}
                defaultValue='0'
                min='50'
                max='1000000000'
              />
              <div className='whitespace-nowrap'>
                <h2>Regular Price</h2>
                <span className='text-xs font-semibold'>($ / month)</span>
              </div>
            </div>
            <div className='flex items-center gap-2 flex-wrap sm:flex-nowrap '>
              <InputField
                type='number'
                name='discountedPrice'
                handleChange={handleChange}
                defaultValue='0'
                min='50'
                max='1000000000'
              />
              <div className='whitespace-nowrap'>
                <h2 className=''>Discounted Price</h2>
                <span className='text-xs font-semibold'>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-y-4  sm:gap-y-6'>
          <h2>
            <span className='font-semibold '>Images:</span>
            <span className='text-neutral-content mx-2'>
              The first image will be the cover max (6)
            </span>
          </h2>
          <div className='flex flex-wrap sm:flex-nowrap gap-3'>
            <input
              type='file'
              className='file-input file-input-bordered w-full file-input-sm sm:file-input-md'
              accept='image/*'
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              className='btn btn-outline btn-accent  btn-sm sm:btn-md'
              type='button'
              onClick={handleUploadImages}
              disabled={isLoadingUploadImages}
            >
              {isLoadingUploadImages ? (
                <span className='loading loading-spinner loading-sm'></span>
              ) : (
                'Upload'
              )}
            </button>
          </div>
          {formData.images.length > 0 &&
            formData.images.map((image, index) => (
              <div
                className='flex justify-between gap-3 items-center border-2 border-base-300 p-3'
                key={index}
              >
                <Image
                  src={`${domainUrl + image}`}
                  alt='image'
                  key={index}
                  className='w-20 h-20 object-cover'
                  width={500}
                  height={500}
                  placeholder='blur'
                  blurDataURL='/spinner.svg'
                />
                <span
                  className='text-error font-semibold cursor-pointer'
                  onClick={() => {
                    setFormData({
                      ...formData,
                      images: formData.images.filter((_, i) => i !== index),
                    });
                  }}
                >
                  delete
                </span>
              </div>
            ))}
          <ButtonSubmit button='Create Listing' />
        </div>
      </form>
    </div>
  );
}
