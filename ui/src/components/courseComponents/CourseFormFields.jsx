import React from 'react';
import TextInput from './TextInput';
import TextareaInput from './TextareaInput';
import CustomDropdown from '../adminComponents/CustomDropdown';
import { categories } from '../sharedComponents/constants';

const CourseFormFields = ({ newCourse, handleInputChange, handleCategoryChange, errors }) => {
  const categoryOptions = categories.map(category => ({ value: category, label: category }));

  return (
    <>
      <div>
        <TextInput
          label="Course Name*"
          name="name"
          value={newCourse.name}
          onChange={handleInputChange}
          error={errors.name}
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold w-full">Category*</label>
        <CustomDropdown
          options={categoryOptions}
          selectedOption={newCourse.category}
          onOptionSelect={handleCategoryChange}
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>
      <div>
        <TextInput
          label="Teacher Name*"
          name="teacher"
          value={newCourse.teacher}
          onChange={handleInputChange}
          error={errors.teacher}
        />
      </div>
      <div>
        <TextInput
          label="Price*"
          name="price"
          type="number"
          value={newCourse.price}
          onChange={handleInputChange}
          error={errors.price}
        />
      </div>
      <div className="md:col-span-2 ">
        <TextareaInput
          label="Description*"
          name="description"
          value={newCourse.description}
          onChange={handleInputChange}
          error={errors.description}
        />
      </div>
    </>
  );
};

export default CourseFormFields;
