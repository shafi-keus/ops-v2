<script lang="ts">
	// import { miniGatewayId, selectedGateway } from './../stores/index.ts';
	import { goto } from '$app/navigation';
	import Button from './Button.svelte';
	import PopUp from './PopUp.svelte';
	import GatewayUpdate from './gatewayUpdate.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { GatewayCommunicator } from '$lib/utils/changeGatewayMode.js';
	import { token } from '../constants/global';
	import GatewayPing from '$lib/apis/GatewayPing';
	import getDeploymentVersions from '$lib/apis/getDeploymentVersions';
	import { channel as ch, gatewayId, selectedGateway } from '$lib/stores/index';
	import gatewayupdatapi from '$lib/apis/gatewayUpdate';
	import { json } from '@sveltejs/kit';
	// import { version } from "process";
	export let heading = 'KEUS main';
	export let channel: number;
	export let configuration = '';
	// export let gatewayId=""
	export let index = -1;
	export let ip = '';
	export let currVersion = '';
	export let gatewayid = '';
	export let miniGatewayId = '';
	const dispatch = createEventDispatcher();
	let gatewayupdate = '';
	let mini = false;
	let main = false;
	let updatebtn = false;
	let onlineStatus = '';
	// let branch_versions = [];
	// let latest_branch = "";
	// Types
	type reqData = {
		token: string;
		ip: string;
		gatewayId: string;
		miniGatewayId?: string;
	};
	type data = {
		gatewayId: string;
		token: string;
		version: string;
		miniGatewayId?: string;
	};
	// to check weather the gateway is in online or offline.....
	const pingGateway = async () => {
		let reqData: reqData = {
			token: token,
			ip: ip || '',
			gatewayId: gatewayid || ''
		};
		if (miniGatewayId.length > 0) reqData.miniGatewayId = miniGatewayId;
		let resp = await GatewayPing(reqData);
		if (!resp?.data?.data) return;
		else onlineStatus = resp.data.data;
	};
	// $:console.log("channel of the gateway is : " + channel);
	// returns the latest available version of main branch.....
	// const updateVersions = async () => {
	//   let verRes = await getDeploymentVersions({
	//     token: token,
	//     branchName: "main",
	//   });
	//   branch_versions = verRes?.data?.data ? verRes.data.data : [];
	//   branch_versions.sort().reverse();
	//   latest_branch = branch_versions[0];
	// };
	//updates the gateway with the latest branch....
	// const deployRelease = async () => {
	//   let data: data = {
	//     gatewayId: gatewayid,
	//     token: token,
	//     version: latest_branch,
	//     // miniGatewayId: "main",
	//   };
	//   if (!heading.includes("main")) {
	//     data.miniGatewayId = miniGatewayId;
	//   }
	//   console.log(data);
	//   let updateRes = await gatewayupdatapi(data);
	//   console.log("update res : ", updateRes);
	//   if (updateRes?.data?.success) {
	//     console.log("success", "Deployed Successfully!");
	//     return true;
	//   } else console.log("error", "failed to deploy!");
	//   return false;
	// };
	onMount(async () => {
		// alert(configuration);
		if (!configuration) {
			pingGateway();
			// await updateVersions();
		}
	});
</script>

