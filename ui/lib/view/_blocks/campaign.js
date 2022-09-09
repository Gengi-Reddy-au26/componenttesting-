import s from './campaign.module.scss';
import Moment from 'moment';

const CONSTANTS={
  test:0
}

let industryOptions=[
  { value: 'fashion', label: 'Fashion' },
  { value: 'food', label: 'Food' },
  { value: 'sports', label: 'Sports' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'technology', label: 'Technology' },
  { value: 'health', label: 'Health' },
  { value: 'education', label: 'Education' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'electronics', label: 'Electronics' }
]
let followersOptions=[
  { value: '100', label: '100+' },
  { value: '200', label: '200+' },
  { value: '300', label: '300+' },
  { value: '500', label: '500+' },
  { value: '1000', label: '1,000+' },
  { value: '5000', label: '5,000+' },
  { value: '10000', label: '10,000+' },
  { value: '50000', label: '50,000+' },
  { value: '100000', label: '100,000+' }
]
let regionOptions=[
  { value: 'india', label: 'India' },
  { value: 'uk', label: 'UK' },
  { value: 'us', label: 'US' },
  { value: 'spain', label: 'Spain' }
]
let genderOptionsSingle=[
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
]
let genderOptions=[
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
]
let ageGroupOptions=[
  { value: 'g15-24', label: '15 - 24' },
  { value: 'g25-34', label: '25 - 34' },
  { value: 'g35-44', label: '35 - 44' },
  { value: 'g45-54', label: '45 - 54' },
  { value: 'g55-64', label: '55 - 64' },
]
let verifiedOptions=[
  { value: true, label: 'Verified' },
  { value: false, label: 'Not Verified' }
]

export {
  CONSTANTS,
  regionOptions,
  industryOptions,
  genderOptionsSingle,
  genderOptions,
  ageGroupOptions,
  verifiedOptions,
  followersOptions
}
