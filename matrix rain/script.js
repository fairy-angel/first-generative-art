const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, 600);
gradient.addColorStop(0,'pink');
gradient.addColorStop(0.2,'cyan');
gradient.addColorStop(0.4,'magenta');
gradient.addColorStop(0.6,'yellow');
gradient.addColorStop(0.8,'blue');
gradient.addColorStop(1,'red');



// classes encapsulate the code, syntax sugar 
class Symbol{
    constructor(x, y, fontSize, canvasHeight){
        this.characters = 'Were no strangers to love You know the rules and so do I (do I) A full commitments what Im thinking of You wouldnt get this from any other guy I just wanna tell you how Im feeling Gotta make you understand Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you 사랑에 낯선 사람이 아니었습니까 당신은 규칙을 알고 나도 마찬가지입니다 (나도) 내가 생각하는 모든 약속 당신을 실망시키지 않을 것입니다 결코 뛰어 다니고 당신을 버리지 않을 것입니다 결코 당신을 울리지 않을 것입니다 결코 작별 인사를하지 않을 것입니다 결코 거짓말을하고 상처를주지 않을 것입니다 對愛並不陌生 你知道規則，我也知道（我） 一個完整的承諾 我在想什麼 你不會從任何其他人那裡得到這個 我只想告訴你我的感受 必須讓你明白 永遠不會放棄你 永遠永遠不會讓你失望永遠不會跑來跑去拋棄你永遠不會讓你哭永遠不會說再見永遠不會說謊傷害你あなたはルールを知っているし、私もそうです 私が考えていることを完全に約束します あなたは他の男からこれを得ることはありません 私はただあなたにどのように感じているかを伝えたいですあなたをがっかりさせるつもりはない 走り回ってあなたを見捨てるつもりはない あなたを泣かせるつもりはない さよならを言うつもりはない 嘘をついてあなたを傷つけるつもりはないمحبت کرنے کے لیے کوئی اجنبی نہیں تھے آپ اصولوں کو جانتے ہیں اور اسی طرح میں (کرتا ہوں) ایک مکمل عزم جو میں سوچ رہا ہوں یہ آپ کو کسی دوسرے آدمی سے نہیں ملے گا میں صرف آپ کو بتانا چاہتا ہوں کہ میں آپ کو کیسا محسوس کر رہا ہوں آپ کو یہ سمجھانا ہے کہ آپ کو کبھی نہیں چھوڑوں گا۔ آپ کو نیچا دکھانے والا کبھی ادھر ادھر بھاگنے اور آپ کو ویران کرنے والا نہیں کبھی آپ کو رونے والا نہیں کبھی الوداع کہنے والا نہیں کبھی جھوٹ نہیں بولوں گا اور آپ کو تکلیف نہیں دوں گا';
      //convert argument into class properties
      this.x = x;
      this.y = y;
      this.fontSize = fontSize;
      this.text = '';
      this.canvasHeight = canvasHeight;


    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y *this.fontSize);
        if (this.y *this.fontSize > this.canvasHeight && Math.random() > 0.98){
            this.y = 0;
        } else{
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
    //initialize is a private method, cannot be called from the outside, abstraction
         //its job is to take the symbols and fill the object
        
         #initialize(){
         for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
         }

    }
    //public resize, new width and height for canvas
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        //recalculate how many columns fit
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 60;
const nextFrame =1000/fps;
let timer = 0;

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
        ctx.fillStyle = 'rgba(0, 0,0,0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient; //'#0aff0a';
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
    } else{
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}
animate(0);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height)
})