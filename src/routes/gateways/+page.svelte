<script lang="ts">
  import { leadId, channel, gateways } from "$lib/stores/index";
  import { goto } from "$app/navigation";
  import getGatewayInfo from "$lib/apis/getGatewayInfo";
  import Button from "$lib/components/Button.svelte";
  import PopUp from "$lib/components/PopUp.svelte";
  import GatewayCards from "$lib/components/gatewayCard.svelte";
  import Inputfield from "$lib/components/inputfield.svelte";
  import Modal from "$lib/components/modal.svelte";
  import { onDestroy, onMount } from "svelte";
  import { token } from "../../lib/constants/global";
  import { gatewayId } from "$lib/stores/index";
  import getDetailedInfo from "$lib/apis/getDetailedInfo.js";
  import { GatewayCommunicator } from "$lib/utils/changeGatewayMode.js";
  
  let searching = false;
  let openmodal = false;
  let fullnetscan = false;
  let ipmanual = false;
  let gatewayInfo: any = {};
  let gatewayinfo;
  let mainChannel:any = "NA";
  let manualIp = "";
  let active = false;
  let miniInfo: any = {};

  async function searchGateways() {
    searching = true;
    dupArr = [...arr];
    await delay(500);
    searching = false;
  }
  function delay(time: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
  let arr: any = [];
  let dupArr: any = [];
  //removing the gateway from array
  function handleRemove(event: any) {
    dupArr = dupArr.filter((_: any, i: any) => i !== event?.detail);
  }

  async function getMiniGateways(gatewayData: any, mainGateway: string) {
    let minigateways: any = [];
    gatewayData.forEach((ele: any, i: number) => {
      let mini = {
        gatewayId: mainGateway,
        miniGatewayId: ele[0],
        //Mini-Gateway-{i}
        heading: miniInfo[ele[0]]?.name || `keus mini ${i + 1}`,
        ip: ele[1]?.ip,
        version: ele[1]?.version,
        channel: miniInfo[ele[0]]?.zigbeeChannel || "NA",
      };
      minigateways = [mini, ...minigateways];
    });
    console.log("minigateways before adding : ", minigateways);
    return minigateways;
  }

  async function detailedInfo() {
    let gdinfo = await getDetailedInfo({
      token: token,
      gatewayId: $gatewayId,
    });
    if (gdinfo?.data?.success) {
      mainChannel = gdinfo.data?.data?.gateways[0]?.zigbeeChannel || "NA";
      let miniGateways = gdinfo.data?.data?.gateways[0]?.miniGateways;
      if (miniGateways.length > 0) {
        //fetching the gatewayId , name and zigbeeChannel
        miniGateways.forEach((mini: any) => {
          miniInfo[mini.gatewayId] = mini;
        });
      }
    } else {
      console.log("failed to fetch the detailed info the gateway");
    }
  }

  async function fetchGateways() {
    let response = await getGatewayInfo({
      gatewayId: $gatewayId,
      token: token,
    });
    gatewayInfo = response?.data;
    console.log("gatewayinfo of main", gatewayInfo);
    let main = {
      heading: `KEUS main`,
      ip: gatewayInfo?.ip,
      version: gatewayInfo?.hubVersion,
      gatewayId: gatewayInfo?.gatewayId,
      channel: mainChannel,
    };
    // initially adding the main gateway to array
    if (main) {
      arr.push(main);
    }
    if (gatewayInfo?.minigateways) {
      let mini = await getMiniGateways(
        Object.entries(gatewayInfo?.minigateways),
        gatewayInfo?.gatewayId
      );
      //adding the mini gateways to the array
      if (mini) {
        mini.forEach((ele: any) => {
          arr.push(ele);
        });
      }
    }
    // duplicating the main arr to dupArr so as to work the remove functionality correctly
    dupArr = [...arr];
    console.log("gateway data : ", dupArr);
  }

  onMount(async () => {
    console.log("gateways in store are : ", $gateways);
    try {
      searching = true;
      //don't fetch the gateways if already exist..
      if ($gateways.length  == 0) {
        await detailedInfo();
        await fetchGateways();
      }
      else{
        $gateways.forEach((gateway) => {
            arr.push(gateway);
          });
          console.log("Already fetched gateways are : ", JSON.stringify(arr));
          dupArr = [...arr];
      }
      searching = false;
    } catch (e) {
      console.log("error occured while fetching " + e);
    }
  });
  onDestroy(async () => {
    $gateways.length = 0;
    arr.forEach((gateway) => {
      $gateways.push(gateway);
    });
  });

  $: {
    if (manualIp?.length > 0) active = true;
    else active = false;
  }
  // $:console.log("array is " ,dupArr);

  async function connectToGateway() {
    try {
      await GatewayCommunicator.initialize(
        manualIp,
        async (e) => {
          console.log("connection opened for " + manualIp);
          let localMain = {
            heading: "Local main",
            ip: manualIp,
          };
          manualIp = "";
          try {
            let data = await GatewayCommunicator.getGatewayMode();
            if (data?.success)
              localMain.config = data?.mode == 0 ? "main" : "mini";
          } catch (err) {
            console.log("error in state fetching : ", err);
          }
          arr.unshift(localMain);
          dupArr = [...arr];
        },
        () => {
          console.log("connection is closed");
        },
        (error) => {
          console.log("found an error");
        }
      );
    } catch (error) {
      // alert("error in adding the gateway "+error);
      console.log(error);
    }
    // let localMain = {
    //   ip: manualIp,
    //   config : true
    // };
    // arr.unshift(localMain);
    // dupArr = [...arr];
  }

  async function pairHub() {
    console.log(manualIp)
  }

  const getRegisteredNodes = async() =>{
    
  }

</script>

<div class="theme-page" style="height: 100vh;padding-bottom:22%">
  <div class="header bottom-shadow">
    <p class="title-large">Gateways</p>
  </div>
  <div class="context">
    <p style="font-size: 15px;">
      Lead ID: <span style="font-weight: 600;"> {$leadId}</span>
    </p>
    <!-- <p
        class="float1"
        style=" position:absolute;right: 2rem;font-size: 15px;font-family: Poppins;font-style: normal;font-weight: 600;"
      >
        Home Id: {homeid}
      </p> -->
  </div>
  <div class="addgateway">
    <p class="text-center" style="font-size: 14px;margin-bottom:8px;">
      Add gateways
    </p>
    <div class="d-flex justify-content-center" style="gap:16px">
      <Button
        size="md"
        on:click={searchGateways}
        style="width:auto;height:40px;"
      >
        <span class="icon-search-1 fsipx-24 btn-left-icon" />
        Quick search</Button
      >
      <Button
        size="md"
        on:click={() => (openmodal = !openmodal)}
        outlined
        style="width:auto;height:40px;"
      >
        <span class="icon-menu-1 fsipx-24 btn-left-icon" />
        Advanced</Button
      >
    </div>
  </div>
  <div class="scroll">
    <!-- Modals -->
    <!-- Modal for full network scan -->
    <Modal bind:isOpen={fullnetscan} title="IP address" style="height:50vh;">
      <div class="my-2">
        <Inputfield
          placeholder="Enter ip"
          style="display:flex;justify-content:center;"
        />
      </div>
    </Modal>
    <!-- Modal for entering the ip manually -->
    <Modal bind:isOpen={ipmanual} title="IP address" style="height:50vh;">
      <div class="m-2">
        <Inputfield
        
          placeholder="Enter Ip"
          style="display:flex;justify-content:center;"
          bind:inputValue={manualIp}
        />
        <div class="my-3">
          <div
            style="margin-left: 1.5rem;display:flex;align-items:center;"
          ></div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <p
            class="float-end proceed"
            class:active
            on:click={()=>{if(manualIp) pairHub()}}
          >
            Proceed
          </p>
          <p
            class="float-end"
            style="color:black;font-weight:550;margin-right:10px;"
            on:click={() => {
              ipmanual = false;
            }}
          >
            Cancel
          </p>
        </div>
      </div>
    </Modal>
    <!-- Modal for displaying Advance search -->
    <Modal
      bind:isOpen={openmodal}
      style="height:10vh;display:flex;justify-content:center;flex-direction:column;"
    >
      <!-- <div style="height: 50%;display:flex;align-items:center;">
          <span
            class="icon-Signal fsipx-25"
            style="position: relative;left:3%;color:rgba(0,0,0,0.9);"
          />
          <div
            style="font-weight: 500;position:relative;left:5%;width:100%"
            on:click={() => {
              openmodal = !openmodal;
              fullnetscan = !fullnetscan;
            }}
          >
            Full network scan
          </div>
        </div> -->
      <div style="display:flex;align-items:center;margin-block:16px">
        <span
          class="icon-edit fsipx-25"
          style="position: relative;left:3%;color:rgba(0,0,0,0.9);"
        />
        <div
          style="font-weight: 500;position:relative;left:5%;width:100%"
          on:click={() => {
            openmodal = !openmodal;
            ipmanual = !ipmanual;
          }}
        >
          Enter Ip manually
        </div>
      </div>
    </Modal>
    {#if !searching}
      {#each dupArr as ele, index (ele.ip)}
        <GatewayCards
          {index}
          heading={ele?.heading}
          ip={ele?.ip}
          channel={ele?.channel}
          currVersion={ele?.version}
          gatewayid={ele?.gatewayId}
          miniGatewayId={ele?.miniGatewayId}
          configuration={ele?.config}
          on:remove={handleRemove}
        />
      {:else}
        <div
          class="d-flex align-items-center justify-content-center flex-column"
          style="padding:16px 8px"
        >
          <img
            src="/images/noGateways.png"
            alt="no gateways found"
            style="margin-top: 50px;"
          />
          No gateways found
        </div>
      {/each}
    {:else}
      <div
        class="d-flex justify-content-center align-items-center flex-column"
        style="width: 100%;height:40vh;gap:10px;"
      >
        <div class="spinner-border text-info" role="status">
          <span class="sr-only" />
        </div>
        <h6>Searching for gateways</h6>
      </div>
    {/if}
  </div>
  <Button size="md" outlined class="back" on:click={() => goto("/search")}>
    <span class="icon-back-1 fsipx-24 btn-left-icon" />
    Back</Button
  >
</div>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  .header {
    width: 100%;
    padding: 16px;
  }
  .scroll {
    height: fit-content;
    overflow: scroll;
    padding: 16px;
    background-color: #ececec;
  }
  .context {
    // margin-top: 1rem;
    // font-size: large;
    // font-weight: 700;
    padding: 16px;
    // height: 5vh;
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.09);
  }
  .float1 {
    float: right;
  }
  .addgateway {
    overflow: hidden;
    padding: 16px 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  }

  .body {
    min-height: 18vh;
  }
  .update {
    position: relative;
    margin-bottom: 2%;
  }
  .active {
    color: #185eaf;
  }
  .proceed {
    // color: grey;
    font-weight: 550;
    margin-right: 10px;
  }
</style>