<div class="theme-page">
	<!-- configuration -->
	{#if gatewayupdate}
		<GatewayUpdate bind:gatewayupdate />
	{:else}
		<div
			class="card theme-page shadow-normal"
			style="border:none;min-height: {currVersion ? '28' : 0}vh;"
		>
			<!-- mini gateway popup -->
			<PopUp bind:isOpen={mini} style="min-height:16vh;padding:14px;">
				<div class="p-2">
					<div style="font-weight:600;margin-bottom:1%;font-size:large;">Convert to mini</div>
					<span style="font-weight:400;"> Main gateway will be converted to mini gateway </span>
					<div class="right mt-4">
						<Button
							outlined
							style="width:auto;height:40px;margin-right:10px;"
							size="md"
							on:click={() => {
								mini = false;
							}}>Cancel</Button
						>
						<Button
							size="md"
							style="width:auto;height:40px;"
							on:click={async () => {
								gatewayupdate = 'Converting to mini';
								let res = await GatewayCommunicator.convertGatewayMode({
									mode: 1
								});
								if (res?.success) {
									alert('Gateway is converted to mini');
									configuration = 'mini';
								}
								mini = false;
							}}>Convert</Button
						>
					</div>
				</div>
			</PopUp>
			<!-- main gateway popup -->
			<PopUp bind:isOpen={main} style="min-height:16vh;padding:14px;">
				<div class="p-2">
					<div style="font-weight:600;margin-bottom:1%;font-size:large;">Convert to main</div>
					<span style="font-weight:400;"> Mini gateway will be converted to main gateway </span>
					<div class="right mt-4">
						<Button
							outlined
							style="width:auto;height:40px;margin-right:10px;"
							size="md"
							on:click={() => {
								main = false;
							}}>Cancel</Button
						>
						<Button
							size="md"
							style="width:auto;height:40px;"
							on:click={async () => {
								gatewayupdate = 'Converting to main';
								let res = await GatewayCommunicator.convertGatewayMode({
									mode: 0
								});
								if (res?.success) {
									alert('Gateway is converted to main');
									configuration = 'main';
								}
								main = false;
							}}>Convert</Button
						>
					</div>
				</div>
			</PopUp>
			<!-- Update popup -->
			<PopUp bind:isOpen={updatebtn} style="min-height:18vh;padding:16px;">
				<div class="p-2">
					<div style="font-weight:600;margin-bottom:16px;font-size:large;">Version update</div>
					<!-- {#if latest_branch}
            <p>
              New version <strong>({latest_branch})</strong> is available for
              this gateway. <br />
              Do you want to update?
            </p>
          {:else}
            <p>Version is upto date</p>
          {/if} -->
					<div style="display:flex;align-items:center;justify-content:space-between;">
						<Button
							outlined
							size="md"
							style="width:auto;height:40px;margin-right:10px;"
							on:click={() => (updatebtn = false)}>Cancel</Button
						>
						<!-- {#if latest_branch}
              <Button
                size="md"
                style="width:auto;height:40px;"
                on:click={() => {
                  updatebtn = false;
                  gatewayupdate = "Gateway updating";
                  deployRelease();
                }}>Update</Button
              >
            {/if} -->
					</div>
				</div>
			</PopUp>
			<!-- GatewayCard ui -->
			<h3 class="header">
				<span class:d-none={!heading.includes('KEUS main')} style="position: absolute; left:3%"
					><img src="/images/master.svg" alt="" /></span
				>
				<p
					style="position: relative;left:{!heading.includes('KEUS main')
						? -10
						: 16}px;font-size: 18px;width:max-content;display: inline-block;"
				>
					{heading}
				</p>
				<span style="position:relative;margin-left:{heading.includes('KEUS main') ? 36 : 16}px">
					{#if onlineStatus == 'online'}
						<span class="badge-green" style="width:16px;height:16px;" />
					{:else if onlineStatus == 'offline'}
						<span class="badge-red" style="width:16px;height:16px;" />
					{:else}
						<span class="badge-grey" style="width:16px;height:16px;" />
					{/if}
				</span>

				<!-- remove gateway -->
				<!-- <span
					class="float-end mx-1"
					on:click={() => {
						dispatch('remove', index);
					}}
				>
					<img src="/images/close.svg" alt="close" style="width:27px;height:27px;" />
				</span> -->
				<!-- <span class="power icon-power float-end mx-2" /> -->
			</h3>
			<div class="body">
				<div class="" style="border-bottom: {currVersion ? '1px solid rgba(0,0,0,0.09)' : ''};">
					<div class="" style="font-size: 15px;font-style: normal;font-weight: 500;">
						IP : {ip}
						{#if miniGatewayId}
							<span class="d-block">Gateway Id : {miniGatewayId}</span>
						{/if}
						{#if channel}
							<span class="d-block">Channel : {channel ? channel : 'NA'}</span>
						{/if}
					</div>
					{#if currVersion}
						<div class="mb-2">
							<span style="font-size: 15px;font-style: normal;font-weight: 500;"
								>Version : {currVersion} &nbsp;</span
							>
							<!-- {#if currVersion != latest_branch}
                <span style="font-weight: 600;">New version available!</span>
              {/if} -->
						</div>
						<!-- {#if currVersion != latest_branch}
              <Button
                outlined
                style="margin-bottom:16px;"
                on:click={() => {
                  updatebtn = !updatebtn;
                }}>Update</Button
              >
            {/if} -->
					{/if}
				</div>
			</div>
			<!-- convert to main or mini gateway -->
			{#if configuration}
				<div class="footer">
					{#if configuration == 'main'}
						<Button
							size="md"
							style="padding:12px"
							class="mb-2"
							block
							on:click={() => {
								mini = !mini;
							}}>Convert to Mini</Button
						>
					{:else}
						<Button
							size="md"
							block
							style="padding:12px"
							class="mb-2"
							on:click={() => {
								main = !main;
							}}>Convert to Main</Button
						>
					{/if}
					<!-- <Button
            size="md"
            block
            style="padding:12px"
            on:click={() => {
              gatewayupdate = "Configuration";
            }}>Configure</Button
          > -->
				</div>
			{:else}
				<!-- redirect to settings page -->
				{#if gatewayid}
					<div class="footer">
						<!-- <Button
            size="md"
            style="margin-bottom:16px;"
            block
            on:click={() => {
              $ch = channel;
              goto("/gatewayDetails");
              }}>Edit details</Button
          > -->
						<Button
							size="md"
							block
							on:click={async () => {
								if (heading.includes('KEUS main')) {
									$selectedGateway = {
										type: 'main',
										gatewayId: gatewayid,
										channel: channel,
										ip: ip
									}
								} else {
									$selectedGateway = {
										type: 'mini',
										gatewayId: miniGatewayId,
										channel: channel,
										ip: ip
									}
								}
								$ch = channel;
								await goto('devices');
							}}>Demo login</Button
						>
					</div>
				{/if}
			{/if}
			{#if !currVersion}
				<div style="color: red;padding:16px 8px;">Unable to get the gateway mode!</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.badge-green {
		right: -15%;
		top: 48%;
	}
	.badge-red {
		right: -15%;
		top: 48%;
	}
	.badge-grey {
		right: -15%;
		top: 48%;
	}
	.power {
		margin-top: 16px;
	}
	.body {
		position: relative;
		width: 100%;
		min-height: 11vh;
		padding: 1%;
	}
	.card {
		color: ECECEC;
		position: relative;
		border-radius: 16px;
		width: 100%;
		margin-bottom: 16px;
		padding: 0px 16px;
	}
	.header {
		padding-left: 16px;
		padding-top: 16px;
	}
	.footer {
		margin-top: 16px;
		margin-bottom: 16px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.right {
		float: right;
	}
</style>
