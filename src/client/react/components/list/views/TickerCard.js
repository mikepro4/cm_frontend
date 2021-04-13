import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import commaNumber from 'comma-number'
import {Button, MenuItem, Icon, IconName } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import moment from 'moment'
import * as _ from "lodash"
import { searchPriceWeek, findPriceWeek } from "../../../../redux/actions/pricesActions"

import ReactECharts from 'echarts-for-react';

class TickerCard extends Component {

  state = {
    week: [],
    renderWeek: false,
    weekOptions: {}
  };
  
  componentDidMount() {
    // console.log(this.props.item)
    this.props.searchPriceWeek(this.props.item.metadata.symbol)
  }

  componentDidUpdate(prevProps, prevState) {
    let symbolIndex = _.findIndex(this.props.prices.week, {
      symbol: this.props.item.metadata.symbol
    });

    if(symbolIndex !== -1 && _.isEmpty(this.state.week)) {
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
        
        let weekPrices = this.props.prices.week[symbolIndex].series.map(day => {
          return day.close
        })

        let weekDays = this.props.prices.week[symbolIndex].series.map(day => {
          return day.date
        })

        let final = this.props.prices.week[symbolIndex].series.map(day => {
          let newDate = moment(day.date).format()
          return [
            newDate,
            day.close
          ]
        })


        let finalNewWeek = [
          [
            moment().format(),
            newWeek[0].value,
            newWeek[0].itemStyle
          ],
          [
            moment().subtract(1, "days").format(),
            newWeek[1].value
          ],
          [
            moment().subtract(2, "days").format(),
            newWeek[2].value
          ],
          [
            moment().subtract(3, "days").format(),
            newWeek[3].value
          ],
          [
            moment().subtract(4, "days").format(),
            newWeek[4].value
          ],
          [
            moment().subtract(5, "days").format(),
            newWeek[5].value
          ],
          [
            moment().subtract(6, "days").format(),
            newWeek[6].value
          ]
        ]

      this.setState({
        week: final,
        renderWeek: true,
        weekOptions: {
            animation: false,
            tooltip : {
              trigger: 'axis',
              axisPointer : {    
                type : 'shadow' 
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '4%',
              top: "5%",
              containLabel: true
            },
            xAxis: {
              type : 'time',
              splitLine: {show:false},
              axisLine: {
                  lineStyle: {
                      color: "#D6DFE4"
                  }
              },
              axisLabel: {
                  color: "#8A9BA9",
                  fontSize: "11px",
                  fontWeight: "500",
                  onZero: 0
              }
            },
            yAxis: [
                {
                  type : 'value',
                  axisLabel: {
                      color: "#8A9BA9",
                      fontSize: "11px",
                      fontWeight: "500",
                      formatter: '${value}'
                  },
                  splitNumber: 3,
                  min: 0,
                  splitLine: {
                    show: false
                  },
                },
                {
                  type : 'value',
                  axisLabel: {
                      color: "#8A9BA9",
                      fontSize: "11px",
                      fontWeight: "500",
                      onZero: 0
                  },
                 
                  splitNumber: 3,
                  min: 0
                }
            ],
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
                        borderColor: 'rgba(0,0,0,1)',
                    }
                },
                data: finalNewWeek,
                yAxisIndex: 1,
                },
              {
                  data: final,
                  type: 'line'
              }
            ]
        }
      })
    }
  }

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
    let item = this.props.item
		  return (
            <div className="list-result-item ticker-card">
                    <div className="list-result-item-top">
                        <div className="list-result-item-top-left">
                          <Link to={`${this.props.itemUrl}/${item._id}`}>
                            {this.renderMainProps(item)}
                          </Link>
                        </div>
                    </div>

                    {this.state.renderWeek ? ( <ReactECharts
                        option={this.state.weekOptions}
                        theme="my_theme"
                        style={{ height: 120, width: "100%" }}
                    />) : "Loading week"}
                   


            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
    location: state.router.location,
    prices: state.prices
	};
}

export default connect(mapStateToProps, {
  searchPriceWeek,
  findPriceWeek
})(withRouter(TickerCard));
