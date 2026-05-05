// ================= MULTI STEP FORM =================

let currentStep = 0;

const steps = document.querySelectorAll(".form-step");
const indicators = document.querySelectorAll(".step");

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
    indicators[i].classList.toggle("active", i === index);
  });
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

// ================= FIREBASE =================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR-KEY",
  authDomain: "YOUR-ID.firebaseapp.com",
  projectId: "YOUR-ID",
  storageBucket: "YOUR-ID.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= FORM SUBMIT =================

const form = document.getElementById("admissionForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "applications"), {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        dob: document.getElementById("dob").value,
        grade: document.getElementById("grade").value,
        parentName: document.getElementById("parentName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        createdAt: new Date()
      });

      alert("Application submitted successfully!");
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  });
}
window.nextStep = nextStep;
window.prevStep = prevStep;