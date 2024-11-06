// ~/composables/usePolling.ts
import { ref, onMounted, onUnmounted } from "vue";

export const usePolling = (
  fetchData: () => Promise<void>,
  interval: number
) => {
  const isPolling = ref(false);
  let pollingInterval: ReturnType<typeof setInterval> | null = null;

  const startPolling = () => {
    isPolling.value = true;
    pollingInterval = setInterval(fetchData, interval);
  };

  const stopPolling = () => {
    isPolling.value = false;
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
  };

  onMounted(startPolling);
  onUnmounted(stopPolling);

  return { isPolling };
};
