import React from 'react'
import { Divider } from 'semantic-ui-react'
import FriendsItem from "./FriendsItem";
import {AutoSizer, CellMeasurer, InfiniteLoader, List, WindowScroller} from "react-virtualized";
import {withApollo, gql, graphql} from 'react-apollo';
import UserCard from "./Card";

@withApollo
export default class AllUsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: this.props.users,
        };

    }

    render() {
        const { users } = this.state;
        const BOX_WIDTH = 450;
        const BOX_HEIGHT = 450;
        return <div style={{ display: "flex", flex: '1 1 auto' }}>
            <InfiniteLoader
                isRowLoaded={this._isRowLoaded}
                loadMoreRows={this._loadRows}
                rowCount={users.length + 1}>
                {({onRowsRendered, registerChild}) =>
                    <WindowScroller>
                        {({ height, isScrolling, scrollTop }) => (
                                <AutoSizer>
                                    {({ width, height }) => (
                                        <List
                                            scrollTop={scrollTop}
                                            height={height}
                                            onRowsRendered={onRowsRendered}
                                            overscanRowCount={1}
                                            rowCount={666}
                                            rowHeight={BOX_HEIGHT}
                                            rowRenderer={this._rowRenderer}
                                            width={width}
                                        />
                                    )}
                                </AutoSizer>

                        )}
                    </WindowScroller>
                }
            </InfiniteLoader>
        </div>
    }

    _loadRows = () => {
        let lastIndex = this.state.users.length - 1;

        if (lastIndex < 0) {
            lastIndex = 0;
        }

        const UsersQuery = gql`
            query RootQueryType {    
              all_users(skip: ${lastIndex}, limit: 100) {
                first_name
                last_name
                profileImage
                color
                user_index
              },
            }`;

        this.props.client.query({
            query: UsersQuery,
        }).then((data) => {
            console.log(data.data.all_users);
            this.setState({users: this.state.users.concat(data.data.all_users)})
        }).catch((err) => {
            console.log('catch', err)
        });
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.users !== prevState.users) {
            const index = prevState.length;
            if (this._list) {
                this._list.recomputeRowHeights(index);
            }
        }
    }


    _isRowLoaded = ({ index }) => {
        return index < this.state.users.length / 3;
    };

    _rowRenderer = ({ index, isScrolling, key, parent, style }) => {
        const { users } = this.state;

        let content;
        index = index * 3;

        if (index >= users.length) {
            content = <span>Loading</span>;
        } else {
            const user1 = users[index];
            const user2 = users.length > index + 1 ? users[index + 1] : undefined;
            const user3 = users.length > index + 2 ? users[index + 2] : undefined;
            content = (<div><UserCard image={user1.profileImage} first_name={user1.first_name} last_name={user1.last_name}/> <UserCard image={user2.profileImage} first_name={user2.first_name} last_name={user2.last_name}/> <UserCard image={user3.profileImage} first_name={user3.first_name} last_name={user3.last_name}/></div>);
        }

         return (
                <div key={index} style={style}>
                    {content}
                </div>
            );
        };

}
