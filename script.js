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

document.getElementById("userForm").addEventListener("submit", function(event){
    event.preventDefault();

    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;

    const userData={
        name: name,
        email:email
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response=>response.json())
    .then(data=>{
        document.getElementById("response").innerHTML="Данные отправлены успешно!";
        console.log("Ответ от сервера:", data);

    })
    .catch(error=>{
        document.getElementById("response").innerHTML="Произошла ошибка!";
        console.error("Ошибка:", error);
    })

})