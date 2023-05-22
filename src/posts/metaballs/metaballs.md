---
title: Metaballs
description: How to create blob like graphics proceduraly
date: "2023-02-15"
tags:
 - Creative Coding
 - Interactive
publish: false
---
<script>
  import SliderDemo from './SliderDemo.svelte'
</script>

## Introduction
Metaballs are a way to create smooth, organic shapes that look like "blobs". 

Simply put, we try to create that circle morphing effect you see here:
<SliderDemo sliderPosition={34} />

## Setup
The code snippets that I'll show you will be written in JavaScript. I just included the important bits so you can understand the idea and implement something similar yourself. But be creative and give it you own twist!

Usualy, when working with an animated canvas, I structure my code to have an `update()` and a `draw()` function. These will then be called from a loop or something like the `requestAnimationFrame(cb)` callback.

```ts
let frame: number;

function animate() {
    update();
    draw();
    frame = requestAnimationFrame(animate);
}

animate()

stopBtn.click = () => cancelAnimationFrame(frame);
```

We'll also define an array with some blobs. The points each have a velocity and a position in both x and y axis. I'll also add a radius r for later.

```ts
let blobs = [
  { x: 30, y: 50, r: 5 },
  { x: 60, y: 40, r: 10 },
  { x: 120, y: 20, r: 15 },
  { x: 30, y: 100, r: 5 },
  { x: 100, y: 100, r: 8 },
]
```

The `update()` function alters the state of whatever you're trying to show each iteration. In our case this can be in many different ways: it could move the blobs as if they gravitate to each other like in some sort of gravity system or they could just move randomly.

The interesting part regarding metaballs happens in the `draw()` function. There, a value for every pixel is calculated which decides how that pixel appears.

## Update
For simplicity's sake, we'll just move some points randomly on the canvas. We'll later make some improvements to make it look more interesting.

```ts
function update() {
  blobs.forEach((blob) => {
    blob.x += Math.random() * 2 - 1
    blob.y += Math.random() * 2 - 1
  })
}
```

## Draw
This is where the complexity begins. We want to calculate every pixels distance to every blob and then get a value out of it with a  falloff function. Comparing this value with a threshold then tells us if we want to draw that pixel solid or not.