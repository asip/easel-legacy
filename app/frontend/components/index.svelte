<script lang="ts">
import { onMount } from "svelte";

let { path, viewData: data } = $props<{ path: string, viewData?: string }>()

const viewDataMap = $derived(JSON.parse(data ?? '{}'))
const viewData = $derived(viewDataMap && Object.keys(viewDataMap).length !== 0 ? viewDataMap : null)

let AsyncComponent: any = $state(null);

onMount(async () => {
  AsyncComponent = (await import(/* @vite-ignore */`./${path}.svelte`)).default
})
</script>

{#if AsyncComponent }
  <AsyncComponent viewData={viewData} />
{:else}
  <div>Loading...</div>
{/if}
