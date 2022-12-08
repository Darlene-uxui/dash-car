
//display cars
//fetch json file


//=========================================================================================================================================================================================================================================================================================================================================================================================================================================
//                                                                                                                                                                                                                                                                                                                                                                                                                                         
//  #####  ##   ##  ##     ##   ####  ######  ##   #####   ##     ##   ####                                                                                                                                                                                                                                                                                                                                                              
//  ##     ##   ##  ####   ##  ##       ##    ##  ##   ##  ####   ##  ##                                                                                                                                                                                                                                                                                                                                                                 
//  #####  ##   ##  ##  ## ##  ##       ##    ##  ##   ##  ##  ## ##   ###                                                                                                                                                                                                                                                                                                                                                               
//  ##     ##   ##  ##    ###  ##       ##    ##  ##   ##  ##    ###     ##                                                                                                                                                                                                                                                                                                                                                              
//  ##      #####   ##     ##   ####    ##    ##   #####   ##     ##  ####                                                                                                                                                                                                                                                                                                                                                               
//                                                                                                                                                                                                                                                                                                                                                                                                                                         
//=========================================================================================================================================================================================================================================================================================================================================================================================================================================

let vehicleArray;
let numberOfPeople;
let numberOfDays;
let displayDatePicker;
let fetchData;
let chosenVehicle;

//Fetch Data from Json -> Convert to Array -> Return data value

async function fetchVehiclesJsonData() {
  //send request to get vehicle files and await response
  const response = await fetch("/vehicles.json");
  //decode response and await result
  const data = await response.json();
  //save vehicle array from global variable
  const dataArry = [];

  data.vehicles.forEach((d, i) => {

    dataArry.push(d);
  })

  return dataArry;
}

// pass data on
fetchVehiclesJsonData()
  .then(function (data) {
    displayVehicles(data);
    numberOfPeopleSearch(data);
    bookVehicleBtnClickHandler(data)
  })

//displaying vehicles to vehicle-menu
function displayVehicles(array) {

  let vehicleHtml = "";
  for (let vehicleObject of array) {
    const vehicleImageUrl = vehicleObject.imgUrl;
    vehicleHtml += renderVehicle(vehicleObject);
  }

  document.querySelector(".vehicles-menu").innerHTML += vehicleHtml;
  //bookVehicleBtnClickHandler();
}

// filter handler for when user put in max number of people 
function filterVehicleData(data, n) {

  const vehicles = data;
  let filteredVehicles;

  // check max ppl
  if (!n) {
    filteredVehicles = vehicles;
  } else {
    // filter by maxPeople 
    filteredVehicles = vehicles.filter(function (vehicle) {
      return vehicle.maxPeople >= n;
    });
  }

  let mockup = "";

  filteredVehicles.forEach((vehicle) => {
    template = renderVehicle(vehicle);
    mockup += template;
  })

  document.querySelector(".vehicles-menu").innerHTML = mockup;
  bookVehicleBtnClickHandler(data);
}

// Vehicle template mockup
function renderVehicle(vehicle) {
  let vehicleTemp = `
  <div class="vehicle-card" data-vehicle="${vehicle.name}" data-price="${vehicle.Price}" data-lpk="${vehicle.litrePer100km}">
    <div class="vehicle-image">
      <img src="${vehicle.imgUrl}"/>
    </div>
    <h2>${vehicle.name}</h2> 
    <p>${vehicle.brand}</p>
    <p>${vehicle.seats}</p>
    <p>${vehicle.Year}</p>
    <p>${vehicle.brand}</p>
    <p>${vehicle.Price}</p>
    <p>Rental Period: ${vehicle.minDayRental}-${vehicle.maxDayRental} Days</p>
    <div class="book-btn">
      <p class="book" data-id="${vehicle.id}">Book this Vehicle</p> 
    </div>
  </div>`;
  return vehicleTemp;
}
//=============================================================================================================================================================================================================================================================================================================================================================================================================================
//                                                                                                                                                                                                                                                                                                                                                                                                                             
//  ##      ##   ####  ######  #####  ##     ##  #####  #####                                                                                                                                                                                                                                                                                                                                                                
//  ##      ##  ##       ##    ##     ####   ##  ##     ##  ##                                                                                                                                                                                                                                                                                                                                                               
//  ##      ##   ###     ##    #####  ##  ## ##  #####  #####                                                                                                                                                                                                                                                                                                                                                                
//  ##      ##     ##    ##    ##     ##    ###  ##     ##  ##                                                                                                                                                                                                                                                                                                                                                               
//  ######  ##  ####     ##    #####  ##     ##  #####  ##   ##                                                                                                                                                                                                                                                                                                                                                              
//                                                                                                                                                                                                                                                                                                                                                                                                                             
//=============================================================================================================================================================================================================================================================================================================================================================================================================================


