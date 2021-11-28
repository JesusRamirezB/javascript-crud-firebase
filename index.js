const db = firebase.firestore();
const productForm = document.getElementById('product-form');
const productContainer = document.getElementById('products-container');
let editStatus = false;
let id = '';
const saveProduct = (name, cost, price) => db.collection('products').doc().set({
    name,
    cost,
    price
});

const getProducts = () => db.collection('products').get();

const getProduct = (id) => db.collection('products').doc(id).get();

const onGetProduct = (callback) => db.collection('products').onSnapshot(callback);

const deleteProduct = id => db.collection('products').doc(id).delete();

const updateProduct = (id, updatedProduct) => db.collection('products').doc(id).update(updatedProduct)

window.addEventListener('DOMContentLoaded', async(e) => {
    onGetProduct((querySnapshot) => {
        productContainer.innerHTML = '';
        querySnapshot.forEach(doc => {
            const product = doc.data();
            product.id = doc.id
            productContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
                <h3 class="h5">${product.name}</h3>
                <p>${product.price}</p>
                <div>
                    <button class="btn btn-primary btn-delete" data-id="${product.id}">Delete</button>
                    <button class="btn btn-secondary btn-edit" data-id="${product.id}">Edit</button>
                </div>
            </div>`;
            const btnsDelete = document.querySelectorAll('.btn-delete');
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', async(e) => {
                    await deleteProduct(e.target.dataset.id);
                });
            });
            const btnsEdit = document.querySelectorAll('.btn-edit');
            btnsEdit.forEach(btn => {
                btn.addEventListener('click', async(e) => {
                    const doc = await getProduct(e.target.dataset.id);
                    const product = doc.data();

                    editStatus = true;
                    id = doc.id;

                    productForm['product-name'].value = product.name;
                    productForm['product-cost'].value = product.price;
                    productForm['btn-product-form'].innerHTML = 'Update'

                });
            });
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

    if (!editStatus) {
        await saveProduct(name.value, price.value);
    } else {
        await updateProduct(id, {

            name: name.value,
            cost: cost.value,
            price: price
        });

        editStatus = false;
        id = '';
        productForm['btn-product-form'].innerText = 'Save';
    }

    await getProducts();

    productForm.reset();
    name.focus
});