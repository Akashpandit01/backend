const os = require("os");

function getSystemInfo() {
  const cpus = os.cpus();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const memoryUsage = process.memoryUsage();

  const bytesToGB = (bytes) => (bytes / (1024 ** 3)).toFixed(2);
  const bytesToMB = (bytes) => (bytes / (1024 ** 2)).toFixed(2);

  console.log("System Information:");
  console.log("-------------------------");
  console.log(`Architecture: ${os.arch()}`);
  console.log(`CPU Cores: ${cpus.length}`);
  console.log(`CPU Model: ${cpus[0].model}`);
  console.log(`CPU Speed: ${(cpus[0].speed / 1000).toFixed(2)} GHz`);
  console.log(`Total Memory: ${bytesToGB(totalMem)} GB`);
  console.log(`Free Memory: ${bytesToGB(freeMem)} GB`);
  console.log(`Heap Memory Used: ${bytesToMB(memoryUsage.heapUsed)} MB`);
  console.log(`Heap Memory Total: ${bytesToMB(memoryUsage.heapTotal)} MB`);
  console.log(`Hostname: ${os.hostname()}`);
  console.log(`OS Type: ${os.type()}`);
}

module.exports = { getSystemInfo };