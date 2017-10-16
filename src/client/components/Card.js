import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

export default class UserCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Card color={this.props.color}>
            <Image src={this.props.image}/>
            <Card.Content>
                <Card.Header>
                    {this.props.first_name}
                </Card.Header>
                <Card.Meta>
        <span className='date'>
          Joined in 2015
        </span>
                </Card.Meta>
                <Card.Description>
                    {this.props.first_name + " " + this.props.last_name} is awesome!
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='user'/>
                    22 Friends
                </a>
            </Card.Content>
        </Card>
    }
}
