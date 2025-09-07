const categoryContainer = document.getElementById("categoryContainer");

const cardContainer = document.getElementById("cardContainer");

// JS For Categories
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      console.log(categories);
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
  console.log(id);
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
            <h4 class="font-semibold">${plant.name}</h4>
            <p class="text-sm text-gray-600">
              ${plant.description}
            </p>
            <div class="flex justify-between items-center">
              <button class="bg-[#DCFCE7] rounded-full px-3 py-1 text-sm">
                ${plant.category}
              </button>
              <p>৳<span>${plant.price}</span></p>
            </div>
            <button class="w-full bg-[#15803D] text-white rounded-full py-2">
              Add to Cart
            </button>
          </div>`;
  });
};
// JS For Cards
const cards = (id) => {
  console.log(id);
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
            <h4 class="font-semibold">${plant.name}</h4>
            <p class="text-sm text-gray-600">
              ${plant.description}
            </p>
            <div class="flex justify-between items-center">
              <button class="bg-[#DCFCE7] rounded-full px-3 py-1 text-sm">
                ${plant.category}
              </button>
              <p>৳<span>${plant.price}</span></p>
            </div>
            <button class="w-full bg-[#15803D] text-white rounded-full py-2">
              Add to Cart
            </button>
          </div>`;
  });
};

loadCategory();
allcards();
