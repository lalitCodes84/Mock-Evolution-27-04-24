document.addEventListener("DOMContentLoaded", function(){
    let productGrid = document.getElementById("root");
    let categoryFilter = document.getElementById("categoryFilter");
    let searchInput =document.getElementById("searchInput");
    let sortOrder =document.getElementById("sortOrder");

    // Fetch products from API
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(products => {
        displayProducts(products);
        popularCategories(products);
        applyFilters(products);
    })
    .catch(error => console.log("Fetching Products Error :", error));

    // Here is the function to display products
    function displayProducts(products){
        productGrid.innerHTML="";
        products.forEach(product => {
            let productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
            
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price : $${product.price}</p>
            `;
            productGrid.appendChild(productCard);
        })
    }

    // Function to display products according to category selection
    
    function popularCategories(products){
        let categories = [...new Set(products.map(product => products.category))];
        categories.forEach(category => {
            let option = document.createElement("option");
            option.value =category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Creating Function to apply filters

    function applyFilters(products){
        categoryFilter.addEventListener("change", () => {
            let selectedCategory= categoryFilter.value;
            let filteredProducts= selectedCategory ? products.filter(product => product.category === selectedCategory)
            : products;
            displayProducts(filteredProducts);
        });
    }

    // Applying Event listener in search button
    searchInput.addEventListener("input", () => {
        let searchTerm = searchInput.value.toLowerCase();
        let filteredProducts = products.filter(products => {
            products.title.toLowerCase().includes(searchTerm)
        });
        displayProducts(filteredProducts);
    })
    sortOrder.addEventListener("change", () => {
        let sortProducts =[...products];
        if(sortOrder.value === "ascend"){
            sortedProducts.sort((a,b) => a.price - b.price);
        }else{
            sortedProducts.sort((a,b) => b.price - a.price )
        }
        displayProducts(sortedProducts);
    })

});