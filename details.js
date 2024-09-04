const API_key = 'ck_373266a3ca45ad8c4527360fda8642c911277e20';
const API_secret = 'cs_512fc3b1fa15a7862d53b4593e456a7e72c46164';
const product_API = `https://evrlong.one/wp-json/wc/v3/products`;

const detailContainer = document.querySelector(".product-details");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = `${product_API}/${id}?consumer_key=${API_key}&consumer_secret=${API_secret}`;

console.log(id);

async function fetchAndDisplayProduct() {
  try {
    const response = await fetch(url); // Fetch API data for a specific id
    const product = await response.json(); // Parse JSON response

    console.log(product);

    // Check if the product is valid
    if (product && product.id) {

      // Create a new div for the product
      const productDiv = document.createElement('div');
      productDiv.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
      `;

      // Add a class to the div
      productDiv.classList.add('product-item');

      // Append the new div to the original detailContainer
      detailContainer.appendChild(productDiv);
    } else {
      // Handle the case where no valid product is found
      detailContainer.innerHTML = `<p>This site is empty</p>`;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    // Display an error message
    detailContainer.innerHTML = `<p>Failed to load product details.</p>`;
  }
}

// Call the function to fetch and display the product
fetchAndDisplayProduct();
