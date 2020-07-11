export async function executeCommand(command: string[]) {
  const p = Deno.run({ cmd: command, stdout: "inherit", stderr: "inherit" });
  const status = await p.status();
  if (!status.success) {
    Deno.exit(status.code);
  }
}
