let url = "http://localhost:1337/uploads";

let getImages = () => {
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      let parent = document.querySelector(".image-container");

      data.forEach((image) => {
        let imageElement = document.createElement("img");
        let src =
          "data:image/" +
          image.img.contentType +
          ";base64," +
          image.img.data.data.toString('base64');

        imageElement.setAttribute("src", src);

    

        console.log(image);
        parent.appendChild(imageElement);
      });
    });
};

function main() {
  getImages();
}

main();
