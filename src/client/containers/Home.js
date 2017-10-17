import React from 'react';
import UserCard from "../components/Card";
import FriendsList from "../components/FriendsList"
import styled from "styled-components"
import { gql, graphql } from 'react-apollo';
import {Divider} from "semantic-ui-react";
import MasonryList from "../components/MasonryList";
import AllUsersList from "../components/AllUsersList";

const Root = styled.div`
	display: grid;
    grid-gap: 50px;
    background-color: #fff;
    color: #444;
    grid-template-columns: 0.25fr 2fr 1fr;
    position: absolute;
    width: 100%;
    height: 100%;
    
    @media screen and (max-width: 768px) {
        grid-gap: 2px;
        grid-template-columns: 0.5fr 2fr 1fr;
    }
`;

const UsersGrid = styled.div`
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
    
    grid-column: 2;
    grid-row: 1;
    
    @media screen and (max-width: 768px) {
        grid-column: 1/3;
    }
    
    display: flex;
    flex-wrap: wrap;
`;


const Friends = styled.div`
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
    
    grid-column: 3 ;
    grid-row: 1 / 2;
`;


const SidebarMenu = styled.div`
    grid-column: 1 ;
    grid-row: 1 / 2;
    
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const StyledUserCardWrapper = styled.div`
    display: inline-block;
    flex: 1 0;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    margin-left: 20px;
`;


@graphql(gql`
query RootQueryType {    
  all_users(limit: 100) {
    first_name
    last_name
    profileImage
    color
    user_index
  },
  actual_user(id: 100) {
    first_name,
    last_name,
    friends {
        first_name,
        last_name,
        color,
        profileImage,
        id
    }
  }
}
`)
export default class Home extends React.Component {
    render() {
        // const users = this.props.data.all_users || [];
        const user = this.props.data.actual_user || {};
        return (
                <Root>
        <SidebarMenu></SidebarMenu>
        <UsersGrid>
            {/*{users && users.map(item => {*/}
                {/*return item.first_name ? <StyledUserCardWrapper key={item.user_index}>*/}
                    {/*<UserCard first_name={item.first_name} last_name={item.last_name} color={item.color} image={item.profileImage} />*/}
                {/*</StyledUserCardWrapper> : "";*/}
            {/*})}*/}
            <MasonryList/>
            {/*<AllUsersList users={users}/>*/}
            {/*{users && users.map(item => {*/}
                {/*return item.first_name ? <StyledUserCardWrapper key={item.user_index}>*/}
                    {/*<UserCard first_name={item.first_name} last_name={item.last_name} color={item.color} image={item.profileImage} />*/}
                {/*</StyledUserCardWrapper> : "";*/}
            {/*})}*/}
        </UsersGrid>
        <Friends>
            <h3>{user.first_name + " " + user.last_name}</h3>
            <FriendsList friends={user.friends}/>
            </Friends>

    </Root>
        );
    }
}




// export default Home;