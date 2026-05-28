import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* ================= FIREBASE CONFIG ================= */

const firebaseConfig = {
  apiKey: "AIzaSyC97WiF96Rx2_NH-6jz0vMP0LqyowgDMAc",
  authDomain: "st-clare-website.firebaseapp.com",
  projectId: "st-clare-website",
  storageBucket: "st-clare-website.firebasestorage.app",
  messagingSenderId: "505543741254",
  appId: "1:505543741254:web:206b1ccbd6c5a17f655f47",
  measurementId: "G-08EEWQFN19"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

/* ================= FILE UPLOAD HELPER ================= */

async function uploadFile(file, folderName) {
  if (!file || file.size === 0) {
    return "";
  }

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png"
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only PDF, JPG and PNG files are allowed.");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File size must be below 10MB.");
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${folderName}/${Date.now()}_${safeName}`;

  const storageRef = ref(storage, filePath);

  await uploadBytes(storageRef, file);

  return await getDownloadURL(storageRef);
}

/* ================= APPLICATION FORM ================= */

window.addEventListener("DOMContentLoaded", () => {
  const applicationForm = document.getElementById("applicationForm");

  if (!applicationForm) return;

  applicationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = applicationForm.querySelector(".submit-application");

    if (!submitBtn) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const formData = new FormData(applicationForm);

    try {
      const birthCertificateFile = formData.get("birth_certificate");
      const aadhaarCardFile = formData.get("aadhaar_card");
      const transferCertificateFile = formData.get("transfer_certificate");
      const marksheetFile = formData.get("marksheet");
      const passportPhotoFile = formData.get("passport_photo");

      const birthCertificateUrl = await uploadFile(
        birthCertificateFile,
        "applications/birth-certificates"
      );

      const aadhaarCardUrl = await uploadFile(
        aadhaarCardFile,
        "applications/aadhaar-cards"
      );

      const transferCertificateUrl = await uploadFile(
        transferCertificateFile,
        "applications/transfer-certificates"
      );

      const marksheetUrl = await uploadFile(
        marksheetFile,
        "applications/marksheets"
      );

      const passportPhotoUrl = await uploadFile(
        passportPhotoFile,
        "applications/passport-photos"
      );

      await addDoc(collection(db, "applications"), {
        firstName: formData.get("first_name") || "",
        lastName: formData.get("last_name") || "",
        dob: formData.get("dob") || "",
        gender: formData.get("gender") || "",
        nationality: formData.get("nationality") || "",
        religion: formData.get("religion") || "",
        applyingClass: formData.get("applying_class") || "",
        previousSchool: formData.get("previous_school") || "",

        fatherName: formData.get("father_name") || "",
        fatherOccupation: formData.get("father_occupation") || "",
        motherName: formData.get("mother_name") || "",
        motherOccupation: formData.get("mother_occupation") || "",
        phone: formData.get("phone") || "",
        email: formData.get("email") || "",
        guardianName: formData.get("guardian_name") || "",
        guardianPhone: formData.get("guardian_phone") || "",

        permanentAddress: formData.get("permanent_address") || "",
        presentAddress: formData.get("present_address") || "",
        villageTown: formData.get("village_town") || "",
        district: formData.get("district") || "",
        state: formData.get("state") || "",
        pinCode: formData.get("pin_code") || "",

        bloodGroup: formData.get("blood_group") || "",
        medicalCondition: formData.get("medical_condition") || "",

        status: "New",

        documents: {
          birthCertificate: birthCertificateUrl,
          aadhaarCard: aadhaarCardUrl,
          transferCertificate: transferCertificateUrl,
          marksheet: marksheetUrl,
          passportPhoto: passportPhotoUrl
        },

        createdAt: serverTimestamp()
      });

      alert("Application submitted successfully.");

      applicationForm.reset();

    } catch (error) {
      console.error("Application submit error:", error);

      alert(error.message || "Application failed. Please try again.");
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Application";
  });
});