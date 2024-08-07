<script lang="ts">
  const randomNotNull = (array: any[]) => {
    array = array.filter((v) => v !== null)

    if (array.length === 0) return null

    return array[Math.floor(Math.random() * array.length)]
  }

  type Cell = {
    x: number
    y: number
  }

  const EMPTY = 0
  const TIME_DIVISOR = 40000
  const BRUSH_SIZE = 4
  const DRAW_INTERVAL = 20

  let height: number = $state(400)
  let width: number = $state(400)

  const cellSize = 5
  const gridHeight = $derived(Math.ceil(height / cellSize))
  const gridWidth = $derived(Math.ceil(width / cellSize))

  let cellsToUpdate: Cell[] = []
  let cellsToRerender: Cell[] = []

  let updateCount = $state(0)
  let renderCount = $state(0)

  let grid: (number | string)[][] = $derived(
    Array.from(
      {
        length: gridHeight,
      },
      () =>
        Array.from(
          {
            length: gridWidth,
          },
          () => 0
        )
    )
  )

  const isValidCell = (x: number, y: number): boolean => {
    return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight
  }

  const update = (t: number) => {
    t = (t % TIME_DIVISOR) / TIME_DIVISOR

    cellsToUpdate.sort((a, b) => b.y - a.y)

    let newCellsToUpdate = []

    updateCount = cellsToUpdate.length

    for (const { x, y } of cellsToUpdate) {
      if (!isValidCell(x, y)) continue

      if (grid[y][x] === 'new') grid[y][x] = t

      if (grid[y][x] === EMPTY || y >= gridHeight - 1) continue

      if (grid[y + 1][x] === EMPTY) {
        grid[y + 1][x] = grid[y][x]

        newCellsToUpdate.push({
          x,
          y: y + 1,
        })

        newCellsToUpdate.push({
          x,
          y: y - 1,
        })

        newCellsToUpdate.push({
          x: x - 1,
          y: y - 1,
        })

        newCellsToUpdate.push({
          x: x + 1,
          y: y - 1,
        })

        grid[y][x] = EMPTY
      } else {
        const newX = randomNotNull([
          x + 1 <= gridWidth && grid[y + 1][x + 1] === EMPTY ? x + 1 : null,

          x - 1 >= 0 && grid[y + 1][x - 1] === EMPTY ? x - 1 : null,
        ])

        if (newX !== null) {
          grid[y + 1][newX] = grid[y][x]

          newCellsToUpdate.push({
            x: newX,
            y: y + 1,
          })

          newCellsToUpdate.push({
            x,
            y: y - 1,
          })

          newCellsToUpdate.push({
            x: x - 1,
            y: y - 1,
          })

          newCellsToUpdate.push({
            x: x + 1,
            y: y - 1,
          })

          grid[y][x] = EMPTY
        }
      }
    }

    cellsToRerender = [
      ...cellsToUpdate.map((c) => ({ x: c.x, y: c.y })),

      ...newCellsToUpdate.map((c) => ({ x: c.x, y: c.y })),
    ]

    cellsToUpdate = newCellsToUpdate
  }

  const draw = (ctx: CanvasRenderingContext2D, t: number) => {
    // const data = ctx.createImageData(gridHeight, gridWidth);

    // const buffer = new Uint32Array(data.data.buffer);

    renderCount = cellsToRerender.length

    for (const { x, y } of cellsToRerender) {
      drawCell(ctx, x, y)
    }

    update(t)

    requestAnimationFrame((t) => draw(ctx, t))
  }

  const drawCell = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    if (!isValidCell(x, y)) return

    const cellValue = grid[y][x] as number

    if (cellValue > 0) {
      const colour = `hsl(${cellValue * 360},100%,50%)`
      ctx.fillStyle = colour
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    } else {
      ctx.clearRect(x * cellSize, y * cellSize, cellSize, cellSize)
    }
  }

  const paint = (mouseX: number, mouseY: number) => {
    const cellX = Math.floor(mouseX / cellSize)
    const cellY = Math.floor(mouseY / cellSize)

    const newCells = []

    for (let tmpY = cellY - BRUSH_SIZE; tmpY <= cellY + BRUSH_SIZE; tmpY++) {
      for (let tmpX = cellX - BRUSH_SIZE; tmpX <= cellX + BRUSH_SIZE; tmpX++) {
        if (!isValidCell(tmpX, tmpY)) continue
        if (grid[tmpY][tmpX] !== EMPTY) continue

        newCells.push({
          x: tmpX,
          y: tmpY,
        })
      }
    }

    for (const { x, y } of newCells.filter(() => Math.random() > 0.96)) {
      grid[y][x] = 'new'

      cellsToUpdate.push({
        x,
        y,
      })
    }
  }

  function simAction(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    width = canvas.width
    height = canvas.height

    requestAnimationFrame((t) => draw(ctx, t))
  }

  let intervalId: number | undefined = $state()

  const mousePosition: { x: number; y: number } = $state({ x: 0, y: 0 })

  const onMousemove = (e: MouseEvent) => {
    const { top, left } = (e.target as HTMLElement).getBoundingClientRect()
    mousePosition.x = e.clientX - left
    mousePosition.y = e.clientY - top
  }

  const onMousedown = () => {
    console.log('mousedown')
    clearInterval(intervalId)

    intervalId = setInterval(() => {
      paint(mousePosition.x, mousePosition.y)
      console.log('painting')
    }, DRAW_INTERVAL)
  }

  const onMouseup = () => {
    clearInterval(intervalId)
  }
</script>

<canvas
  onmousemove={onMousemove}
  onmousedown={onMousedown}
  onmouseup={onMouseup}
  use:simAction
></canvas>

<style>
  canvas {
    height: 100%;
    width: 100%;
  }
</style>
