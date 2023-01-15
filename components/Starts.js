import StarRating from 'react-native-star-rating-widget';
import React,{useState} from 'react';


export default function Starts(){
  const [rating, setRating] = useState(0);
  return (
      <StarRating
      style={{backgroundColor:"black", height:80, 
        justifyContent:"center", borderRadius:15, paddingLeft:"13%", marginBottom:40}}
        rating={rating}
        onChange={setRating}
      />
  );
};
