function normalize(result){
  if (result.toString().includes("e")){
    result = parseFloat(result.toPrecision(6));
  }else{
    result = parseFloat(result.toFixed(5));
  }
  return result;
}
