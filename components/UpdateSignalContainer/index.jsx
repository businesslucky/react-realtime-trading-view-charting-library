import React, {useCallback, useState, useContext, useEffect} from 'react';
import './index.scss';
import { widget } from '../../static/charting_library/charting_library.min';
import Datafeed from './api/';
import axios from 'axios';
import SignalContext from '../../pages/updateSignal/components/signalContext';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


const ChartContainer = props => {	
	const contextChart = useContext(SignalContext);
	const { chartState } = contextChart;
	const [chartProp, setChartProp] = useState({});
	const defaultProps = {
		symbol: 'Coinbase:BTC/USDT',
		interval: '15',
		containerId: 'tv_chart_container_update',
		libraryPath: '/static/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	};

	const tvWidget = null;
	useEffect(() =>  {
		setChartProp(chartState);
		
		var selectedSymbol = chartState.exchange + ":" + chartState.symbol;
		
		const widgetOptions = {
			debug: false,
			symbol: selectedSymbol,
			datafeed: Datafeed,
			interval: defaultProps.interval,
			container_id: defaultProps.containerId,
			library_path: defaultProps.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings','left_toolbar','header_widget'],
			enabled_features: ['study_templates'],
			charts_storage_url: defaultProps.chartsStorageUrl,
			charts_storage_api_version: defaultProps.chartsStorageApiVersion,
			client_id: defaultProps.clientId,
			user_id: defaultProps.userId,
			fullscreen: defaultProps.fullscreen,
			autosize: defaultProps.autosize,
			studies_overrides: defaultProps.studiesOverrides,
			overrides: {
				
			}
		};
		
		const tvWidget = new widget(widgetOptions);
		tvWidget.onChartReady(() => {
			
			var data = chartState.chartData;
			for (let [key, value] of Object.entries(data)) {
				tvWidget.chart().createOrderLine()
					.setText(key)
					.setPrice(value.price)
					.setQuantity(value.quantity)
					.setLineColor(value.color)
					.setLineStyle(3)
					.setBodyTextColor(value.color)
					.setBodyBorderColor(value.color)
					.onMove(value,function() {
						contextChart.setChartState(key,this.getPrice());
					})
			}
		});
	} ,[chartState]);
	return (
		<div id={ defaultProps.containerId } className={ 'UpdateSignalContainer' } value= {chartProp}/>
	);
}
export class UpdateSignalContainer extends React.PureComponent {
	render() {
		return(
			<SignalContext.Consumer>
				{signal => (
					<ChartContainer value={signal}/>
				)}
			</SignalContext.Consumer>
			
		)
	}
}
UpdateSignalContainer.contextType = SignalContext;