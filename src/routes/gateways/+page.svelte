<script lang="ts">
	// Imports organized by category
	// Store imports
	import { leadId, channel, gateways, gatewayDetailInfo, gatewayId } from '$lib/stores/index';
	import { pluginStore, processMediaData, type PluginOutput } from '$lib/stores/node-config';

	// Navigation & Utils
	import { goto } from '$app/navigation';
	import { GatewayCommunicator } from '$lib/utils/changeGatewayMode.js';
	import { token } from '../../lib/constants/global';

	// Components
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/modal.svelte';
	import Inputfield from '$lib/components/inputfield.svelte';
	import GatewayCards from '$lib/components/gatewayCard.svelte';
	import MediaCard from '$lib/components/MediaCard.svelte';
	import GatewayUpdate from '$lib/components/gatewayUpdate.svelte';

	// API calls
	import getGatewayInfo from '$lib/apis/getGatewayInfo';
	import getDetailedInfo from '$lib/apis/getDetailedInfo.js';
	import { getNodes } from '$lib/hubRpcs/getNodes';
	import registerNode from '$lib/apis/registerNode';

	import { onDestroy, onMount } from 'svelte';

	// Constants
	const DELAY_TIME = 1000;
	const MAX_RETRIES = 10;

	interface GatewayInfo {
		ip: string;
		hubVersion: string;
		gatewayId: string;
		minigateways?: any;
	}

	interface MiniGateway {
		gatewayId: string;
		miniGatewayId: string;
		heading: string;
		ip: string;
		version: string;
		channel: string;
	}

	let searching = false;
	let openmodal = false;
	let ipmanual = false;
	let manualIp = '';
	let active = false;
	let mainChannel: string = 'NA';
	let gatewayInfo: GatewayInfo;
	let miniInfo: Record<string, any> = {};
	let mediaHubs: any[] = [];
	let gatewayList: any[] = [];
	let nodeRegitering: boolean = false;

	const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

	async function getMiniGateways(gatewayData: any[], mainGateway: string): Promise<MiniGateway[]> {
		return gatewayData.map((ele: any[], i: number) => ({
			gatewayId: mainGateway,
			miniGatewayId: ele[0],
			heading: miniInfo[ele[0]]?.name || `keus mini ${i + 1}`,
			ip: ele[1]?.ip,
			version: ele[1]?.version,
			channel: miniInfo[ele[0]]?.zigbeeChannel || 'NA'
		}));
	}

	async function fetchDetailedInfo() {
		const response = await getDetailedInfo({ token, gatewayId: $gatewayId });
		if (response?.data?.success) {
			const {
				gateways: [firstGateway]
			} = response.data.data;
			mainChannel = firstGateway?.zigbeeChannel || 'NA';

			firstGateway?.miniGateways?.forEach((mini: any) => {
				miniInfo[mini.gatewayId] = mini;
			});
		}
	}

	async function fetchGateways() {
		const response = await getGatewayInfo({ gatewayId: $gatewayId, token });
		gatewayInfo = response?.data;

		// Add main gateway
		const mainGateway = {
			heading: 'KEUS main',
			ip: gatewayInfo?.ip,
			version: gatewayInfo?.hubVersion,
			gatewayId: gatewayInfo?.gatewayId,
			channel: mainChannel
		};
		gatewayList = [mainGateway];

		// Add mini gateways if any
		if (gatewayInfo?.minigateways) {
			const miniGateways = await getMiniGateways(
				Object.entries(gatewayInfo.minigateways),
				gatewayInfo.gatewayId
			);
			gatewayList = [...gatewayList, ...miniGateways];
		}
	}

	async function searchGateways() {
		$gateways = [];
		gatewayList = [];
		await init();
	}

	async function retryFetchMediaHubs(): Promise<boolean> {
		try {
			const nodesData = await getNodes($gatewayId);
			if (nodesData && nodesData?.nodes && nodesData.nodes.length > 0) {
				mediaHubs = [...nodesData.nodes];
				processMediaData(mediaHubs[0].plugins);
				if (hasPluginCore(mediaHubs[0])) return true;
				return false;
			}
			return false;
		} catch (error) {
			console.log('Failed to fetch media hubs:', error);
			return false;
		}
	}

	function hasPluginCore(nodeData: any): boolean {
		return nodeData.services.some((service: any) => service.serviceId === 'plugin_core');
	}

	async function fetchWithRetry(retries = 0): Promise<void> {
		if (retries >= MAX_RETRIES) {
			console.log('Max retries reached. Media hub might still be initializing.');
			// searching = false;
			nodeRegitering = false;
			return;
		}
		const success = await retryFetchMediaHubs();
		if (success) {
			console.log(`Successfully fetched media hubs on attempt ${retries + 1}`);
			// searching = false;
			nodeRegitering = false;
			return;
		}
		console.log(`Retry attempt ${retries + 1} failed, waiting ${DELAY_TIME / 1000} seconds...`);
		await delay(DELAY_TIME);
		return fetchWithRetry(retries + 1);
	}

	async function registerNewNode() {
		ipmanual = false;
		const shouldProceed = confirm(`Do you want to register media hub with IP ${manualIp}?`);
		if (!shouldProceed) return;
		try {
			nodeRegitering = true;
			let resp = await registerNode(manualIp, $gatewayDetailInfo);
			if (resp.success) {
				await fetchWithRetry();
			}
		} catch (error) {
			console.error('Failed to register node:', error);
			nodeRegitering = false;
		}
	}

	async function init() {
		try {
			searching = true;
			await retryFetchMediaHubs();

			if ($gateways.length === 0) {
				await fetchDetailedInfo();
				await fetchGateways();
			} else {
				gatewayList = [...$gateways];
			}
		} catch (error) {
			console.error('Error during initialization:', error);
		} finally {
			searching = false;
		}
	}

	onMount(init);
	onDestroy(() => {
		$gateways = [...gatewayList];
	});

	$: if (!$gatewayId) {
		$gateways = [];
		$pluginStore = {} as PluginOutput;
		goto('./');
	}

	$: {
		if (manualIp) {
			active = true;
		} else {
			active = false;
		}
	}
