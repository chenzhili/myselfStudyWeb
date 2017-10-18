var n = 1;
document.getElementById("btn").addEventListener("click",function(){
    document.body.appendChild(`<p>${n++}</p>`);
});