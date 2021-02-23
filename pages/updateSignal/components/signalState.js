import React, {useCallback, useState, useContext} from 'react';

import {Button, Modal, Stack, TextContainer, TextField} from '@shopify/polaris';

import SignalContext from "./signalContext";

const SignalState = props => {

    const contextData = useContext(SignalContext);
    const contextChartState = contextData.chartState;
    const chartState = contextChartState.chartData;
  return (
    <div>
        <Stack vertical>
                <Stack.Item>
                    <Stack>
                        <TextField label="STRATEGY" value="SHORT"/>
                        <TextField label="SYMBOL" value="BTCUSDT" />
                        <TextField label="EXCHANGE" value="BINANCE"/>
                        <TextField label="SUBMISSION DATE" value="March, 14th"/>
                    </Stack>
                </Stack.Item>
                
                <div className = "chart-data-vertical">
                    <Stack vertical>
                        <Stack.Item>
                            <div className = "category-header">
                                <Stack>
                                    <TextContainer>
                                        <p>
                                            💰 BUY MIN
                                        </p>
                                    </TextContainer>
                                    <TextContainer>
                                        <p>
                                            💰 BUY MAX
                                        </p>
                                        </TextContainer>
                                    <TextContainer >
                                        <p>
                                            ⛔️ STOP LOSS
                                        </p>
                                    </TextContainer>
                                </Stack>
                            </div>
                            
                        </Stack.Item>
                        
                        <Stack.Item>
                            <div className = "category-content">
                                <Stack>
                                    <TextContainer>
                                        <p>
                                            {chartState.hasOwnProperty("entryMin") ? Number(chartState["entryMin"].price).toFixed(8) : 0 }
                                        </p>
                                    </TextContainer>
                                    <TextContainer>
                                        <p>
                                            {chartState.hasOwnProperty("entryMax") ? Number(chartState["entryMax"].price).toFixed(8) : 0 }
                                        </p>
                                        </TextContainer>
                                    <TextContainer >
                                        <p>
                                            {chartState.hasOwnProperty("stopLoss") ? Number(chartState["stopLoss"].price).toFixed(8) : 0 }
                                        </p>
                                    </TextContainer>
                                </Stack>
                            </div>
                            
                        </Stack.Item>
                        <Stack.Item>
                            
                            <div className = "category-header">
                                <Stack>
                                    <TextContainer>
                                        <p>
                                            🎯TARGET 1
                                        </p>
                                    </TextContainer>
                                    <TextContainer>
                                        <p>
                                            🎯TARGET 2
                                        </p>
                                        </TextContainer>
                                    <TextContainer >
                                        <p>
                                            🎯TARGET 3
                                        </p>
                                    </TextContainer>
                                </Stack>
                            </div>
                            
                        </Stack.Item>
                        
                        <Stack.Item>
                            <div className = "category-content">
                                <Stack>
                                    <TextContainer>
                                        <p>
                                        {chartState.hasOwnProperty("target1") ? Number(chartState["target1"].price).toFixed(8) : 0 }
                                        </p>
                                    </TextContainer>
                                    <TextContainer>
                                        <p>
                                        {chartState.hasOwnProperty("target2") ? Number(chartState["target2"].price).toFixed(8) : 0 }
                                        </p>
                                        </TextContainer>
                                    <TextContainer >
                                        <p>
                                        {chartState.hasOwnProperty("target3") ? Number(chartState["target3"].price).toFixed(8) : 0 }
                                        </p>
                                    </TextContainer>
                                </Stack>
                            </div>
                            
                        </Stack.Item>
                        <Stack.Item>
                            <div className = "category-header">
                                <Stack>
                                    <TextContainer>
                                        <p>
                                            🎯TARGET 4
                                        </p>
                                    </TextContainer>
                                    <TextContainer>
                                        <p>
                                            🎯TARGET 5
                                        </p>
                                        </TextContainer>
                                    <TextContainer >
                                        <p>
                                            🎯TARGET 6
                                        </p>
                                    </TextContainer>
                                </Stack>
                            </div>
                            
                        </Stack.Item>
                        
                        <Stack.Item>
                            <div className = "category-content">
                                <Stack>
                                    <TextContainer>
                                        <p>
                                        {chartState.hasOwnProperty("target4") ? Number(chartState["target4"].price).toFixed(8) : 0 }
                                        </p>
                                    </TextContainer>
                                    <TextContainer>
                                        <p>
                                        {chartState.hasOwnProperty("target5") ? Number(chartState["target5"].price).toFixed(8) : 0 }
                                        </p>
                                        </TextContainer>
                                    <TextContainer >
                                        <p>
                                        {chartState.hasOwnProperty("target6") ? Number(chartState["target6"].price).toFixed(8) : 0 }
                                        </p>
                                    </TextContainer>
                                </Stack>
                            </div>
                            
                        </Stack.Item>
                    </Stack>
                </div>
            </Stack>
    </div>
  );
}
export default SignalState;