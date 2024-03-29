import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl } from "react-native";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from 'react-apollo-hooks';
import Post from "../../components/Post";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FEED_QUERY = gql`
  {
    seeFeed{
      id
      location
      caption
      user {
        id
        avatar
        userName
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          userName
        }
      }
      createdAt
    }
  }
`;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data } = useQuery(FEED_QUERY);
  const refresh = async () => {
    try{
      setRefreshing(true);
      await refetch();
    }catch (e){
      console.log(e);
    }finally{
      setRefreshing(false);
    }
  }

  return <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh}/>}>
              {loading ? <Loader /> : data && 
                                      data.seeFeed && 
                                      data.seeFeed.map(post => <Post key={post.id} {...post} />) }
          </ScrollView>
};