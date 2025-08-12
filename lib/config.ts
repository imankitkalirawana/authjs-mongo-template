export const APP_INFO = {
  name: 'NextAuth Template',
  description:
    'A template for Next.js 14.2+ with Auth.js and MongoDB with Heorui',
  email: process.env.GMAIL || '',
  url: process.env.NEXTAUTH_URL || ''
};

export const WEBSITE_SETTING = {
  status: {
    maintainance: false,
    registration: true,
    login: true,
    email: false
  },
  appearance: {
    theme: 'light',
    logo: '/images/logo.png'
  }
};
