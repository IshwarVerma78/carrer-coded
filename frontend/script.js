/***********************
  DOM REFERENCES
************************/
const coursesContainer = document.getElementById("coursesContainer");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const searchInput = document.getElementById("courseSearch");

/***********************
  STATE
************************/
let activeCategory = "All";

/***********************
  HAMBURGER MENU
************************/
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

/***********************
  RENDER COURSES (ONE PLACE ONLY)
************************/
function renderCourses(courses) {
  coursesContainer.innerHTML = "";

  courses.forEach(course => {
    const card = document.createElement("div");

    card.className = `
      bg-white rounded-2xl overflow-hidden
      border border-muted/30
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl hover:border-accent
    `;

    card.innerHTML = `
      <img
        src="${course.image}"
        alt="${course.title}"
        class="w-full h-44 object-cover"
      />

      <div class="p-6">
        <h3 class="font-heading text-xl font-semibold mb-2">
          ${course.title}
        </h3>

        <p class="text-sm text-muted mb-4">
          ${course.description.slice(0, 90)}...
        </p>

        <div class="flex justify-between items-center text-sm mb-4">
          <span class="font-medium text-primary">
            ⏱ ${course.duration}
          </span>
          <span class="font-medium text-primary">
            💰 ${course.fees}
          </span>
        </div>

        <button
          onclick="showCourseDetails('${course.id}')"
          class="w-full bg-accent text-white py-3 rounded-md font-semibold
                 transition-all duration-300
                 hover:opacity-90 hover:shadow-md"
        >
          View Full Details
        </button>
      </div>
    `;

    coursesContainer.appendChild(card);
  });
}

/***********************
  FILTER + SEARCH LOGIC
************************/
function filterCourses(category) {
  activeCategory = category;

  // Active button UI
  document.querySelectorAll(".filter-pill").forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.category === category) {
      btn.classList.add("active");
    }
  });

  applyFilters();
}

// Search input listener
searchInput.addEventListener("input", () => {
  applyFilters();
});

function applyFilters() {
  const query = searchInput.value.toLowerCase();

  let filtered =
    activeCategory === "All"
      ? coursesData
      : coursesData.filter(course => course.category === activeCategory);

  if (query) {
    filtered = filtered.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    );
  }

  renderCourses(filtered);
}

/***********************
  COURSE MODAL LOGIC
************************/
function showCourseDetails(courseId) {
  const course = coursesData.find(c => c.id === courseId);
  if (!course) return;

  document.getElementById("modalTitle").innerText = course.title;
  document.getElementById("modalDescription").innerText = course.description;
  document.getElementById("modalDuration").innerText = course.duration;
  document.getElementById("modalFees").innerText = course.fees;
  document.getElementById("modalLevel").innerText = course.level;
  document.getElementById("modalPlacement").innerText = course.placement;
  document.getElementById("modalTrainers").innerText = course.trainers;

  const highlightsList = document.getElementById("modalHighlights");
  highlightsList.innerHTML = "";
  course.highlights.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    highlightsList.appendChild(li);
  });

  const modal = document.getElementById("courseModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  const modal = document.getElementById("courseModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

/***********************
  INITIAL LOAD
************************/
filterCourses("All");



/***********************
  CALLBACK FORM SUBMIT (API)
************************/
const callbackForm = document.getElementById("callbackForm");

callbackForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    name: callbackForm.name.value.trim(),
    email: callbackForm.email.value.trim(),
    phone: callbackForm.phone.value.trim(),
    college: callbackForm.college.value.trim(),
    degree: callbackForm.degree.value,
    interest: callbackForm.interest.value
  };

  try {
    const response = await fetch("http://localhost:5000/api/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      alert("Thank you! Our team will contact you shortly.");
      callbackForm.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Server error. Please try later.");
  }
});



/***********************
  CALLBACK FORM SUBMIT
************************/
// const callbackForm = document.getElementById("callbackForm");

// callbackForm.addEventListener("submit", function (e) {
//   e.preventDefault(); // page reload stop

//   const formData = {
//     name: callbackForm.name.value.trim(),
//     email: callbackForm.email.value.trim(),
//     phone: callbackForm.phone.value.trim(),
//     college: callbackForm.college.value.trim(),
//     degree: callbackForm.degree.value,
//     interest: callbackForm.interest.value
//   };

//   console.log("Callback Form Data:", formData);

//   // TEMP: success feedback
//   alert("Thank you! We will contact you shortly.");

//   callbackForm.reset();
// });



























































// /***********************
//   DOM REFERENCES
// ************************/
// const coursesContainer = document.getElementById("coursesContainer");
// const menuBtn = document.getElementById("menuBtn");
// const mobileMenu = document.getElementById("mobileMenu");

// /***********************
//   HAMBURGER MENU
// ************************/
// menuBtn.addEventListener("click", () => {
//   mobileMenu.classList.toggle("hidden");
// });

