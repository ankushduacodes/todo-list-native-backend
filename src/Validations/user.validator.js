import { check } from 'express-validator';

export const firstNameValidator = check('firstName').trim().escape().notEmpty()
  .isLength({
    min: 2,
    max: 100,
  })
  .matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]+$/);
export const lastNameValidator = check('lastName').trim().escape().notEmpty()
  .isLength({
    min: 2,
    max: 100,
  })
  .matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]+$/);
export const emailValidator = check('email').trim().escape().notEmpty()
  .normalizeEmail()
  .isEmail();
export const passwordValidator = check('password').trim().notEmpty().isLength({
  min: 8,
})
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i');
