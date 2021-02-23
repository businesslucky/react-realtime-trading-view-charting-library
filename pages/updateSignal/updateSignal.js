import React,{useState, useCallback, useContext} from 'react';
import dynamic from 'next/dynamic';
import SignalContext,{SignalProvider} from './components/signalContext';
import {
	AppProvider,
	Card,
	ContextualSaveBar,
	Frame,
	Layout,
	Loading,
	Page,
	Icon,
	Heading,
	Form,
	FormLayout,
	TextField,
	Banner,
	Button,
	Stack
  } from "@shopify/polaris";
  
import { SettingsMinor } from "@shopify/polaris-icons";
import "@shopify/polaris/styles.css";

import Status from "./components/Status"
import SignalState from "./components/signalState"
import ReviewDialog from "./components/reviewDialog"
const UpdateSignalContainer = dynamic(
	() =>
		import('../../components/UpdateSignalContainer').then(mod => mod.UpdateSignalContainer),
	{ ssr: false },
);

const UpdateSignal = () => {
	
	const [loadingStatus, setLoadingStatus] = useState(false);
	
	const contextSignal = useContext(SignalContext);
	const { setLoading } = contextSignal;
	
	const handleloadingStatus = useCallback(bool => {
		setLoadingStatus(bool);
	});
	return(
		<SignalProvider>
			<AppProvider>
				<Frame>
					
					{loadingStatus ? (
						<Status />
					) : (
						<Page fullWidth>
							<Layout>
								<div className="container">
									<Heading element="h1">
                                        Signal Update 
									</Heading>
                                    <div className = "signal-card">
										<Banner status="info">
											<p>Drag the horizontal lines to make them match the prices of your analysis.</p>
										</Banner>
									</div>
                                    <div className = "signal-card signal-state">
                                        <Card>
                                            <SignalState />
                                        </Card>									
									</div>
									<div className = "signal-card signal-chart">
										<Card>
											<UpdateSignalContainer />
										</Card>
									</div>
									
									
									<div  className = "signal-card">
										<Stack distribution="trailing">
											<ReviewDialog handleloadingStatus = {handleloadingStatus} />
										</Stack>
									</div>
									
								</div>
							</Layout>
						</Page>
					)}
				</Frame>
				
			</AppProvider>
		</SignalProvider>
	)
}

export default UpdateSignal;