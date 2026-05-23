// ================= FIREBASE APPLICATION FORM =================

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
const storage = getStorage(app);

const form = document.getElementById("applicationForm");

async function uploadFile(file, folderName) {
  if (!file || file.size === 0) return "";

  const safeFileName = Date.now() + "-" + file.name.replace(/\s+/g, "-");
  const fileRef = ref(storage, `applications/${folderName}/${safeFileName}`);

  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector(".submit-application");
    submitBtn.textContent = "Uploading documents...";
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);

      const birthCertificateUrl = await uploadFile(
        formData.get("birth_certificate"),
        "birth-certificates"
      );

      const aadhaarCardUrl = await uploadFile(
        formData.get("aadhaar_card"),
        "aadhaar-cards"
      );

      const transferCertificateUrl = await uploadFile(
        formData.get("transfer_certificate"),
        "transfer-certificates"
      );

      const marksheetUrl = await uploadFile(
        formData.get("marksheet"),
        "marksheets"
      );

      const passportPhotoUrl = await uploadFile(
        formData.get("passport_photo"),
        "passport-photos"
      );

      submitBtn.textContent = "Submitting application...";

      await addDoc(collection(db, "applications"), {
        firstName: formData.get("first_name"),
        lastName: formData.get("last_name"),
        dob: formData.get("dob"),
        gender: formData.get("gender"),
        nationality: formData.get("nationality"),
        religion: formData.get("religion"),
        applyingClass: formData.get("applying_class"),
        previousSchool: formData.get("previous_school"),

        fatherName: formData.get("father_name"),
        fatherOccupation: formData.get("father_occupation"),
        motherName: formData.get("mother_name"),
        motherOccupation: formData.get("mother_occupation"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        guardianName: formData.get("guardian_name"),
        guardianPhone: formData.get("guardian_phone"),

        permanentAddress: formData.get("permanent_address"),
        presentAddress: formData.get("present_address"),
        villageTown: formData.get("village_town"),
        district: formData.get("district"),
        state: formData.get("state"),
        pinCode: formData.get("pin_code"),

        bloodGroup: formData.get("blood_group"),
        medicalCondition: formData.get("medical_condition"),

        documents: {
          birthCertificate: birthCertificateUrl,
          aadhaarCard: aadhaarCardUrl,
          transferCertificate: transferCertificateUrl,
          marksheet: marksheetUrl,
          passportPhoto: passportPhotoUrl
        },

        documentUploadStatus: "Uploaded",
        status: "New",
        createdAt: serverTimestamp()
      });

      alert("Application submitted successfully.");
      form.reset();

    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Something went wrong. Please check Firebase Storage rules.");
    }

    submitBtn.textContent = "Submit Application";
    submitBtn.disabled = false;
  });
}