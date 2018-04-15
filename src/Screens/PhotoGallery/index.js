import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import SectionList from '../../Components/SectionListView';
const deviceWidth = Dimensions.get("window").width;
let headers = [{ id: 1, title: 'Main' }, { id: 2, title: 'Room' }, { id: 3, title: 'Bathroom' }, { id: 4, title: 'Other' }]
let sectionData = [
    { title: 'Main', data: [{ id: 1, url: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg', title: 'Main' }, { id: 2, url: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg', title: 'Main' }] },
    {
        title: 'Room', data: [{
            id: 1, url: 'https://pimg.fabhotels.com/propertyimages/665/thumbnail/room-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031000.jpg',
            title: 'Room'
        }, { id: 2, url: 'https://pimg.fabhotels.com/propertyimages/665/medium/room-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031027.jpg', title: 'Room' },
        { id: 3, url: 'https://pimg.fabhotels.com/propertyimages/665/medium/room-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031047.jpg', title: 'Room' }]
    },
    {
        title: 'Bathroom', data: [{ id: 1, url: 'https://pimg.fabhotels.com/propertyimages/665/medium/bathroom-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031306.jpg', title: 'Bathroom' },
        { id: 2, url: 'https://pimg.fabhotels.com/propertyimages/665/medium/bathroom-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031323.jpg', title: 'Bathroom' }]
    },
    {
        title: 'Other', data: [{ id: 1, url: 'https://pimg.fabhotels.com/propertyimages/665/thumbnail/other-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031513.jpg', title: 'Other' },
        { id: 2, url: 'https://pimg.fabhotels.com/propertyimages/665/medium/other-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031729.jpg', title: 'Other' }, { id: 3, url: 'https://pimg.fabhotels.com/propertyimages/665/thumbnail/other-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031720.jpg', title: 'Other' }]
    }
];
export default class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            previewData: null
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>FabHotels</Text>
                </View>
                <SectionList headers={headers} showFullView={this.showFullView} sections={sectionData}></SectionList>
                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: false });
                    }}>
                    <View style={styles.preview}>
                        <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }); }} style={styles.close}><Text style={styles.closeText}>CLOSE</Text></TouchableOpacity>
                        <Image style={styles.previewImage} resizeMode={'contain'} source={{ uri: this.state.previewData ? this.state.previewData.url : '' }}></Image>
                    </View>
                </Modal>
            </View>
        );
    }
    showFullView = (image) => {
        this.setState({ modalVisible: true, previewData: image })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    preview: {

        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1
    },
    previewImage: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
    close: {
        justifyContent: 'flex-end',
    },
    closeText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        margin: 15
    },
    header: {
        width: deviceWidth,
        height: '8%',
        backgroundColor: "#1d2549",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 25,
        elevation: 2,
        shadowColor: "transparent",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#141932",
        shadowColor: "#141932",
    },
    headerText: {
        fontSize: 18,
        color: "#ffffff",
        fontWeight: 'bold',
        marginTop: 10
    }
});