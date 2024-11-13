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

	// API calls
	import getGatewayInfo from '$lib/apis/getGatewayInfo';
	import getDetailedInfo from '$lib/apis/getDetailedInfo.js';
	import { getNodes } from '$lib/hubRpcs/getNodes';
	import registerNode from '$lib/apis/registerNode';

	// Lifecycle
	import { onDestroy, onMount } from 'svelte';

	// Constants
	const DELAY_TIME = 10000;

	// Interfaces
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

	// State
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

	// Helpers
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

	// API Functions
	async function fetchMediaHubs() {
		try {
			const nodesData = await getNodes($gatewayId);
			
			mediaHubs = [...nodesData?.nodes];
			processMediaData(mediaHubs[0].plugins);
		} catch (error) {
			console.log('Failed to fetch media hubs:', error);
		}
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

	// Actions
	async function searchGateways() {
		$gateways = [];
		gatewayList = [];
		await init();
	}

	async function registerNewNode() {
		ipmanual = false;
		const shouldProceed = confirm(`Do you want to register media hub with IP ${manualIp}?`);
		if (!shouldProceed) return;
		try {
			searching = true;
			let resp = await registerNode(manualIp, $gatewayDetailInfo);
			console.log('resp-------->', resp);
			await delay(DELAY_TIME);
			await fetchMediaHubs();
		} catch (error) {
			console.error('Failed to register node:', error);
		} finally {
			searching = false;
		}
	}

	// Initialization
	async function init() {
		try {
			searching = true;
			await fetchMediaHubs();

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

	// Lifecycle
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
	<header class="header bottom-shadow">
		<h1 class="title-large">Gateways</h1>
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

	<Modal bind:isOpen={openmodal}>
		<div class="advanced-options">
			<div
				class="option"
				on:click={() => {
					openmodal = false;
					ipmanual = true;
				}}
			>
				<span class="icon-edit fsipx-25" />
				<span>Enter IP manually</span>
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

	.header {
		padding: 16px;
		flex-shrink: 0;
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

	.advanced-options {
		padding: 16px;
	}

	.option {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		padding: 8px;
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
