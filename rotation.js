let anglesPositionsArray = []; // Each Degree is preoffset by 180
let studentDataArray = [];
let radianOffset = 0; // Determine Offset Radian For Rest of the Radians Calculated

// BACKEND FUNCTIONS
const options = {
  headers: {
    Authorization:
      "Bearer pat666qg79UYYlN74.0e6be05350f84fcc7d19f95e41da38c136ff22cd4b4e5626e9bcb04beeb6e415",
  },
};

// 0. global variable that holds student table
// let studentDirectory = getStudentDirectory();

// 0.5. global variable to hold all the general pictures
// let pictureDirectory = getPictureDirectory();

// 1. async function to grab the Directory table from airtable and then put it in studentDirectory
async function getStudentDirectory() {
  // remember to use await and fetch (ex of fetch in line 6)
  try {
    const response = await fetch(
      "https://api.airtable.com/v0/appcCE7cmHVWkV8ob/Directory",
      options
    );
    const data = await response.json();
    //console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching student directory:", error);
  }
}

// 2. async function to grab the GeneralPics table from airtable and then put it in pictureDirectory
async function getPictureDirectory() {
  // remember to use await and fetch (ex of fetch in line 6)
  try {
    const response = await fetch(
      "https://api.airtable.com/v0/appcCE7cmHVWkV8ob/GeneralPics",
      options
    );
    const data = await response.json();
    //console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching general pictures directory:", error);
  }
}

// Rotate THe big-circle id element
// Rotate and keep original transformation
// Extract Original Matrix, Get X and Y Values
// Create New Rotation and apply it to the matrix
function rotateElementToDegree(elementName, degree) {
  // Rotating
  console.log("Roating", degree);
  const circleRef = document.getElementById(elementName);

  // Me when I take computer graphics to not know how to perform object rotation
  // https://stackoverflow.com/questions/33132932/how-do-you-find-the-transformation-matrix-from-a-css-transform-rotatedeg-rule
  // https://stackoverflow.com/questions/25367711/javascript-get-matrix-transform-from-regular-css-and-convert-matrix2d-to-matrix3/25367782#25367782

  // Offset Degree By 180 So that it rotates focusing the left side
  degree = degree - 180;
  // Handling Mobile Viewing Differences
  let radians = 0;
  if (window.innerWidth <= 500) radians = ((degree - 90) * Math.PI) / 180;
  else radians = (degree * Math.PI) / 180;

  // Build Rotation Matrix
  const a = Math.cos(radians);
  const b = Math.sin(radians);

  circleRef.style.transform = `matrix(${a}, ${b}, ${-b}, ${a}, ${0}, ${0})`;

  const imgBoxList = document.getElementsByClassName("headshot-img-box");
  // Adjust Rotations Of Images Counter Circle Rotation
  for (const imgBox of imgBoxList) {
    imgBox.style.transform = `matrix(${a}, ${-b}, ${b}, ${a}, ${0}, ${0})`;
  }
}

