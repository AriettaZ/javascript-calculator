function normalize(result){
  if (parseInt(result)!==result){
    if (/[eE]/){
      result = parseFloat(result.toPrecision(6));
    }else{
      result = parseFloat(result.toFixed(5));
    }
  }
  return result;
}
