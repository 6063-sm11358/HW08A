//initializing element variables
let mondrianImage;
let mondrianDup;
let headerFont;
let alphaSlider;
let alphaSlider_Val;

//initializing designer image variables
let designerImage;
let designerRadio;
let designerRadio_Val;

//initializing color-picker variables
let redPicker;
let redPicker_Val;
let yellowPicker;
let yellowPicker_Val;
let bluePicker;
let bluePicker_Val;

let imgRedVal;
let imgGreenVal;
let imgBlueVal;
let imgAlphaVal;

//pre-loading image and font
function preload()
{
  mondrianImage = loadImage("./NeonMondrian_1.jpg");
  designerImage = loadImage("./DesignerImage.jpg");
  headerFont = loadFont("./BlackHan.ttf");
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(255);

  //loading "original" image's pixels
  mondrianImage.loadPixels();
  mondrianDup = mondrianImage.get();

  //code for generating interface text
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
  text("Toggle transparency for all pixels:", width/1.587, height/1.95)

  //code for creating color-pickers for each primary color
  redPicker = createColorPicker("Red");
  redPicker.position(width/1.38, height/3.75)
  
  yellowPicker = createColorPicker("Yellow");
  yellowPicker.position(width/1.38, height/3)
  
  bluePicker = createColorPicker("Blue");
  bluePicker.position(width/1.38, height/2.5);

  alphaSlider = createSlider(0, 255, 128);
  alphaSlider.position(width/1.38, height/2);
  alphaSlider.style("width","255px");

  designerRadio = createRadio();
  designerRadio.option('ShowOG','Show Original Image');
  designerRadio.option('ShowIMG','Show Collage Image');
  designerRadio.selected('ShowOG');
  designerRadio.position(width/1.82, height/1.6);
  designerRadio.style('font-family','sans-serif');
}

function draw()
{
  //loading pixels of the "duplicate" image
  mondrianDup.loadPixels();
  
  //storing color-picker value into variable
  redPicker_Val = redPicker.color();
  yellowPicker_Val = yellowPicker.color();
  bluePicker_Val = bluePicker.color();
  alphaSlider_Val = alphaSlider.value();

  for(let i=0; i<mondrianDup.pixels.length; i+=4)
  {
    //loading individual RGB values of original into variables
    imgRedVal = mondrianImage.pixels[i+0];
    imgGreenVal = mondrianImage.pixels[i+1];
    imgBlueVal = mondrianImage.pixels[i+2];
    imgTranVal = mondrianImage.pixels[i+3];

    //detecting red color in duplicate image, and modifying pixel values
    if((imgRedVal<=255 && imgRedVal>=175) && (imgGreenVal<=150 && imgGreenVal>=0) && (imgBlueVal<=255 && imgBlueVal>=0))
    {
      mondrianDup.pixels[i+0] = red(redPicker_Val);
      mondrianDup.pixels[i+1] = green(redPicker_Val);
      mondrianDup.pixels[i+2] = blue(redPicker_Val);
      mondrianDup.pixels[i+3] = alphaSlider_Val;
    }

    //detecting yellow color in duplicate image, and modifiying pixel values
    if((imgRedVal<=255 && imgRedVal>=200) && (imgGreenVal<=255 && imgGreenVal>=100) && (imgBlueVal<=100 && imgBlueVal>=0))
    {
      mondrianDup.pixels[i+0] = red(yellowPicker_Val);
      mondrianDup.pixels[i+1] = green(yellowPicker_Val);
      mondrianDup.pixels[i+2] = blue(yellowPicker_Val);
      mondrianDup.pixels[i+3] = alphaSlider_Val;
    }

    //detecting blue color in duplicate image, and modifiying pixel values
    if((imgRedVal<=100 && imgRedVal>=0) && (imgGreenVal<=100 && imgGreenVal>=0) && (imgBlueVal<=255 && imgBlueVal>=95))
    {
      mondrianDup.pixels[i+0] = red(bluePicker_Val);
      mondrianDup.pixels[i+1] = green(bluePicker_Val);
      mondrianDup.pixels[i+2] = blue(bluePicker_Val);
      mondrianDup.pixels[i+3] = alphaSlider_Val;
    }
  }
  //updating duplicate image's pixels
  mondrianDup.updatePixels();

  //resizing images to maintain aspect-ratio
  mondrianImage.resize(0,height);
  designerImage.resize(0,height);
  mondrianDup.resize(0,height);
  
  //generating back-panel images
  designerRadio_Val = designerRadio.value();
  switch(designerRadio_Val)
  {
    case 'ShowOG':
      image(mondrianImage,0,0);
    break;
    case 'ShowIMG':
      image(designerImage,0,0);
    break;
  }

  //generating edited image (stacked) in real-time
  image(mondrianDup,0,0);
}