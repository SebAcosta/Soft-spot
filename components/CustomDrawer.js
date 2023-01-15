import React,{useContext} from "react";
import { View, Text, Img } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import {Entypo} from 'react-native-vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LoginContext } from "../Context/LoginContext";
import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs";

export const CustomDrawer = (props) => {

    const {cerrarSesion} = useContext(LoginContext)

    const logoutHandle= ()=>{
        cerrarSesion()
	}

    return (
        <View style={{flex: 1, backgroundColor:'#F23232'}}>
            <DrawerContentScrollView {...props} >
                <View style={{
                    alignItems:'center',
                    padding:20,
                    backgroundColor:"#C71C1C",
                    height:190,
                    justifyContent:"center"
              }}>
                    <View>
                        <FontAwesome name="user-circle" size={70} color="#f8f8f8" />
                    </View>
                    <View style={{justifyContent:"center", alignItems:"center", marginTop:10}}>
                        <Text style={{fontSize:17, color:"#f4f4f4", fontWeight:"700"}}>Soft spot</Text>
                        <Text style={{fontSize:15, color:"#f4f4f4"}}>softspot@gmail.com</Text>
                    </View>
                </View>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
            <DrawerItem 
                label={ () => <Text style={{color: '#fff', marginLeft: -15, fontWeight: '600'}}>Cerrar sesión</Text>}
                onPress={() => {
                    logoutHandle()}
                }  
                labelStyle={{color: '#ffffff'}} 
                icon={
                    () => <Entypo name='log-out' size={25} color='white'/>
                }
                
            />
        </View>
    )
};

