document.getElementById("loadBtn").addEventListener("click", async function() {
    const userListDiv=document.getElementById("userList");
    try{
        const response=await fetch("https://jsonplaceholder.typicode.com/users");
        const users=await response.json();

        userListDiv.innerHTML="<ul>"+users.map(user=> `<li>${user.name}</li>`);

    }catch(error){
        userListDiv.innerHTML="Произошла ошибка при загрузке данных";
        console.error("Ошибка:", error);
    }
});