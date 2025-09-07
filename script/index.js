const categoryContainer = document.getElementById("categoryContainer");

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.categories);
      const categories = data.categories;
      categories.forEach((cat) => {
        categoryContainer.innerHTML += ` <li
              class="hover:bg-[#15803D] hover:rounded p-2 hover:text-white cursor-pointer"
            >
              ${cat.category_name}
            </li>`;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
loadCategory();