function numberOfPeopleSearch(data) {
  document.getElementById("search-button-numberOfPeople").addEventListener("click", async function () {
    let numberOfPeople = document.getElementById("numberOfPeople").value;

    filterVehicleData(data, numberOfPeople);
  })
}

function bookVehicleBtnClickHandler(data) {
  const bookVehicleBtnList = document.querySelectorAll(".book");
  const chosenVehicle = document.querySelector('.vehicle-chosen-final-item');
  if (bookVehicleBtnList.length) {

    const arr = data || [];
    bookVehicleBtnList.forEach(function (btn) {

      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");

        arr.filter(function (vehicle) {
          //return ;
          if (vehicle.id == id) {
            let mockup = renderVehicle(vehicle);
            chosenVehicle.innerHTML = mockup;
          } 
        });

      })
    });
  }
};

//===========================================================================================================================================================================================================================================================================================================================================================================================================================================
//                                                                                                                                                                                                                                                                                                                                                                                                                                           
//  ####      ###    ######  #####  #####   ##   ####  ##  ##  #####  #####                                                                                                                                                                                                                                                                                                                                                                
//  ##  ##   ## ##     ##    ##     ##  ##  ##  ##     ## ##   ##     ##  ##                                                                                                                                                                                                                                                                                                                                                               
//  ##  ##  ##   ##    ##    #####  #####   ##  ##     ####    #####  #####                                                                                                                                                                                                                                                                                                                                                                
//  ##  ##  #######    ##    ##     ##      ##  ##     ## ##   ##     ##  ##                                                                                                                                                                                                                                                                                                                                                               
//  ####    ##   ##    ##    #####  ##      ##   ####  ##  ##  #####  ##   ##                                                                                                                                                                                                                                                                                                                                                              
//                                                                                                                                                                                                                                                                                                                                                                                                                                           
//===========================================================================================================================================================================================================================================================================================================================================================================================================================================


const datepickerInstance = flatpickr("#vehicle-datePicker", {
  mode: "range",
  minDate: "today",
  dateFormat: "Y-m-d",
  // when the input changes (i.e. a date is selected), do this.
  onChange: function (dates, string, pickr) {
    maxDays = 15/* PUT SELECTED OPTIONS' MAX NUMBER OF DAYS HERE */;
    // if only a single date is chosen, set the max to maxDays from the selected date, 
    if (dates.length === 1) {
      pickr.set(
        "maxDate",
        dates[0].fp_incr(maxDays - 1 || 1)
      );
      // and the min to the selected date (to prevent selecting previous days)
      pickr.set("minDate", dates[0]);
    } else {
      // else it must mean that a second date just got picked, so calculate the difference
      // convert date objects passed to the event handles to epoch time integers (milliseconds from 1st Jan 1970 (don't ask, its a compsci thing)) and subtract them
      let timeDifference = dates[1].getTime() - dates[0].getTime();
      // convert the milliseconds into days (1000 milliseconds to a second, 3600 seconds in an hour, 24 hours a day)
      let numberOfDays = 1 + Math.floor(timeDifference / (1000 * 3600 * 24));

      // THESE ARE YOUR OUTPUTS!
      // numberOfDays is the total number of days in the selected range.
      // string is the date range written as a human readable string (xxxx-xx-xx to xxxx-xx-xx)
      // dates is an array of the individual date strings
      console.log(numberOfDays, string, dates); // -------------------->>>>>> USE ANY OF THESE VALUES AS THE OUTPUT FOR THE REST OF YOUR CODE. CALL A FUNCTION HERE OR WHATEVER, UP TO YOU. THIS SECTION OF THE CODE WILL EXECUTE EVERYTIME A PAIR OF DATES IS SELECTED
      // do with these what you wish :)
      displayChosenDates();
      function displayChosenDates(){
        document.getElementById("displayChosenDate").setAttribute("data-days", numberOfDays);
        document.getElementById("displayChosenDate").innerHTML = "My Trip is total" + " " + numberOfDays + " " + "Days";
      }
    
    }
  },
  onClose: function (dates, string, pickr) {
    pickr.set("maxDate", null);
    pickr.set("minDate", "today");
  },
});

