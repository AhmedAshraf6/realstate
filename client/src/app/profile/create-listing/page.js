'use client';
import {
  ButtonSubmit,
  InputField,
  Loading,
  TextArea,
  Title,
} from '@/components';
import customFetch, {
  checkForUnauthorizedResponse,
  domainUrl,
} from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function CreateListing() {
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    regularPrice: 50,
    discountedPrice: 0,
    bedrooms: 1,
    bathrooms: 1,
    type: 'rent',
    furnished: false,
    parking: false,
    offer: false,
  });
  const [files, setFiles] = useState({});
  const router = useRouter();
  // handle change inputs
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (name === 'sale' || name === 'rent') {
      setFormData({
        ...formData,
        type: name,
      });
    }
    if (name === 'furnished' || name === 'parking' || name === 'offer') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    }
    if (type === 'number' || type === 'text' || type === 'textarea') {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  // handle change images
  const handleUploadImages = (e) => {
    if (
      Object.keys(files).length > 0 &&
      Object.keys(files).length + formData.imageUrls.length < 7
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
  // handle change images
  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.description ||
      !formData.address ||
      !formData.regularPrice ||
      !formData.bedrooms ||
      !formData.bathrooms
    ) {
      return toast.error('please fill out all fields');
    }
    if (formData.imageUrls.length < 1) {
      return toast.error('please upload at least one image');
    }
    if (+formData.regularPrice < +formData.discountedPrice) {
      return toast.error('Discount price must be lower than regular price');
    }
    AddListing(formData);
  };
  // Upload Image functionality
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
        imageUrls: [...formData.imageUrls, ...data.images],
      });
      setFiles({});
    },
    onError: (error) => {
      checkForUnauthorizedResponse({ error, dispatch, router });
    },
  });
  // Add Listing functionality
  const { isLoading: isLoadingAddListing, mutate: AddListing } = useMutation({
    mutationFn: async (addListingData) => {
      const { data } = await customFetch.post('/listing', addListingData);
      return data;
    },
    onSuccess: (data) => {
      router.push(`/listings/${data.listing._id}`);
      toast.success('List added Successfully');
    },
    onError: (error) => {
      checkForUnauthorizedResponse({ error, dispatch, router });
    },
  });

  return (
    <div className='align-element mt-10 sm:mt-24 '>
      <Title title='اضافة عقار' center='text-center' />
      <form
        onSubmit={handleSubmit}
        className='grid md:grid-cols-2 gap-4 md:gap-6'
      >
        <div className='flex flex-col gap-y-4 sm:gap-y-6'>
          <InputField
            placeHolder='اسم العقار'
            type='text'
            name='name'
            handleChange={handleChange}
            minLength='3'
            maxLength='50'
            value={formData.name}
            required='required'
          />
          <TextArea
            placeHolder='الوصف'
            name='description'
            handleChange={handleChange}
            minLength='3'
            maxLength='500'
            value={formData.description}
            required='required'
          />
          <InputField
            placeHolder='العنوان بالتفصيل'
            type='text'
            name='address'
            handleChange={handleChange}
            minLength='3'
            maxLength='500'
            value={formData.address}
            required='required'
          />
          <div className='flex flex-wrap gap-6'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='checkbox'
                name='sale'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>بيع</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='checkbox'
                name='rent'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>ايجار</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='checkbox'
                name='parking'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>ركن للعربيات</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='checkbox'
                name='furnished'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>مفروشة</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='checkbox'
                name='offer'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>عرض</span>
            </div>
          </div>

          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-2'>
              <InputField
                type='number'
                name='bedrooms'
                handleChange={handleChange}
                value={formData.bedrooms}
                min='1'
                max='10'
              />
              <span>الغرف</span>
            </div>
            <div className='flex items-center gap-2'>
              <InputField
                type='number'
                name='bathrooms'
                handleChange={handleChange}
                value={formData.bathrooms}
                min='1'
                max='10'
              />
              <span>دورة مياة</span>
            </div>
          </div>
          <div className='flex flex-col items-start gap-4 md:gap-6'>
            <div className='flex  items-center flex-wrap sm:flex-nowrap gap-2 '>
              <InputField
                type='number'
                name='regularPrice'
                handleChange={handleChange}
                value={formData.regularPrice}
                min='50'
                max='1000000000'
              />
              <div className='whitespace-nowrap'>
                <h2>السعر الأساسي</h2>
                <span className='text-xs font-semibold'>(جنيه / شهر)</span>
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2 flex-wrap sm:flex-nowrap '>
                <InputField
                  type='number'
                  name='discountedPrice'
                  handleChange={handleChange}
                  value={formData.discountedPrice}
                  min='0'
                  max='1000000000'
                />
                <div className='whitespace-nowrap'>
                  <h2>السعر المخفض</h2>
                  <span className='text-xs font-semibold'>(جنيه/ شهر)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-y-4  sm:gap-y-6'>
          <h2>
            <span className='font-semibold '>الصور:</span>
            <span className='text-neutral-content mx-2'>
              أول صورة هتكون الغلاف وأقصي عدد من الصور (6)
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
                'رفع'
              )}
            </button>
          </div>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((image, index) => (
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
                    handleDeleteImage(index);
                  }}
                >
                  حذف
                </span>
              </div>
            ))}
          <ButtonSubmit
            button='اضافة عقار'
            isLoading={isLoadingAddListing || isLoadingUploadImages}
          />
        </div>
      </form>
    </div>
  );
}
