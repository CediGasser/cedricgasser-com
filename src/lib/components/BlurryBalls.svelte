<script lang="ts">
  import { onMount } from 'svelte'

  let frame = $state(0)
  let balls: Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    charge: number
  }> = $state([])

  const FORCE_COEFICIENT = 100
  const MAX_VELOCITY = 70
  const PUSH_BACK = 1
  const STEPS = 0.001
  const MIN_BALL_SIZE = 200
  const MAX_BALL_SIZE = 300
  const RANDOM_MOVEMENT = 10
  const DETERENT_CHARGE = -50
  const BORDER_AREA = 0.1
  const BALL_COUNT = 6

  let width = $state(0)
  let height = $state(0)

  const getBallsCenter = () => {
    const { totalX, totalY } = balls.reduce(
      (acc, ball) => {
        acc.totalX += ball.x
        acc.totalY += ball.y
        return acc
      },
      { totalX: 0, totalY: 0 }
    )

    return {
      x: totalX / balls.length,
      y: totalY / balls.length,
    }
  }

  export const pulseDeterent = () => {
    const { x, y } = getBallsCenter()

    let deterent = {
      x,
      y,
      vx: 0,
      vy: 0,
      size: 100,
      color: `trasparent`,
      charge: DETERENT_CHARGE,
    }

    balls = [...balls, deterent]

    const interval = setInterval(() => {
      deterent.charge += 1
    }, 10)

    setTimeout(() => {
      balls = balls.filter((ball) => ball.charge >= 0)
      clearInterval(interval)
    }, 250)
  }

  const setup = () => {
    balls = Array(BALL_COUNT)
      .fill(0)
      .map(() => ({
        x: width * BORDER_AREA + Math.random() * width * (1 - 2 * BORDER_AREA),
        y:
          height * BORDER_AREA + Math.random() * height * (1 - 2 * BORDER_AREA),
        vx: Math.random() * 10 - 5,
        vy: Math.random() * 10 - 5,
        size: Math.random() * MIN_BALL_SIZE + MAX_BALL_SIZE - MIN_BALL_SIZE,
        color: ['red', 'blue'][Math.round(Math.random())],
        charge: 1,
      }))
  }

  let tPrevious = 0

  const update = (t: number) => {
    // Calculate time since last frame
    // cap at some delta so unexpected long frames don't mess up the simulation
    let tDelta = Math.min(t - tPrevious, 200)

    // Update the velocities of the balls based on the forces between them
    for (let i = 0; i < balls.length; i++) {
      const ball1 = balls[i]
      for (let j = i + 1; j < balls.length; j++) {
        const ball2 = balls[j]

        // Calculate the distance between the balls
        const dx = ball1.x - ball2.x
        const dy = ball1.y - ball2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Calculate the force of attraction
        const force =
          (FORCE_COEFICIENT / distance) * ball1.charge * ball2.charge

        // Update the velocities of the balls based on the force
        ball1.vx -= (force * dx) / distance
        ball1.vy -= (force * dy) / distance
        ball2.vx += (force * dx) / distance
        ball2.vy += (force * dy) / distance
      }
    }

    // Update the positions of the balls based on their velocities
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i]

      // Dampen the velocities after a certain max value
      if (ball.vx > MAX_VELOCITY || ball.vx < MAX_VELOCITY) {
        ball.vx *= 0.99
      }
      if (ball.vy > MAX_VELOCITY || ball.vy < MAX_VELOCITY) {
        ball.vy *= 0.99
      }

      ball.x += ball.vx * tDelta * STEPS
      ball.y += ball.vy * tDelta * STEPS

      // Bounce the balls off the walls and slow them down
      if (ball.x < 0) {
        ball.vx = Math.abs(ball.vx)
      } else if (ball.x > width) {
        ball.vx = Math.abs(ball.vx) * -1
      }
      if (ball.y < 0) {
        ball.vy = -ball.vy * 0.9
      } else if (ball.y > height) {
        ball.vy = Math.abs(ball.vy) * -1
      }

      // Slow the balls down at border areas
      if (ball.x < height * BORDER_AREA) {
        ball.vx += PUSH_BACK
      }
      if (ball.x > width * (1 - BORDER_AREA)) {
        ball.vx -= PUSH_BACK
      }
      if (ball.y < width * BORDER_AREA) {
        ball.vy += PUSH_BACK
      }
      if (ball.y > height * (1 - BORDER_AREA)) {
        ball.vy -= PUSH_BACK
      }

      // Randomly alter the ball's trajectory
      if (Math.random() < 0.1) {
        ball.vx += (Math.random() * 2 - 1) * RANDOM_MOVEMENT
        ball.vy += (Math.random() * 2 - 1) * RANDOM_MOVEMENT
      }
    }
    tPrevious = t
  }

  const animate: FrameRequestCallback = (t) => {
    update(t)
    frame = requestAnimationFrame(animate)
  }

  onMount(() => {
    setup()
    animate(0)
    return () => {
      cancelAnimationFrame(frame)
    }
  })
</script>

<svelte:document on:click={pulseDeterent} />

<div
  class="outer-container"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <div class="inner-container">
    {#each balls as ball}
      <div
        class="metaball"
        style="--size: {ball.size}px; --color: {ball.color}; transform: translate({ball.x -
          ball.size / 2}px, {ball.y - ball.size / 2}px);"
      ></div>
    {/each}
  </div>
</div>

<style>
  .outer-container {
    filter: contrast(10) blur(10px) contrast(5);
    width: 100%;
    height: 100%;
    background-color: var(--color-background);
  }

  .inner-container {
    filter: blur(5px);
    width: 100%;
    height: 100%;
  }

  .metaball {
    position: absolute;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: radial-gradient(farthest-side, var(--color), transparent);
    top: 0;
    left: 0;
    mix-blend-mode: color-dodge;
  }
</style>
