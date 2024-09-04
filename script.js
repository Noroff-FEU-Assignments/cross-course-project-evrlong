const API_key = 'ck_373266a3ca45ad8c4527360fda8642c911277e20';
const API_secret = 'cs_512fc3b1fa15a7862d53b4593e456a7e72c46164';

const product_API = `https://evrlong.one/wp-json/wc/v3/products?consumer_key=${API_key}&consumer_secret=${API_secret}`;

async function fetchAndDisplayProducts() {


  try {
    const response = await fetch(product_API); // Fetch APIdata
    const products = await response.json(); // Parse JSON response
 
    
    const objectDiv = document.querySelector('.productContainer'); 

    // Check products is an array and use forEach
    if (Array.isArray(products)) {
      products.forEach(product => {
        const imageSrc = product.images.length > 0 ? product.images[0].src : '';
        console.log(imageSrc)
        const productDiv = document.createElement('div');
      
        productDiv.innerHTML = `<a href="details.html?id=${product.id}" class="productCard">
            <h2>${product.name}</h2>
          <img src="${imageSrc}"> </a>
        `;

        // adds class
        productDiv.classList.add('product-item');

        // Append the productDiv to the objectDiv
        objectDiv.appendChild(productDiv);
      });
    } else {
      // Handle the case where products is not an array
      objectDiv.innerHTML = `<p>No products found.</p>`;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    // Display an possible error message
    document.querySelector('.objectDIV').innerHTML = `<p>Failed to load products.</p>`;
  }
}

// Call the function
fetchAndDisplayProducts();
