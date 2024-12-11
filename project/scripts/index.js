document.addEventListener("DOMContentLoaded", () => {
  const dataUrl = "./data/data.json";
  const featureGrid = document.querySelector(".feature-grid");
  const categoryGrid = document.querySelector(".category-grid");
  const createFeaturedStory = (story) => {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.src = story.image;
    img.alt = story.title;
    img.loading = "lazy";

    const h3 = document.createElement("h3");
    h3.textContent = story.title;
    const p = document.createElement("p");
    p.textContent = story.description;

    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);
    return article;
  };

  const createCategory = (category) => {
    const div = document.createElement("div");
    div.classList.add("category");
    const img = document.createElement("img");
    img.src = category.image;
    img.alt = category.title;
    img.loading = "lazy";
    const h3 = document.createElement("h3");
    h3.textContent = category.title;
    div.appendChild(img);
    div.appendChild(h3);
    return div;
  };

  const createElementsBatch = (data) => {
    const featureFragment = document.createDocumentFragment();
    const categoryFragment = document.createDocumentFragment();

    data.featuredStories.forEach((story) => {
      const storyElement = createFeaturedStory(story);
      featureFragment.appendChild(storyElement);
    });

    data.categories.forEach((category) => {
      const categoryElement = createCategory(category);
      categoryFragment.appendChild(categoryElement);
    });

    featureGrid.appendChild(featureFragment);
    categoryGrid.appendChild(categoryFragment);
  };

  fetch(dataUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json();
    })
    .then((data) => {
      createElementsBatch(data);
    })
    .catch((error) => {
      console.error("Error al cargar los datos:", error);
    });
});
