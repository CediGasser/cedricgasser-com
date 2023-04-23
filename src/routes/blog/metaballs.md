---
title: Metaballs
date: "2023-02-15"
publish: false
---
<script>
  import MetaballsSliderDemo from './components/MetaballsSliderDemo.svelte'
</script>

## Introduction
Metaballs are a way to create smooth, organic shapes that look like "blobs". 

Simply put, we try to create that circle morphing effect you see here:
<MetaballsSliderDemo sliderPosition={34} />

## Setup
The code snippets that I'll show you will be written in JavaScript. I just included the important bits so you can understand the idea and implement something similar yourself. But be creative and give it you own twist!

Usualy, when working with an animated canvas, I structure my code to have an `update()` and a `js draw()` function. These will then be called from a loop or something like the `js requestAnimationFrame(cb)` callback.

```js
let frame: number;

function animate() {
    update();
    draw();
    frame = requestAnimationFrame(animate);
}

animate()

stopBtn.click = () => cancelAnimationFrame(frame);
```