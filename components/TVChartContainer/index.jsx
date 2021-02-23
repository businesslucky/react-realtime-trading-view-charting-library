import * as React from 'react';
import './index.scss';
import { widget } from '../../static/charting_library/charting_library.min';
import Datafeed from './api/'

import axios from 'axios';
function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export class TVChartContainer extends React.PureComponent {
	static defaultProps = {
		symbol: 'Coinbase:BTC/USD',
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

	tvWidget = null;

	componentDidMount() {
		const widgetOptions = {
			debug: false,
			symbol: this.props.symbol,
			datafeed: Datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings','left_toolbar','top_toolbar'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			overrides: {
				"mainSeriesProperties.showCountdown": true,
				"paneProperties.background": "#131722",
				"paneProperties.vertGridProperties.color": "#363c4e",
				"paneProperties.horzGridProperties.color": "#363c4e",
				"symbolWatermarkProperties.transparency": 90,
				"scalesProperties.textColor" : "#AAA",
				"mainSeriesProperties.candleStyle.wickUpColor": '#336854',
				"mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
			}
		};
		

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;
		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));
				button.innerHTML = 'Check API';
			});
			axios.get('/signal/view/1')
				.then(response => {
					var signals = response.data.signal;
					for(var i = 0 ; i < signals.length ; i ++){
						
						var point = {
							time: Date.now(),
							price: signals[i].price 
						};
			
						var options = {
							shape: 'horizontal_line',
							lock: true,
							disableSave: true,
							disableSelection: false,
							disableUndo : true,
							text: signals[i].label,
							overrides: {
								linecolor: signals[i].color,
								linestyle: 0,
								linewidth: 1,
								horzLabelsAlign: "right",
								showPrice: true,
								showLabel: true,
								textcolor: signals[i].color
							}
						};
						var entityId = tvWidget.chart().createShape(point, options);
						tvWidget.chart().getShapeById(entityId).setProperties({ text: signals[i].label });
					}
				})
            .catch((error) => { });
			
		});
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (
			<div
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}
