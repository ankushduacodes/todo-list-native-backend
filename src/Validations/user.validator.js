import { check } from 'express-validator';
import jwt from 'jsonwebtoken';

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
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'i');

// eslint-disable-next-line consistent-return
export default function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const authToken = authHeader && authHeader.split(' ')[1];
  if (!authToken) {
    return res.sendStatus(401);
  }
  jwt.verify(authToken, process.env.JWT_ACCESS_TOKEN, {}, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    return next();
  });
}
