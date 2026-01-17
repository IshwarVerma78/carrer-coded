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

function handleEnrollClick() {
  // 1. Close modal
  closeModal();

  // 2. Smooth scroll to callback section
  const callbackSection = document.getElementById("callback");
  if (callbackSection) {
    callbackSection.scrollIntoView({ behavior: "smooth" });
  }
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
  VISITOR COUNTER
************************/
async function loadVisitorCount() {
  try {
    const response = await fetch("http://localhost:5000/api/visitor");
    const data = await response.json();

    if (data.success) {
      document.getElementById("visitorCount").innerText = data.count;
    }
  } catch (error) {
    console.error("Visitor count error:", error);
  }
}

// Page load
loadVisitorCount();



/***********************
  WHY JOIN US RENDER (COURSE STYLE)
************************/
const whyContainer = document.getElementById("whyContainer");

whyData.forEach(item => {
  const card = document.createElement("div");

  card.className = `
    bg-white rounded-2xl overflow-hidden
    border border-muted/30
    transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl hover:border-accent
  `;

  card.innerHTML = `
    <!-- Image -->
    <img
      src="${item.image}"
      alt="${item.title}"
      class="w-full h-40 object-cover"
    />

    <!-- Content -->
    <div class="p-6">
      <h3 class="font-heading text-lg font-semibold mb-3">
        ${item.title}
      </h3>

      <p class="text-sm text-primary mb-4">
        ${item.description}
      </p>

      <ul class="text-sm text-secondary space-y-1">
        ${item.points.map(p => `<li>✔ ${p}</li>`).join("")}
      </ul>
    </div>
  `;

  whyContainer.appendChild(card);
});


/***********************
  INSTRUCTORS RENDER
************************/
const instructorsContainer = document.getElementById("instructorsContainer");

instructorsData.forEach(inst => {
  const card = document.createElement("div");

  card.className = `
    bg-white rounded-2xl overflow-hidden
    border border-muted/30
    transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl hover:border-accent
  `;

  card.innerHTML = `
    <!-- Image -->
    <img
      src="${inst.image}"
      alt="${inst.name}"
      class="w-full h-48 object-contain bg-secondary/10"
    />

    <!-- Content -->
    <div class="p-6">
      <h3 class="font-heading text-xl font-semibold mb-1">
        ${inst.name}
      </h3>

      <p class="text-sm text-accent font-medium mb-2">
        ${inst.role}
      </p>

      <p class="text-sm text-muted mb-3">
        ${inst.experience}
      </p>

      <p class="text-sm text-muted mb-4">
        ${inst.bio}
      </p>

      <div class="flex flex-wrap gap-2">
        ${inst.expertise
          .map(
            skill => `
          <span class="text-xs px-3 py-1 bg-secondary/20 rounded-full text-primary">
            ${skill}
          </span>`
          )
          .join("")}
      </div>
    </div>
  `;

  instructorsContainer.appendChild(card);
});


/***********************
  PREMIUM BATCH CARDS
************************/
const batchesContainer = document.getElementById("batchesContainer");

batchesData.forEach(batch => {
  const card = document.createElement("div");

  card.className = `
    bg-white rounded-2xl overflow-hidden
    border border-muted/30
    transition-all duration-300
    hover:shadow-2xl hover:-translate-y-1
  `;

  card.innerHTML = `
    <!-- TOP IMAGE AREA -->
    <div class="relative bg-secondary/10 p-6">
      <span class="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
        ${batch.badge}
      </span>

     

      <h3 class="font-heading text-xl font-semibold text-primary mb-2">
        ${batch.title}
      </h3>

      <p class="text-sm text-primary/80">
        ${batch.description}
      </p>
    </div>

    <!-- DETAILS -->
    <div class="p-6 space-y-4 text-sm">

      <div class="flex items-start gap-3">
        <span>🎓</span>
        <p>${batch.eligibility}</p>
      </div>

      <div class="flex items-start gap-3">
        <span>📅</span>
        <p><strong>Next Batch:</strong> ${batch.startDate}</p>
      </div>

      <div class="flex items-start gap-3">
        <span>⏳</span>
        <p><strong>Duration:</strong> ${batch.duration}</p>
      </div>

      <div class="flex items-start gap-3">
        <span>💻</span>
        <p><strong>Mode:</strong> ${batch.mode}</p>
      </div>

    </div>

    <!-- ACTIONS -->
    <div class="p-6 flex gap-4">
      <a
        href="${batch.brochure}"
        class="flex-1 text-center border border-primary text-primary py-2 rounded-md font-medium hover:bg-primary hover:text-white transition"
      >
        Download Brochure
      </a>

      <button
        class="flex-1 bg-accent text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
      >
        ${batch.cta}
      </button>
    </div>
  `;

  batchesContainer.appendChild(card);
});

















































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