function rotateToIndex(index) {
  console.log(index);
  // Adjust For Inverse Rotation Array
  iterator =
    anglesPositionsArray.length - index === 12
      ? 0
      : anglesPositionsArray.length - index;
  ChangeBio(index);
  rotateElementToDegree("big-circle", anglesPositionsArray[iterator]);

  document.body.scrollTo({ top: 0, behavior: "smooth" });
}
// Set Circle Images
function createImageCircles() {
  const maxCircles = studentDataArray.length;
  const circleRef = document.getElementById("big-circle");

  const circlePosition = getComputedStyle(circleRef);
  // Calculate the center coordinates
  const circleWidth = parseInt(circlePosition.width, 10);
  const circleHeight = parseInt(circlePosition.height, 10);
  const circleTop = parseInt(circlePosition.top, 10);
  const circleLeft = parseInt(circlePosition.left, 10);

  const centerX = circleLeft + circleWidth / 2;
  const centerY = circleTop + circleHeight / 2;

  // Set New Position and Adjust Position Also Based on Current Big Circle Rotation
  for (let i = 1; i <= studentDataArray.length; i++) {
    const imgContainerRef = document.createElement("div");

    circleRef.appendChild(imgContainerRef);
    imgContainerRef.classList.add("headshot-img-box");

    const newImageRef = document.createElement("img");

    imgContainerRef.appendChild(newImageRef);

    if ("Image" in studentDataArray[i - 1]) {
      imgContainerRef.style.backgroundImage = `url("${
        studentDataArray[i - 1].Image[0].url
      }")`;
      // newImageRef.src = `${studentDataArray[i-1].Image[0].url}`
      // newImageRef.classList.add("headshot-img");
    }

    // Place each orbiting div
    let radians = ((2 * Math.PI) / maxCircles) * i; // Angle in radians

    // Make Sure First Image Starts at 180 degrees so it is in right spot in circle.
    if (radianOffset === 0) {
      radianOffset = Math.PI - radians;
    }

    radians = radians + radianOffset;

    anglesPositionsArray.push((180 / Math.PI) * radians);

    // https://stackoverflow.com/questions/53525738/append-child-from-the-dom-into-another-div-but-to-stay-on-the-same-position
    // Position Circles From Center OF Big Circle And Offfset Based on big circle offset
    const x = centerX + (circleHeight / 2.4) * Math.cos(radians) - circleLeft;
    const y = centerY + (circleHeight / 2.4) * Math.sin(radians) - circleTop;

    imgContainerRef.style.left = `${x}px`;
    imgContainerRef.style.top = `${y}px`;

    const studentSiteUrl = studentDataArray[i - 1].AboutMe;
    // Add Event Handler provide their site on click
    imgContainerRef.addEventListener("click", () => {
      // Navigate to Site
      window.open(studentSiteUrl, "_blank").focus();
    });
  }
}

// Ensure that circles around compass stay aligned with position as screen resizes
function alignCircle() {
  const circleRef = document.getElementById("big-circle");
  const circlePosition = getComputedStyle(circleRef);
  const imgBoxList = document.getElementsByClassName("headshot-img-box");
  const maxCircles = imgBoxList.length;

  let i = 1;

  const circleWidth = parseInt(circlePosition.width, 10);
  const circleHeight = parseInt(circlePosition.height, 10);
  const circleTop = parseInt(circlePosition.top, 10);
  const circleLeft = parseInt(circlePosition.left, 10);

  const centerX = circleLeft + circleWidth / 2;
  const centerY = circleTop + circleHeight / 2;

  for (const imgBox of imgBoxList) {
    // Place each orbiting div
    let radians = ((2 * Math.PI) / maxCircles) * i; // Angle in radians
    i++;

    // Make Sure First Image Starts at 180 degrees so it is in right spot in circle.
    radians = radians + radianOffset;

    // https://stackoverflow.com/questions/53525738/append-child-from-the-dom-into-another-div-but-to-stay-on-the-same-position
    // Position Circles From Center OF Big Circle And Offfset Based on big circle offset
    const x = centerX + (circleHeight / 2.4) * Math.cos(radians) - circleLeft;
    const y = centerY + (circleHeight / 2.4) * Math.sin(radians) - circleTop;
    imgBox.style.left = `${x}px`;
    imgBox.style.top = `${y}px`;
  }
}

// Use The Array  From Rotation JS and function to rotate
let iterator = 0;

function RotateNextPerson() {
  iterator++;
  if (iterator > anglesPositionsArray.length - 1) iterator = 0;

  rotateElementToDegree("big-circle", anglesPositionsArray[iterator]);

  // Adjust Position For Rotation and student data because they are inversed;
  const dataItr =
    anglesPositionsArray.length - iterator === anglesPositionsArray.length
      ? 0
      : anglesPositionsArray.length - iterator;
  ChangeBio(dataItr);
}

function RotatePrevPerson() {
  iterator--;
  if (iterator < 0) iterator = anglesPositionsArray.length - 1;

  rotateElementToDegree("big-circle", anglesPositionsArray[iterator]);

  // Adjust Position For Rotation and student data because they are inversed;
  const dataItr =
    anglesPositionsArray.length - iterator === anglesPositionsArray.length
      ? 0
      : anglesPositionsArray.length - iterator;
  ChangeBio(dataItr);
}

