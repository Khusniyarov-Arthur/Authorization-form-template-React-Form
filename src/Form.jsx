import _ from './Form.module.css';
import {useForm} from 'react-hook-form';

export const Form = () => {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return(
    <form className={_.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={_.wrap}>
        <label className={_.label} htmlFor='email'>Email</label>
        <input
          className={_.input}
          type='text'
          id='email'
          {...register('email', {
            required: {
              value: true,
              message: 'Заполните поле',
            },
            pattern: {
              value: /^.+@.+\..+$/,
              message: 'Неверный Email',
            }
          })}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className={_.error}>{errors.email.message}</p>}
      </div>

      <div className={_.wrap}>
        <label className={_.label} htmlFor='password'>Пароль</label>
        <input className={_.input}
          type='password'
          id='password'
          {...register('password', {
            required: {
              value: true,
              message: 'Заполните поле',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
              message: 'Неверный пароль',
            }
          })}
          aria-invalid={!!errors.password}
        />
        {errors.password && <p className={_.error}>{errors.password.message}</p>}
      </div>

      <div className={_.wrapCheckbox}>
        <input className={_.checkbox}
        type='checkbox'
        id='save'
        {...register('save')}
        />
        <label className={_.labelCheckbox} htmlFor='save'>Сохранить пароль</label>
      </div>
        <button className={_.submit} type="submit">Войти</button>
    </form>
  )
}

// Вариант без библиотеки
// import {useState} from 'react';
// import _ from './Form.module.css';

// export const Form = () => {

//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState(false);
//   const [emailDirty, setEmailDirty] = useState(false);
//   const [password, setPassword] = useState('');
//   const [passwordError, setPasswordError] = useState(false);
//   const [passwordDirty, setPasswordDirty] = useState(false);
//   const [checkErrorForm, setCheckErrorForm] = useState(false);
//   const [save, setSave] = useState(false);
//   const [isPanding, setIsPanding] = useState(false);

//   const validEmail = (value) => {
//     setEmailError(/^.+@.+\..+$/.test(value));
//   }

//   const handleEmail = ({target}) => {
//     setEmail(target.value);
//     validEmail(target.value);
//   };

//   const validPassword = (value) => {
//     setPasswordError(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/.test(value));
//   }
  
//   const handlePassword = ({target}) => {
//     setPassword(target.value);
//     validPassword(target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!emailError || !passwordError) {
//       setCheckErrorForm(true)
//       return;
//     }

//     setIsPanding(true);
//     console.log({
//       email,
//       password,
//       save,
//     });
//   }

//   const handleSave = ({target}) => {
//     setSave(target.checked);
//   }

//   return(
//     <form className={_.form} onSubmit={handleSubmit}>
//       <div className={_.wrap}>
//         <label className={_.label} htmlFor='email'>Email</label>
//         <input
//           className={_.input}
//           type='text'
//           id='email'
//           name='email'
//           value={email}
//           onChange={handleEmail}
//           onBlur={() => {
//             setEmailDirty(true);
//           }}
//           disabled={isPanding}
//         />
//         {!emailError && emailDirty && (<p className={_.error}>Сообщение об ошибке</p>)}
//       </div>

//       <div className={_.wrap}>
//         <label className={_.label} htmlFor='password'>Пароль</label>
//         <input className={_.input}
//           type='password'
//           id='password'
//           name='password'
//           value={password}
//           onChange={handlePassword}
//           onBlur={() => {
//             setPasswordDirty(true);
//           }}
//           disabled={isPanding}
//         />
//         {!passwordError && passwordDirty && (<p className={_.error}>Сообщение об ошибке</p>)}
//       </div>

//       <div className={_.wrapCheckbox}>
//         <input className={_.checkbox}
//         type='checkbox'
//         id='save'
//         name='save'
//         onChange={handleSave}
//         checked={save}/>
//         <label className={_.labelCheckbox} htmlFor='save'>Сохранить пароль</label>
//       </div>

//       {isPanding ? (
//         <p className={_.pending}>Отправка</p>
//       ) : (
//         <button className={_.submit} type="submit">Войти</button>
//       )}

//       {checkErrorForm && (!passwordError || !emailError) && (
//         <p className={_.errorSubmit}>Сообщение об ошибке</p>
//       )}

//     </form>
//   )
// }