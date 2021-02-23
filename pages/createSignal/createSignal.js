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

import SearchSymbol from "./components/searchSymbol"
import SelectExchange from "./components/selectExchange"
import SelectInvest from "./components/selectInvest"
import SelectTarget from "./components/selectTarget"
import SelectType from "./components/selectType"
import ReviewDialog from "./components/reviewDialog"
import Status from "./components/Status"

const CreateSignalContainer = dynamic(
	() =>
		import('../../components/CreateSignalContainer').then(mod => mod.CreateSignalContainer),
	{ ssr: false },
);

const CreateSignal = () => {
	
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
										New Signal
									</Heading>
									<div className = "signal-option-form">
										<Stack >
												<SearchSymbol />
												<SelectExchange />
												<SelectInvest />
										</Stack>
									</div>
									<div className = "signal-card signal-template">
										<Card title="Signal Template" sectioned>
											<p>Select the type of signal you are creating, then mark the prices directly on the graph.</p>
											<SelectType />
											<SelectTarget />
										</Card>
									</div>
									<div className = "signal-card signal-chart">
										<Card>
											<CreateSignalContainer />
										</Card>
									</div>
									
									<div className = "signal-card">
										<Banner status="info">
											<p>Drag the horizontal lines to make them match the prices of your analysis.</p>
										</Banner>
									</div>
									<div  className = "signal-card">
										{/* <Stack distribution="trailing">
											<ReviewDialog handleloadingStatus = {handleloadingStatus} />
										</Stack> */}
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

export default CreateSignal;