</script>

<div class="theme-page">
	<GatewayUpdate isOpen={nodeRegitering} />

	<header class="header bottom-shadow">
		<h1 class="title-large mb-0">Gateways</h1>
	</header>

	<section class="context">
		<p class="lead-id">Lead ID: <span>{$leadId}</span></p>
	</section>

	<section class="controls">
		<p class="text-center">Add gateways</p>
		<div class="button-group">
			<Button size="md" on:click={searchGateways}>
				<span class="icon-search-1 fsipx-24 btn-left-icon" />
				Quick search
			</Button>
			<Button size="md" on:click={() => (openmodal = true)} outlined>
				<span class="icon-menu-1 fsipx-24 btn-left-icon" />
				Advanced
			</Button>
		</div>
	</section>

	<main class="content">
		<div class="media-hubs mb-3">
			{#each mediaHubs as hub}
				{#if hub?.nodeId && hub.nodeId !== 'undefined'}
					<MediaCard id={hub.nodeId} />
				{/if}
			{/each}
		</div>

		{#if searching}
			<div class="loading">
				<div class="spinner-border text-info" role="status">
					<span class="sr-only" />
				</div>
				<h6>Searching for gateways</h6>
			</div>
		{:else if gatewayList.length}
			{#each gatewayList as gateway (gateway.ip)}
				<GatewayCards
					heading={gateway.heading}
					ip={gateway.ip}
					channel={gateway.channel}
					currVersion={gateway.version}
					gatewayid={gateway.gatewayId}
					miniGatewayId={gateway.miniGatewayId}
					configuration={gateway.config}
				/>
			{/each}
		{:else}
			<div class="no-gateways">
				<img src="/images/noGateways.png" alt="no gateways found" />
				<p>No gateways found</p>
			</div>
		{/if}
	</main>

	<footer class="footer">
		<Button outlined on:click={() => goto('/search')}>
			<span class="icon-back-1 fsipx-24 btn-left-icon" />
			Back
		</Button>
	</footer>

	<!-- Modals -->
	<Modal bind:isOpen={ipmanual} title="IP address">
		<div class="modal-content">
			<Inputfield placeholder="Enter IP" bind:inputValue={manualIp} />
			<div class="modal-actions">
				<p class="cancel" on:click={() => (ipmanual = false)}>Cancel</p>
				<p class="proceed" class:active on:click={() => manualIp && registerNewNode()}>Proceed</p>
			</div>
		</div>
	</Modal>

	<Modal bind:isOpen={openmodal} title="Advance Options" style="height:15vh;">
		<div class="advanced-options">
			<div
				class="option"
				on:click={() => {
					openmodal = false;
					ipmanual = true;
				}}
			>
				<span class="icon-Gateway fsipx-25" />
				<span>Add Gateway</span>
			</div>
		</div>
	</Modal>
</div>

<style>
	.theme-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.context {
		padding: 16px;
		padding-bottom: 0;
		border-bottom: 1.5px solid rgba(0, 0, 0, 0.09);
		flex-shrink: 0;
	}
	.controls {
		padding: 16px 8px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.09);
		flex-shrink: 0;
	}
	.content {
		flex: 1;
		overflow-y: auto;
		padding: 16px;
		background-color: #ececec;
	}
	.footer {
		padding: 16px;

		flex-shrink: 0;
	}

	.button-group {
		display: flex;
		justify-content: center;
		gap: 16px;
		margin-top: 8px;
	}

	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		height: 40vh;
	}

	.no-gateways {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 16px 8px;
	}

	.modal-content {
		padding: 16px;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		margin-top: 16px;
	}
	.header {
		width: 100%;
		padding: 16px 8px;
	}

	.option {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		padding: 16px 8px;
	}

	.proceed {
		color: grey;
		font-weight: 550;
		/* margin: 16px; */
		/* margin-bottom: 32px; */
	}
	.active {
		color: #185eaf;
	}
</style>
