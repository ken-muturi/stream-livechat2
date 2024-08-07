import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Colors from '@/constants/Colors'
import { books } from '@/store/books'
import { defaultStyles } from '@/constants/Styles'
import ReactNativeBlobUtil from 'react-native-blob-util'
import { Link } from 'expo-router'
import { Book } from '@/types/book'

const Books = () => {
    const[data, setData] = useState<Book[]>([])
    const[loading, setLoading] = useState(false)
    useEffect(()=> {

    }, []);
    
    const dirs = ReactNativeBlobUtil.fs.dirs;
    const folderPath = dirs.DownloadDir + '/churchStream';

    const checkBookExists = async () => {
        setLoading(true);
        try {
            const results = await Promise.all(books.map( async (d) => {
                const file = `${folderPath}/${d.title}`
                return {
                    ...d, 
                    isDownloaded: await ReactNativeBlobUtil.fs.exists(file)
                }
            }));
            setData(results);
            setLoading(false);
            console.log({results})
        }
        catch(error) {
            console.log(error)
        }
    }

    const handSetData = () => {}

    const showBook = ({item}: {item: Book}) => {
        return (
        <View>
            <View style={defaultStyles.container}>
                <View style={styles.circle}>
                    <TouchableOpacity>
                    <Text>{item.title}</Text>  
                    </TouchableOpacity>
                </View>
                <Text style={defaultStyles.descriptionText}>{item.title}</Text>  
            </View>      
            <View style={defaultStyles.container}>
                { item.isDownloaded && (
                    // <Link href={`/book/${item.title}/view`} replace asChild>
                        <TouchableOpacity onPress={() => console.log("download")}>
                            <Text>Download</Text>  
                        </TouchableOpacity>
                    // </Link>  
                )}

                { ! item.isDownloaded && (
                    // <Link href={`/book/${item.title}/reader`} replace asChild>
                        <TouchableOpacity>
                            <Text>Download</Text>  
                        </TouchableOpacity>
                    // </Link>
                )}
            </View>
        </View>
        );
    }
    
    return (
    <View>
       {loading && <ActivityIndicator size="large" style={{"justifyContent": "center", "alignItems": "center"}} /> }
       <FlatList data={data} renderItem={showBook}/>
    </View>
  )
}

const styles = StyleSheet.create({
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
      },
      label: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.dark,
      },
})
export default Books