// /***********************
//   RENDER COURSES (ONE PLACE ONLY)
// ************************/
// function renderCourses(courses) {
//   coursesContainer.innerHTML = "";

//   courses.forEach(course => {
//     const card = document.createElement("div");

//     card.className = `
//       bg-white rounded-2xl overflow-hidden
//       border border-muted/30
//       transition-all duration-300
//       hover:-translate-y-1 hover:shadow-xl hover:border-accent
//     `;

//     card.innerHTML = `
//       <img
//         src="${course.image}"
//         alt="${course.title}"
//         class="w-full h-44 object-cover"
//       />

//       <div class="p-6">
//         <h3 class="font-heading text-xl font-semibold mb-2">
//           ${course.title}
//         </h3>

//         <p class="text-sm text-muted mb-4">
//           ${course.description.slice(0, 90)}...
//         </p>

//         <div class="flex justify-between items-center text-sm mb-4">
//           <span class="font-medium text-primary">
//             ⏱ ${course.duration}
//           </span>
//           <span class="font-medium text-primary">
//             💰 ${course.fees}
//           </span>
//         </div>

//         <button
//           onclick="showCourseDetails('${course.id}')"
//           class="w-full bg-accent text-white py-3 rounded-md font-semibold
//                  transition-all duration-300
//                  hover:opacity-90 hover:shadow-md"
//         >
//           View Full Details
//         </button>
//       </div>
//     `;

//     coursesContainer.appendChild(card);
//   });
// }

// /***********************
//   FILTER LOGIC (DATA ONLY)
// ************************/

// function filterCourses(category) {
//   // remove active from all
//   document.querySelectorAll(".filter-pill").forEach(btn => {
//     btn.classList.remove("active");

//     // jis button ki category match ho, use active karo
//     if (btn.dataset.category === category) {
//       btn.classList.add("active");
//     }
//   });

//   const filteredCourses =
//     category === "All"
//       ? coursesData
//       : coursesData.filter(course => course.category === category);

//   renderCourses(filteredCourses);
// }



// /***********************
//   COURSE MODAL LOGIC
// ************************/
// function showCourseDetails(courseId) {
//   const course = coursesData.find(c => c.id === courseId);
//   if (!course) return;

//   document.getElementById("modalTitle").innerText = course.title;
//   document.getElementById("modalDescription").innerText = course.description;
//   document.getElementById("modalDuration").innerText = course.duration;
//   document.getElementById("modalFees").innerText = course.fees;
//   document.getElementById("modalLevel").innerText = course.level;
//   document.getElementById("modalPlacement").innerText = course.placement;
//   document.getElementById("modalTrainers").innerText = course.trainers;

//   const highlightsList = document.getElementById("modalHighlights");
//   highlightsList.innerHTML = "";
//   course.highlights.forEach(item => {
//     const li = document.createElement("li");
//     li.innerText = item;
//     highlightsList.appendChild(li);
//   });

//   const modal = document.getElementById("courseModal");
//   modal.classList.remove("hidden");
//   modal.classList.add("flex");
// }

// function closeModal() {
//   const modal = document.getElementById("courseModal");
//   modal.classList.add("hidden");
//   modal.classList.remove("flex");
// }

// /***********************
//   INITIAL LOAD
// ************************/
// filterCourses("All");




//   function renderCourses(courses) {
//   coursesContainer.innerHTML = "";

//   courses.forEach(course => {
//     const card = document.createElement("div");

//     card.className = `
//       bg-white rounded-2xl overflow-hidden
//       border border-muted/30
//       transition-all duration-300
//       hover:-translate-y-1 hover:shadow-xl hover:border-accent
//     `;

//     card.innerHTML = `
//       <img
//         src="${course.image}"
//         alt="${course.title}"
//         class="w-full h-44 object-cover"
//       />

//       <div class="p-6">
//         <h3 class="font-heading text-xl font-semibold mb-2">
//           ${course.title}
//         </h3>

//         <p class="text-sm text-muted mb-4">
//           ${course.description.slice(0, 90)}...
//         </p>

//         <div class="flex justify-between items-center text-sm mb-4">
//           <span class="font-medium text-primary">
//             ⏱ ${course.duration}
//           </span>
//           <span class="font-medium text-primary">
//             💰 ${course.fees}
//           </span>
//         </div>

//         <button
//           onclick="showCourseDetails('${course.id}')"
//           class="w-full bg-accent text-white py-3 rounded-md font-semibold
//                  transition-all duration-300
//                  hover:opacity-90 hover:shadow-md"
//         >
//           View Full Details
//         </button>
//       </div>
//     `;

//     coursesContainer.appendChild(card);
//   });
// }



//   // hamburger logic
//   const menuBtn = document.getElementById("menuBtn");
//   const mobileMenu = document.getElementById("mobileMenu");

