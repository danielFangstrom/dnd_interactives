//The `randomInt` helper function
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
function hsv2rgb(h,s,v) 
{                              
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  return [f(5),f(3),f(1)];       
} 

function rgb2int(rgb)
{
    return Math.floor(255*255*255*rgb[0] + 255*255*rgb[1] + 255*rgb[2]);
}