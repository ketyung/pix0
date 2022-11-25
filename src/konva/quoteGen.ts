import { QuoteNftParam } from '../models';
import { Konva, applyCrop, loadImage } from './util';

export const generate = async (param : QuoteNftParam) : Promise<string>  =>{

    let width = 800; //window.innerWidth;
    let height = 300; //window.innerHeight;

    let stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    });

    let layer = new Konva.Layer();
    stage.add(layer);

    let xStart = 30; 
    let yStart = 30;
    // refer to https://konvajs.org/docs/shapes/Rect.html
    let bg0 = new Konva.Rect({
        x: xStart,
        y: yStart,
        width: stage.width() - (xStart * 2),
        height: stage.height() - (yStart * 2),
        illLinearGradientStartPoint: { x: xStart, y: yStart },
        fillLinearGradientEndPoint: { x: stage.width() - (xStart * 2), y: stage.height() - (yStart * 2) },
        // gradient into transparent color, so we can see CSS styles
        fillLinearGradientColorStops: [
            0, '#168', 0.5,'#28a',1,'rgba(0, 0, 0, 1)',
        ],
        shadowBlur: 10,
        cornerRadius: 10,
        // remove background from hit graph for better perf
        // because we don't need any events on the background
        listening: false,
    });
    layer.add(bg0);


    let imgObj = await loadImage(param.bgImageSrc);

    let xStart2 = xStart + 20;
    let yStart2 = yStart + 20;

    var background = new Konva.Image({
        x: xStart2,
        y: yStart2,
        image: imgObj,
        width: width - (xStart2 * 2) ,
        height: height - (yStart2 * 2),
    });


    applyCrop(background);

    layer.add(background);
       
    let xStart3 = xStart2 + 20;
    let yStart3 = yStart2 + 10;

   
    var text = new Konva.Text({
        x: xStart3 + 10,
        y: yStart3 + 15,
        text: param.quoteText ?? 'Hello World',
        fontSize: 28,
        fontFamily: 'Helvetica',
        fill: 'white',
        shadowColor : '#333',
        shadowOffsetX : 2,
        shadowOffsetY : 2,
        wrap : "word",
        width : 200,
        height : 150,
        ellipsis : true,  

    });

    layer.add(text);

    return layer.toDataURL();
  
}

