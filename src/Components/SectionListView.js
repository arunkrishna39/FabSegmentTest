import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    SectionList,
    Text

} from 'react-native';
import PropTypes from 'prop-types';
import Images from '../Themes/Images';
const { width } = Dimensions.get('window');
export default class SectionListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSelection: null,
            currentIndex: 0
        }
    }
    componentDidMount() {
    }
    onItemsChange = (info) => {
        if (info.viewableItems && info.viewableItems.length > 0) {
            this.setState({ currentSelection: info.viewableItems[0].section });
        }
    }
    moveToSection = (index) => {
        if (this.sectionList) {
            this.sectionList.scrollToLocation({ sectionIndex: index, itemIndex: 0 });
        }
    }
    showPreview = (image) => {
        this.props.showFullView(image);
    }
    renderItems = ({ item, index, section }) => {
        return (<View key={index}>
            <TouchableOpacity onPress={() => { this.showPreview(item) }}>
                <Image source={{ uri: item.url }} style={styles.imageStyle} />
                <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
        </View>);
    }
    renderTitles = () => {
        const listItems = this.props.headers.map((item, index) =>
            <TouchableOpacity key={item.id} onPress={() => { this.moveToSection(index) }} style={this.getHeaderStyle(item)}>
                <Text style={this.getTitleStyle(item)}>{item.title}</Text>
            </TouchableOpacity>
        );
        return listItems;
    }
    getHeaderStyle = (item) => {
        if (this.state.currentSelection && this.state.currentSelection.title == item.title) {
            return styles.headerSelected;
        }
        return styles.headerView;
    }
    getTitleStyle = (item) => {
        if (this.state.currentSelection && this.state.currentSelection.title == item.title) {
            return styles.headerSelectedTab;
        }
        return styles.headerTab;
    }
    renderListHeader = () => {
        return (
            <ScrollView
                style={styles.headerScrollTab}
                horizontal={true}
                decelerationRate={0}
                showsHorizontalScrollIndicator={false}
                snapToAlignment={"center"}
                contentInset={{
                    top: 0,
                    left: 30,
                    bottom: 0,
                    right: 30,
                }}
            >
                {this.renderTitles()}
            </ScrollView>
        );
    }
    render() {
        return (
            <View>
                {this.renderListHeader()}
                <SectionList
                    ref={(sectionList) => { this.sectionList = sectionList; }}
                    renderItem={this.renderItems}
                    //renderSectionHeader={({ section: { title } }) => <Text style={{ fontWeight: 'bold' }}>{title}</Text>}
                    sections={this.props.sections}
                    onViewableItemsChanged={this.onItemsChange}
                    keyExtractor={(item, index) => item + index} />
            </View>
        );
    }
}
SectionListView.propTypes = {
    headers: PropTypes.array,
    showFullView: PropTypes.func,
    sections: PropTypes.array
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexWrap: "wrap",
        //backgroundColor: "red"
    },
    item: {
        //marginTop: 100,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: width - 80,
        margin: 10,
        height: 200,
        borderRadius: 10,
        //paddingHorizontal : 30
    },
    imageStyle: {
        width: width,
        height: width / 2,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    headerSelectedTab: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        margin: 15
    },
    headerTab: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'right',
        margin: 15
    },
    headerView: {
        marginRight: 10
    },
    headerSelected: {
        borderBottomWidth: 4,
        borderColor: '#ffffff',
        marginRight: 10,
        marginBottom: 2
    },
    itemTitle: {
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'left',
        color: '#333333',
        fontSize: 18
    },
    headerScrollTab: {
        backgroundColor: "#1d2549"
    }

});