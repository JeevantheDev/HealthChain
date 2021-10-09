import { FORM } from './constant';

const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const PASSWORD_REGEX = /^([a-zA-Z0-9]{2,6})$/;

export const ACCOUNT = {
  validAvatar: (avatar) => {
    if (!avatar) return FORM.ERROR.AVATAR;
  },

  validFullName: (name) => {
    if (!name) return FORM.ERROR.FULLNAME;
  },

  validEmail: (email) => {
    if (!email) return FORM.ERROR.EMAIL;
    if (!EMAIL_REGEX.test(email)) return FORM.ERROR.VALID_EMAIL;
  },

  validPassword: (password) => {
    if (!password) return FORM.ERROR.PASSWORD;
    if (!PASSWORD_REGEX.test(password)) return FORM.ERROR.VALID_PASSWORD;
  },

  validProfession: (profession) => {
    if (!profession) return FORM.ERROR.PROFESSION;
  },

  validSpecalization: (specalization) => {
    if (!specalization) return FORM.ERROR.SPECALIZATION;
  },

  validExperience: (experience) => {
    if (!experience) return FORM.ERROR.EXPERIENCE;
  },

  validDescription: (description) => {
    if (!description) return FORM.ERROR.DESCRIPTION;
    if (description.length < 50) return FORM.ERROR.DESCRIPTION_LENGTH;
  },

  validAmount: (amount, balance) => {
    if (!amount) return FORM.ERROR.AMOUNT;
    if (parseInt(amount) < 30) return FORM.ERROR.AMOUNT_LESS;
    if (parseInt(balance) < 0) return FORM.ERROR.BALANCE_LESS;
  },

  validDate: (date) => {
    if (!date) return FORM.ERROR.DATE;
  },
  validTime: (time) => {
    if (!time) return FORM.ERROR.TIME;
  },
};
