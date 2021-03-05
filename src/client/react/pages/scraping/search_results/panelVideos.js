import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"

class PanelVideos extends Component {

    renderVideos() {

        var filteredVideos = _.map(this.props.videos, function(o) {
            if (o.status !== "reject") return o;
        });

        return (
            <div className="panel-content">
            {filteredVideos.map(video => {
                if(video && video.status) {
                    return(<div key={video.status + video.ticker + new Date() + Math.random()}>
                    {video.status} {video.ticker} {video.video.metadata.title}
                </div>)
                }
                
            })}
        </div>
        )
    }
	render() {
        
		return (
			<div className="panel videos-container">
                <div className="panel-header">
                    <div className="panel-header-left">
                        <div className="panel-name">VIDEOS</div>
                    </div>

                    <div className="panel-header-right">
                    </div>
                    
                </div>
                
                {this.renderVideos()}

            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
        videos: state.scrapingSearchResults.videos
	};
}

export default connect(mapStateToProps, {})(PanelVideos);
