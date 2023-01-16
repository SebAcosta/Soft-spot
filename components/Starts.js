import StarRating from 'react-native-star-rating-widget';
import {StyleSheet} from 'react-native';
import React,{useState, useContext} from 'react';
import themeContext from '../config/themeContext';


export default function Starts(){
  const theme = useContext(themeContext);
  const [rating, setRating] = useState(0);
  return (
      <StarRating
      style={[style.container, {borderColor: theme.linea}]}
        rating={rating}
        onChange={setRating}
      />
  );
};

const style = StyleSheet.create({
  container:{
    height:80, 
    borderColor:"#B8BDC6", 
    borderWidth:1,
    justifyContent:"center", 
    borderRadius:15, 
    paddingLeft:"16%", 
    marginBottom:40
  }

})

