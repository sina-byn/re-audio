export const createWorker = (workerFn: Function): [Worker, Function] => {
  const blob = new Blob([`(${workerFn.toString()})()`], { type: 'application/javascript' });

  const workerURL = URL.createObjectURL(blob);
  const worker = new Worker(workerURL);

  const workerCleanup = () => {
    if (worker) worker.terminate();
    if (workerURL) URL.revokeObjectURL(workerURL);
  };

  return [worker, workerCleanup];
};
