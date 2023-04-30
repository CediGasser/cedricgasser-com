<script lang="ts">
  import { onMount } from "svelte"

  export let sliderPosition = 0;
  let circleCanvas: HTMLCanvasElement;
  let circleCtx: CanvasRenderingContext2D;

  let metaballsCanvas: HTMLCanvasElement;
  let metaballsCtx: CanvasRenderingContext2D;

  let canvasHeight = 150;

  $: circles = [
    { x: 100 + sliderPosition, y: canvasHeight / 2, radius: 40, },
    { x: 300 - sliderPosition, y: canvasHeight / 2, radius: 40, },
  ];

  $: metaballs = [
    { x: 100 + sliderPosition, y: canvasHeight / 2, radius: 35, },
    { x: 300 - sliderPosition, y: canvasHeight / 2, radius: 35, },
  ];

  const drawCircles = () => {
    circleCtx.clearRect(0, 0, circleCanvas.width, circleCanvas.height);
    circleCtx.beginPath();
    circles.forEach((circle) => {
      circleCtx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    });
    circleCtx.fillStyle = "firebrick";
    circleCtx.fill();
  };

  const drawMetaballs = () => {
    metaballsCtx.clearRect(0, 0, metaballsCanvas.width, metaballsCanvas.height);
    // loop through every pixel and calculate the distance to each metaball
    for (let x = 0; x < metaballsCanvas.width; x++) {
      for (let y = 0; y < metaballsCanvas.height; y++) {
        let totalDistance = 0;
        metaballs.forEach((metaball) => {
          const distance = Math.sqrt(
            Math.pow(metaball.x - x, 2) + Math.pow(metaball.y - y, 2)
          );
          totalDistance += metaball.radius / distance;
        });
        if (totalDistance > 1) {
          metaballsCtx.fillStyle = "firebrick";
          metaballsCtx.fillRect(x, y, 1, 1);
        }
      }
    }
  };

  onMount(() => {
    circleCtx = circleCanvas.getContext("2d");
    metaballsCtx = metaballsCanvas.getContext("2d");

    drawCircles();
    drawMetaballs();
  });

  $: if (circleCtx && metaballsCtx && sliderPosition) {
    drawCircles();
    drawMetaballs();
  }
</script>

<div>
  <p>Regular circles</p>
  <canvas bind:this={circleCanvas} height={canvasHeight} width="400" />

  <p>Metaballs</p>
  <canvas bind:this={metaballsCanvas} height={canvasHeight} width="400" />
  
  <input type="range" min="0" max="100" bind:value={sliderPosition} />
</div>

<style>
  p {
    margin-top: 0;
    color: #999;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  input {
    display: block;
    margin: 0 auto;
  }
</style>