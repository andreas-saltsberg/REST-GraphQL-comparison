import React from 'react'
import { Image, List } from 'semantic-ui-react'

export default class FriendsItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <List.Item className="inline">
            <Image avatar src={this.props.image} />
            <List.Content>
                <List.Header as='a'>{this.props.first_name + " " + this.props.last_name}</List.Header>
                <List.Description>Offline</List.Description>
            </List.Content>
        </List.Item>
    }
}
