import React from 'react';
import UserCard from "../components/Card";
import styled from "styled-components"

const Root = styled.div`
	display: grid;
    grid-gap: 50px;
    background-color: #fff;
    color: #444;
    grid-template-columns: 0.5fr 2fr 0.5fr;
    position: absolute;
    width: 100%;
    height: 100%;
    
    @media screen and (max-width: 768px) {
        grid-gap: 2px;
        grid-template-columns: 0.5fr 2fr 1fr;
    }
`;

const UsersGrid = styled.div`
    // background-color: #444;
    // color: #fff;
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
    // background-color: #444;
    // color: #fff;
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
`;

const Home = () => (
    <Root>
        <SidebarMenu></SidebarMenu>
        <UsersGrid>
            <StyledUserCardWrapper>
                <UserCard/>
            </StyledUserCardWrapper>
            <StyledUserCardWrapper>
                <UserCard/>
            </StyledUserCardWrapper>
            <StyledUserCardWrapper>
                <UserCard/>
            </StyledUserCardWrapper>
            <StyledUserCardWrapper>
                <UserCard/>
            </StyledUserCardWrapper>
            <StyledUserCardWrapper>
                <UserCard/>
            </StyledUserCardWrapper>
            <StyledUserCardWrapper>
                <UserCard/>
            </StyledUserCardWrapper>
            <StyledUserCardWrapper>
                <UserCard/>
            </StyledUserCardWrapper>
            <StyledUserCardWrapper>
                <UserCard/>
            </StyledUserCardWrapper>
            <StyledUserCardWrapper>
                <UserCard/>
            </StyledUserCardWrapper>
            <StyledUserCardWrapper>
                <UserCard/>
            </StyledUserCardWrapper>
            <StyledUserCardWrapper>
                <UserCard/>
            </StyledUserCardWrapper>
        </UsersGrid>
        <Friends><h3>Friends</h3></Friends>

    </Root>

);


export default Home;