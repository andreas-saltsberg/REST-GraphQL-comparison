import React from 'react'
import { Divider } from 'semantic-ui-react'
import FriendsItem from "./FriendsItem";
import {
    AutoSizer, CellMeasurer, CellMeasurerCache, createMasonryCellPositioner, InfiniteLoader,
    List, Masonry, WindowScroller
} from "react-virtualized";
import {withApollo, gql, graphql} from 'react-apollo';
import UserCard from "./Card";
import createCellPositioner from "react-virtualized/dist/es/Masonry/createCellPositioner";

@withApollo
export default class MasonryList extends React.Component {

    constructor(props) {
        super(props);

        this._columnCount = 0;

        this._cache = new CellMeasurerCache({
            defaultHeight: 425,
            defaultWidth: 200,
            minHeight: 425,
            fixedWidth: true
        });

        this._columnHeights = {};

        this.state = {
            users: [],
            columnWidth: 200,
            gutterSize: 15,
            height: 301,
            windowScrollerEnabled: true
        };

        this._cellRenderer = this._cellRenderer.bind(this);
        this._onResize = this._onResize.bind(this);
        this._renderAutoSizer = this._renderAutoSizer.bind(this);
        this._renderMasonry = this._renderMasonry.bind(this);
        this._setMasonryRef = this._setMasonryRef.bind(this);
    }

    _calculateColumnCount() {
        const { columnWidth, gutterSize } = this.state;

        this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
    }

    _cellRenderer({ index, key, parent, style }) {
        const { columnWidth } = this.state;
        console.log(style)
        return (
            <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
                <div
                    style={{
                        ...style,
                        width: columnWidth
                    }}>
                    <UserCard key={index} first_name="Finnegan" last_name="Sloan" image="https://semantic-ui.com/examples/assets/images/avatar/tom.jpg" />
                </div>
            </CellMeasurer>
        );
    }

    _initCellPositioner() {
        if (typeof this._cellPositioner === "undefined") {
            const { columnWidth, gutterSize } = this.state;

            this._cellPositioner = createCellPositioner({
                cellMeasurerCache: this._cache,
                columnCount: this._columnCount,
                columnWidth,
                spacer: gutterSize
            });
        }
    }

    _onResize({ width }) {
        this._width = width;

        this._columnHeights = {};
        this._calculateColumnCount();
        this._resetCellPositioner();
        this._masonry.recomputeCellPositions();
    }

    _renderAutoSizer({ height, scrollTop }) {
        this._height = height;
        this._scrollTop = scrollTop;

        return (
            <AutoSizer
                onResize={this._onResize}
                scrollTop={this._scrollTop}
            >
                {this._renderMasonry}
            </AutoSizer>
        );
    }

    _renderMasonry({ width, height }) {
        this._width = width;
        this._height = height;

        this._calculateColumnCount();
        this._initCellPositioner();

        const { windowScrollerEnabled } = this.state;

        return (
            <Masonry
                autoHeight={windowScrollerEnabled}
                cellCount={1000}
                cellMeasurerCache={this._cache}
                cellPositioner={this._cellPositioner}
                cellRenderer={this._cellRenderer}
                height={windowScrollerEnabled ? this._height : height}
                ref={this._setMasonryRef}
                scrollTop={this._scrollTop}
                width={width}
            />
        );
    }

    _resetCellPositioner() {
        const { columnWidth, gutterSize } = this.state;

        this._cellPositioner.reset({
            columnCount: this._columnCount,
            columnWidth,
            spacer: gutterSize
        });
    }

    _setMasonryRef(ref) {
        this._masonry = ref;
    }



    render() {

        const {
            height,
            windowScrollerEnabled
        } = this.state;

        let child;

        if (windowScrollerEnabled) {
            child = (
                <WindowScroller>
                    {this._renderAutoSizer}
                </WindowScroller>
            );
        } else {
            child = this._renderAutoSizer({ height });
        }

        return <div style={{"height": "100%", "width": "100%"}}>
            {child}
        </div>
    }

}
