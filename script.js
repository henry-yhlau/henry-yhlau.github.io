const form = document.getElementById("form");
const submitBtn = document.getElementById("btn_submit");
const requireFields = ["name", "email", "message"];
const formFields = [
  "name",
  "email",
  "message",
  "address",
  "city",
  "postal",
  "time",
  "type",
  "message",
  "wage",
];

function validateField(fieldName) {
  let isOk = true;
  const value = form[fieldName].value;
  isOk = value != "";
  const fieldHelper = document.getElementById(`${fieldName}_text_helper`);
  fieldHelper.style.display = isOk ? "none" : "block";
  console.log("from validate func", isOk);
  return isOk;
}

function formValuesToObj() {
  return formFields.reduce((acc, fieldName) => {
    const value = form[fieldName].value;
    acc[fieldName] = value;
    return acc;
  }, {});
}

document.getElementById("postal").addEventListener("blur", (e) => {
  document.getElementById("postal_text_helper").style.display = e.target
    .validity.valid
    ? "none"
    : "block";
});

requireFields.forEach((fieldName) => {
  const inputField = document.getElementById(fieldName);
  inputField.addEventListener("blur", (e) => {
    validateField(fieldName);
  });
});

submitBtn.addEventListener("click", (e) => {
  let isOk = true;
  requireFields.forEach((fieldName) => {
    isOk = validateField(fieldName) && isOk;
  });
  if (isOk) {
    const formObj = formValuesToObj();
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: JSON.stringify(formObj),
    })
      .then((res) => res.json())
      .then(() => alert("Will respond to you ASAP"));
  }
});

document.querySelectorAll('input[name="type"]').forEach((elem) => {
  elem.addEventListener("change", function (event) {
    const item = event.target.value;
    document.getElementById("wage").style.display =
      item == "hiring" ? "inline" : "none";
  });
});

document.getElementById("download").addEventListener("click", (e) => {
  const a = document.createElement("a");
  a.href = "resume.pdf";
  a.download = true;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
