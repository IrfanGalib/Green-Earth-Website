const categoryContainer = document.getElementById("categoryContainer");

const cardContainer = document.getElementById("cardContainer");

const cartContainer = document.getElementById("cartContainer");

let carts = [];

// JS For Categories
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      // console.log(categories);
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};
const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += ` <li id="${cat.id}"
              class="hover:bg-[#15803D] hover:rounded p-2 hover:text-white cursor-pointer"
            >
              ${cat.category_name}
            </li>`;
  });
  // Call Section
  const allCategoriesLi = Array.from(
    categoryContainer.querySelectorAll("li")
  ).find((li) => li.innerText.trim() === "All Categories");
  if (allCategoriesLi) {
    allCategoriesLi.classList.add(
      `bg-[#15803D]`,
      `rounded`,
      `p-2`,
      `text-white`
    );
  }

  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove(`bg-[#15803D]`, `rounded`, `text-white`);
    });

    if (e.target.localName === "li") {
      //   console.log(e.target.id);
      showLoading();
      e.target.classList.add(`bg-[#15803D]`, `rounded`, `p-2`, `text-white`);
      if (e.target.innerText.trim() === "All Categories") {
        allcards();
      } else {
        cards(e.target.id);
      }
    }
  });
};

// JS For Cards For All Plants
const allcards = (id) => {
  // console.log(id);
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => {
      showCards(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCardsall = (plants) => {
  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    cardContainer.innerHTML += `
    <div class="bg-white rounded-lg p-4 space-y-4 shadow flex flex-col">
            <img class="rounded-lg w-full h-auto object-contain" src="${plant.image}" alt="" />
            <h4 class="font-semibold cursor-pointer plant-title"
          data-name="${plant.name}"
          data-desc="${plant.description}"
          data-img="${plant.image}"
          data-price="${plant.price}"
          data-category="${plant.category}"">${plant.name}</h4>
            <p class="text-sm text-gray-600">
              ${plant.description}
            </p>
            <div class="flex justify-between items-center">
              <button class="bg-[#DCFCE7] rounded-full px-3 py-1 text-sm">
                ${plant.category}
              </button>
              <p>৳<span class="cardPrice">${plant.price}</span></p>
            </div>
            <button class="w-full bg-[#15803D] text-white rounded-full py-2">
              Add to Cart
            </button>
          </div>`;
  });
};
// JS For Cards
const cards = (id) => {
  // console.log(id);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showCards(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCards = (plants) => {
  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    cardContainer.innerHTML += `
    <div class="bg-white rounded-lg p-4 space-y-4 shadow  flex flex-col">
            <img class="rounded-lg w-full h-auto object-contain" src="${plant.image}" alt="" />
            <h4 class="font-semibold cursor-pointer plant-title"
          data-name="${plant.name}"
          data-desc="${plant.description}"
          data-img="${plant.image}"
          data-price="${plant.price}"
          data-category="${plant.category}">${plant.name}</h4>
            <p class="text-sm text-gray-600">
              ${plant.description}
            </p>
            <div class="flex justify-between items-center">
              <button class="bg-[#DCFCE7] rounded-full px-3 py-1 text-sm">
                ${plant.category}
              </button>
              <p>৳<span class="cardPrice">${plant.price}</span></p>
            </div>
            <button class="w-full bg-[#15803D] text-white rounded-full py-2">
              Add to Cart
            </button>
          </div>`;
  });
};

//JS For Modal
cardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("plant-title")) {
    const name = e.target.dataset.name;
    const desc = e.target.dataset.desc;
    const img = e.target.dataset.img;
    const price = e.target.dataset.price;
    const category = e.target.dataset.category;

    document.getElementById("modalTitle").innerText = name;
    document.getElementById("modalDesc").innerText = desc;
    document.getElementById("modalImage").src = img;
    document.getElementById("modalPrice").innerText = price;
    document.getElementById("modalCategory").innerText = category;

    document.getElementById("treeModal").showModal();
  }
});

// JS For Cart
cardContainer.addEventListener("click", (e) => {
  // console.log(e.target.innerText);
  if (e.target.innerText === "Add to Cart") {
    handleCarts(e);
  }
});

const handleCarts = (e) => {
  const card = e.target.closest("div.bg-white");
  const title = card.querySelector("h4").innerText;
  const price = card.querySelector(".cardPrice").innerText;

  carts.push({
    title,
    price,
  });
  showCarts(carts);
};

const showCarts = (carts) => {
  cartContainer.innerHTML = "";
  let total = 0;

  carts.forEach((cart) => {
    total += parseFloat(cart.price);
    cartContainer.innerHTML += `
   <div
              class="bg-[#F0FDF4] p-2 rounded-xl flex justify-between items-center mb-4"
            >
           <div>
              <h4>${cart.title}</h4>
              <p class="text-[#8C8C8C]">৳<span>${cart.price}</span> x <span>1</span></p>
            </div>
            <div><i class="fa-solid fa-xmark text-[#8C8C8C]"></i></div>
          </div>
    `;
  });
  document.getElementById("cartTotal").innerText = total;

  const removeButtons = cartContainer.querySelectorAll(".fa-xmark");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const crossId = e.target.getAttribute("data-index");
      carts.splice(crossId, 1);
      showCarts(carts);
    });
  });
};

// JS For Loading
const showLoading = () => {
  cardContainer.innerHTML = `<div class=" flex justify-center items-center mx-auto w-full">
            <span class="loading loading-infinity loading-xs"></span>
            <span class="loading loading-infinity loading-sm"></span>
            <span class="loading loading-infinity loading-md"></span>
            <span class="loading loading-infinity loading-lg"></span>
            <span class="loading loading-infinity loading-xl"></span>
          </div>`;
};

loadCategory();
allcards();
