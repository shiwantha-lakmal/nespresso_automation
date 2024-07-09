import fs from 'fs';
import path from 'path';

const getDataFromFiles = (dir, filePattern) => {
  const fileNames = fs.readdirSync(dir).filter((file) => file.match(filePattern));
  const data = [];
  fileNames.forEach((fileName) => {
    const rawContent = fs.readFileSync(`${dir}/${fileName}`);
    if (rawContent.length !== 0) {
      data.push(JSON.parse(rawContent));
    }
  });
  return data;
};

const mergeData = (rawData) => {
  let mergedResults = [];
  rawData.forEach((data) => mergedResults.push(...data));
  return mergedResults;
};

const writeJsonFile = (dir, mergedResults, fileName) => {
  const filePath = path.join(dir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(mergedResults));
};

/**
 * Returns merged test results (JSON format) and if customFileName is passed then creates merged results file.
 *
 * @param dir
 * @param filePattern
 * @param customFileName - OPTIONAL - if passed, then aggregated results file will be created
 */
const mergeResults = (dir, filePattern, customFileName = '') => {
  const rawData = getDataFromFiles(dir, filePattern);
  const mergedResults = mergeData(rawData);
  if (customFileName) {
    writeJsonFile(dir, mergedResults, customFileName);
  }
  return mergedResults;
};

export default mergeResults;
