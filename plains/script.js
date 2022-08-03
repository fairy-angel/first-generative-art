const maxHeight = 600;
const maxWidth = 600;
const step = 16;
const lines = [];

function setup(){
  createCanvas(maxHeight, maxWidth);
  stroke(169, 251, 215);
  strokeWeight(2);
  noLoop();
}
function draw(){  
    for(let i = step; i < maxHeight - step; i += step){
      lines.push([{x: step, y: i}, {x: maxHeight, y: i}]);
    }
    // draw
    for(let i = 0; i < lines.length; i++){
      for(let j = 0; j < lines[i].length; j+=2){
        lines(lines[i][j].x, lines[i][j].y, lines[i][j+1].x, lines[i][j+1].y);
      }
    }
}
