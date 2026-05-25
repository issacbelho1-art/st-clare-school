import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= FIREBASE ================= */

const firebaseConfig = {
  apiKey: "AIzaSyD3ZfrYRJ2XNfijkmaYGKTUVotGTqYX5Ds",
  authDomain: "st-clare-school.firebaseapp.com",
  projectId: "st-clare-school",
  storageBucket: "st-clare-school.firebasestorage.app",
  messagingSenderId: "980272641859",
  appId: "1:980272641859:web:0e37c8a0e5faab38afa1f6",
  measurementId: "G-4B7S4KEJFZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ================= APPLICATION FORM ================= */

const applicationForm =
document.getElementById("applicationForm");

if (applicationForm) {

  /* TEMPORARY:
  disable required file uploads
  until Firebase Storage upload is added */

  document
  .querySelectorAll('input[type="file"]')
  .forEach(input => {
    input.required = false;
  });

  applicationForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const submitBtn =
    applicationForm.querySelector(
    ".submit-application"
    );

    submitBtn.disabled = true;
    submitBtn.textContent =
    "Submitting...";

    const formData =
    new FormData(applicationForm);

    try {

      await addDoc(
        collection(db, "applications"),
        {

        firstName:
        formData.get("first_name"),

        lastName:
        formData.get("last_name"),

        dob:
        formData.get("dob"),

        gender:
        formData.get("gender"),

        nationality:
        formData.get("nationality"),

        religion:
        formData.get("religion"),

        applyingClass:
        formData.get("applying_class"),

        previousSchool:
        formData.get("previous_school"),

        fatherName:
        formData.get("father_name"),

        fatherOccupation:
        formData.get("father_occupation"),

        motherName:
        formData.get("mother_name"),

        motherOccupation:
        formData.get("mother_occupation"),

        phone:
        formData.get("phone"),

        email:
        formData.get("email"),

        guardianName:
        formData.get("guardian_name"),

        guardianPhone:
        formData.get("guardian_phone"),

        permanentAddress:
        formData.get("permanent_address"),

        presentAddress:
        formData.get("present_address"),

        villageTown:
        formData.get("village_town"),

        district:
        formData.get("district"),

        state:
        formData.get("state"),

        pinCode:
        formData.get("pin_code"),

        bloodGroup:
        formData.get("blood_group"),

        medicalCondition:
        formData.get("medical_condition"),

        status: "New",

        documents: {},

        createdAt:
        serverTimestamp()

      });

      alert(
      "Application submitted successfully."
      );

      applicationForm.reset();

    } catch (error) {

      console.error(error);

      alert(
      "Application failed. Please try again."
      );

    }

    submitBtn.disabled = false;

    submitBtn.textContent =
    "Submit Application";

  });

}import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= FIREBASE CONFIG ================= */

const firebaseConfig = {
  apiKey: "AIzaSyD3ZfrYRJ2XNfijkmaYGKTUVotGTqYX5Ds",
  authDomain: "st-clare-school.firebaseapp.com",
  projectId: "st-clare-school",
  storageBucket: "st-clare-school.firebasestorage.app",
  messagingSenderId: "980272641859",
  appId: "1:980272641859:web:0e37c8a0e5faab38afa1f6",
  measurementId: "G-4B7S4KEJFZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ================= APPLICATION FORM ================= */

window.addEventListener("DOMContentLoaded", () => {

  const applicationForm =
  document.getElementById("applicationForm");

  if (!applicationForm) return;

  /* TEMPORARY:
     Disable file required validation
     until Firebase Storage uploads are added */

  document
  .querySelectorAll('input[type="file"]')
  .forEach(input => {
    input.required = false;
  });

  applicationForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const submitBtn =
    applicationForm.querySelector(
    ".submit-application"
    );

    submitBtn.disabled = true;

    submitBtn.textContent =
    "Submitting...";

    const formData =
    new FormData(applicationForm);

    try {

      await addDoc(
        collection(db, "applications"),
        {

        firstName:
        formData.get("first_name") || "",

        lastName:
        formData.get("last_name") || "",

        dob:
        formData.get("dob") || "",

        gender:
        formData.get("gender") || "",

        nationality:
        formData.get("nationality") || "",

        religion:
        formData.get("religion") || "",

        applyingClass:
        formData.get("applying_class") || "",

        previousSchool:
        formData.get("previous_school") || "",

        fatherName:
        formData.get("father_name") || "",

        fatherOccupation:
        formData.get("father_occupation") || "",

        motherName:
        formData.get("mother_name") || "",

        motherOccupation:
        formData.get("mother_occupation") || "",

        phone:
        formData.get("phone") || "",

        email:
        formData.get("email") || "",

        guardianName:
        formData.get("guardian_name") || "",

        guardianPhone:
        formData.get("guardian_phone") || "",

        permanentAddress:
        formData.get("permanent_address") || "",

        presentAddress:
        formData.get("present_address") || "",

        villageTown:
        formData.get("village_town") || "",

        district:
        formData.get("district") || "",

        state:
        formData.get("state") || "",

        pinCode:
        formData.get("pin_code") || "",

        bloodGroup:
        formData.get("blood_group") || "",

        medicalCondition:
        formData.get("medical_condition") || "",

        status: "New",

        documents: {},

        createdAt:
        serverTimestamp()

      });

      alert(
      "Application submitted successfully."
      );

      applicationForm.reset();

    } catch (error) {

      console.error(
      "Application submit error:",
      error
      );

      alert(
      "Application failed. Please try again."
      );

    }

    submitBtn.disabled = false;

    submitBtn.textContent =
    "Submit Application";

  });

});