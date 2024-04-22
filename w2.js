function popup() {
    var popup = document.getElementById("popupwages");
    popup.classList.toggle("showPopup");
  }

$("#popupwages").on("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
});

const spanElement = document.getElementById('popupwages');

        // Check if it has child elements
        if (spanElement.childElementCount === 0) {
            // Add three input elements
            for (let i = 0; i < 3; i++) {
                const inputElement = document.createElement('input');
                inputElement.type = 'text'; // Set the input type as needed
                spanElement.appendChild(inputElement);
            }
        }