let mondrianImage;
let mondrianDup;
let headerFont;

let alphaSlider;

let redPicker;
let redPicker_Val;
let yellowPicker;
let bluePicker;

let imgRedVal;
let imgGreenVal;
let imgBlueVal;

function preload()
{
  mondrianImage = loadImage("./NeonMondrian.jpg");
  headerFont = loadFont("./BlackHan.ttf");
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(255);

  mondrianDup = mondrianImage;

  fill(225,50,150);
  textFont(headerFont);
  textAlign(CENTER,CENTER);
  textSize(45);
  text("neon mondrian", width/1.32, 50);

  fill(0);
  textFont("sans-serif");
  textSize(16);
  text("- interactive color-changing image -", width/1.32, 82);

  text("Choose color for the red pixels:", width/1.6, height/3.5)
  text("Choose color for the yellow pixels:", width/1.585, height/2.85)
  text("Choose color for the blue pixels:", width/1.595, height/2.38)
  text("Set transparency for all pixels:", width/1.605, height/1.76)

  redPicker = createColorPicker("Red");
  redPicker.position(width/1.38, height/3.75)
  
  yellowPicker = createColorPicker("Yellow");
  yellowPicker.position(width/1.38, height/3)
  
  bluePicker = createColorPicker("Blue");
  bluePicker.position(width/1.38, height/2.5);

  alphaSlider = createSlider(0, 255, 255);
  alphaSlider.position(width/1.38, height/1.8);
  alphaSlider.style("width","255px");
}

function draw()
{
  mondrianImage.loadPixels();
  mondrianDup.loadPixels();

  redPicker_Val = redPicker.color();
  for(let i=0; i<mondrianDup.pixels.length; i+=4)
  {
    imgRedVal = mondrianImage.pixels[i+0];
    imgGreenVal = mondrianImage.pixels[i+1];
    imgBlueVal = mondrianImage.pixels[i+2];

    if((imgRedVal<=255 && imgRedVal>=200) && (imgGreenVal<=150 && imgGreenVal>=0) && (imgBlueVal<=255 && imgBlueVal>=0))
    {
      mondrianDup.pixels[i+0] = red(redPicker_Val);
      mondrianDup.pixels[i+1] = green(redPicker_Val);
      mondrianDup.pixels[i+2] = blue(redPicker_Val);
    }
  }
  mondrianDup.updatePixels();
  mondrianDup.resize(0,height);
  image(mondrianDup,0,0);
}