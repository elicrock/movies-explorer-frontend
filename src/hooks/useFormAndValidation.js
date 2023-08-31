import { useState, useCallback } from 'react';

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_]+\.[a-z]{2,6}$/i;
  const nameRegex = /^[A-Za-zА-Яа-я\s-]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setErrors({ ...errors, [name]: e.target.validationMessage || 'Введите корректный email: example@example.ru'});
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    } else if (name === 'name') {
      if (!nameRegex.test(value)) {
        setErrors({ ...errors, [name]: e.target.validationMessage || 'Поле должно содержать только латиницу, кириллицу, пробел или дефис.'});
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    } else {
      setErrors({ ...errors, [name]: e.target.validationMessage });
    }
    // setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}