import {gql} from "react-apollo";

export const AllFields = gql`
        query RootQueryType {    
          all_users {
            first_name
            last_name
            profileImage
            color
            user_index
            email
            id
        },
    }`;

export const OneField = gql`
        query RootQueryType {    
          all_users {
            id
        },
    }`;

export const TwoFields = gql`
        query RootQueryType {    
          all_users {
            first_name
            last_name
        },
    }`;

export const ThreeFields = gql`
        query RootQueryType {    
          all_users {
            first_name
            last_name
            profileImage
        },
    }`;

export const FourFields = gql`
        query RootQueryType {    
          all_users {
            first_name
            last_name
            profileImage
            color
        },
    }`;