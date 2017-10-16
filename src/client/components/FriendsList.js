import React from 'react'
import { List, Divider } from 'semantic-ui-react'
import FriendsItem from "./FriendsItem";

export default class FriendsList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="inline-block">
            <Divider horizontal>FRIENDS</Divider>
            <List>
                {this.props.friends && this.props.friends.map(item => <FriendsItem key={item.id} first_name={item.first_name} last_name={item.last_name} image={item.profileImage}/>)}
            </List>
            </div>
    }
}
