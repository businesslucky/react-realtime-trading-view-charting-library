import React, {useCallback, useState, useContext, useEffect} from 'react';
import './index.scss';
import { widget } from '../../static/charting_library/charting_library.min';
import Datafeed from './api/';
import axios from 'axios';
import SignalContext from '../../pages/createSignal/components/signalContext';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


const ChartContainer = props => {	
	
	const contextChart = useContext(SignalContext);
	const { chartState, exchangeOptions, symbolOptions,numTarget } = contextChart;
	const [chartProp, setChartProp] = useState({});
	const defaultProps = {
		symbol: 'Coinbase:BTC/USDT',
		interval: '15',
		containerId: 'tv_chart_container',
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
		var selectedSymbol =  symbolOptions.symbols.find(symbol => symbol.value === chartState.symbol);
		
		selectedSymbol = exchangeOptions.selected + ":" + (selectedSymbol == undefined ? "BTC/USD" : selectedSymbol.symbol);
		
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
		// tvWidget = tvWidget;
		tvWidget.onChartReady(() => {
			
			var data = chartState;
			var numTarget = parseInt(contextChart.numTarget) + 4;
			var i =0; 
			for (let [key, value] of Object.entries(data)) {
				if(i == numTarget)
					break;
				i++;
				
				if(value.hasOwnProperty('price')){
					tvWidget.chart().createOrderLine()
						.setText(key)
						.setPrice(value.price)
						.setQuantity(value.quantity)
						.setLineColor(value.color)
						.setLineStyle(3)
						.setBodyTextColor(value.color)
						.setBodyBorderColor(value.color)
						.onMove(function() {
							contextChart.setChartState(key,this.getPrice());
						})
				}
			}
		});
	},[chartState,exchangeOptions,numTarget] );
	return (
		<div id={ defaultProps.containerId } className={ 'CreateSignalContainer' } value= {chartProp}/>
	);
}
export class CreateSignalContainer extends React.PureComponent {
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
CreateSignalContainer.contextType = SignalContext;