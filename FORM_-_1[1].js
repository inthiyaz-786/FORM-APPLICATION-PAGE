let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};

let statusing = document.getElementById("selected");
statusing.addEventListener("change", function(event) {
    formData.status = statusing.value;
})

let male = document.getElementById("genderMale");
male.addEventListener("change", function(event) {
    formData.gender = male.value;
});

let female = document.getElementById("genderFemale");
female.addEventListener("change", function(event) {
    formData.gender = female.value;
});




let formCon = document.getElementById("formEle");

let inputEle = document.getElementById("inputEle");
let inputReq = document.getElementById("inputPara");

let emailEle = document.getElementById("emailEle");
let emailReq = document.getElementById("emailPara");

inputEle.addEventListener("change", function(event) {
    if (inputEle.value === "") {
        inputReq.textContent = "REQUIRED*";
    } else {
        inputReq.textContent = "";
    }
    formData.name = inputEle.value;
});


emailEle.addEventListener("change", function(event) {
    if (emailEle.value === "") {
        emailReq.textContent = "REQUIRED*";
    } else {
        emailReq.textContent = "";
    }
    formData.email = emailEle.value;
});

function transfer(formData) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 35748b33053a663f1af3fe2416ec1078a685a6e9299fefb69f0df761cd370a2f",
        },
        body: JSON.stringify(formData)
    };
    let url = "https://gorest.co.in/public-api/users";
    fetch(url, formData)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            if (jsonData.code === 422) {
                if (jsonData[0].message === "has already been taken") {
                    emailReq.textContent = "Email already taken";
                }
            }
        })
}


formCon.addEventListener("submit", function(event) {
    event.preventDefault();
    transfer(formData);
});