//=============================================================================================================================================================================================================================================================================================================================================================================================
//                                                                                                                                                                                                                                                                                                                                                                                             
//  ###    ###    ###    #####                                                                                                                                                                                                                                                                                                                                                               
//  ## #  # ##   ## ##   ##  ##                                                                                                                                                                                                                                                                                                                                                              
//  ##  ##  ##  ##   ##  #####                                                                                                                                                                                                                                                                                                                                                               
//  ##      ##  #######  ##                                                                                                                                                                                                                                                                                                                                                                  
//  ##      ##  ##   ##  ##                                                                                                                                                                                                                                                                                                                                                                  
//                                                                                                                                                                                                                                                                                                                                                                                             
//=============================================================================================================================================================================================================================================================================================================================================================================================
let _firstLatLng;
let _firstPoint;
let _secondLatLng;
let _secondPoint;
let _distance;
let _length;
let _polyline;
let km;
let _map = L.map('map').setView([-43.87781017575342, 170.79219235857795], 6);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(_map);

// add listeners to click, for recording two points
_map.on('click', function(e) {

    if (!_firstLatLng) {
    _firstLatLng = e.latlng;
    _firstPoint = e.layerPoint;
    L.marker(_firstLatLng).addTo(_map).bindPopup('Point A<br/>' + e.latlng + '<br/>' + e.layerPoint).openPopup();
    } else {
    _secondLatLng = e.latlng;
    _secondPoint = e.layerPoint;
    L.marker(_secondLatLng).addTo(_map).bindPopup('Point B<br/>' + e.latlng + '<br/>' + e.layerPoint).openPopup();
    }

    if (_firstLatLng && _secondLatLng) {
    // draw the line between points
    L.polyline([_firstLatLng, _secondLatLng], {
        color: 'blue'
    }).addTo(_map);

    refreshDistanceAndLength();
    }
})

_map.on('zoomend', function(e) {
    refreshDistanceAndLength();
})

function refreshDistanceAndLength() {
    _distance = L.GeometryUtil.distance(_map, _firstLatLng, _secondLatLng);
    _length = L.GeometryUtil.length([_firstPoint, _secondPoint]);
    let km = Math.round(_length * 1); 
    document.getElementById('distance').innerHTML = _distance;
    document.getElementById('length').innerHTML = km + "Km";

    const chosenVehicleContainer = document.querySelector(".vehicle-chosen-final-item");
    const chosenVehicle = chosenVehicleContainer.querySelector(".vehicle-card");
    const selectedDaysContainer = document.querySelector("#displayChosenDate");
    const selectedDays = selectedDaysContainer.getAttribute("data-days");

    const vehicle = document.querySelector("#final-vehicle");
    const period = document.querySelector("#final-period");
    const fuelCost = document.querySelector("#final-fuel-cost");
    const rentalConst = document.querySelector("#final-rental-cost");
    const totalRentalConst = document.querySelector("#final-fuel-rental-cost");
    const currentFuel = 3.2;

    if(chosenVehicle && selectedDays){
      const name = chosenVehicle.getAttribute("data-vehicle");
      const price = chosenVehicle.getAttribute("data-price");
      const lpk = chosenVehicle.getAttribute("data-lpk");
      let dateSelected;
      let priceInNum = price.replace(/\D/g, '');

      let totalRentalCost = selectedDays * priceInNum;
      let totalfuelCost = ((lpk / 100) * km ) * currentFuel;

      if(selectedDays == 1){
        dateSelected = selectedDays + " Day";
      }else {
        dateSelected = selectedDays + " Days";
      }

      totalfuelCost = totalfuelCost.toFixed(2);
      totalRentalCost = totalRentalCost.toFixed(2);

      vehicle.textContent = name;
      period.textContent = dateSelected;
      fuelCost.textContent = "$" + totalfuelCost;
      rentalConst.textContent = "$" + totalRentalCost;
      totalRentalConst.textContent = "$" + (parseFloat(totalfuelCost) + parseFloat(totalRentalCost)).toFixed(2);


    }else{
      // vaildation 
      if(!chosenVehicle) {
        alert("Please select vehicle");
      }
      
      if(!selectedDays) {
        alert("Please select date");
      }
    }

}




