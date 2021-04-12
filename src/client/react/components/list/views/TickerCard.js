import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import commaNumber from 'comma-number'
import {Button, MenuItem, Icon, IconName } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import moment from 'moment'

import ReactECharts from 'echarts-for-react';

class TickerCard extends Component {

    renderMainProps = (item) => {
		return (
			<div className="item-main-details">
				<div className="item-main-details-small">
					{item.metadata[this.props.mainDisplayPropSmall]}
				</div>
				<div className="item-main-details-big">
					{item.metadata[this.props.mainDisplayPropBig]}
				</div>
			</div>
		)
    }
    

	render() {
        // console.log(this.props.item)
        let item = this.props.item

        let newWeek = item.week.map((metric, i) => {
          let color

          if (i == 0) {
            if(metric < item.week[1]) {
              color = "red"
            } else {
              color = "green"
            }
          } else {
            color = "#CFD9E0"
          }
					return {
            value: metric,
            itemStyle: { normal: { color: color } },
          }
				})

        const option = {
            animation: false,
            tooltip : {
              trigger: 'axis',
              axisPointer : {      // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'    // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              top: "5%",
              containLabel: true
            },
            xAxis: {
              type : 'category',
              splitLine: {show:false},
              data :  ["1D", "2D", "3D", "4D", "5D", "6D", "7D"],
              axisLine: {
                  lineStyle: {
                      color: "#D6DFE4"
                  }
              },
              axisLabel: {
                  color: "#8A9BA9",
                  fontSize: "11px",
                  fontWeight: "500"
              }
            },
            yAxis: {
              type : 'value',
              axisLabel: {
                    color: "#8A9BA9",
                    fontSize: "11px",
                    fontWeight: "500"
                }
            },
            series: [
              {
                name: 'Videos',
                type: 'bar',
                stack: 'Videos by week',
                itemStyle: {
                    borderColor: 'rgba(0,0,0,0)',
                    color: '#CFD9E0'
                }
                ,
                emphasis: {
                    itemStyle: {
                        borderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(22,179,113,100)'
                    }
                },
                data: newWeek
              }
            ]
        };
		return (
            <div className="list-result-item ticker-card">
                <Link to={`${this.props.itemUrl}/${item._id}`}>
                    <div className="list-result-item-top">
                        <div className="list-result-item-top-left">
                            {this.renderMainProps(item)}
                        </div>


                    </div>

                    <ReactECharts
                        option={option}
                        theme="my_theme"
                        style={{ height: 120, width: "100%" }}
                    />

                </Link>

            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location
	};
}

export default connect(mapStateToProps, {})(withRouter(TickerCard));
