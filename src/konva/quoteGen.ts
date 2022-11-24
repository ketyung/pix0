import { QuoteNftParam } from '../models';
import { Konva, applyCrop, loadImage } from './util';

export const generate = async (param : QuoteNftParam) : Promise<string>  =>{

    let width = window.innerWidth;
    let height = window.innerHeight;

    let stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    });

    let layer = new Konva.Layer();
    stage.add(layer);

    let xStart = 50; 
    let yStart = 50;

    let bg0 = new Konva.Rect({
        x: xStart,
        y: yStart,
        width: stage.width() - (xStart * 2),
        height: stage.height() - (yStart * 2),
        illLinearGradientStartPoint: { x: xStart, y: yStart },
        fillLinearGradientEndPoint: { x: stage.width() - (xStart * 2), y: stage.height() - (yStart * 2) },
        // gradient into transparent color, so we can see CSS styles
        fillLinearGradientColorStops: [
            0, '#168', 0.5,'#638',1,'rgba(0, 0, 0, 1)',
        ],
        borderRadius: "20px",
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


    layer.add(background);
            
    return layer.toDataURL();
  
}

