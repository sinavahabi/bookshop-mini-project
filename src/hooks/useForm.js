import { useState } from 'react';

export function useForm() {
  const [form, setForm] = useState([
    {
      id: 1,
      name: 'fName',
      errorMessage: 'نام باید تنها شامل حروف فارسی بین 3 تا 15 حرف باشد!',
      errStatus: false,
      validation: /^[\u0600-\u06FF\s]{3,15}$/,
      isDone: false
    },
    {
      id: 2,
      name: 'lName',
      errorMessage: 'نام خانوادگی باید تنها شامل حروف فارسی بین 3 تا 25 حرف باشد!',
      errStatus: false,
      validation: /^[\u0600-\u06FF\s]{3,20}$/,
      isDone: false
    },
    {
      id: 3,
      name: 'phone',
      errorMessage: 'الگوی شماره تماس وارد شده صحیح نیست!',
      errStatus: false,
      validation: /^\d{10}$/,
      isDone: false
    },
    {
      id: 4,
      name: 'pass',
      errorMessage: 'رمز کاربر باید بین 8 تا 16 حرف شامل حروف انگلیسی بزرگ و کوچک و عدد باشد!',
      errStatus: false,
      validation: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/,
      isDone: false
    },
    {
      id: 5,
      name: 'confirmPass',
      errorMessage: 'رمز کاربر باید بین 8 تا 16 حرف شامل حروف انگلیسی بزرگ و کوچک و عدد باشد!',
      errStatus: false,
      validation: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/,
      isDone: false
    }
  ]);

  const handleChangePassForm = () => {
    form[2].isDone = false;
    form[3].isDone = false;
    form[3].errStatus = false;
    form[4].isDone = false;
    form[4].errStatus = false;
  }

  const formValidation = (inputRef) => {
    const inputIndex = form.findIndex((item) => item.name === inputRef.current.name);
    const updatedForm = [...form];

    if (form[inputIndex].validation.test(inputRef.current.value)) {
      updatedForm[inputIndex] = { ...form[inputIndex], errStatus: false, isDone: true };
    } else {
      updatedForm[inputIndex] = { ...form[inputIndex], errStatus: true, isDone: false };
    }

    setForm(updatedForm);
  };

  return { form, formValidation, handleChangePassForm }
}