//   menuBtn.addEventListener("click", () => {
//     mobileMenu.classList.toggle("hidden");
//   });

//   // cards logic

//   const container = document.getElementById("categoriesContainer");

//   renderCourses(coursesData);

//   function filterCourses(category) {
//   const filteredCourses =
//     category === "All"
//       ? coursesData
//       : coursesData.filter(course => course.category === category);

//   renderCourses(filteredCourses);
// }


// // coursesData.forEach(course => {
// //   const card = document.createElement("div");

// //   card.className = `
// //     bg-white border border-muted/30 rounded-xl overflow-hidden
// //     transition-all duration-300
// //     hover:-translate-y-1 hover:shadow-xl hover:border-accent
// //   `;

// //   card.innerHTML = `
// //     <img src="${course.image}" class="w-full h-40 object-cover" />

// //     <div class="p-6 text-center">
// //       <h3 class="font-heading text-lg font-semibold mb-2">
// //         ${course.title}
// //       </h3>
// //       <p class="text-sm text-muted mb-4">
// //         ${course.shortDesc}
// //       </p>

// //       <button
// //         class="text-accent font-semibold text-sm hover:underline"
// //         onclick="showCourseDetails('${course.id}')"
// //       >
// //         View Course →
// //       </button>
// //     </div>
// //   `;

// //   container.appendChild(card);
// // });


// // Button click Logic (course Details)

// function showCourseDetails(courseId) {
//   const course = coursesData.find(c => c.id === courseId);
//   if (!course) return;

//   document.getElementById("modalTitle").innerText = course.title;
//   document.getElementById("modalDescription").innerText = course.description;
//   document.getElementById("modalDuration").innerText = course.duration;
//   document.getElementById("modalFees").innerText = course.fees;
//   document.getElementById("modalLevel").innerText = course.level;
//   document.getElementById("modalPlacement").innerText = course.placement;
//   document.getElementById("modalTrainers").innerText = course.trainers;

//   const highlightsList = document.getElementById("modalHighlights");
//   highlightsList.innerHTML = "";
//   course.highlights.forEach(item => {
//     const li = document.createElement("li");
//     li.innerText = item;
//     highlightsList.appendChild(li);
//   });

//   const modal = document.getElementById("courseModal");
//   modal.classList.remove("hidden");
//   modal.classList.add("flex");
// }

// function closeModal() {
//   const modal = document.getElementById("courseModal");
//   modal.classList.add("hidden");
//   modal.classList.remove("flex");
// }


// // JavaScript: Courses Cards Auto-Generate

// const coursesContainer = document.getElementById("coursesContainer");

// coursesData.forEach(course => {
//   const card = document.createElement("div");

//   card.className = `
//     bg-white rounded-2xl overflow-hidden
//     border border-muted/30
//     transition-all duration-300
//     hover:-translate-y-1 hover:shadow-xl hover:border-accent
//   `;

//   card.innerHTML = `
//     <img
//       src="${course.image}"
//       alt="${course.title}"
//       class="w-full h-44 object-cover"
//     />

//     <div class="p-6">
//       <h3 class="font-heading text-xl font-semibold mb-2">
//         ${course.title}
//       </h3>

//       <p class="text-sm text-muted mb-4">
//         ${course.description.slice(0, 90)}...
//       </p>

//       <div class="flex justify-between items-center text-sm mb-4">
//         <span class="font-medium text-primary">
//           ⏱ ${course.duration}
//         </span>
//         <span class="font-medium text-primary">
//           💰 ${course.fees}
//         </span>
//       </div>

//       <button
//         onclick="showCourseDetails('${course.id}')"
//         class="w-full bg-accent text-white py-3 rounded-md font-semibold
//                transition-all duration-300
//                hover:opacity-90 hover:shadow-md"
//       >
//         View Full Details
//       </button>
//     </div>
//   `;

//   coursesContainer.appendChild(card);
// });


// // JS (filter logic)
// function filterCourses(category) {
//   coursesContainer.innerHTML = "";

//   const filteredCourses =
//     category === "All"
//       ? coursesData
//       : coursesData.filter(course => course.category === category);

//   filteredCourses.forEach(course => {
//     const card = document.createElement("div");

//     card.className = `
//       bg-white rounded-xl border p-6
//       hover:shadow-xl transition
//     `;

//     card.innerHTML = `
//       <img src="${course.image}" class="w-full h-40 object-contain mb-4" />

//       <h3 class="font-heading text-lg font-semibold mb-2">
//         ${course.title}
//       </h3>

//       <p class="text-sm text-muted mb-3">
//         ${course.shortDesc}
//       </p>

//       <button
//         onclick="showCourseDetails('${course.id}')"
//         class="text-accent font-semibold"
//       >
//         View Details →
//       </button>
//     `;

//     coursesContainer.appendChild(card);
//   });
// }

// // Page load pe all courses
// filterCourses("All");
