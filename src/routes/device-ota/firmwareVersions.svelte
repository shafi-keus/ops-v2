<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { App } from '@capacitor/app';
	import getOtaVersionsList from '$lib/apis/getOtaVersionsList';
	import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from '@sveltestrap/sveltestrap';
	import { globalDeviceMap, otaProgressStore, staticToken } from '$lib/stores';
	import type { scandata } from '$lib/stores';
	import { otaFlag } from '$lib/stores';
	export let device: scandata;
	let errMsg = '';
	const dispatch = createEventDispatcher();
	let selection = '';
	let versions: string[] = [];
	let availableVersions: string[] = [];
	let flag = 0;
	let branch = 'main';

	// App.addListener("backButton", async() => {
	//   dispatch("cancled");
	//   return;
	// });
	async function init() {
		versions = [];
		if ($globalDeviceMap[device?.name?.split(' ')[0] || '']) {
			let reqData = {
				deviceCategory: $globalDeviceMap[device?.name?.split(' ')[0] || '']?.deviceCategory,
				deviceType: $globalDeviceMap[device?.name?.split(' ')[0] || '']?.deviceType,
				token: $staticToken,
				branch: 'main'
			};
			if (branch == 'dev') {
				reqData.branch = 'dev';
			}
			let resp = await getOtaVersionsList(reqData);
			console.log('ota list : ' + JSON.stringify(resp?.data));
			if (resp?.data?.success) {
				let arr = resp?.data?.data;
				//no versions are available...
				if (arr.length == 0) flag = 1;
				for (let i = 0; i < arr.length; i++) {
					console.log('obj is : ', arr[i]);
					versions = [...versions, arr[i]];
					availableVersions = versions.sort();
					versions = availableVersions.reverse();
				}
			}
			//failed to fetch versions...
			else {
				flag = 2;
				errMsg = resp?.data?.error;
			}
		} else {
			flag = 2;
			errMsg = 'Oops!! Device not found..';
			console.log($globalDeviceMap[device?.name?.split(' ')[0] || '']);
		}
	}

	function blockUpdate() {
		availableVersions.reverse();
		console.log('available versions : ', availableVersions);
		let currentVersion = device.name?.split(' ')[1].replace(/^v/i, '') || '';
		console.log('current version : ', currentVersion);
		let blocked_versions = versions
			.filter((version) => version.includes('blocked'))
			.map((version) => {
				let str = version.replace('-blocked', '');
				return str;
			});
		blocked_versions.sort();
		console.log('blocked versions : ', blocked_versions);
		for (let i = 0; i < blocked_versions.length; i++) {
			if (currentVersion >= blocked_versions[i]) {
				let ele = blocked_versions[i] + '-blocked';
				let index = availableVersions.indexOf(ele);
				availableVersions = availableVersions.slice(index);
				console.log('availableVersions', availableVersions);
			}
			if (currentVersion < blocked_versions[i]) {
				let ele = blocked_versions[i] + '-blocked';
				let index = availableVersions.indexOf(ele) + 1;
				if (index !== -1) {
					availableVersions = availableVersions.slice(0, index);
				}
				break;
			}
		}
		versions.reverse();
		console.log('versions : ', versions);
		console.log('available versions : ', availableVersions);
	}
	onMount(async () => {
		await init();
		blockUpdate();
	});
	onDestroy(() => {
		versions.length = 0;
	});
</script>

<div class="farLayout theme-page d-flex flex-column">
	<Button class="float-left theme-page" size="md" outlined>
		<span class="icon-close fsipx-24 btn-left-icon" />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span
			class="d-inline-block"
			on:click={() => {
				dispatch('cancled');
				return;
			}}
		>
			Cancle
		</span>
	</Button>
	{#if selection.length > 0}
		<Button
			class="float-right"
			style="height:max-content;"
			on:click={() => {
				if ($otaFlag) {
					alert('Only one device can update at a time!!');
					return;
				}
				$otaProgressStore[device?.address] = {
					inOta: true,
					progress: 0,
					bleAddress: device?.address
				};

				dispatch('update', { version: selection, branch: branch });
			}}>Update</Button
		>
	{/if}
	<!-- floating buttons -->
	<div style="width:100%;">
		<h1 class="farTitle bottom-shadow">
			Firmware versions

			<div style="display: inline-block;float:right;" class="theme-page">
				<Dropdown size="sm">
					<DropdownToggle caret>{branch}</DropdownToggle>
					<DropdownMenu end>
						<DropdownItem
							on:click={async () => {
								branch = 'main';
								await init();
							}}>main</DropdownItem
						>
						<DropdownItem
							on:click={async () => {
								branch = 'dev';
								await init();
								blockUpdate();
							}}>dev</DropdownItem
						>
					</DropdownMenu>
				</Dropdown>
			</div>
		</h1>
	</div>

	<div style="overflow:scroll;padding:0px 16px;padding-bottom:25%;" class="theme-page">
		{#each versions as version, index (version)}
			{@const availability = availableVersions.includes(version)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				style="width: 100%;height:4rem;border-bottom:1px solid rgba(0,0,0,0.2);padding:16px 0px;display:flex;align-items:center;justify-content:space-between;"
				on:click={() => {
					if (availability) {
						selection = version;
					}
				}}
			>
				{version}
				<input
					style="width: 24px;height:24px;"
					type="radio"
					bind:group={selection}
					value={version}
					disabled={!availability}
				/>
			</div>
		{:else}
			{#if flag == 2}
				<p
					style="text-align: center; color:red;margin-top:1.5rem;border:1px solid;padding:1rem;border-radius:10px;font-weight:500"
				>
					Failed to load versions
					<span style="display: block;margin:2rem;color:red;">{errMsg ? errMsg : ''}</span>
				</p>
			{:else if flag == 1}
				<p style="text-align: center;margin-top:1.5rem;">No versions are available..</p>
			{:else}
				<p style="text-align: center; color:green;margin-top:1.5rem;">Fetching versions</p>
			{/if}
		{/each}
	</div>
</div>

<style>
	:global(.float-left) {
		position: fixed;
		bottom: 16px;
		z-index: 999;
		left: 16px;
	}
	.farTitle {
		font-size: 18px;
		font-weight: 400;
		padding: 32px 16px 16px;
	}
	.farLayout {
		height: 100vh;
		width: 100vw;
	}

	:global(.float-right) {
		position: fixed;
		bottom: 16px;
		z-index: 999;
		right: 16px;
	}
</style>
