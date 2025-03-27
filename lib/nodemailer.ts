import nodemailer from 'nodemailer';
const email = process.env.GMAIL;
const password = process.env.GMAIL_PASSWORD;
import dns from 'dns';
import { Address } from 'nodemailer/lib/mailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password
  }
});

export function checkDomainMx(
  email: string | Address | (string | Address)[] | undefined
) {
  return new Promise((resolve, reject) => {
    if (!email) {
      reject('Invalid email');
    }
    const domain = email?.toString().split('@')[1] || '';
    dns.resolveMx(domain, (err, addresses) => {
      if (err) {
        reject('Invalid domain');
      } else if (addresses && addresses.length > 0) {
        resolve('Valid domain with MX records');
      } else {
        reject('No MX records found');
      }
    });
  });
}
