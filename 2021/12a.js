const inputTest = ["start-A","start-b","A-c","A-b","b-d","A-end","b-end"]
const inputTest2 = ["dc-end","HN-start","start-kj","dc-start","dc-HN","LN-dc","HN-end","kj-sa","kj-HN","kj-dc"]
const input = ["start-qs","qs-jz","start-lm","qb-QV","QV-dr","QV-end","ni-qb","VH-jz","qs-lm","qb-end","dr-fu","jz-lm","start-VH","QV-jz","VH-qs","lm-dr","dr-ni","ni-jz","lm-QV","jz-dr","ni-end","VH-dr","VH-ni","qb-HE"]

// prepare data
const nodesConnections = input.reduce((acc, connection) => {
    const [node1, node2] = connection.split('-')
    
    if(!acc[node1]) 
        acc[node1] = [node2]

    if(!acc[node2]) 
        acc[node2] = [node1]

    if(!acc[node1].includes(node2))
        acc[node1].push(node2)

    if(!acc[node2].includes(node1))
        acc[node2].push(node1)

    return acc
},{})

const finalPaths = []

function findPath(path, nextNode) {
    // #1 Next node is end => path is finished, push it to the finalPaths array
    if(nextNode === 'end') {
        path.push(nextNode)
        finalPaths.push(path)
        return
    }
    // #2 Next node is small cave and has been already visited - throw this path away
    else if(
        nextNode.toLowerCase() === nextNode
        &&
        path.includes(nextNode)
    ) {
        return
    }
    // #3 Otherwise, push the next node to the path, check following possible ways and for each run recursion again
    else {
        path.push(nextNode)
        const possibleWays = nodesConnections[nextNode]
        possibleWays.forEach(goTo => findPath([...path], goTo))
    }
}

// Start looking for the path with empty array and nextNode = 'start'
findPath([], 'start')

console.log(finalPaths.length)