var name =document.getElementById('nameInput')
var email =document.getElementById('emailInput')
var password =document.getElementById('passwordInput')
var arr =[]
if(localStorage.getItem('informationP')){
    arr = JSON.parse(localStorage.getItem('informationP'));
}

function register(){
    var name =nameInput.value
    var email = emailInput.value;
    var password = passwordInput.value;

    if (!email || !password) {
        alert('Please fill in both fields.');
        return;
    }

    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        displayMessage('please enter a valid email address.','danger')
                return;
    }

    var user = null;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].Email === email) {
        displayMessage('this email is already registered.','danger')
           return;
        }
    }


    var informationP = {
        Email: email,
        Password: password,
        Name:name
    };
    arr.push(informationP);
    localStorage.setItem('informationP', JSON.stringify(arr));
    clearForm()
// localStorage.setItem('loggedInUser',username);

    displayMessage('Registration successfull!','success')

    
}

function clearForm() {
    nameInput.value=null;
    emailInput.value = null;
    passwordInput.value = null;
}
function login(){
    var email =document.getElementById('emailInput').value;
    var password =document.getElementById('passwordInput').value;

    if (!email || !password) {
    displayMessage('please fill in both fields','danger')

        return;
    }

    var user = null;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].Email === email) {
            user = arr[i];
            break;
        }
    }

    if (!user) {
    displayMessage('Email is not registered. Please sign up first.','danger')
        return;
    }

    if (user.Password !== password) {
    displayMessage('Incorrect password. Please try again.','danger')

        return;
    }

    localStorage.setItem('loggedInUser',user.Name);
    window.location.href = './home.html';


    clearForm()

}


var username =localStorage.getItem('loggedInUser');
if(username){
    document.getElementById('welcomeMessage').textContent=`welcome,${username}`;
}
function displayMessage(message, type) {
    var messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = `text-${type} mt-2`; 
}
