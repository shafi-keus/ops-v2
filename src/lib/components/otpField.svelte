<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { onMount } from "svelte";

  let otpDigits = 6;
  let otp = Array(otpDigits).fill("");
  let focusIndex = 0;
  let inputFields: any = [];
  let flag = false;

  onMount(async () => {
    document.getElementById("ele")?.focus();
  });

  function handleInput(event: any, index: number) {
    if (index == otpDigits - 1) flag = true;
    const { value, maxLength } = event.target;
    otp[index] = value.slice(0, maxLength);

    if (value.length === maxLength && index < otpDigits - 1) {
      focusIndex = index + 1;
    } else if (value.length === 0 && index > 0) {
      focusIndex = index - 1;
    }

    otp = [...otp];
    inputFields[focusIndex].focus();
  }

  function handleKeyDown(event: any, index: number) {
    if (event.key === "Backspace") {
      flag = false;
      event.preventDefault();
      if (index === 0) {
        otp[0] = "";
        inputFields[0].value = "";
      } else if (index > 0) {
        otp[index] = "";
        focusIndex = index - 1;
        otp = [...otp];
        inputFields[focusIndex].focus();
      }
    }
  }
</script>

<div class="theme-page">
  <div class="otp-field">
    {#each otp as digit, index (index)}
      <input
        type="text"
        id="ele"
        class="otp-input theme-page"
        bind:value={digit}
        on:input={(event) => handleInput(event, index)}
        on:keydown={(event) => handleKeyDown(event, index)}
        maxlength="1"
        bind:this={inputFields[index]}
      />
    {/each}
  </div>
  <div class="btnn" style="margin-top: 5%;text-align:center;">
    <Button
      size="md"
      block
      color={flag ? "blue" : "white"}
      style="width:90%;"
      on:click={() => {
        console.log(Number(otp.join("")));
        return Number(otp.join(""));
      }}>Login</Button
    >
  </div>
</div>

<style>
  .otp-field {
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .otp-input {
    font-size: large;
    border: 1.6px solid rgb(61, 128, 214);
    border-radius: 9px;
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
  }
  input:focus {
    outline: none;
  }
</style>
