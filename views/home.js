let latestFetchStamp = Date.now();
// console.log(latestFetchStamp);

function fetchImages() {
    fetch("/images", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                after: latestFetchStamp
            }),
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            for (let i = 0; i < data.images.length; i++) {
                document.getElementById("images").innerHTML += `<img src="${data.images[i]}">`;
            }
            latestFetchStamp = Date.now();
            setTimeout(fetchImages, 5000);
        })
}

fetchImages();

// document.getElementById("updateButton").addEventListener("click", (e) => {
//     fetchImages();
// })