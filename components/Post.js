import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Image } from "react-native";
import Swiper from 'react-native-swiper';
import constants from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-vector-icons/Icon";

const Container = styled.View``;
const Header = styled.View`
    flex-direction: row;
    align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const Bold = styled.Text`
    font-weight: 500;  
`;
const HeaderUserContainer = styled.View`
    margin-left: 10px;
`;
const Location = styled.Text`
    font-size: 12px;
`;

const IconsContainer = styled.View`
`;


const Post = ({ user, location, files = [] }) => {
    return (
        <Container>
            <Header>
                <Touchable>
                    <Image 
                        style={{height: 40, width: 40, borderRadius: 20 }} 
                        source={{ uri: user.avatar }}/>
                    <HeaderUserContainer>
                        <Bold>{user.userName}</Bold>
                        <Location>{location}</Location>
                    </HeaderUserContainer>
                    <Swiper 
                        showsButtons style={{height: constants.height / 2.5}}
                        showsPagination={false}>
                        {files.map(file => <Image 
                                              style={{width: constants.width, height: constants.height / 2.5}} 
                                              key={file.id} 
                                              source={{uri: file.url}} />)}
                    </Swiper>
                </Touchable>
            </Header>
        </Container>
    );
};



Post.propTypes = {
    id:PropTypes.string.isRequired,
    user:PropTypes.PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar:PropTypes.string,
        userName:PropTypes.string.isRequired
    }).isRequired, 
    files:PropTypes.arrayOf(PropTypes.shape({
            id:PropTypes.string.isRequired,
            url:PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount:PropTypes.number.isRequired,
    isLiked:PropTypes.bool.isRequired,
    comments:PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        text:PropTypes.string.isRequired,
        user:PropTypes.shape({
            id:PropTypes.string.isRequired,
            userName:PropTypes.string.isRequired
        }).isRequired
    })).isRequired,
    createdAt:PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string
};

export default Post;