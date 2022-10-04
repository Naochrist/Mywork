import validator from 'email-validator';
import { createReadStream, createWriteStream } from 'fs';

/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
function validateEmailAddresses(inputPath: string[], outputFile: string) {
  const readStream = createReadStream(inputPath[0], 'utf8');

  let emailData = '';
  const validEmails = ['Emails'];

  readStream.on('data', (chunk: string) => {
    emailData += chunk;
  });

  readStream.on('end', () => {
    const emails = emailData
      .split('\n')
      .filter((emails) => emails !== 'Emails' && emails !== '');

    emails.forEach((email) => {
      validator.validate(email) ? validEmails.push(email) : null;
    });

    const output = validEmails.join('\n');
    const writeStream = createWriteStream(outputFile);
    writeStream.write(output);
    console.log("checking ");
    
  });
}

export default validateEmailAddresses;
