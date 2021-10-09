import { APPLICATION_NAVIGATION } from './applicationNavigation';

export const SERVICES = [
  {
    name: 'Account Setting',
    screen: APPLICATION_NAVIGATION.UPDATE_ACCOUNT_SCREEN,
    icon: require('../assets/media/icons/account.png'),
    arrow: require('../assets/media/icons/arrow.png'),
  },
  {
    name: 'Profile Setting',
    screen: APPLICATION_NAVIGATION.CREATE_PROFILE_SCREEN,
    icon: require('../assets/media/icons/profile.png'),
    arrow: require('../assets/media/icons/arrow.png'),
  },
  {
    name: 'Pending Requests',
    screen: APPLICATION_NAVIGATION.PENDING_REQUEST_SCREEN,
    icon: require('../assets/media/icons/request.png'),
    arrow: require('../assets/media/icons/arrow.png'),
  },
  {
    name: 'My Schedules',
    screen: APPLICATION_NAVIGATION.SCHEDULE_ACCEPTED_SCREEN,
    icon: require('../assets/media/icons/schedule.png'),
    arrow: require('../assets/media/icons/arrow.png'),
  },
  {
    name: 'Wallet Details',
    screen: APPLICATION_NAVIGATION.WALLET_SCREEN,
    icon: require('../assets/media/icons/wallet.png'),
    arrow: require('../assets/media/icons/arrow.png'),
  },
  {
    name: 'Logout',
    screen: '',
    icon: require('../assets/media/icons/logout.png'),
    arrow: require('../assets/media/icons/arrow.png'),
  },
];

export const USER_ROLES = {
  DOCTOR: 1,
  PHARMACIST: 2,
  XRAY_TECHNICIAN: 3,
  NONE: 4,
};

export const USER_TYPES = [
  { value: '', type: 'select your profession' },
  { value: USER_ROLES.DOCTOR, type: 'I am a Doctor.' },
  { value: USER_ROLES.PHARMACIST, type: 'I am a Pharmacist.' },
  { value: USER_ROLES.XRAY_TECHNICIAN, type: 'I am a X-Ray Technician.' },
  { value: USER_ROLES.NONE, type: 'I am none of the above.' },
];

export const PROFESSIONS = [
  { icon: require('../assets/media/icons/doctor-male.png'), type: USER_ROLES.DOCTOR, value: 'Doctor' },
  {
    icon: require('../assets/media/icons/user-x-ray.png'),
    type: USER_ROLES.XRAY_TECHNICIAN,
    value: 'X-Ray Technician',
  },
  { icon: require('../assets/media/icons/pharmacy.png'), type: USER_ROLES.PHARMACIST, value: 'Pharmacist' },
];

export const DEFAULT = {
  COINS: 100,
};

export const ACCOUNT_STATUS = {
  PENDING: 'pending',
  COMPLETE: 'complete',
};

export const FOLDER = {
  AVATAR: 'avatars',
};

export const FORM = {
  ERROR: {
    EMAIL: 'Email is Required.',
    VALID_EMAIL: 'Email is not valid.',
    PASSWORD: 'Password is Required.',
    VALID_PASSWORD: 'Password must be 2 to 6 characters (only Alphanumerics).',
    FULLNAME: 'Fullname is Required.',
    AVATAR: 'Avatar is Required.',
    PROFESSION: 'Profession is Required.',
    SPECALIZATION: 'Specalization is Required.',
    EXPERIENCE: 'Experience is Required.',
    DESCRIPTION: 'Description is Required.',
    DESCRIPTION_LENGTH: 'Please write more for better solution...',
    AMOUNT: 'Amount is Required.',
    AMOUNT_LESS: 'Amount not be less than 30',
    BALANCE_LESS: 'Your Balance is less.',
    DATE: 'Date is required',
    TIME: 'Time is required',
    COINS_LESS: 'Choose coins more than 0',
    PAYMENT_USER_DETAILS: 'Please enter Complete card details and Card holder name',
    PAYMENT_FAILED: 'Payment Failed',
  },

  STATUS: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
  },

  SUCCESS: {
    LOGIN: 'Login Successfully',
    LOGOUT: 'Logout Successfully',
    REGISTER: 'Register Successfully',
    PROFILE: 'Profile Created Successfully',
    UPDATE_ACCOUNT: 'Account Updated Successfully',
    EMAIL_SENT: 'Email Sent Successfully',
    UPDATE_PROFILE: 'Profile Updated Successfully',
    REQUEST: 'Schedule Requested Successfully',
    REQUEST_ACCEPT: 'Request Accepted Successfully',
    REQUEST_DELETE: 'Request Deleted Successfully',
    REQUEST_RESCHEDULE: 'Request Rescheduled Successfully',
    PROFILE_UP_VOTE: 'Profile Up Voted Successfully',
    PROFILE_DOWN_VOTE: 'Profile Down Voted Successfully',
    PAYMENT_ACCEPT: 'Payment Accepted Successfully',
  },
};
export const ACTION_TYPE = {
  ACCEPT: 'ACCEPT',
  CANCEL: 'CANCEL',
};

export const BUY_COINS = [
  { value: 0, text: '0' },
  { value: 20, text: '20' },
  { value: 50, text: '50' },
  { value: 80, text: '80' },
  { value: 100, text: '100' },
];
