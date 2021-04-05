import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from 'react-apollo-hooks';

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
    seedFeed{
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
  const { loading, data } = useQuery(FEED_QUERY);
  return <View>{loading ? <Loader /> : null }</View>
};