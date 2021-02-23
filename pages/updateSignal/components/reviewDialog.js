import React, {useCallback, useRef, useState, useContext} from 'react';
import {Button, Modal, Stack, TextContainer, TextField} from '@shopify/polaris';
import SignalContext from './signalContext';
import axios from "axios";
const  ReviewDialog = props => {
 

    const { handleloadingStatus } = props;
    const [active, setActive] = useState(false);
  
    const contextSignal = useContext(SignalContext);
    const { chartState,firstChartState } = contextSignal;

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
        <Button onClick={toggleModal} primary>Next</Button>
        <Modal
            large
            open={active}
            onClose={toggleModal}
            title="Review your signal update"
            
        >
            <Modal.Section>
                <Stack vertical>
                    <TextContainer>
                        <p className="update-signal-header">
                            🎯TARGET 1
                        </p>
                    </TextContainer>
                    <TextContainer>
                        <p className="update-signal-content">
                           {Number(chartState.chartData.target1.price).toFixed(8)} {chartState.chartData.target1.price == firstChartState.target1 ? <abbr className="content-no-change">No changes</abbr> : <abbr className="content-change">{Number(firstChartState.target1).toFixed(8)}</abbr>}
                        </p>
                    </TextContainer>
                    <TextContainer>
                        <p className="update-signal-header">
                            🎯TARGET 2
                        </p>
                    </TextContainer>
                    <TextContainer>
                        <p className="update-signal-content">
                           {Number(chartState.chartData.target2.price).toFixed(8)} {chartState.chartData.target2.price == firstChartState.target2 ?  <abbr className="content-no-change">No changes</abbr> : <abbr className="content-change">{Number(firstChartState.target2).toFixed(8)}</abbr>}
                        </p>
                    </TextContainer>
                    <TextContainer >
                        <p className="update-signal-header">
                            🎯TARGET 3
                        </p>
                    </TextContainer>
                    <TextContainer>
                        <p className="update-signal-content">
                           {Number(chartState.chartData.target3.price).toFixed(8)} {chartState.chartData.target3.price == firstChartState.target3 ?  <abbr className="content-no-change">No changes</abbr> : <abbr className="content-change">{Number(firstChartState.target3).toFixed(8)}</abbr>}
                        </p>
                    </TextContainer>
                    <TextContainer >
                        <p className="update-signal-header">
                            🎯TARGET 4
                        </p>
                    </TextContainer>
                    <TextContainer>
                        <p className="update-signal-content">
                           {Number(chartState.chartData.target4.price).toFixed(8)} {chartState.chartData.target4.price == firstChartState.target4 ?  <abbr className="content-no-change">No changes</abbr> : <abbr className="content-change">{Number(firstChartState.target4).toFixed(8)}</abbr>}
                        </p>
                    </TextContainer>
                    <TextContainer >
                        <p className="update-signal-header">
                            🎯TARGET 5
                        </p>
                    </TextContainer>
                    <TextContainer>
                        <p className="update-signal-content">
                           {Number(chartState.chartData.target5.price).toFixed(8)} {chartState.chartData.target5.price == firstChartState.target5 ?  <abbr className="content-no-change">No changes</abbr> : <abbr className="content-change">{Number(firstChartState.target5).toFixed(8)}</abbr>}
                        </p>
                    </TextContainer>
                    <TextContainer >
                        <p className="update-signal-header">
                            🎯TARGET 6
                        </p>
                    </TextContainer>
                    <TextContainer>
                        <p className="update-signal-content">
                           {Number(chartState.chartData.target6.price).toFixed(8)} {chartState.chartData.target6.price == firstChartState.target6 ?  <abbr className="content-no-change">No changes</abbr> : <abbr className="content-change">{Number(firstChartState.target6).toFixed(8)}</abbr>}
                        </p>
                    </TextContainer>
                    <Stack distribution="trailing">
                        <Button onClick={handlepublishStatus} primary>Publish</Button>
                    </Stack>
                </Stack>
            </Modal.Section>
        </Modal>
        </div>
    );
}
export default ReviewDialog;