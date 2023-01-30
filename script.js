//Dark mode

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// ------------------------------

// Bands 

let library;

const initialData = [
  { name: "Thom Borke", manager: "Lewis Cardless", payment: "Paid", color: "paymentGreen" },
  { name: "Tupadam", manager: "Terry McNuck", payment: "Waiting" , color: "paymentRed"},
  { name: "Cardiohead", manager: "Tommy Nguyen", payment: "Waiting" , color: "paymentRed"},
];


const $name = document.querySelector("#name");
const $manager = document.querySelector("#manager");
const $payment = document.querySelector("#payment");
let $color = "";
const $tableBody = document.querySelector("#band-table");

const $form = document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBandToLibrary();
  printTable();
  clearForm();
});

const $table = document.querySelector("table").addEventListener("click", (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML == "delete") {
      if (confirm(`Do you want to delete ${currentTarget.innerText} ?`))
        deleteBand(findBand(library, currentTarget.innerText));
    }
    //  if (e.target.innerHTML == "Paid" || e.target.innerHTML == "Waiting") {
    if (e.target.classList.contains('paymentBtn')) {
      changePayment(findBand(library, currentTarget.innerText));
    }
    updateLocalStorage();
    printTable();
  });

class Band {
  constructor(name, manager, payment, color) {
    this.name = name;
    this.manager = manager;
    this.payment = payment;
    this.color = color;
  }
}

function addBandToLibrary() {
    
    if ($payment.value=="Waiting"){
        $color = "paymentRed";
     } else { $color = "paymentGreen";}
     console.log($payment.value);
  const newBand = new Band($name.value, $manager.value, $payment.value, $color);
  library.push(newBand);
  updateLocalStorage();
}

function changePayment (band) {
    let btn = document.querySelector('.paymentBtn');
  if (library[band].payment === "Paid") {
    library[band].payment = "Waiting";
    library[band].color = "paymentRed"
  } else {
    library[band].payment = "Paid";
    library[band].color = "paymentGreen"    
    }
}

function findBand(libraryArray, name) {
  if (libraryArray.length === 0 || libraryArray === null) {
    return;
  }
  for (band of libraryArray)
    if (band.name === name) {
      return libraryArray.indexOf(band);
    }
}

function clearForm() {
  $name.value = "";
  $manager.value = "";
}

function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));
}

function checkLocalStorage() {
  if (localStorage.getItem("library")) {
    library = JSON.parse(localStorage.getItem("library"));
  } else {
    library = initialData;
  }
}

function deleteBand(currentBand) {
    library.splice(currentBand, currentBand + 1);
  }  

function printTable() {
  checkLocalStorage();
  $tableBody.innerHTML = "";
  library.forEach((band) => {
    const htmlBand = `
      <tr>
        <td>${band.name}</td>
        <td>${band.manager}</td>
        <td><button class="paymentBtn ${band.color}">${band.payment}</button></td>
        <td><button class="delete">delete</button></td>
      </tr>
      `;
    $tableBody.insertAdjacentHTML("afterbegin", htmlBand);
  });
}

printTable();





