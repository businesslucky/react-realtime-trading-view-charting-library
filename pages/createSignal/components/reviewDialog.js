import React, {useCallback, useRef, useState, useContext} from 'react';
import {Button, Modal, Stack, TextContainer, TextField} from '@shopify/polaris';
import SignalContext from './signalContext';
import axios from "axios";
const  ReviewDialog = props => {
 

    const { handleloadingStatus } = props;
    const [active, setActive] = useState(false);
  
    const contextSignal = useContext(SignalContext);
    var  chartState  = contextSignal.chartState;

    const toggleModal = useCallback(() => setActive((active) => !active),[]);
    const handlepublishStatus = useCallback((bool) => {
        handleloadingStatus(bool);
        contextSignal.setLoading('loading');
        axios
        .get("/signal/new/get-templates/")
        .then(response => {
            contextSignal.setLoading('success');
        })
        .catch(error => {
            contextSignal.setLoading('error');
        })
    },[]);
    
    return (
        <div style={{height: '500px'}}>
        <Button onClick={toggleModal} primary>Review</Button>
        <Modal
            large
            open={active}
            onClose={toggleModal}
            title="Review your signal"
            
        >
            <Modal.Section>
                <Stack vertical>
                    <Stack.Item>
                        <Stack wrap={false}>
                            <TextField label="STRATEGY" value={String(contextSignal.signalType).toUpperCase()} />
                            <TextField label="SYMBOL" value={contextSignal.chartState.symbol} />
                            <TextField label="EXCHANGE" value={contextSignal.exchangeOptions.selected} />
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
                <Stack distribution="trailing">
                    <Button onClick={handlepublishStatus} primary>Publish</Button>
                </Stack>
            </Modal.Section>
        </Modal>
        </div>
    );
}
export default ReviewDialog;