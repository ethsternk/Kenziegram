let latestFetchStamp = Date.now();
let errorCount = 0;
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
        .then(res => res.json())
        .then(duck => {
            // console.log(data);
            for (let i = 0; i < duck.images.length; i++) {
                document.getElementById("images").innerHTML += `<img src="${duck.images[i]}">`;
            }
            latestFetchStamp = Date.now();
            setTimeout(fetchImages, 5000);
        })
        .catch(error => {
            errorCount++;
            if (errorCount > 1) {
                console.log("Another error, stopping polling.");
            } else {
                console.log("Error, trying again...");
                fetchImages();
            }
        })
}

fetchImages();

// document.getElementById("updateButton").addEventListener("click", (e) => {
//     fetchImages();
// })