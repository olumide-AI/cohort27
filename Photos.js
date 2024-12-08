// BACKEND FUNCTIONS
const options = {
      headers: {
        'Authorization': 'Bearer pat666qg79UYYlN74.0e6be05350f84fcc7d19f95e41da38c136ff22cd4b4e5626e9bcb04beeb6e415'
      }};

let PicturesDataArray = [];

// 2. async function to grab the GeneralPics table from airtable and then put it in pictureDirectory
async function getPictureDirectory () {
  // remember to use await and fetch (ex of fetch in line 6)
    try {
    const response = await fetch('https://api.airtable.com/v0/appcCE7cmHVWkV8ob/GeneralPics', options);
    const data = await response.json();
    //console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error fetching general pictures directory:', error);
  }
}

async function SetPicturesData() {
  const data = await getPictureDirectory();

  for (const pictureData of data.records) {
    PicturesDataArray.push(pictureData.fields);
  }
  
  const galleryRef = document.getElementById("gallery");
  galleryRef.innerHTML = ""; // clear the html of galleryRef
  
  for (const pictureData of PicturesDataArray) {
    const imgRef = pictureData.Image[0].url;
    const imgAlt = pictureData.ImgName;
    galleryRef.innerHTML += `
        <a href="${imgRef}" target="_blank"><img class="thumbs" src="${imgRef}" alt="${imgAlt}"></a>
    `;
  }
}

SetPicturesData();
console.log(PicturesDataArray);


// code below from breweries example of how to populate a div in js 

// function for our list view
// async function getAllRecords() {
//   let getResultElement = document.getElementById("brews");

//   const options = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer pateG7pBF1CkfmcW7.2c666498dc7818660958fea1c0bb95e5e1d33bbdb4871fed8ee5696394e05ce5`,
//     },
//   };

//   await fetch(
//     `https://api.airtable.com/v0/app4d1fvvjII8WH8W/Breweries?&view=Stars`,
//     options
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data); // response is an object w/ .records array

//       getResultElement.innerHTML = ""; // clear brews

//       let newHtml = "";

//       for (let i = 0; i < data.records.length; i++) {
//         let logo = data.records[i].fields["Logo"]; // here we are getting column values
//         let name = data.records[i].fields["Name"];
//         let neighborhood = data.records[i].fields["Neighborhood"];

//         newHtml += `
        
//          <div class="col-xl-4 cardImageText">
//           <div class="card list move border-dark mb-5" style="width: 20rem;">
//           <a href="breweries.html?id=${
//             data.records[i].id
//           }">${
//           logo
//             ? `<img class="card-img-top rounded" alt="${name}" src="${logo[0].url}">`
//             : ``
//         }
//           </a>
//           <p hidden class="card-key">${neighborhood}</p>
//           </div>
//           </div>
//         </div>
        
        
//         `;
//       }