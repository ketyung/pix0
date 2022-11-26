export const shortenStringTo = (str : string, length : number = 32, strInBetween : string = "...") => {

    if ( str.length <= length){
        return str ;
    }

    const halfLen = length / 2;

	return (
		str.substring(0, halfLen) + (strInBetween ? strInBetween : "") + 
		str.substring(str.length - halfLen, str.length)
	);
};

export const copy = (copyText : string ) =>{
 
    navigator.clipboard.writeText(copyText);
}