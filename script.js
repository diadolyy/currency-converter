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