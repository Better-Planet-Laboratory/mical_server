/**
 * This file acts as a script which converts yields.csv to yields.json file.
 */
const CSVToJSON = require('csvtojson');
const fs = require('fs');

const yieldCSVPath: string = 'parsingFiles/yields.csv';
const interventionCSVPath: string = 'parsingFiles/intervention.csv';

interface JSONType {
  [key: string]: any;
}

let interventionMap: JSONType = {};
let converter = CSVToJSON()

// Script that converts yields.csv to yields.json with proper headers
converter.fromFile(yieldCSVPath)
    .then((yields: any) => {
      let jsonArray = [];
      for (let yield of yields) {
        let jsonObj:JSONType = {};
        let coordsObj:JSONType = {};

        coordsObj['type'] = 'Point';
        coordsObj['coordinates'] = [Number(yield.x), Number(yield.y)];
        jsonObj['coords'] = coordsObj;
        jsonObj['location'] = yield.location;
        jsonObj['effectSize'] = Number(yield.effectSize);
        jsonObj['sampleSize'] = Number(yield.sampleSize);
        jsonObj['country'] = yield.country;
        jsonObj['interventionType'] = Number(yield.key) 

        let filterObj:JSONType = {};
        filterObj['author'] = yield.author;
        filterObj['crop'] = yield.crop;
        filterObj['intercrops'] = yield.intercrops;
        filterObj['duration'] = yield.duration;
        filterObj['soil'] = yield.soil;
        filterObj['climate'] = yield.climate;
        jsonObj['filterCols'] = filterObj;
        jsonArray.push(jsonObj);
      }

      fs.writeFile('parsingFiles/yields.json', JSON.stringify(jsonArray), ((err: any) => {
        console.log('parsing')
        if (err) {
          console.log('Error creating yields.json ' + err);
        } else {
          console.log('Output saved to parsingFiles/yields.json.');
        }
      }));
    }).catch((err: any) => {
      console.log('error occured at: ' + err);
    });