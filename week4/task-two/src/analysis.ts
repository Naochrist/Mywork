import fs from 'fs';
const csv = require('csv-parser');
const results =[];



// import { createReadStream, writeFile } from 'fs';




import { createReadStream, createWriteStream } from 'fs';
import validator from 'email-validator';

/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
function analyseFiles(inputPaths: string[], outputPath: string) {
  const readStream = createReadStream(inputPaths[0], 'utf8');

  let emailData = '';

  readStream.on('data', (chunk: string) => {
    emailData += chunk;
  });

  readStream.on('end', () => {
    const validEmails: string[] = [];
    const validDomainArray: string[] = [];
    let emailArray: string[] = [];
    const totalEmailsParsedArr: string[] = [];
    const categories: { [key: string]: number } = {};

    interface resultObj {
      'valid-domains': string[];
      totalEmailsParsed: number;
      totalValidEmails: number;
      categories: { [key: string]: number };
    }

    emailArray = emailData.split('\n');

    for (const elem of emailArray) {
      if (elem !== 'Emails' && elem !== '') {
        totalEmailsParsedArr.push(elem);
        if (validator.validate(elem)) {
          validEmails.push(elem);

          const validDomain = elem.split('@');
          validDomainArray.push(validDomain[validDomain.length - 1]);
        }
      }
    }

    for (const elem of validDomainArray) {
      if (categories[elem]) {
        categories[elem]++;
      } else {
        categories[elem] = 1;
      }
    }

    const analysis: resultObj = {
      'valid-domains': Object.keys(categories),
      totalEmailsParsed: totalEmailsParsedArr.length,
      totalValidEmails: validEmails.length,
      categories,
    };

    const output = JSON.stringify(analysis);
    const writeStream = createWriteStream(outputPath);
    writeStream.write(output);
  });
}

export default analyseFiles;