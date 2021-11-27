const db = firebase.firestore();
const taskForm = document.getElementById('task-form');

taskForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const name = taskForm['product-name'].value;
    const price = taskForm['product-price'].value;
    const response = await db.collection('products').doc().set({
        name,
        price
    })
    console.log(response);
    console.log(title, description);
});