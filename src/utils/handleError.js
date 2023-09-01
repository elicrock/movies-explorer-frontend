import { BAD_REQUEST, UNAUTHORIZED, CONFLICT, INTERNAL_SERVER_ERROR } from './constants';

export const handleError = (err, errorVariable, authForm) => {
  if (err.status === UNAUTHORIZED) {
    errorVariable(authForm === 'login'
      ? 'Вы ввели неправильный логин или пароль.'
      : 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
  } else if (err.status === BAD_REQUEST) {
    errorVariable(authForm === 'login'
      ? 'При авторизации произошла ошибка. Переданный токен некорректен.'
      : 'При регистрации пользователя произошла ошибка.');
  }  else if (err.status === CONFLICT) {
    errorVariable('Пользователь с таким email уже существует.');
  } else if (err.status === INTERNAL_SERVER_ERROR) {
    errorVariable('На сервере произошла ошибка.');
  } else {
    errorVariable('Произошла непредвиденная ошибка!');
  }
  setTimeout(() => {
    errorVariable('');
  }, 2000);
}