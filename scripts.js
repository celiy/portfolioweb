document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.caixaRounded');
    let currentIndex = 0;

    function showBox(index) {
        boxes.forEach(box => box.style.display = 'none'); // Hide all boxes
        boxes[index].style.display = 'block'; // Show the current box
    }

    function switchBoxes() {
        showBox(currentIndex);
        currentIndex = (currentIndex + 1) % boxes.length; // Move to the next box, loop back to the first one
    }

    setInterval(switchBoxes, 3000); // Change every 3 seconds

    // Initially show the first box
    showBox(currentIndex);
});