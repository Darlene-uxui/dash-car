//Date Picker
let currentDateTime = new Date();
let year = currentDateTime.getFullYear();
let month = currentDateTime.getMonth() + 1;
let date = currentDateTime.getDate() + 1;

if (date < 10) {
  date = "0" + date;
}
if (month < 10) {
  month = "0" + month;
}

let dateTomorrow = year + "-" + month + "-" + date;
let checkinElem = document.querySelector("#checkin-date");
let checkoutElem = document.querySelector("#checkout-date");

checkinElem.setAttribute("min", dateTomorrow);

checkinElem.onchange = function () {
  checkoutElem.setAttribute("min", this.value);
};

//display cars
//fetch json file


let vehicleArray;
let categoryArray;
let numberOfPeople;
let displayDatePicker;

const fetchData = [];


async function fetchVehiclesJsonData(){
  //send request to get vehicle files and await response
  const response = await fetch("/vehicles.json");
  //decode response and await result
  const data = await response.json();
  //save vehicle array from global variable

  return fetchData.push(data.vehicles);
}

fetchVehiclesJsonData();

console.log(fetchData)


async function fetchVehiclesJson(){
  //send request to get vehicle files and await response
  const response = await fetch("/vehicles.json");
  //decode response and await result
  const data = await response.json();
  //save vehicle array from global variable
  vehicleArray = data.vehicles;
  categoryVehicle = data.categories;
  
  //render the vehicle cards to the global VehicleArray
  displayVehicles(vehicleArray);
  //render the categories //
  //displayCatergories(categoryArray);
}

async function getVehicleData() {

  try {
    //send request to get vehicle files and await response
    const response = await fetch("/vehicles.json");
    //decode response and await result
    return await response.json();

  } catch(error) {
    console.log(error);
  }
  
}
// filter handler
async function filterVehicleData(n){
  console.log("filterVehicleData"); 
  let data =  await getVehicleData();
  const vehicles = data.vehicles;
  let filteredVehicles; 

   // check max ppl
  if(!n){
    filteredVehicles = vehicles;
  }else {
    // filter by maxPeople 
    filteredVehicles = vehicles.filter(function(vehicle){
      return vehicle.maxPeople >= n;
    });
  }

  let mockup = "";

  filteredVehicles.forEach((vehicle) => {
      template = `<div class="vehicle-card">
      <div class="vehicle-image">
        <img src="${vehicle.imgUrl}"/>
      </div>
      <h2>${vehicle.name}</h2> 
      <p>${vehicle.brand}</p>
      <p>${vehicle.seats}</p>
      <p>${vehicle.Year}</p>
      <p>${vehicle.brand}</p>
      <p>${vehicle.Price}</p>
        <div class="book-btn">
          <p class="book">Book this Vehicle</p> 
        </div>
      </div>`;
      mockup += template;
    })

  document.querySelector(".vehicles-menu").innerHTML = mockup;

  const bookVehicleBtnList = document.querySelectorAll(".book");

console.log(bookVehicleBtnList);

if(bookVehicleBtnList.length){
   
      bookVehicleBtnList.forEach(function(btn){
  
        btn.addEventListener("click", function(){
          console.log(1);
        })
      });
    }
}

// async function renderVehicles() {
//   let vehicles = await getVehicleData();
//   let mockup = "";

//   console.log(vehicles)
//   vehicles.forEach((vehicle) => {
//       template = `<div class="vehicle-card">
//       <div class="vehicle-image">
//         <img src="${vehicle.imgUrl}"/>
//       </div>
//       <h2>${vehicle.name}</h2> 
//       <p>${vehicle.brand}</p>
//       <p>${vehicle.seats}</p>
//       <p>${vehicle.Year}</p>
//       <p>${vehicle.brand}</p>
//       <p>${vehicle.Price}</p>
//         <div class="book-btn">
//           <p class="book">Book this Vehicle</p> 
//         </div>
//       </div>`;
//       mockup += template;
//     })

//   document.querySelector(".vehicles-menu").innerHTML = mockup;
// }

document.getElementById("search-button-numberOfPeople").addEventListener("click", async function(){
  let numberOfPeople = document.getElementById("numberOfPeople").value;
  
  filterVehicleData(numberOfPeople);
})

async function filterVehicles(){
  let numberOfPeople = document.getElementById("numberOfPeople").value;
  
  

  const getVehicles = await filterVehicleData(numberOfPeople);
  const vehicleArray = Object.keys(getVehicles);

  console.log(getVehicles);
  displayVehicles(vehicleArray)

  
};

function displayVehicles(array){
  let vehicleHtml = "";
  for (let vehicleObject of array) {
    const vehicleImageUrl = vehicleObject.imgUrl;
    vehicleHtml += `<div class="vehicle-card">
    <div class="vehicle-image">
      <img src="${vehicleImageUrl}"/>
    </div>
    <h2>${vehicleObject.name}</h2> 
    <p>${vehicleObject.brand}</p>
    <p>${vehicleObject.seats}</p>
    <p>${vehicleObject.Year}</p>
    <p>${vehicleObject.brand}</p>
    <p>${vehicleObject.Price}</p>
      <div class="book-btn">
        <button class="book">Book this Vehicle</button> 
      </div>
    </div>`;
  }
  document.querySelector(".vehicles-menu").innerHTML += vehicleHtml;

  // const bookVehicleBtnList = document.querySelectorAll(".book");
  // for (let btn of bookVehicleBtnList) {
  //   btn.addEventListener("click", function (event) {
  //     const vehicleDatePicker = document.getElementById("vehicle-datePicker");
  //     vehicleDatePicker.style.display = "block";
  //   });
  // }
}


// filterVehicleData().then(function(){
//   const bookVehicleBtnList = document.querySelectorAll(".book");
  
//   if(bookVehicleBtnList.length){
   
//     bookVehicleBtnList.forEach(function(btn){

//       btn.addEventListener("click", function(){
//         console.log(1);
//       })
//     });
//   }
// })

  // for (let btn of bookVehicleBtnList) {
  //   btn.addEventListener("click", function (event) {
  //     const vehicleDatePicker = document.getElementById("vehicle-datePicker");
  //     vehicleDatePicker.style.display = "block";
  //   });
  // }

function bookVehicle() {
  let bookingBtn = document.getElementById("bookingBtn");
}


//Show DatePicker when vehicle is chosen

// document.getElementsByClassName("book")[0].addEventListener("click", async function(){
//   let  = document.getElementById("vehicle-datePicker");
//   console.log("HIHI");
  
// })

fetchVehiclesJson();
bookVehicle();

