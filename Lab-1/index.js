var subForm = document.getElementById('subForm')

var genderList = [];
var lastNameList = [];
var firstNameList = [];
var emailList = [];
var birthDateList = []
var phoneNumberList = [];
var countryList = [];

var n = 2;
var x = 0;

subForm.addEventListener('submit', function(event) {
    event.preventDefault();
  
    var gender = document.getElementsByName('gender');
    for(var g of gender) {
        if(g.checked){
            gender = g.value;
            break;
        }
    }
    
    var lastName = document.getElementById('lastName').value;
    var firstName = document.getElementById('firstName').value;
    var email = document.getElementById('email').value;
    var birthDate = document.getElementById('birthDate').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var country = document.getElementById('country').value;

    var addRow = document.getElementById('table');
    var newRow = addRow.insertRow(n);

    genderList[x] = gender;
    lastNameList[x] = lastName;
    firstNameList[x] = firstName;
    emailList[x] = email;
    birthDateList[x] = birthDate;
    phoneNumberList[x] = phoneNumber;
    countryList[x] = country;

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);

    cell1.innerHTML = genderList[x];
    cell2.innerHTML = lastNameList[x];
    cell3.innerHTML = firstNameList[x];
    cell4.innerHTML = emailList[x];
    cell5.innerHTML = birthDateList[x];
    cell6.innerHTML = phoneNumberList[x];
    cell7.innerHTML = countryList[x];

    n++;
    x++;

});

var icon = document.getElementById('icon');

icon.onclick = function(){
    document.body.classList.toggle("dark-theme")
}