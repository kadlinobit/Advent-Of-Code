const input = ["2566885432","3857414357","6761543247","5477332114","3731585385","1716783173","1277321612","3371176148","1162578285","6144726367"]
const inputTest = ["5483143223","2745854711","5264556173","6141336146","6357385478","4167524645","2176841721","6882881134","4846848554","5283751526"]

const map = input.map(line => {
    return line.split('').map(number => parseInt(number))
})

let totalFlashNumber = 0
let resultPart1 = 0
let isSyncFlash = false
const syncFlashStepsArr = []

// Start 500 cycles - enough to get synced flashes
// Can be done with while cycle, but this way it is nice to see how synchronized flashes continue after the first one
for(let i=0; i<500; i++) {
   
    // Result part 1 - after 100 rounds, store the number of flashes
    if(i===100) {
        resultPart1 = totalFlashNumber
    }
    
    // Result part 2 - store the round number when there was a synchronized flash
    if(isSyncFlash) {
        syncFlashStepsArr.push(i)
        isSyncFlash = false
    }

    for(let y=0; y<map.length; y++) {
        for (let x=0; x<map[y].length; x++) {
            const mapVal = map[y][x]
            if(mapVal >= 0 && mapVal < 9) {
                map[y][x]++
            }
            else if(mapVal === 9) {
                _flash(y,x)
            }
        }
    }

    // After the turn ends, turn back flashed points (-1) to zeros
    _flashesAfterTurn()
}

// Function that handles field flash, including incrementing (and possibly flashing) all the adjacent fields
function _flash(y,x) {
    if(map[y][x] === -1)
        return

    totalFlashNumber++
    const newFlashArr = []
    map[y][x] = -1
    const adjacentArr = [
        [y-1,x-1],[y-1,x],[y-1,x+1],
        [y,x-1],[y,x+1],
        [y+1,x-1],[y+1,x],[y+1,x+1]
    ]

    adjacentArr.forEach(point => {
        const [py, px] = point
        const mapVal = map?.[py]?.[px]
        
        if(![undefined, -1].includes(mapVal)) {
            if(mapVal < 9) {
                map[py][px]++
            }
            else if(mapVal === 9) {
                newFlashArr.push([py,px])
            }
        }
    })
    newFlashArr.forEach(([y,x]) => _flash(y,x))
}

// After each round, turn all the flashed fields (-1) to 0
function _flashesAfterTurn() {
    isSyncFlash = true
    for(let y=0; y<map.length; y++) {
        for (let x=0; x<map[y].length; x++) {
            if(map[y][x] === -1) {
                map[y][x] = 0
            } else {
                isSyncFlash = false
            }
        }
    }
}

console.log('Part 1: ', resultPart1)
console.log('Part 2: ', syncFlashStepsArr)