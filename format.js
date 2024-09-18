function formatPricing(amount, id){
    const formattedPrice = `${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if(id !== null ){
return document.getElementById(id).textContent = formattedPrice;
  }
  else{
  return formattedPrice;
  }
    
  }