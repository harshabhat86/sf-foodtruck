var inRange = require('lodash/inRange');
var sortBy = require('lodash/sortBy');
var Table = require('cli-table');

module.exports = {
  getCurrentTime: ()=> {
    const date = new Date();
    const minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
    const hours = (date.getHours()<10?'0':'') + date.getHours();
    return `${hours}${minutes}`
  },
  
  getOpenFoodTrucks:(foodTrucks)=> {
    let time = module.exports.getCurrentTime();
    let foodTrucksOpenNow = foodTrucks.filter(truckInfo => {
      // intentional != since getDay() returns number and dayorder is string.
      if (truckInfo.dayorder != new Date().getDay()) {
        return false;
      }
      return inRange(time, truckInfo.start24.replace(":",""), truckInfo.end24.replace(":",""))
    });
    return sortBy(foodTrucksOpenNow, 'applicant');
  },

  printFoodTruckInfo:(foodTrucks) => {
    var table = new Table({
      head: ['Name', 'Location', 'Open Until'],
      colWidths: [60, 80, 20]
    });
    foodTrucks.forEach((foodTruck)=> {
      table.push(
        [foodTruck.applicant, foodTruck.location, foodTruck.endtime],
      );
    });
    console.log(table.toString());
  }
};
