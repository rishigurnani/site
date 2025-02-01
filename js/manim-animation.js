// js/manim-animation.js

let angle = 0;
let sides = 6; // Number of sides for the polygon

function setup() {
  // Get the container element
  let container = document.getElementById('hero-canvas-container');
  // Get its dimensions
  let w = container.offsetWidth;
  let h = container.offsetHeight;
  // Create a canvas that fills the container
  let canvas = createCanvas(w, h);
  canvas.parent(container);
  angleMode(RADIANS);
  noFill();
}

function draw() {
  // Clear background
  background(20, 20, 30); // Dark background for a sleek look

  // Translate to the center of the canvas
  translate(width / 2, height / 2);

  // Use a base radius relative to the canvas size (20% of the smaller dimension)
  let baseRadius = min(width, height) * 0.2;
  // Create a pulsating effect
  let radius = baseRadius + 30 * sin(frameCount * 0.02);

  // Draw a rotating polygon
  strokeWeight(2);
  stroke(100, 200, 255);
  beginShape();
  for (let i = 0; i < sides; i++) {
    let a = angle + TWO_PI * i / sides;
    let x = radius * cos(a);
    let y = radius * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);

  // Draw dynamic lines from the center to each vertex
  strokeWeight(1);
  for (let i = 0; i < sides; i++) {
    let a = angle + TWO_PI * i / sides;
    let x = radius * cos(a);
    let y = radius * sin(a);
    stroke(200, 100, 255, 150);
    line(0, 0, x, y);
  }

  // Draw an animated outer circle with changing color
  strokeWeight(3);
  let outerRadius = radius + 50 + 10 * cos(frameCount * 0.05);
  let r = map(sin(frameCount * 0.03), -1, 1, 100, 255);
  let g = map(cos(frameCount * 0.04), -1, 1, 100, 255);
  stroke(r, g, 200);
  ellipse(0, 0, outerRadius * 2);

  // Update the rotation angle
  angle += 0.01;
}

// This function ensures the canvas resizes when the window is resized
function windowResized() {
  let container = document.getElementById('hero-canvas-container');
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

