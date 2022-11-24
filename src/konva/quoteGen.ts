import { QuoteNftParam } from '../models';
import { Konva, applyCrop } from './util';

export const generate = (param : QuoteNftParam) : string  =>{

    let width = window.innerWidth;
    let height = window.innerHeight;

    let stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    });

    let layer = new Konva.Layer();
    stage.add(layer);

    let imageObj = new Image();
    imageObj.onload = function () {
      var background = new Konva.Image({
        x: 10,
        y: 10,
        image: imageObj,
        width: width - 20 ,
        height: height - 20,
      });

      applyCrop(background);

      layer.add(background);
    };

    imageObj.src = param.bgImageSrc;

    return stage.toDataURL();

}

