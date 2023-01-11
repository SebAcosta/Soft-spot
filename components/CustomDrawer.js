import React,{useContext} from "react";
import { View, Text, Img } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import {Entypo} from 'react-native-vector-icons';
import { LoginContext } from "../Context/LoginContext";

export const CustomDrawer = (props) => {

    const {cerrarSesion} = useContext(LoginContext)

    const logoutHandle= ()=>{
        cerrarSesion()
	}

    return (
        <View style={{flex: 1, backgroundColor:'#F23232'}}>
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
            <DrawerContentScrollView {...props} >
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        </View>
    )
};

