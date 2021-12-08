let swarm = [1,1,3,5,1,3,2,1,5,3,1,4,4,4,1,1,1,3,1,4,3,1,2,2,2,4,1,1,5,5,4,3,1,1,1,1,1,1,3,4,1,2,2,5,1,3,5,1,3,2,5,2,2,4,1,1,1,4,3,3,3,1,1,1,1,3,1,3,3,4,4,1,1,5,4,2,2,5,4,5,2,5,1,4,2,1,5,5,5,4,3,1,1,4,1,1,3,1,3,4,1,1,2,4,2,1,1,2,3,1,1,1,4,1,3,5,5,5,5,1,2,2,1,3,1,2,5,1,4,4,5,5,4,1,1,3,3,1,5,1,1,4,1,3,3,2,4,2,4,1,5,5,1,2,5,1,5,4,3,1,1,1,5,4,1,1,4,1,2,3,1,3,5,1,1,1,2,4,5,5,5,4,1,4,1,4,1,1,1,1,1,5,2,1,1,1,1,2,3,1,4,5,5,2,4,1,5,1,3,1,4,1,1,1,4,2,3,2,3,1,5,2,1,1,4,2,1,1,5,1,4,1,1,5,5,4,3,5,1,4,3,4,4,5,1,1,1,2,1,1,2,1,1,3,2,4,5,3,5,1,2,2,2,5,1,2,5,3,5,1,1,4,5,2,1,4,1,5,2,1,1,2,5,4,1,3,5,3,1,1,3,1,4,4,2,2,4,3,1,1]
let swarmCounts = {}
swarm.forEach(fish => swarmCounts[fish] = 1  + (swarmCounts[fish] || 0))


for (let i = 0; i < 256; i++) {
    let updatedSwarmCounts = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0}

    for (const [key, value] of Object.entries(swarmCounts)) {
        if(parseInt(key) === 0) {
            updatedSwarmCounts[6] += value
            updatedSwarmCounts[8] += value
        }
        
        if(parseInt(key) > 0) {
            updatedSwarmCounts[parseInt(key) - 1] += value
        }
    }
    swarmCounts = updatedSwarmCounts
}

let total = 0
for (const [key, value] of Object.entries(swarmCounts)) {
    total += value
}

console.log(total)
