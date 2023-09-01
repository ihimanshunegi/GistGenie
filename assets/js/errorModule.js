// Define the errorModule under the window object
window.errorModule = {
    // Function to display an error message
    showError: function (errorMessage) {
        // Select DOM elements
        const error = document.querySelector(".error");
        const summaryOutput = document.querySelector(".summary");
        const loader = document.querySelector(".loader");

        // Hide loader and summary, show error
        loader.classList.add("hidden");
        summaryOutput.classList.add("hidden");
        error.classList.remove("hidden");

        // Set the error message
        error.textContent = errorMessage;
    },

    // Function to clear the error message
    clearError: function () {
        // Select the error element
        const error = document.querySelector(".error");

        // Hide the error element and clear its content
        error.classList.add("hidden");
        error.textContent = "";
    }
};
