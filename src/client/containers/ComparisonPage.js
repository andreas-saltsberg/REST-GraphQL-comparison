import React from 'react';

import styled from "styled-components"
import AllQueryFields from "../components/query_test/AllQueryFields";

const Rest = styled.span`
    color: rgb(136, 132, 216);
`;

const Graphql =  styled.span`
    color: rgb(130, 202, 157);
`;

const Root = styled.div`
    display: grid;
    grid-gap: 25px;
    background-color: #fff;
    color: #444;
    grid-template-columns: 1fr 1fr;
    position: absolute;
    width: 100%;
    height: 100%;
    padding-left: 10%;
    padding-right: 10%;
         
    @media screen and (max-width: 768px) {
        grid-gap: 2px;
        grid-template-columns: 1fr;
    }
`;

const Container = styled.div`
    padding: 10px;
    text-align: center;
`;

const Header = styled.div`
    padding: 10px;
    grid-column: 1/3;
    text-align: center;
    align-self: center;
    
    @media screen and (max-width: 768px) {
        grid-column: 1;
    }
`;

export default class ComparisonPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root>
                <Header>
                    <h2><Rest>REST</Rest> vs <Graphql>GraphQL</Graphql></h2>
                </Header>
                <Container>
                    <AllQueryFields name="All Fields" id={10}/>
                </Container>
                <Container>
                    <AllQueryFields name="One Field" id={1}/>
                </Container>
                <Container>
                    <AllQueryFields name="Eight Fields" id={2}/>
                </Container>

                <Container>
                    <AllQueryFields name="One Field (Including REST)" id={3}/>
                </Container>
            </Root>
        );
    }
}




// export default Home;