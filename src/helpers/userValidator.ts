import Joi from "joi";
import { IUser } from "../interface/userInterface";

export const validateUserSignUp = (
  userData: Omit<IUser, "_id" | "wallet">
) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(40)
      .pattern(new RegExp("^[a-zA-Z-]+$"))
      .required()
      .messages({
        "string.base": "firstName must be string",
        "string.empty": "First name field is required",
        "string.min":
          "First Name can not be less than three alphabetical characters",
        "string.max":
          "First Name can not be more than forty alphabetical characters",
        "any.required": "firstName field is required",
        "string.pattern.base": "First name can only be alpahebtical characters",
      }),
    lastName: Joi.string()
      .min(3)
      .max(40)
      .pattern(new RegExp("^[a-zA-Z-]+$"))
      .required()
      .messages({
        "string.base": "lastName must be string",
        "string.empty": "Last name field is required",
        "string.min":
          "Last Name can not be less than three alphabetical characters",
        "string.max":
          "Last Name can not be more than forty alphabetical characters",
        "any.required": "lastName field is required",
        "string.pattern.base": "Last name can only be alpahebtical characters",
      }),
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.email": "Not a valid email",
      "string.base": "Not a valid email",
      "string.empty": "Email field is required",
      "any.required": "Email field is required",
    }),
    password: Joi.string().min(3).max(225).required().messages({
      "string.min": "Password can not be less than three characters",
      "string.empty": "Password can not be empty",
    }),
    // confirmPassword: Joi.string()
    //   .valid(Joi.ref("password"))
    //   .required()
    //   .messages({
    //     "any.only": "passwords do not match",
    //     "any.required": "Confirm Password field is required",
    //   }),
  });

  return schema.validate(userData);
};

export const validateUserLogin = (userData: Pick<IUser, "email" | "password">) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.email": "Not a valid email",
      "string.base": "Not a valid email",
      "string.empty": "Email field is required",
      "any.required": "Email field is required"
    }),
    password: Joi.string().min(3).max(225).required().messages({
      'string.min': 'password can not be less than three characters',
      "any.required": "password field is required"
    }),
  });

  return schema.validate(userData);
};

// // export const validateUserEdit = (userData) => {
// //   const schema = Joi.object({
// //     firstName: Joi.string().min(3).max(40).pattern(new RegExp("^[a-zA-Z-]+$")).required().messages({
// //       "string.base": "firstName must be string",
// //       "string.empty": "First name field is required",
// //       "string.min": "First Name can not be less than three alphabetical characters",
// //       "string.max": "First Name can not be more than forty alphabetical characters",
// //       "any.required": "firstName field is required",
// //       "string.pattern.base": "First name can only be alpahebtical characters"
// //   }),
// //     lastName: Joi.string().min(3).max(40).pattern(new RegExp("^[a-zA-Z-]+$")).required().messages({
// //       "string.base": "lastName must be string",
// //       "string.empty": "Last name field is required",
// //       "string.min": "Last Name can not be less than three alphabetical characters",
// //       "string.max": "Last Name can not be more than forty alphabetical characters",
// //       "any.required": "lastName field is required",
// //       "string.pattern.base": "Last name can only be alpahebtical characters"
// //   }),
// //     middleName:  Joi.string().min(3).max(40).pattern(new RegExp("^[a-zA-Z-]+$")).required().messages({
// //       "string.base": "middleName must be string",
// //       "string.empty": "Middle name field is required",
// //       "string.min": "Middle Name can not be less than three alphabetical characters",
// //       "string.max": "Middle Name can not be more than forty alphabetical characters",
// //       "any.required": "middleName field is required",
// //       "string.pattern.base": "Middle name can only be alpahebtical characters"
// //   }),
// //   phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{11}$")).required().messages({
// //     'string.pattern.base': 'Phone number must have 11 digits.',
// //     'any.required': 'phoneNumber field is required'
// //   }),
// //   email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
// //     "string.email": "Not a valid email",
// //     "string.base": "Not a valid email",
// //     "string.empty": "Email field is required",
// //     "any.required": "Email field is required"
// //   }),
// //   designation: Joi.string().required().messages({
// //     "any.required": "designation field is required",
// //     "string.empty": "Designation can not be empty"
// //   })
// //   });

// //   return schema.validate(userData);
// // };
// // export const validateProfileUpdate = (userData) => {
// //   const schema = Joi.object({
// //     phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{11}$")).required().messages({
// //       'string.pattern.base': 'Phone number must have 11 digits.',
// //       'any.required': 'phoneNumber field is required'
// //     }),
// //     email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
// //       "string.email": "Not a valid email",
// //       "string.base": "Not a valid email",
// //       "string.empty": "Email field is required",
// //       "any.required": "Email field is required"
// //     })
// //   });

// //   return schema.validate(userData);
// // }

// // export const validateAdminCreation = (userData) => {
// //   const schema = Joi.object({
// //     email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
// //       "string.email": "Not a valid email",
// //       "string.base": "Not a valid email",
// //       "string.empty": "Email field is required",
// //       "any.required": "Email field is required"
// //     }),
// //     password: Joi.string().min(3).max(225).required().messages({
// //       'string.min': 'password can not be less than three characters',
// //       "any.required": "password field is required",
// //       "string.empty": "password field is required",
// //     }),
// //     confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
// //       'any.only': 'Passwords do not match',
// //       "any.required": "Confirm Password field is required",
// //       "string.empty": "Confirm password field is required",
// //     }),
// //     designation: Joi.string().required().messages({
// //       "any.required": "designation field is required",
// //       "string.empty": "designation field is required",
// //     }),
// //     joinedDate: Joi.date().max("now").required().messages({
// //       "date.base": "Not a valid date",
// //       "any.required": "Joined Date is required",
// //       "date.max":  "start date  must be less than or equal to today"
// //     })
// //   });

// //   return schema.validate(userData);
// // };

// // export const validateChangePassword = (userData) => {
// //   const schema = Joi.object({
// //     password: Joi.string().min(3).max(225).required().messages({
// //       'string.min': 'Password can not be less than three characters',
// //       'string.empty': 'Password can not be empty',
// //       'any.required': 'Password is required'
// //     }),
// //     confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
// //       'any.only': 'passwords do not match',
// //       'any.required': 'Confirm Password is required'
// //     }),
// //     currentPassword: Joi.string()
// //   });
// //   return schema.validate(userData);
// // }

// module.exports = validators;
