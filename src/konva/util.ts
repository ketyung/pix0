import * as konva from 'konva';
export const Konva = konva.default;

export enum ClipPosition {

    LeftTop,

    LeftMiddle,

    LeftBottom,

    CenterTop,

    CenterMiddle,

    CenterBottom,

    RightTop,

    RightMiddle,

    RightBottom,

    Scale, 

}


export  function getCrop(image : HTMLImageElement, size : {width : number, height : number}, 
clipPosition : ClipPosition = ClipPosition.CenterMiddle) {
    
    const width = size.width;
    const height = size.height;
    const aspectRatio = width / height;

    let newWidth;
    let newHeight;

    const imageRatio = image.width / image.height;

    if (aspectRatio >= imageRatio) {
      newWidth = image.width;
      newHeight = image.width / aspectRatio;
    } else {
      newWidth = image.height * aspectRatio;
      newHeight = image.height;
    }

    let x = 0;
    let y = 0;
    if (clipPosition === ClipPosition.LeftTop) {
        x = 0;
        y = 0;
    } 
    else if (clipPosition === ClipPosition.LeftMiddle) {
        x = 0;
        y = (image.height - newHeight) / 2;
    } 
    else if (clipPosition === ClipPosition.LeftBottom) {
        x = 0;
        y = image.height - newHeight;
    } 
    else if (clipPosition === ClipPosition.CenterTop) {
        x = (image.width - newWidth) / 2;
        y = 0;
    } 
    else if (clipPosition === ClipPosition.CenterMiddle) {
        x = (image.width - newWidth) / 2;
        y = (image.height - newHeight) / 2;
    } 
    else if (clipPosition === ClipPosition.CenterBottom) {
        x = (image.width - newWidth) / 2;
        y = image.height - newHeight;
    } 
    else if (clipPosition === ClipPosition.RightTop) {
        x = image.width - newWidth;
        y = 0;
    } 
    else if (clipPosition === ClipPosition.RightMiddle) {
        x = image.width - newWidth;
        y = (image.height - newHeight) / 2;
    } 
    else if (clipPosition === ClipPosition.RightBottom) {
        x = image.width - newWidth;
        y = image.height - newHeight;
    } 
    else if (clipPosition === ClipPosition.Scale) {
        x = 0;
        y = 0;
        newWidth = width;
        newHeight = height;
    } 
    else {
      console.error(
        new Error('Unknown clip position property - ' + clipPosition)
      );
    }

    return {
      cropX: x,
      cropY: y,
      cropWidth: newWidth,
      cropHeight: newHeight,
    };
}



export async function applyCrop(img : konva.default.Image, pos : ClipPosition = ClipPosition.CenterMiddle) {

    img.setAttr('lastCropUsed', pos);

    let imgSrc = img.image();
    if ( imgSrc && imgSrc instanceof HTMLImageElement ){

        const crop = getCrop(
            imgSrc,
            { width: img.width(), height: img.height() },
            pos
        );
        img.setAttrs(crop);
    }
    
}



export const loadImage = async ( imgSrc : string ) : Promise<HTMLImageElement|undefined> =>{
        
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.crossOrigin ="anonymous";
        img.onload = () => { resolve(img); }
        img.onerror = reject
        img.src = imgSrc
    })

}