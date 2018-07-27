// from npm
var request = require('request');
var readlineSync = require('readline-sync');
// local
var utils = require('./utils');
var pagination = require('./pagination');
// vars
var PAGE_SIZE = 10;

request('http://data.sfgov.org/resource/bbb8-hzi6.json', (error, response, body) => {
  const foodTrucks = JSON.parse(body);
  const openFoodTrucks = utils.getOpenFoodTrucks(foodTrucks);
  promptPagination(openFoodTrucks, 1);
});

const displayResults = (openFoodTrucks, PAGE_SIZE, pageNumber) => {
  const totalPages = pagination.totalPages(openFoodTrucks.length, PAGE_SIZE);
  console.log(`Displaying page ${pageNumber} of ${totalPages}`);
  const pagedResponse =  pagination.paginate(openFoodTrucks, PAGE_SIZE, pageNumber);
  utils.printFoodTruckInfo(pagedResponse);
  if (pageNumber >= totalPages) {
    console.log("Those are all the food trucks open at this time.");
  } else {
    console.log("Press <Enter> to fetch next page...");
  }
  
}

const promptPagination = (array, pageNumber) => {
  displayResults(array, PAGE_SIZE, pageNumber);
  readlineSync.promptLoop((input) => {
    pageNumber+=1;
    displayResults(array, PAGE_SIZE, pageNumber);
    return (pageNumber >= pagination.totalPages(array.length, PAGE_SIZE));
  });
}