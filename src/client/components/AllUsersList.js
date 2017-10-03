import React from 'react'
import { Divider } from 'semantic-ui-react'
import FriendsItem from "./FriendsItem";
import {AutoSizer, CellMeasurer, InfiniteLoader, List} from "react-virtualized";
import {withApollo, gql, graphql} from 'react-apollo';
import UserCard from "./Card";

@withApollo
export default class AllUsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        };

    }

    render() {
        const { users } = this.state;
        const BOX_WIDTH = 450;
        const BOX_HEIGHT = 450;
        return <div>
            <InfiniteLoader
                isRowLoaded={this._isRowLoaded}
                loadMoreRows={this._loadRows}
                rowCount={users.length + 1}>
                {({onRowsRendered, registerChild}) =>
                    <AutoSizer disableHeight>
                    {({ width }) => {
                        const numberOfBoxesPerRow = Math.floor(width / BOX_WIDTH);
                        const rowCount = Math.ceil(users.length + 1 / 3)

                        return <List
                            height={701}
                            onRowsRendered={onRowsRendered}
                            overscanRowCount={1}
                            rowCount={rowCount}
                            rowHeight={BOX_HEIGHT}
                            rowRenderer={this._rowRenderer}
                            width={width}
                        />
                    }}
                    </AutoSizer>


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
        return index < this.state.users.length;
    };

    _rowRenderer = ({ index, isScrolling, key, parent, style }) => {
        const { users } = this.state;

        let content;

        if (index >= users.length) {
            content = <span>Loading</span>;
        } else {
            const user = users[index];
            content = (<div><UserCard image={user.profileImage} first_name={user.first_name} last_name={user.last_name}/> <UserCard image={user.profileImage} first_name={user.first_name} last_name={user.last_name}/> <UserCard image={user.profileImage} first_name={user.first_name} last_name={user.last_name}/></div>);
        }

         return (
                <div key={index} style={style}>
                    {content}
                </div>
            );
        };

}
