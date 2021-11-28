const db = firebase.firestore();
const productForm = document.getElementById('product-form');
const productContainer = document.getElementById('products-container');
const saveProduct = (name, cost, price) => db.collection('products').doc().set({
    name,
    cost,
    price
});

const getProduct = () => db.collection('products').get();

const onGetProduct = (callback) => db.collection('products').onSnapshot(callback);

window.addEventListener('DOMContentLoaded', async(e) => {
    onGetProduct((querySnapshot) => {
        productContainer.innerHTML = '';
        querySnapshot.forEach(doc => {
            console.log(doc.data());
            const product = doc.data();
            productContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
                <h3 class="h5">${product.name}</h3>
                <p>${product.price}</p>
                <div>
                    <button class="btn btn-primary">Delete</button>
                    <button class="btn btn-secondary">Edit</button>
                </div>
            </div>`
        });
    })

});

productForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const name = productForm['product-name'];
    const cost = productForm['product-cost'];
    const category = productForm['product-category'];
    const price = (Number(cost.value)) * (Number(category.value));

    await saveProduct(name.value, cost.value, price);

    await getProduct();

    productForm.reset();
    name.focus
});