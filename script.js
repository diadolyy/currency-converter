document.getElementById("loadBtn").addEventListener("click", async function() {
    const userListDiv=document.getElementById("userList");
    const loadingDiv=document.getElementById("loading");

    loadingDiv.style.display='block';
    try{
        const response=await fetch("https://jsonplaceholder.typicode.com/users");
        const users=await response.json();

        loadingDiv.style.display='none';
        userListDiv.innerHTML="<ul>"+users.map(user=> `<li>${user.name}</li>`).join('')+"</ul>";

    }catch(error){
        loadingDiv.style.display='none';
        userListDiv.innerHTML="Произошла ошибка при загрузке данных";
        console.error("Ошибка:", error);
    }
});

document.getElementById("userForm").addEventListener("submit", async function(event){
    event.preventDefault();//отменяем стандартное поведение формы

    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const tel=document.getElementById("tel").value;
    const gender=document.querySelector('input[name="gender"]:checked');
    const terms=document.querySelector('input[name="terms"]:checked');

    //валидация
    if(!name || !email || !tel || !gender || !terms){
        alert("Заполните все поля.");
        return;
    }

    //формируем объект с данными 
    const userData={
        name: name,
        email:email,
        tel:tel,
        gender:gender.value,
        terms:terms.checked
    };

    if(!email || !/\S+@\S+\.\S+/.test(email)){
        alert("Введите корректный email.");
        return;
    }

    //отправка данных
    try{
        const response= await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data=await response.json();

        document.getElementById("response").innerHTML="Данные отправлены успешно!";
        console.log("Ответ от сервера:", data);

    }catch(error){
        document.getElementById("response").innerHTML="Произошла ошибка!";
        console.error("Ошибка:", error);
    }

})