export const API_KEY = 'AIzaSyBvq6pDumWuRvABlDeMGP4614c3GRdIH7Y';

 export const value_convert = (value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M"
    }else if(value>=1000){
        return Math.floor(value/1000)+"K"
    }else{
        return value;
    }
    
}