// Called By Rotate Next / Prev Person Functions
function ChangeBio(index) {
  const bioRef = document.getElementById("bio-box");
  const studentData = studentDataArray[index];

  const initialBioName = studentDataArray[index].Name;
  const initialBioText = studentDataArray[index].Bio;
  const initialBioFavoritePart = studentDataArray[index].FavoritePart;
  const initialAboutMe = studentDataArray[index].AboutMe;
  const initialWebApp = studentDataArray[index].WebApp;
  const initialIoT = studentDataArray[index].IOT;
  const linkedIn = studentDataArray[index].LinkedIn;
  bioRef.innerHTML = `
    <h2 class="title-text">${initialBioName}</h2>
    <p class="about-text">${initialBioText}</p>
    <br/>
    <h3 class="header-text">Favorite Part</h3>
    <p class="about-text">${initialBioFavoritePart}</p>
    <div class="student-links">        
      <div class="student-links"> 
        <div class="site-link-container">
          <a href="${initialAboutMe}" target="_blank" class="btn btn-primary m-2 about-text">
            Portfolio
          </a>
          <a href="${initialWebApp}" target="_blank" class="btn btn-primary m-2 about-text">
            Web App
          </a>
          <a href="${initialIoT}" target="_blank" class="btn btn-primary m-2 about-text">
            IoT Project
          </a>      
        </div>
      <div class="site-link-container">
        <a href="${linkedIn}" target="_blank">
      
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="calc(50px + 4vw)" height="calc(50px + 2vw)" viewBox="0 0 48 48" class="icon">
          <path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"></path><path d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z" opacity=".05"></path><path d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z" opacity=".07"></path><path fill="#fff" d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"></path>
          </svg>
        </a>
      </div>
      </div>
    </div>
  `;
}

async function SetStudentData() {
  const data = await getStudentDirectory();

  for (const userData of data.records) {
    studentDataArray.push(userData.fields);
  }
}

async function FillOutPageStudentData() {
  // Loop Fill Out All Img Boxes
  await SetStudentData();

  createImageCircles();
  // First Img set student bio
  // Set Img bio
  console.log(studentDataArray, anglesPositionsArray);

  const bioRef = document.getElementById("bio-box");
  // Set Student Bio 0 index

  const BioName = studentDataArray[0].Name;
  const BioText = studentDataArray[0].Bio;
  const BioFavoritePart = studentDataArray[0].FavoritePart;
  const BioWebApp = studentDataArray[0].WebApp;
  const BioAboutMe = studentDataArray[0].AboutMe;
  const BioIoT = studentDataArray[0].IOT;
  const linkedIn = studentDataArray[0].LinkedIn;

  bioRef.innerHTML = `
    <h2 class="title-text">${BioName}</h2>
    <p class="about-text">${BioText}</p>
    <br/>
    <h3 class="header-text">Favorite Part</h3>
    <p class="about-text">${BioFavoritePart}</p>
    <div class="student-links"> 
      <div class="site-link-container">
        <a href="${BioAboutMe}" target="_blank" class="btn btn-primary m-2 about-text">
          Portfolio
        </a>
        <a href="${BioWebApp}" target="_blank" class="btn btn-primary m-2 about-text">
          Web App
        </a>
        <a href="${BioIoT}" target="_blank" class="btn btn-primary m-2 about-text">
          IoT Project
        </a>      
      </div>
      <div class="site-link-container">
      <a href="${linkedIn}" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="calc(50px + 4vw)" height="calc(50px + 2vw)" viewBox="0 0 48 48" class="icon">
          <path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"></path><path d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z" opacity=".05"></path><path d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z" opacity=".07"></path><path fill="#fff" d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"></path>
          </svg>
      </div>
    </div>
  `;
}

window.addEventListener("resize", alignCircle);
FillOutPageStudentData();

// <div class="d-flex justify-content-center gap-2">

//               <a href="experience.html" class="btn-view-here btn btn-primary"
//                  >Web App</a>
//                 <a href="product.html" class="btn-view-here btn btn-primary"
//               >Portfolio</a
//             >
//                 <a href="product.html" class="btn-view-here btn btn-primary"
//               >IOT Project</a
//             >
//                   </div>
