window.addEventListener('load', function(){
    const canvas =document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width =window.innerWidth ;
    canvas.height=window.innerHeight;
//canvas settings
    ctx.fillStyle= 'blue';
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX =10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    //effect settings
    let size = canvas.width <canvas.height ? canvas.width *0.1 : canvas.height *0.1;
    const maxLevel = 10;
    const branches = 1;


    let sides = 10;
    let scale = 0.85;
    let spread = -0.2;
    let color = 'hsl('+ Math.random() * 360 +', 100%, 50%)';
    let lineWidth = 30;
   
    //controls
    const randomizeButton = document.getElementById('randomizeButton')
    const resetButton = document.getElementById('resetButton');

    const sliderSpread = document.getElementById('spread');
    const labelSpread = document.querySelector('[for="spread"]');
    sliderSpread.addEventListener('change', function(e){
      spread = e.target.value;
      updateSliders();
      drawFractal();
    });

    sliderSides = document.getElementById('sides');
    labelSides= document.querySelector('[for="sides"]');
    sliderSides.addEventListener('change', function(e){
      sides = e.target.value;
      updateSliders();
      drawFractal();
    });
    
   let pointX = 0;
   let pointY = size;

    function drawBranch(level){
    if(level > maxLevel) return; 
      ctx.beginPath();
      ctx.moveTo(pointX,pointY);
      ctx.bezierCurveTo(0,size * spread * -3, size *5,size * 10 * spread,0,0);
      ctx.lineTo(size - 100,0); 
      ctx.stroke();
    for (let i = 0; i < branches; i++){
      ctx.save();
      ctx.translate(pointX,pointY); 
      ctx.scale(scale,scale);
      
      ctx.save();
      ctx.rotate(spread);
      drawBranch(level + 1);
      ctx.restore();
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(-size/2,0,40,0,Math.PI * 2);
    ctx.fill();

  }
  
  function drawFractal(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.translate(canvas.width/2,canvas.height/2);
    for(let i = 0; i < sides; i++){
      ctx.scale(0.95,0.95);
      ctx.rotate((Math.PI * 6)/sides);
      drawBranch(0); 
    }
    ctx.restore();
    randomizeButton.style.backgroundColor = color;
  }
drawFractal();

function randomizeFractal(){

     sides = Math.floor(Math.random() * 18 + 2);
     scale = Math.random() * 0.6 + 0.3;
     spread = Math.random() * 2.9 + 0.1;
     color = 'hsl('+ Math.random() * 360 +', 100%, 50%)';
    lineWidth = Math.floor(Math.random() * 30 + 20);
    randomizeButton.style.backgroundColor = color;

     drawFractal();
}
randomizeButton.addEventListener('click', function(){
  randomizeFractal();
  updtateSliders();
  drawFractal();
});

function resetFractal(){
    sides = 15;
    scale = 0.85;
    spread = 0.2;
    color = 'hsl(290, 100%, 50%';
    lineWidth = 30;
};
resetButton.addEventListener('click', function(){
  resetFractal();
  updateSliders();
  drawFractal();
})

function updateSliders(){
  sliderSpread.value = spread;
  labelSpread.innerText = 'Spread: ' + Number(spread).toFixed(1);
  sliderSides.value = sides;
  labelSides.innerText = 'Sides: ' + sides;
}
updateSliders();

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  size = canvas.width < canvas.height ? canvas.width *0.3 : 
  canvas.height * 0.3;
  ctx.shadowColor = 'rgba(0,0,0,0.7)';
  ctx.shadowOffsetX =10;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;
  drawFractal();
})

});