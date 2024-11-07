<script>
	export let progress = 0;
	export let maxVal = 100;
	export let style = '';
</script>

<div class="progress" {style}>
	<div
		class="progress-bar progress-bar-striped progress-bar-animated bg-primary"
		role="progressbar"
		aria-valuemin={0}
		aria-valuemax={maxVal}
		style="width: {(progress / maxVal) * 100}%"
	/>
</div>

<style>
	.progress {
		height: 4px;
		width: 100%;
		background-color: #d3d3d3;
	}
</style>
