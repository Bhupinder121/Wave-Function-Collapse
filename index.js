
const DIM = 80;
let cols;
let rows;
let tiles = [];
let images = [];
let cells = [];
let cellsStack = [];
let coordinates = ["left", "up", "right", "bottom"];


function preload(){
    let path = "circuit"
    for(let i = 0; i < 13; i++){
        if(i == 4 || i == 5 || i == 0){
            continue;
        }
        let img = loadImage(`${path}/${i}.png`)
    
        images.push(img)
    }
}

function setup(){
    
    tiles[0] = new Tile(images[0], [0, 0, 0, 0]);
    tiles[1] = new Tile(images[1], [0, 0, 1, 0]);
    tiles[2] = new Tile(images[2], [2, 0, 2, 0]);
    tiles[3] = new Tile(images[3], [1, 0, 1, 0]);
    tiles[4] = new Tile(images[4], [1, 2, 1, 2]);
    tiles[5] = new Tile(images[5], [0, 2, 0, 1]);
    tiles[6] = new Tile(images[6], [1, 1, 1, 0]);
    tiles[7] = new Tile(images[7], [1, 1, 1, 1]);
    tiles[8] = new Tile(images[8], [0, 1, 1, 0]);
    tiles[9] = new Tile(images[9], [1, 0, 1, 0]);
    frameRate(2);
    createCanvas(800, 800);
    cols = width/DIM;
    rows = height/DIM;
    background(0);
    stroke(255);
    noFill();
    for(let y = 0; y < cols; y++){
        for (let x = 0; x < rows; x++){
           cells.push(new Cell(cells.length, x, y));
            if(x == 0){
                
                let cell = cells[cells.length-1].neighbors["left"]
                cell[0] = false;
            }
            if(y == 0){
                let cell = cells[cells.length-1].neighbors["up"]
                cell[0] = false;
            }
            if(y == cols - 1){
                let cell = cells[cells.length-1].neighbors["bottom"]
                cell[0] = false;
            }
            if(x == rows - 1){
                let cell = cells[cells.length-1].neighbors["right"]
                cell[0] = false;
            }
        }
    }
    
    
    getStarted();

    for(let i = 0; i < cells.length; i++){
        cells[i].show();
    }
}

function getStarted(){
    let currentCell = random(cells);
    let currentTile = random(tiles);

    
    currentCell.collapsed(currentTile.img, currentTile.edges);
    cells.slice(cells.indexOf(currentCell), 1);
    cellsStack.push(currentCell);
    
    checkNext(currentCell)
        
        
   
 

    
    
    
}

function checkNext(currentCell){
    let neighborCell = currentCell
    // coordinates.forEach(e=>{
    //     if(currentCell.neighbors[e][0] && !cells[currentCell.neighbors[e][1]].isCollapsed){
    //         neighborCell = cells[currentCell.neighbors[e][1]]
    //     }
    // });
    if(neighborCell != null){
        // currentCell = neighborCell;
        let edges = []
        coordinates.forEach(e=>{
            let cors = neighborCell.available[e]
            if(cors.length > 0){
                edges.push(cors[0])
            }
            else{
                edges.push(-1)
            }
            
        });
        let foundit = false;
        let matchedTiles = [];
        for(let i = tiles.length-1; i >= 0; i--){
            for(let j = 0; j < 4; j++){
                if(edges[j] > -1){
                    if(edges[j] == tiles[i].edges[j]){
                        foundit = true;
                        neighborCell.collapsed(tiles[i].img, tiles[i].edges);
                        console.log(cells.length);
                        cells.splice(cells.indexOf(neighborCell), 1);
                        console.log(cells.length);
                        cellsStack.push(neighborCell)
                        checkNext(random(cells));
                        
                    }
                }
            }
            if(foundit){
                break;
            }
        }
        if(!foundit){
            neighborCell.collapsed(random(tiles).img, random(tiles).edges);
            console.log(cells.length);
            cells.splice(cells.indexOf(neighborCell), 1);
            console.log(cells.length);
            cellsStack.push(neighborCell)
            checkNext(random(cells));
        }
        
    }
    
}

function draw(){
    
}